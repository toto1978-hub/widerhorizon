// 팩트체크 데이터 (fact-data.js)
// 유지보수 및 효율성을 위해 데이터 분리
// v4.17 - 상식 데이터베이스 대규모 확장 (인물, 시사, 국제, 과학, 수학, 성경, 언어)

const COMMON_FAKE_NEWS = [
    // ==================== 시간/날짜 관련 ====================
    {
        keywords: ['하루', '시간'],
        requiredPatterns: [/24\s*시간/, /이십사\s*시간/],
        verdict: 'true',
        title: '하루는 24시간입니다',
        description: '지구의 자전 주기를 기준으로 하루는 약 24시간으로 구성됩니다.',
        sources: [{ title: '한국표준과학연구원', url: 'https://www.kriss.re.kr' }]
    },
    {
        keywords: ['하루', '시간'],
        excludePatterns: [/24\s*시간/, /이십사\s*시간/],
        matchPatterns: [/\d+\s*시간/],
        verdict: 'false',
        title: '하루가 24시간이 아니라는 주장은 거짓입니다',
        description: '지구의 자전 주기를 기준으로 하루는 정확히 약 24시간입니다.',
        sources: [{ title: '한국표준과학연구원', url: 'https://www.kriss.re.kr' }]
    },
    {
        keywords: ['1년', '365일', '일년'],
        verdict: 'true',
        title: '1년은 약 365일입니다',
        description: '지구가 태양을 한 바퀴 도는 데 약 365.25일이 걸립니다. 그래서 4년마다 윤년이 있습니다.',
        sources: [{ title: '한국천문연구원', url: 'https://www.kasi.re.kr' }]
    },
    {
        keywords: ['1주일', '7일', '일주일'],
        verdict: 'true',
        title: '1주일은 7일입니다',
        description: '1주일은 월, 화, 수, 목, 금, 토, 일의 7일로 구성됩니다.',
        sources: [{ title: '표준시간 정보', url: 'https://www.kriss.re.kr' }]
    },
    {
        keywords: ['1시간', '60분'],
        verdict: 'true',
        title: '1시간은 60분입니다',
        description: '1시간은 60분, 1분은 60초로 구성됩니다.',
        sources: [{ title: '시간 단위 표준', url: 'https://www.kriss.re.kr' }]
    },
    {
        keywords: ['1분', '60초'],
        verdict: 'true',
        title: '1분은 60초입니다',
        description: '시간의 기본 단위로 1분은 60초입니다.',
        sources: [{ title: '시간 단위 표준', url: 'https://www.kriss.re.kr' }]
    },

    // ==================== 지리/국가 관련 ====================
    {
        keywords: ['나이지리아', '아시아'],
        verdict: 'false',
        title: '나이지리아가 아시아 국가라는 주장',
        description: '나이지리아는 아프리카 서부에 위치한 국가입니다.',
        sources: [{ title: '외교부: 나이지리아 국가 정보', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['브라질', '유럽'],
        verdict: 'false',
        title: '브라질이 유럽 국가라는 주장',
        description: '브라질은 남아메리카(남미)에 위치한 국가입니다.',
        sources: [{ title: '외교부: 브라질 국가 정보', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['한국', '인구', '5천만', '5000만'],
        verdict: 'true',
        title: '대한민국 인구는 약 5천만 명입니다',
        description: '2026년 현재 대한민국 인구는 약 5,100만 명 수준입니다.',
        sources: [{ title: '통계청', url: 'https://kostat.go.kr' }]
    },
    {
        keywords: ['세계', '인구', '80억', '팔십억'],
        verdict: 'true',
        title: '세계 인구는 약 80억 명입니다',
        description: '2024년 기준 세계 인구는 약 80억 명을 넘었습니다.',
        sources: [{ title: 'UN 인구조사', url: 'https://www.un.org' }]
    },
    {
        keywords: ['중국', '인구', '14억', '세계1위'],
        verdict: 'uncertain',
        title: '중국은 세계 인구 1위 국가입니다',
        description: '2024년 기준 인도가 중국을 제치고 세계 1위 인구 국가가 되었습니다. 중국은 약 14억 명입니다.',
        sources: [{ title: 'UN 인구조사', url: 'https://www.un.org' }]
    },
    {
        keywords: ['일본', '수도', '도쿄', '동경'],
        verdict: 'true',
        title: '일본의 수도는 도쿄입니다',
        description: '일본의 수도는 도쿄(동경)입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['미국', '수도', '워싱턴'],
        verdict: 'true',
        title: '미국의 수도는 워싱턴 D.C.입니다',
        description: '미국의 수도는 워싱턴 D.C.입니다. 뉴욕이 아닙니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['미국', '수도', '뉴욕'],
        verdict: 'false',
        title: '미국의 수도가 뉴욕이라는 주장',
        description: '미국의 수도는 뉴욕이 아니라 워싱턴 D.C.입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['호주', '수도', '시드니'],
        verdict: 'false',
        title: '호주의 수도가 시드니라는 주장',
        description: '호주의 수도는 시드니가 아니라 캔버라입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['호주', '수도', '캔버라'],
        verdict: 'true',
        title: '호주의 수도는 캔버라입니다',
        description: '호주의 수도는 캔버라입니다. 시드니가 가장 큰 도시지만 수도는 아닙니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['세계', '가장', '큰', '나라', '러시아'],
        verdict: 'true',
        title: '세계에서 가장 큰 나라는 러시아입니다',
        description: '면적 기준 세계 최대 국가는 러시아(약 1,710만 km²)입니다.',
        sources: [{ title: 'CIA World Factbook', url: 'https://www.cia.gov' }]
    },
    {
        keywords: ['에베레스트', '세계', '가장', '높은', '산'],
        verdict: 'true',
        title: '세계에서 가장 높은 산은 에베레스트입니다',
        description: '에베레스트 산은 해발 8,849m로 세계에서 가장 높은 산입니다.',
        sources: [{ title: '내셔널지오그래픽', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['한라산', '제주도', '가장', '높은'],
        verdict: 'true',
        title: '한라산은 남한에서 가장 높은 산입니다',
        description: '한라산(해발 1,947m)은 제주도에 있으며 남한에서 가장 높은 산입니다.',
        sources: [{ title: '국립공원공단', url: 'https://www.knps.or.kr' }]
    },
    {
        keywords: ['백두산', '한반도', '가장', '높은'],
        verdict: 'true',
        title: '백두산은 한반도에서 가장 높은 산입니다',
        description: '백두산(해발 2,744m)은 한반도에서 가장 높은 산입니다.',
        sources: [{ title: '국토지리정보원', url: 'https://www.ngii.go.kr' }]
    },

    // ==================== 정치/시사 관련 ====================
    {
        keywords: ['대한민국', '대통령', '이재명'],
        verdict: 'true',
        title: '대한민국 대통령은 이재명입니다',
        description: '2026년 현재 대한민국의 대통령은 이재명입니다.',
        sources: [{ title: '대한민국 정부', url: 'https://www.korea.kr' }]
    },
    {
        keywords: ['윤석열', '대통령', '현재', '지금'],
        verdict: 'false',
        title: '윤석열이 현재 대통령이라는 주장',
        description: '2026년 현재 대통령은 이재명입니다.',
        sources: [{ title: '대한민국 정부', url: 'https://www.korea.kr' }]
    },
    {
        keywords: ['정부', '지원금', '무료', '신청', '링크', '클릭'],
        verdict: 'uncertain',
        title: '정부 지원금 무료 신청 안내 문자',
        description: '정부 지원금 관련 문자는 사기일 수 있습니다. 정부24 공식 사이트에서 확인하세요.',
        sources: [{ title: '정부24', url: 'https://www.gov.kr' }]
    },

    // ==================== 과학/물리 관련 ====================
    {
        keywords: ['빛', '속도', '초속', '30만km'],
        verdict: 'true',
        title: '빛의 속도는 초속 약 30만 km입니다',
        description: '진공에서 빛의 속도는 초속 약 299,792km(약 30만 km)입니다.',
        sources: [{ title: '한국표준과학연구원', url: 'https://www.kriss.re.kr' }]
    },
    {
        keywords: ['소리', '속도', '초속', '340m'],
        verdict: 'true',
        title: '소리의 속도는 초속 약 340m입니다',
        description: '공기 중(20°C 기준) 소리의 속도는 초속 약 343m입니다.',
        sources: [{ title: '물리학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['물', '끓는점', '100도', '100℃'],
        verdict: 'true',
        title: '물의 끓는점은 100°C입니다',
        description: '1기압에서 물의 끓는점은 섭씨 100도입니다.',
        sources: [{ title: '화학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['물', '어는점', '0도', '0℃', '얼음'],
        verdict: 'true',
        title: '물의 어는점은 0°C입니다',
        description: '1기압에서 물의 어는점은 섭씨 0도입니다.',
        sources: [{ title: '화학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['지구', '중력', '9.8', '가속도'],
        verdict: 'true',
        title: '지구의 중력 가속도는 약 9.8m/s²입니다',
        description: '지표면에서 중력 가속도는 약 9.8m/s²입니다.',
        sources: [{ title: '물리학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['달', '지구', '거리', '38만km'],
        verdict: 'true',
        title: '지구와 달의 거리는 약 38만 km입니다',
        description: '지구와 달 사이의 평균 거리는 약 384,400km입니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['태양', '지구', '거리', '1억5천만km', '1.5억km'],
        verdict: 'true',
        title: '태양과 지구의 거리는 약 1억 5천만 km입니다',
        description: '태양과 지구 사이의 평균 거리(1AU)는 약 1억 4960만 km입니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['원주율', '파이', '3.14'],
        verdict: 'true',
        title: '원주율(π)은 약 3.14입니다',
        description: '원주율 π는 약 3.14159...로 시작하는 무한소수입니다.',
        sources: [{ title: '수학 기초', url: 'https://www.science.org' }]
    },

    // ==================== 인체/의학 관련 ====================
    {
        keywords: ['성인', '체온', '36.5도', '정상'],
        verdict: 'true',
        title: '정상 체온은 약 36.5°C입니다',
        description: '건강한 성인의 정상 체온은 약 36.1~37.2°C입니다.',
        sources: [{ title: '대한의사협회', url: 'https://www.kma.org' }]
    },
    {
        keywords: ['사람', '뼈', '206개'],
        verdict: 'true',
        title: '성인의 뼈는 206개입니다',
        description: '성인 인체에는 206개의 뼈가 있습니다. 어린이는 더 많습니다.',
        sources: [{ title: '의학 기초', url: 'https://www.kma.org' }]
    },
    {
        keywords: ['심장', '왼쪽', '위치'],
        verdict: 'uncertain',
        title: '심장은 정확히 왼쪽에만 있지 않습니다',
        description: '심장은 가슴 중앙에서 약간 왼쪽에 위치합니다. 완전히 왼쪽은 아닙니다.',
        sources: [{ title: '해부학 기초', url: 'https://www.kma.org' }]
    },
    {
        keywords: ['혈액형', '종류', 'A', 'B', 'O', 'AB'],
        verdict: 'true',
        title: 'ABO 혈액형은 A, B, O, AB 4가지입니다',
        description: 'ABO 혈액형 체계에서는 A, B, AB, O 4가지 혈액형이 있습니다.',
        sources: [{ title: '대한적십자사', url: 'https://www.bloodinfo.net' }]
    },
    {
        keywords: ['사람', '물', '체중', '70%', '60%'],
        verdict: 'true',
        title: '인체의 약 60~70%는 물입니다',
        description: '성인 인체의 약 60~70%가 수분으로 구성되어 있습니다.',
        sources: [{ title: '의학 기초', url: 'https://www.kma.org' }]
    },
    {
        keywords: ['수면', '하루', '8시간', '권장'],
        verdict: 'uncertain',
        title: '하루 8시간 수면은 일반적 권장사항입니다',
        description: '적정 수면 시간은 개인마다 다르지만, 성인은 보통 7-9시간이 권장됩니다.',
        sources: [{ title: '미국수면재단', url: 'https://www.sleepfoundation.org' }]
    },

    // ==================== 건강/의료 관련 가짜뉴스 ====================
    {
        keywords: ['바나나', '코로나', '낫는다', '치료'],
        verdict: 'false',
        title: '바나나로 코로나가 낫는다는 주장',
        description: '바나나에는 코로나 치료 효과가 없습니다.',
        sources: [{ title: '팩트체크', url: 'https://www.factcheck.org' }]
    },
    {
        keywords: ['마늘', '코로나', '예방', '치료'],
        verdict: 'false',
        title: '마늘이 코로나를 예방한다는 주장',
        description: '마늘은 코로나 예방 효과가 없습니다.',
        sources: [{ title: 'WHO', url: 'https://www.who.int' }]
    },
    {
        keywords: ['뜨거운 물', '코로나', '죽인다', '예방'],
        verdict: 'false',
        title: '뜨거운 물을 마시면 코로나가 예방된다는 주장',
        description: '뜨거운 물로는 코로나를 예방할 수 없습니다.',
        sources: [{ title: '질병관리청', url: 'https://www.kdca.go.kr' }]
    },
    {
        keywords: ['표백제', '소독제', '마시면', '코로나'],
        verdict: 'false',
        title: '표백제나 소독제를 마시면 코로나가 낫는다는 주장',
        description: '절대 표백제나 소독제를 마시면 안 됩니다! 매우 위험합니다.',
        sources: [{ title: 'CDC', url: 'https://www.cdc.gov' }]
    },
    {
        keywords: ['백신', '자폐증', '유발', '원인'],
        verdict: 'false',
        title: '백신이 자폐증을 유발한다는 주장',
        description: '백신과 자폐증은 관련이 없습니다. 과학적으로 완전히 반박되었습니다.',
        sources: [{ title: 'CDC', url: 'https://www.cdc.gov' }]
    },
    {
        keywords: ['mRNA', '백신', '유전자', '변형', '조작'],
        verdict: 'false',
        title: 'mRNA 백신이 유전자를 변형시킨다는 주장',
        description: 'mRNA 백신은 DNA에 영향을 주지 않습니다.',
        sources: [{ title: '질병관리청', url: 'https://www.kdca.go.kr' }]
    },

    // ==================== 과학 기술 관련 가짜뉴스 ====================
    {
        keywords: ['5g', '코로나', '확산', '전파', '원인'],
        verdict: 'false',
        title: '5G가 코로나를 전파한다는 주장',
        description: '5G 네트워크와 코로나는 전혀 관련이 없습니다.',
        sources: [{ title: 'BBC', url: 'https://www.bbc.com' }]
    },
    {
        keywords: ['전자레인지', '음식', '영양소', '파괴'],
        verdict: 'false',
        title: '전자레인지가 영양소를 파괴한다는 주장',
        description: '전자레인지는 다른 조리 방법과 비슷하거나 더 잘 영양소를 보존합니다.',
        sources: [{ title: '식품안전처', url: 'https://www.mfds.go.kr' }]
    },
    {
        keywords: ['지구', '평평', '평면', '둥글지'],
        verdict: 'false',
        title: '지구가 평평하다는 주장',
        description: '지구는 둥급니다. 수많은 과학적 증거가 있습니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['지구온난화', '거짓', '조작', '음모'],
        verdict: 'false',
        title: '지구온난화가 거짓이라는 주장',
        description: '지구온난화는 과학적으로 입증된 사실입니다.',
        sources: [{ title: 'IPCC', url: 'https://www.ipcc.ch' }]
    },

    // ==================== 식품/영양 관련 ====================
    {
        keywords: ['MSG', '화학조미료', '유해', '독성'],
        verdict: 'false',
        title: 'MSG가 건강에 해롭다는 주장',
        description: 'MSG는 적정량 섭취 시 안전합니다. FDA와 WHO가 인정했습니다.',
        sources: [{ title: '식품안전처', url: 'https://www.mfds.go.kr' }]
    },
    {
        keywords: ['탄산음료', '뼈', '녹인다', '칼슘'],
        verdict: 'false',
        title: '탄산음료가 뼈를 녹인다는 주장',
        description: '탄산음료가 직접 뼈를 녹이지는 않습니다.',
        sources: [{ title: '영양학 팩트체크', url: 'https://www.nutrition.or.kr' }]
    },

    // ==================== 역사 관련 ====================
    {
        keywords: ['광복절', '8월', '15일', '해방'],
        verdict: 'true',
        title: '광복절은 8월 15일입니다',
        description: '1945년 8월 15일 일본으로부터 해방되었습니다.',
        sources: [{ title: '국가보훈부', url: 'https://www.mpva.go.kr' }]
    },
    {
        keywords: ['6.25', '한국전쟁', '1950년', '전쟁'],
        verdict: 'true',
        title: '한국전쟁은 1950년 6월 25일에 발발했습니다',
        description: '6.25 한국전쟁은 1950년 6월 25일 북한의 남침으로 시작되었습니다.',
        sources: [{ title: '국가보훈부', url: 'https://www.mpva.go.kr' }]
    },
    {
        keywords: ['세종대왕', '한글', '창제', '발명'],
        verdict: 'true',
        title: '세종대왕이 한글을 창제했습니다',
        description: '1443년 세종대왕이 훈민정음(한글)을 창제했습니다.',
        sources: [{ title: '국립한글박물관', url: 'https://www.hangeul.go.kr' }]
    },
    {
        keywords: ['한글날', '10월', '9일'],
        verdict: 'true',
        title: '한글날은 10월 9일입니다',
        description: '한글의 우수성을 기리는 한글날은 10월 9일입니다.',
        sources: [{ title: '국립한글박물관', url: 'https://www.hangeul.go.kr' }]
    },
    {
        keywords: ['임진왜란', '1592년', '이순신'],
        verdict: 'true',
        title: '임진왜란은 1592년에 발발했습니다',
        description: '1592년 일본의 침략으로 임진왜란이 시작되었습니다. 이순신 장군이 활약했습니다.',
        sources: [{ title: '국사편찬위원회', url: 'https://www.history.go.kr' }]
    },

    // ==================== 동물/자연 관련 ====================
    {
        keywords: ['금붕어', '기억력', '3초', '짧다'],
        verdict: 'false',
        title: '금붕어의 기억력은 3초라는 주장',
        description: '금붕어는 최소 3개월 이상 기억할 수 있습니다.',
        sources: [{ title: '동물학 연구', url: 'https://www.science.org' }]
    },
    {
        keywords: ['새', '깃털', '공룡', '진화'],
        verdict: 'true',
        title: '새는 공룡에서 진화했습니다',
        description: '현대 조류는 수각류 공룡에서 진화한 것으로 과학적으로 확인되었습니다.',
        sources: [{ title: 'Nature', url: 'https://www.nature.com' }]
    },
    {
        keywords: ['고래', '포유류', '물고기'],
        verdict: 'true',
        title: '고래는 포유류입니다',
        description: '고래는 물고기가 아닌 포유류입니다. 새끼에게 젖을 먹입니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['박쥐', '포유류', '새'],
        verdict: 'true',
        title: '박쥐는 포유류입니다',
        description: '박쥐는 새가 아닌 날 수 있는 유일한 포유류입니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['펭귄', '새', '날다'],
        verdict: 'true',
        title: '펭귄은 새입니다',
        description: '펭귄은 날지 못하지만 새입니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['코끼리', '가장', '큰', '육상', '동물'],
        verdict: 'true',
        title: '코끼리는 가장 큰 육상 동물입니다',
        description: '아프리카 코끼리는 현존하는 가장 큰 육상 동물입니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['대왕고래', '가장', '큰', '동물'],
        verdict: 'true',
        title: '대왕고래는 지구 역사상 가장 큰 동물입니다',
        description: '흰긴수염고래(대왕고래)는 지구 역사상 가장 큰 동물로, 최대 30m까지 자랍니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },
    {
        keywords: ['치타', '가장', '빠른', '동물'],
        verdict: 'true',
        title: '치타는 가장 빠른 육상 동물입니다',
        description: '치타는 시속 최대 120km로 달릴 수 있는 가장 빠른 육상 동물입니다.',
        sources: [{ title: 'National Geographic', url: 'https://www.nationalgeographic.com' }]
    },

    // ==================== 스포츠 관련 ====================
    {
        keywords: ['축구', '11명', '선수', '명'],
        verdict: 'true',
        title: '축구는 한 팀 11명으로 경기합니다',
        description: '축구는 각 팀 11명의 선수가 경기합니다.',
        sources: [{ title: 'FIFA', url: 'https://www.fifa.com' }]
    },
    {
        keywords: ['농구', '5명', '선수'],
        verdict: 'true',
        title: '농구는 한 팀 5명으로 경기합니다',
        description: '농구는 각 팀 5명의 선수가 경기합니다.',
        sources: [{ title: 'FIBA', url: 'https://www.fiba.basketball' }]
    },
    {
        keywords: ['야구', '9명', '선수'],
        verdict: 'true',
        title: '야구는 한 팀 9명으로 경기합니다',
        description: '야구는 각 팀 9명의 선수가 경기합니다.',
        sources: [{ title: 'KBO', url: 'https://www.koreabaseball.com' }]
    },
    {
        keywords: ['배구', '6명', '선수'],
        verdict: 'true',
        title: '배구는 한 팀 6명으로 경기합니다',
        description: '실내 배구는 각 팀 6명의 선수가 경기합니다.',
        sources: [{ title: 'FIVB', url: 'https://www.fivb.com' }]
    },
    {
        keywords: ['올림픽', '4년', '마다', '개최'],
        verdict: 'true',
        title: '올림픽은 4년마다 개최됩니다',
        description: '하계 및 동계 올림픽은 각각 4년마다 개최됩니다.',
        sources: [{ title: 'IOC', url: 'https://www.olympic.org' }]
    },
    {
        keywords: ['월드컵', '4년', '마다', '개최'],
        verdict: 'true',
        title: '월드컵은 4년마다 개최됩니다',
        description: 'FIFA 월드컵은 4년마다 개최됩니다.',
        sources: [{ title: 'FIFA', url: 'https://www.fifa.com' }]
    },

    // ==================== 사기/스캠 관련 ====================
    {
        keywords: ['택배', '배송', '확인', '링크', '클릭'],
        verdict: 'uncertain',
        title: '택배 링크 문자는 스미싱일 수 있습니다',
        description: '출처 불분명한 택배 문자는 조심하세요. 공식 앱에서 확인하세요.',
        sources: [{ title: '경찰청', url: 'https://www.police.go.kr' }]
    },
    {
        keywords: ['카드', '정지', '긴급', '연락', '전화'],
        verdict: 'uncertain',
        title: '카드 정지 연락은 보이스피싱일 수 있습니다',
        description: '카드사 사칭 전화는 보이스피싱입니다. 카드 뒷면 번호로 확인하세요.',
        sources: [{ title: '금융감독원', url: 'https://www.fss.or.kr' }]
    },
    {
        keywords: ['주식', '무조건', '수익', '보장', '투자'],
        verdict: 'false',
        title: '무조건 수익 보장 투자는 사기입니다',
        description: '수익을 보장하는 투자는 없습니다. 대부분 사기입니다.',
        sources: [{ title: '금융감독원', url: 'https://www.fss.or.kr' }]
    },
    {
        keywords: ['가상화폐', '코인', '100배', '수익', '보장'],
        verdict: 'false',
        title: '100배 수익 보장 코인 투자는 사기입니다',
        description: '고수익 보장 가상화폐 투자는 사기일 가능성이 매우 높습니다.',
        sources: [{ title: '금융감독원', url: 'https://www.fss.or.kr' }]
    },

    // ==================== 생활 상식 ====================
    {
        keywords: ['선풍기', '밀폐', '공간', '사망', '질식'],
        verdict: 'false',
        title: '밀폐된 공간에서 선풍기로 사망한다는 주장',
        description: '선풍기로 인한 질식사는 과학적 근거가 없습니다.',
        sources: [{ title: '의학 팩트체크', url: 'https://www.factcheck.org' }]
    },
    {
        keywords: ['뇌', '10퍼센트', '10%', '사용'],
        verdict: 'false',
        title: '인간은 뇌의 10%만 사용한다는 주장',
        description: '인간은 뇌의 거의 모든 부분을 사용합니다. 10% 신화는 거짓입니다.',
        sources: [{ title: '신경과학회', url: 'https://www.neurology.or.kr' }]
    },
    {
        keywords: ['치약', '여드름', '바르면', '없어진다'],
        verdict: 'false',
        title: '치약을 바르면 여드름이 없어진다는 주장',
        description: '치약은 피부를 자극할 수 있습니다. 피부과 상담을 권장합니다.',
        sources: [{ title: '피부과학회', url: 'https://www.derma.or.kr' }]
    },
    {
        keywords: ['머리', '자주', '감으면', '빠진다'],
        verdict: 'false',
        title: '머리를 자주 감으면 빠진다는 주장',
        description: '머리 감기와 탈모는 직접적 관련이 없습니다.',
        sources: [{ title: '피부과학회', url: 'https://www.derma.or.kr' }]
    }
];

const OBVIOUS_FACTS = [
    // ==================== 기본 상식 ====================
    {
        keywords: ['사람', '죽는다', '사망', '생명'],
        verdict: 'true',
        title: '모든 사람은 죽습니다',
        description: '모든 생명체는 언젠가 죽습니다. 생물학적 사실입니다.',
        sources: [{ title: '생물학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['태양', '동쪽', '뜬다', '떠오른다', '해'],
        verdict: 'true',
        title: '태양은 동쪽에서 뜹니다',
        description: '지구의 자전으로 태양은 동쪽에서 떠서 서쪽으로 집니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['해', '동쪽', '서쪽', '해뜨는'],
        verdict: 'true',
        title: '해는 동쪽에서 떠서 서쪽으로 집니다',
        description: '지구의 자전으로 인해 해는 동쪽에서 떠서 서쪽으로 집니다.',
        sources: [{ title: '한국천문연구원', url: 'https://www.kasi.re.kr' }]
    },
    {
        keywords: ['지구', '둥글다', '구형', '동그랗다'],
        verdict: 'true',
        title: '지구는 둥급니다',
        description: '지구는 구형입니다. 과학적으로 입증된 사실입니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['서울', '수도', '대한민국', '한국'],
        verdict: 'true',
        title: '대한민국의 수도는 서울입니다',
        description: '서울은 대한민국의 수도이자 가장 큰 도시입니다.',
        sources: [{ title: '대한민국 정부', url: 'https://www.korea.kr' }]
    },
    {
        keywords: ['하늘', '파랗다', '푸르다', '색'],
        verdict: 'true',
        title: '맑은 날 하늘은 파랗게 보입니다',
        description: '태양 빛이 대기에서 산란되어 하늘이 파랗게 보입니다.',
        sources: [{ title: '기상청', url: 'https://www.kma.go.kr' }]
    },
    {
        keywords: ['풀', '초록색', '식물', '엽록소'],
        verdict: 'true',
        title: '식물의 잎은 초록색입니다',
        description: '식물은 광합성을 위한 엽록소 때문에 초록색으로 보입니다.',
        sources: [{ title: '생물학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['독도', '우리땅', '대한민국', '한국'],
        verdict: 'true',
        title: '독도는 대한민국의 영토입니다',
        description: '독도는 역사적, 지리적, 국제법적으로 대한민국의 영토입니다.',
        sources: [{ title: '외교부: 독도', url: 'https://dokdo.mofa.go.kr' }]
    },
    {
        keywords: ['중력', '존재', '떨어진다', '낙하'],
        verdict: 'true',
        title: '중력이 존재합니다',
        description: '중력은 실제로 존재하는 자연의 힘입니다.',
        sources: [{ title: '물리학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['북한', '공산주의', '독재', '김정은'],
        verdict: 'true',
        title: '북한은 독재 국가입니다',
        description: '북한은 국제사회에서 독재 국가로 분류됩니다.',
        sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }]
    },

    // ==================== 추가 기본 상식 ====================
    {
        keywords: ['불', '뜨겁다', '화상', '데인다'],
        verdict: 'true',
        title: '불은 뜨겁습니다',
        description: '불은 고온이며 접촉 시 화상을 입을 수 있습니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['얼음', '차갑다', '냉동'],
        verdict: 'true',
        title: '얼음은 차갑습니다',
        description: '얼음(고체 물)은 0°C 이하의 차가운 물질입니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['물', '젖는다', '젖음'],
        verdict: 'true',
        title: '물에 닿으면 젖습니다',
        description: '물은 액체이므로 물체에 닿으면 젖게 됩니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['낮', '밝다', '해'],
        verdict: 'true',
        title: '낮은 밝습니다',
        description: '태양이 떠 있는 낮에는 밝습니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['밤', '어둡다', '달'],
        verdict: 'true',
        title: '밤은 어둡습니다',
        description: '태양이 지면 밤이 되어 어두워집니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['비', '내리면', '젖는다'],
        verdict: 'true',
        title: '비가 내리면 젖습니다',
        description: '비를 맞으면 옷과 몸이 젖습니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['겨울', '춥다', '추운'],
        verdict: 'true',
        title: '겨울은 춥습니다',
        description: '한국에서 겨울(12월~2월)은 추운 계절입니다.',
        sources: [{ title: '기상청', url: 'https://www.kma.go.kr' }]
    },
    {
        keywords: ['여름', '덥다', '더운'],
        verdict: 'true',
        title: '여름은 덥습니다',
        description: '한국에서 여름(6월~8월)은 더운 계절입니다.',
        sources: [{ title: '기상청', url: 'https://www.kma.go.kr' }]
    },
    {
        keywords: ['눈', '희다', '하얗다', '흰색'],
        verdict: 'true',
        title: '눈은 흰색입니다',
        description: '눈(snow)은 빛을 반사하여 흰색으로 보입니다.',
        sources: [{ title: '기상청', url: 'https://www.kma.go.kr' }]
    },
    {
        keywords: ['피', '빨갛다', '빨간색', '적혈구'],
        verdict: 'true',
        title: '피는 빨간색입니다',
        description: '혈액은 헤모글로빈 때문에 붉은색입니다.',
        sources: [{ title: '의학 기초', url: 'https://www.kma.org' }]
    },
    {
        keywords: ['바나나', '노랗다', '노란색'],
        verdict: 'true',
        title: '익은 바나나는 노란색입니다',
        description: '익은 바나나는 노란색입니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['사과', '빨갛다', '빨간색'],
        verdict: 'uncertain',
        title: '사과는 다양한 색이 있습니다',
        description: '사과는 빨간색, 초록색, 노란색 등 다양한 색이 있습니다.',
        sources: [{ title: '상식', url: 'https://www.science.org' }]
    },
    {
        keywords: ['달', '밤', '뜬다', '보인다'],
        verdict: 'true',
        title: '달은 밤에 볼 수 있습니다',
        description: '달은 주로 밤에 잘 보이지만 낮에도 보일 수 있습니다.',
        sources: [{ title: '한국천문연구원', url: 'https://www.kasi.re.kr' }]
    },
    {
        keywords: ['별', '밤', '반짝인다', '빛난다'],
        verdict: 'true',
        title: '별은 밤하늘에서 빛납니다',
        description: '별은 밤에 맑은 날씨에 잘 보입니다.',
        sources: [{ title: '한국천문연구원', url: 'https://www.kasi.re.kr' }]
    },
    {
        keywords: ['지구', '태양', '돈다', '공전'],
        verdict: 'true',
        title: '지구는 태양 주위를 돕니다',
        description: '지구는 태양 주위를 1년에 한 바퀴 공전합니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },
    {
        keywords: ['달', '지구', '돈다', '공전', '위성'],
        verdict: 'true',
        title: '달은 지구 주위를 돕니다',
        description: '달은 지구의 위성으로 지구 주위를 약 27일마다 공전합니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },

    // ==================== 인물 상식 ====================
    {
        keywords: ['아인슈타인', '상대성', '이론'],
        verdict: 'true',
        title: '알베르트 아인슈타인은 상대성 이론을 발표했습니다',
        description: '아인슈타인은 현대 물리학의 두 기둥 중 하나인 상대성 이론을 구축한 천재 물리학자입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EC%95%8C%EB%B2%A0%EB%A5%B4%ED%8A%B8_%EC%95%84%EC%9D%B8%EC%8A%88%ED%83%80%EC%9D%B8' }]
    },
    {
        keywords: ['뉴턴', '만유인력', '중력'],
        verdict: 'true',
        title: '아이작 뉴턴은 만유인력의 법칙을 발견했습니다',
        description: '뉴턴은 사과가 떨어지는 것을 보고 만유인력의 법칙을 발견한 영국의 물리학자입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EC%95%84%EC%9D%B4%EC%9E%91_%EB%89%B4%ED%84%B4' }]
    },
    {
        keywords: ['에디슨', '전구', '발명'],
        verdict: 'true',
        title: '토마스 에디슨은 전구를 발명했습니다',
        description: '에디슨은 전구뿐만 아니라 영사기, 축음기 등 수많은 발명품을 남긴 미국의 발명가입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%ED%86%A0%EB%A7%88%EC%8A%A4_%EC%97%90%EB%94%94%EC%8A%A8' }]
    },
    {
        keywords: ['링컨', '노예', '해방'],
        verdict: 'true',
        title: '에이브러햄 링컨은 노예 해방을 선언했습니다',
        description: '미국의 제16대 대통령인 링컨은 남북전쟁 중에 노예 해방 선언을 했습니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EC%97%90%EC%9D%B4%EB%B8%8C%EB%9F%AC%ED%96%84_%EB%A7%81%EC%BB%A8' }]
    },
    {
        keywords: ['빌게이츠', '마이크로소프트', 'MS'],
        verdict: 'true',
        title: '빌 게이츠는 마이크로소프트의 창업자입니다',
        description: '빌 게이츠는 퍼스널 컴퓨터 혁명을 주도하고 기부 활동에 전념하는 미국의 기업가입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EB%B9%8C_%EA%B2%8C%EC%9D%B4%EC%B8%A0' }]
    },
    {
        keywords: ['스티브잡스', '애플', '아이폰'],
        verdict: 'true',
        title: '스티브 잡스는 애플의 공동 창업자입니다',
        description: '스티브 잡스는 매킨토시, 아이팟, 아이폰 등을 통해 세상의 혁신을 이끈 인물입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%8B%B0%EB%B8%8C_%EC%9E%A1%EC%8A%A4' }]
    },

    // ==================== 경제/시사 상식 ====================
    {
        keywords: ['GDP', '국내총생산'],
        verdict: 'true',
        title: 'GDP는 국내총생산을 의미합니다',
        description: '한 나라 안에서 일정 기간 생산된 모든 최종 재화와 서비스의 시장 가치의 합을 말합니다.',
        sources: [{ title: '한국은행', url: 'https://www.bok.or.kr' }]
    },
    {
        keywords: ['인플레이션', '물가', '상승'],
        verdict: 'true',
        title: '인플레이션은 물가가 지속적으로 오르는 현상입니다',
        description: '화폐 가치가 하락하여 일반 물가 수준이 상승하는 현상을 인플레이션이라 합니다.',
        sources: [{ title: '한국은행', url: 'https://www.bok.or.kr' }]
    },
    {
        keywords: ['금리', '이자율'],
        verdict: 'true',
        title: '금리는 돈을 빌릴 때 지불하는 가격입니다',
        description: '시장 상황이나 중앙은행의 결정에 따라 변동하는 돈의 이자율을 의미합니다.',
        sources: [{ title: '한국은행', url: 'https://www.bok.or.kr' }]
    },
    {
        keywords: ['ESG', '환경', '사회', '지배구조'],
        verdict: 'true',
        title: 'ESG는 기업의 비재무적 성과 지표입니다',
        description: 'Environment(환경), Social(사회), Governance(지배구조)의 약자로 기업의 지속가능성을 평가합니다.',
        sources: [{ title: '매경용어사전', url: 'https://dic.mk.co.kr' }]
    },

    // ==================== 국제 기구 상식 ====================
    {
        keywords: ['유엔', 'UN', '국제연합'],
        verdict: 'true',
        title: 'UN은 세계 평화를 위한 최대 국제기구입니다',
        description: '전 세계의 전쟁 방지와 평화 유지를 목적으로 1945년에 설립되었습니다.',
        sources: [{ title: '유엔 공식 사이트', url: 'https://www.un.org' }]
    },
    {
        keywords: ['WHO', '세계보건기구'],
        verdict: 'true',
        title: 'WHO는 인류의 보건 증진을 위한 UN 산하기구입니다',
        description: '세계 보건 문제에 대한 지휘 조정 역할을 담당하는 권위 있는 국제기구입니다.',
        sources: [{ title: 'WHO 공식 사이트', url: 'https://www.who.int' }]
    },
    {
        keywords: ['NATO', '나토', '북대서양조약기구'],
        verdict: 'true',
        title: 'NATO는 북미와 유럽 국가들의 군사 동맹체입니다',
        description: '집단 방위를 목적으로 하는 서방 국가들의 강력한 국제 군사 기구입니다.',
        sources: [{ title: 'NATO 공식 사이트', url: 'https://www.nato.int' }]
    },

    // ==================== 과학(화학/생물) 상식 ====================
    {
        keywords: ['원소', '주기율표', '수소'],
        verdict: 'true',
        title: '주기율표의 첫 번째 원소는 수소(H)입니다',
        description: '수소는 우주에서 가장 풍부한 원소이며 원자 번호 1번입니다.',
        sources: [{ title: '위키백과', url: 'https://ko.wikipedia.org/wiki/%EC%88%98%EC%86%8C' }]
    },
    {
        keywords: ['DNA', '이중나선', '구조'],
        verdict: 'true',
        title: 'DNA는 이중나선 구조로 되어 있습니다',
        description: '생명체의 유전 정보를 담고 있는 DNA는 두 가닥이 꼬인 사다리 모양을 하고 있습니다.',
        sources: [{ title: '네이버 지식백과', url: 'https://terms.naver.com' }]
    },
    {
        keywords: ['행성', '수금지화목토천해', '태양계'],
        verdict: 'true',
        title: '태양계 행성은 수, 금, 지, 화, 목, 토, 천, 해 순입니다',
        description: '태양에 가까운 순서대로 수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성입니다.',
        sources: [{ title: 'NASA', url: 'https://www.nasa.gov' }]
    },

    // ==================== 수학 상식 ====================
    {
        keywords: ['피타고라스', '정리', '직각삼각형'],
        verdict: 'true',
        title: '피타고라스 정리는 a² + b² = c² 입니다',
        description: '직각삼각형에서 빗변의 제곱은 다른 두 변의 제곱의 합과 같다는 법칙입니다.',
        sources: [{ title: '수학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['원의넓이', '파이', '반지름'],
        verdict: 'true',
        title: '원의 넓이 공식은 πr² 입니다',
        description: '반지름(r)의 제곱에 원주율(π)을 곱하면 원의 넓이를 구할 수 있습니다.',
        sources: [{ title: '수학 기초', url: 'https://www.science.org' }]
    },
    {
        keywords: ['소수', '약수', '1과자기자신'],
        verdict: 'true',
        title: '소수는 1과 자기 자신만으로 나누어지는 수입니다',
        description: '예를 들어 2, 3, 5, 7, 11 등이 대표적인 소수(Prime Number)입니다.',
        sources: [{ title: '수학 기초', url: 'https://www.science.org' }]
    },

    // ==================== 성경 상식 ====================
    {
        keywords: ['성경', '몇권', '66권'],
        verdict: 'true',
        title: '성경은 총 66권으로 구성되어 있습니다',
        description: '구약 39권과 신약 27권을 합쳐 총 66권입니다.',
        sources: [{ title: '성경 가이드', url: '#' }]
    },
    {
        keywords: ['구약', '성경', '39권'],
        verdict: 'true',
        title: '성경의 구약은 39권입니다',
        description: '창세기부터 말라기까지 총 39권의 책이 구약 성경에 속합니다.',
        sources: [{ title: '성경 가이드', url: '#' }]
    },
    {
        keywords: ['신약', '성경', '27권'],
        verdict: 'true',
        title: '성경의 신약은 27권입니다',
        description: '마태복음부터 요한계시록까지 총 27권의 책이 신약 성경에 속합니다.',
        sources: [{ title: '성경 가이드', url: '#' }]
    },
    {
        keywords: ['십계명', '계명', '열가지'],
        verdict: 'true',
        title: '십계명은 하나님이 주신 10가지 계명입니다',
        description: '출애굽기에 기록된, 인간이 지켜야 할 가장 중요한 10가지 도덕법입니다.',
        sources: [{ title: '성경 가이드', url: '#' }]
    },
    {
        keywords: ['4복음서', '마태', '마가', '누가', '요한'],
        verdict: 'true',
        title: '4복음서는 마태, 마가, 누가, 요한복음입니다',
        description: '예수 그리스도의 생애와 가르침을 기록한 신약 성경의 첫 4권입니다.',
        sources: [{ title: '성경 가이드', url: '#' }]
    },

    // ==================== 언어 상식 ====================
    {
        keywords: ['한글', '자음', '14개'],
        verdict: 'true',
        title: '한글의 기본 자음은 14개입니다',
        description: 'ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ의 14개입니다.',
        sources: [{ title: '국립국어원', url: 'https://www.korean.go.kr' }]
    },
    {
        keywords: ['한글', '모음', '10개'],
        verdict: 'true',
        title: '한글의 기본 모음은 10개입니다',
        description: 'ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ의 10개입니다.',
        sources: [{ title: '국립국어원', url: 'https://www.korean.go.kr' }]
    },
    {
        keywords: ['알파벳', '영어', '26개'],
        verdict: 'true',
        title: '영어 알파벳은 총 26개입니다',
        description: 'A부터 Z까지 대문자와 소문자 각각 26자로 구성되어 있습니다.',
        sources: [{ title: '옥스퍼드 사전', url: '#' }]
    },
    {
        keywords: ['세계언어', '사용자', '가장많은'],
        verdict: 'true',
        title: '영어는 세계에서 가장 널리 사용되는 언어입니다',
        description: '전체 사용자(모국어+공용어) 기준 영어가 1위, 중국어가 2위 수준입니다.',
        sources: [{ title: '에스놀로그', url: 'https://www.ethnologue.com' }]
    }
];

// 전역으로 노출
window.COMMON_FAKE_NEWS = COMMON_FAKE_NEWS;
window.OBVIOUS_FACTS = OBVIOUS_FACTS;
