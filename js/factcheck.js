// 팩트체크 기능
class FactChecker {
    constructor() {
        this.version = '4.19'; // 전 세계 국가 및 도시 데이터 대규모 보강 v2
        this.cache = this.loadCache();

        // API 키 설정 (직접 입력)
        this.GOOGLE_API_KEY = ''; // 여기에 Google API Key를 입력하세요
        this.NAVER_CLIENT_ID = 'bek3F7Ubi589Nz5NAewX';
        this.NAVER_CLIENT_SECRET = 'ffW4Lk1P1j';
    }

    // 캐시 완전 초기화 및 새로고침
    clearCache() {
        localStorage.removeItem('factCheckCache');
        this.cache = { version: this.version, data: {} };
        console.log('캐시가 초기화되었습니다.');
        return true;
    }

    // 로컬 캐시 로드
    loadCache() {
        try {
            const cachedData = localStorage.getItem('factCheckCache');
            if (cachedData) {
                const parsed = JSON.parse(cachedData);
                // 버전이 다르면 캐시를 초기화합니다.
                if (parsed.version !== this.version) {
                    console.log('버전이 달라 캐시를 초기화합니다.');
                    return { version: this.version, data: {} };
                }
                return parsed;
            }
            return { version: this.version, data: {} };
        } catch (error) {
            return { version: this.version, data: {} };
        }
    }

    // 캐시 저장
    saveCache() {
        try {
            localStorage.setItem('factCheckCache', JSON.stringify(this.cache));
        } catch (error) {
            console.error('캐시 저장 실패:', error);
        }
    }

    // 캐시 키 생성
    getCacheKey(text) {
        return text.toLowerCase().trim().replace(/\s+/g, ' ');
    }

    // 팩트체크 실행
    async check(text) {
        if (!text || text.trim().length === 0) {
            throw new Error('확인할 내용을 입력해주세요.');
        }

        // 캐시 확인
        const cacheKey = this.getCacheKey(text);
        if (this.cache.data[cacheKey]) {
            console.log('캐시에서 결과 반환');
            return this.cache.data[cacheKey];
        }

        // 실제 팩트체크 수행 시작
        try {
            // 1. 로컬 우선 확인 (매우 빠름: 산수, 일반 상식)
            // 네트워크 요청을 보내기 전에 인공지능이 아닌 로컬 DB에서 먼저 찾습니다.
            const mathResult = this.evaluateMathExpression(text);
            if (mathResult) {
                console.log('로컬 산수 계산 결과 즉시 반환');
                this.cache.data[cacheKey] = mathResult;
                this.saveCache();
                return mathResult;
            }

            const commonKnowledge = this.checkCommonKnowledge(text);
            if (commonKnowledge) {
                console.log('로컬 일반 상식 결과 즉시 반환');
                this.cache.data[cacheKey] = commonKnowledge;
                this.saveCache();
                return commonKnowledge;
            }

            // 2. 외부 검색 수행 (네트워크 필요) - 레이싱(Racing) 전략 도입
            console.log('외부 검색 시작 (레이싱 전략)...');

            // 뉴스와 구글 팩트체크를 동시에 실행하되, 명확한 결과가 먼저 나오면 바로 반환합니다.
            const googleSearch = this.checkWithGoogleFactCheck(text);
            const newsSearch = this.checkWithNewsSearch(text);
            const fakeNewsCheck = this.checkWithCommonFakeNews(text);

            const checkSources = [googleSearch, newsSearch, fakeNewsCheck];

            // 5초 타임아웃을 가진 Race 구현
            const raceResult = await this.raceToResult(checkSources);

            // 결과 분석 (레이싱 결과가 없으면 전체 분석 수행)
            const analysis = raceResult || this.analyzeResults(await Promise.allSettled(checkSources), text);

            // 캐시에 저장
            this.cache.data[cacheKey] = analysis;
            this.saveCache();

            return analysis;
        } catch (error) {
            console.error('검증 중 오류 발생:', error);
            return {
                verdict: 'uncertain',
                title: '확인 중 오류가 발생했습니다',
                description: '잠시 후 다시 시도해 주세요.',
                sources: []
            };
        }
    }

    // 명확한 '참' 또는 '거짓'이 나오면 즉시 반환하는 레이싱 헬퍼
    async raceToResult(promises) {
        return new Promise((resolve) => {
            let completed = 0;
            const total = promises.length;
            let definitiveFound = false;

            promises.forEach(p => {
                p.then(res => {
                    completed++;
                    // 명확한 결과(참/거짓)가 있고 제목이 있는 경우 즉시 반환
                    if (res && (res.verdict === 'true' || res.verdict === 'false') && res.title && !definitiveFound) {
                        definitiveFound = true;
                        console.log('명확한 결과 발견, 즉시 반환');
                        resolve(res);
                    }
                    if (completed === total && !definitiveFound) {
                        resolve(null);
                    }
                }).catch(() => {
                    completed++;
                    if (completed === total && !definitiveFound) resolve(null);
                });
            });

            // 5초 타임아웃
            setTimeout(() => {
                if (!definitiveFound) resolve(null);
            }, 5000);
        });
    }

    // Google Fact Check Tools API
    async checkWithGoogleFactCheck(text) {
        const apiKey = this.GOOGLE_API_KEY;

        if (!apiKey) {
            console.log('Google API Key가 설정되지 않았습니다.');
            return {
                source: 'Google Fact Check',
                available: false,
                claims: []
            };
        }

        try {
            const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(text)}&key=${apiKey}&languageCode=ko`;
            const response = await fetch(url);

            if (!response.ok) {
                // 키가 잘못되었거나 할당량이 초과된 경우 등
                console.warn('Google Fact Check API 호출 실패:', response.status);
                return {
                    source: 'Google Fact Check',
                    available: false,
                    claims: []
                };
            }

            const data = await response.json();

            // 검색 결과가 없는 경우
            if (!data.claims || data.claims.length === 0) {
                return {
                    source: 'Google Fact Check',
                    available: false,
                    claims: []
                };
            }

            // 가장 관련성 높은 첫 번째 결과 반환 (또는 여러 개 분석)
            const firstClaim = data.claims[0];
            const claimReview = firstClaim.claimReview[0];

            return {
                source: 'Google Fact Check',
                available: true,
                verdict: this.mapGoogleRatingToVerdict(claimReview.textualRating),
                title: `Google 팩트체크: ${firstClaim.text}`,
                description: `검증 기관(${claimReview.publisher.name})의 판정: ${claimReview.textualRating}. (원문: ${firstClaim.claimant || '출처 미상'})`,
                originUrl: claimReview.url
            };

        } catch (error) {
            console.error('Google Fact Check 오류:', error);
            return {
                source: 'Google Fact Check',
                available: false,
                claims: []
            };
        }
    }

    mapGoogleRatingToVerdict(rating) {
        const r = rating.toLowerCase();
        if (r.includes('true') || r.includes('참') || r.includes('사실') || r.includes('correct')) return 'true';
        if (r.includes('false') || r.includes('거짓') || r.includes('fake') || r.includes('incorrect')) return 'false';
        return 'uncertain';
    }

    // 뉴스 검색 (네이버 Open API 연동)
    async checkWithNewsSearch(text) {
        const CLIENT_ID = this.NAVER_CLIENT_ID;
        const CLIENT_SECRET = this.NAVER_CLIENT_SECRET;

        if (!CLIENT_ID || !CLIENT_SECRET) {
            console.warn('네이버 API 키가 설정되지 않았습니다.');
            return {
                source: 'Naver Search',
                available: false,
                articles: []
            };
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃

            const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(text)}&display=5&sort=sim`;
            const response = await fetch(url, {
                headers: {
                    'X-Naver-Client-Id': CLIENT_ID,
                    'X-Naver-Client-Secret': CLIENT_SECRET
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('API 요청 실패');

            const data = await response.json();
            return {
                source: 'Naver News',
                available: true,
                articles: data.items.map(item => ({
                    title: item.title.replace(/<[^>]*>?/gm, ''), // HTML 태그 제거
                    link: item.originallink || item.link,
                    description: item.description.replace(/<[^>]*>?/gm, ''),
                    pubDate: item.pubDate
                }))
            };
        } catch (error) {
            console.error('네이버 뉴스 검색 오류:', error);
            return {
                source: 'Naver News',
                available: false,
                articles: []
            };
        }
    }

    // 일반적인 가짜뉴스 데이터베이스
    async checkWithCommonFakeNews(text) {
        const commonFakeNews = window.COMMON_FAKE_NEWS || [];
        const textLower = text.toLowerCase();
        const textNoSpace = textLower.replace(/\s+/g, ''); // 공백 제거 버전

        // 키워드 매칭
        for (const fakeNews of commonFakeNews) {
            // 1. 일반 매칭 (원문 기준)
            let matchCount = fakeNews.keywords.filter(keyword =>
                textLower.includes(keyword)
            ).length;

            // 2. 공백 제거 매칭 (보조) - 키워드 자체가 문장에 녹아있는 경우
            if (matchCount < 2) {
                const matchCountNoSpace = fakeNews.keywords.filter(keyword =>
                    textNoSpace.includes(keyword)
                ).length;
                if (matchCountNoSpace > matchCount) matchCount = matchCountNoSpace;
            }

            // 2개 이상의 키워드가 매칭되면 해당 가짜뉴스로 판단
            if (matchCount >= 2) {
                return {
                    source: 'Common Fake News DB',
                    available: true,
                    match: fakeNews
                };
            }
        }

        return {
            source: 'Common Fake News DB',
            available: true,
            match: null
        };
    }

    // 결과 분석
    analyzeResults(results, originalText) {
        console.log(`[FactWise v${this.version}] 분석 시작: ${originalText}`);

        // 1. 산수 계산기 확인 (가장 우선순위 높음)
        const mathResult = this.evaluateMathExpression(originalText);
        if (mathResult) {
            console.log('산수 계산 결과 매칭됨');
            return mathResult;
        }

        // 2. 일반 상식 판단 (명백한 사실)
        const commonKnowledge = this.checkCommonKnowledge(originalText);
        if (commonKnowledge) {
            console.log('일반 상식 결과 매칭됨');
            return commonKnowledge;
        }

        // 3. 일반적인 가짜뉴스 데이터베이스 결과 확인
        const fakeNewsResult = results[2];
        if (fakeNewsResult.status === 'fulfilled' &&
            fakeNewsResult.value.available &&
            fakeNewsResult.value.match) {

            const match = fakeNewsResult.value.match;
            console.log('가짜뉴스 DB 매칭됨');
            return {
                verdict: match.verdict,
                confidence: 'high',
                title: match.title,
                description: match.description,
                sources: match.sources,
                searchQuery: originalText
            };
        }

        // 4. 뉴스 검색 결과 확인 (네이버 뉴스)
        const newsResult = results[1];
        if (newsResult.status === 'fulfilled' &&
            newsResult.value.available &&
            newsResult.value.articles.length > 0) {

            const articles = newsResult.value.articles;
            // 뉴스 검색 결과가 있으면 이를 바탕으로 결과 생성
            return {
                verdict: 'uncertain', // 뉴스가 있다고 무조건 사실은 아니므로 불확실로 표시하되 정보를 제공
                confidence: 'medium',
                title: `관련 뉴스 검색 결과가 ${articles.length}건 있습니다`,
                description: `"${originalText}"에 대해 작성된 최신 뉴스 기사들이 발견되었습니다. 기사 내용을 직접 확인해 보시는 것이 가장 정확합니다.`,
                sources: articles.map(art => ({ title: art.title, url: art.link })),
                searchQuery: originalText
            };
        }

        // 5. Google Fact Check 결과 확인 (API 호출 결과가 있을 경우)
        const googleResult = results[0];
        if (googleResult.status === 'fulfilled' &&
            googleResult.value.available) {

            const gRes = googleResult.value;
            console.log('Google Fact Check 결과 매칭됨');
            return {
                verdict: gRes.verdict,
                confidence: 'high',
                title: gRes.title,
                description: gRes.description,
                sources: [{ title: 'Google Fact Check 상세 보기', url: gRes.originUrl }],
                searchQuery: originalText
            };
        }

        // 매칭되는 가짜뉴스가 없으면 불확실로 표시
        return {
            verdict: 'uncertain',
            confidence: 'low',
            title: '확인 결과를 찾을 수 없습니다',
            description: `"${originalText}"에 대한 명확한 팩트체크 결과를 찾을 수 없습니다. 이 정보는 새로운 내용이거나 아직 검증되지 않았을 수 있습니다. 여러 신뢰할 수 있는 출처에서 교차 확인하시기 바랍니다.`,
            sources: [
                { title: '네이버 뉴스에서 직접 검색하기', url: `https://search.naver.com/search.naver?query=${encodeURIComponent(originalText)}` },
                { title: '구글에서 직접 검색하기', url: `https://www.google.com/search?q=${encodeURIComponent(originalText + ' 팩트체크')}` }
            ],
            searchQuery: originalText
        };
    }

    // 산수 계산기
    evaluateMathExpression(text) {
        // 더 정교한 정규식: 숫자 연산자 숫자의 패턴을 찾습니다.
        // 예: "1 + 1", "1+1=2", "1 더하기 1은 2" 등에서 수치 부분만 추출
        const mathPatterns = [
            /([0-9.]+)\s*([+*/-])\s*([0-9.]+)(?:\s*=\s*([0-9.]+))?/,
            /([0-9.]+)\s*([+*/-])\s*([0-9.]+)/
        ];

        let match = null;
        for (const pattern of mathPatterns) {
            match = text.match(pattern);
            if (match) break;
        }

        if (!match) return null;

        const num1 = parseFloat(match[1]);
        const operator = match[2];
        const num2 = parseFloat(match[3]);
        const expectedResult = match[4] ? parseFloat(match[4]) : null;

        try {
            let result;
            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num1 / num2; break;
                default: return null;
            }

            const isCorrect = expectedResult !== null ? Math.abs(result - expectedResult) < 0.0001 : true;
            const title = expectedResult !== null ? `계산 검증: ${num1} ${operator} ${num2} = ${expectedResult}` : `계산 결과: ${num1} ${operator} ${num2} = ${result}`;

            return {
                verdict: isCorrect ? 'true' : 'false',
                confidence: 'high',
                title: title,
                description: expectedResult !== null
                    ? (isCorrect ? `네, 맞습니다. ${num1} ${operator} ${num2}의 결과는 정확히 ${result}입니다.` : `아니요, 틀렸습니다. ${num1} ${operator} ${num2}의 결과는 ${result}이지 ${expectedResult}(이)가 아닙니다.`)
                    : `입력하신 수식의 계산 결과는 ${result}입니다.`,
                sources: [{ title: '수학적 계산 결과', url: '#' }],
                searchQuery: text
            };
        } catch (e) {
            return null;
        }
    }

    // 일반 상식 판단
    checkCommonKnowledge(text) {
        const textLower = text.toLowerCase();
        const textNoSpace = textLower.replace(/\s+/g, ''); // 공백 제거 버전

        // fact-data.js에 정의된 데이터 사용
        const obviousFacts = window.OBVIOUS_FACTS || [];
        const commonFakeNews = window.COMMON_FAKE_NEWS || [];

        // 두 배열을 모두 체크
        const allFacts = [...obviousFacts, ...commonFakeNews];

        // 키워드 매칭
        for (const fact of allFacts) {
            // requiredPatterns 체크: 필수 패턴이 포함되어야 함
            if (fact.requiredPatterns && fact.requiredPatterns.length > 0) {
                const hasRequiredPattern = fact.requiredPatterns.some(pattern => pattern.test(text));
                if (!hasRequiredPattern) continue; // 필수 패턴이 없으면 스킵
            }

            // excludePatterns 체크: 제외 패턴이 있으면 스킵해야 함
            if (fact.excludePatterns && fact.excludePatterns.length > 0) {
                const hasExcludedPattern = fact.excludePatterns.some(pattern => pattern.test(text));
                if (hasExcludedPattern) continue; // 제외 패턴이 있으면 스킵
            }

            // matchPatterns 체크: 매칭 패턴이 있어야 함
            if (fact.matchPatterns && fact.matchPatterns.length > 0) {
                const hasMatchPattern = fact.matchPatterns.some(pattern => pattern.test(text));
                if (!hasMatchPattern) continue; // 매칭 패턴이 없으면 스킵
            }

            // 1. 일반 매칭 (원문 기준)
            let matchedKeywords = fact.keywords.filter(keyword => textLower.includes(keyword));
            let matchCount = matchedKeywords.length;

            // 2. 공백 제거 매칭 (보조)
            if (matchCount < 2) {
                const matchedNoSpace = fact.keywords.filter(keyword => textNoSpace.includes(keyword));
                if (matchedNoSpace.length > matchCount) {
                    matchedKeywords = matchedNoSpace;
                    matchCount = matchedNoSpace.length;
                }
            }

            // 판정 로직:
            // 1. 키워드가 2개 이상 포함된 경우 (강력 매칭)
            // 2. 입력문의 길이가 짧고 핵심 키워드가 2글자 이상인 상태에서 매칭된 경우
            const matchedLongKeywords = matchedKeywords.filter(k => k.length >= 2);

            const isShortMatch = text.length < 15 && matchedLongKeywords.length >= 1;
            const isStrongMatch = matchCount >= 2;

            if (isStrongMatch || isShortMatch) {
                return {
                    verdict: fact.verdict,
                    confidence: 'high',
                    title: fact.title,
                    description: fact.description,
                    sources: fact.sources,
                    searchQuery: text
                };
            }
        }

        return null;
    }
}

// 전역으로 내보내기
window.FactChecker = FactChecker;
