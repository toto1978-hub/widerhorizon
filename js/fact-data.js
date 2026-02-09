// 팩트체크 데이터 (fact-data.js)
// 유지보수 및 효율성을 위해 데이터 분리
// v4.21 - 북한 지리 정보 및 국내 교육 시스템(초중고대) 정보 대규모 보강

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
    },

    // ==================== 국가 상식 (수도 및 대륙) ====================
    // 아시아
    {
        keywords: ['베트남', '수도', '하노이'],
        verdict: 'true',
        title: '베트남의 수도는 하노이입니다',
        description: '베트남은 동남아시아에 위치한 국가이며 수도는 하노이입니다. 호찌민시는 최대 경제 도시입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['태국', '수도', '방콕'],
        verdict: 'true',
        title: '태국의 수도는 방콕입니다',
        description: '태국은 동남아시아의 국가로 수도는 방콕입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['인도네시아', '수도', '자카르타', '누산타라'],
        verdict: 'true',
        title: '인도네시아의 수도는 자카르타이며 누산타라로 이전 중입니다',
        description: '인도네시아의 현재 수도는 자카르타이지만, 환경 문제 등으로 인해 보르네오섬의 누산타라로 수도 이전을 추진 중입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['인도', '수도', '뉴델리'],
        verdict: 'true',
        title: '인도의 수도는 뉴델리입니다',
        description: '인도는 남아시아에 위치한 국가로 수도는 뉴델리입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['몽골', '수도', '울란바토르'],
        verdict: 'true',
        title: '몽골의 수도는 울란바토르입니다',
        description: '몽골은 동아시아/중앙아시아에 위치한 내륙국으로 수도는 울란바토르입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['필리핀', '수도', '마닐라'],
        verdict: 'true',
        title: '필리핀의 수도는 마닐라입니다',
        description: '필리핀은 동남아시아의 섬나라로 수도는 마닐라입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },

    // 유럽
    {
        keywords: ['영국', '수도', '런던'],
        verdict: 'true',
        title: '영국의 수도는 런던입니다',
        description: '영국은 유럽 서북부의 섬나라로 수도는 런던입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['프랑스', '수도', '파리'],
        verdict: 'true',
        title: '프랑스의 수도는 파리입니다',
        description: '프랑스는 서유럽에 위치한 국가로 수도는 파리입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['독일', '수도', '베를린'],
        verdict: 'true',
        title: '독일의 수도는 베를린입니다',
        description: '독일은 중앙유럽에 위치한 국가로 수도는 베를린입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['이탈리아', '수도', '로마'],
        verdict: 'true',
        title: '이탈리아의 수도는 로마입니다',
        description: '이탈리아는 남유럽에 위치한 국가로 수도는 로마입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['스페인', '수도', '마드리드'],
        verdict: 'true',
        title: '스페인의 수도는 마드리드입니다',
        description: '스페인은 남유럽(이베리아 반도)에 위치한 국가로 수도는 마드리드입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['우크라이나', '수도', '키이우', '키예프'],
        verdict: 'true',
        title: '우크라이나의 수도는 키이우입니다',
        description: '동유럽에 위치한 우크라이나의 수도는 키이우(Kyiv)입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['그리스', '수도', '아테네'],
        verdict: 'true',
        title: '그리스의 수도는 아테네입니다',
        description: '그리스는 남유럽에 위치한 국가로 수도는 아테네입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },

    // 아메리카
    {
        keywords: ['캐나다', '수도', '오타와'],
        verdict: 'true',
        title: '캐나다의 수도는 오타와입니다',
        description: '캐나다는 북아메리카 북부에 위치해 있으며 수도는 오타와입니다. 토론토나 밴쿠버가 아닙니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['멕시코', '수도', '멕시코시티'],
        verdict: 'true',
        title: '멕시코의 수도는 멕시코시티입니다',
        description: '멕시코는 북아메리카(중남미)에 위치한 국가로 수도는 멕시코시티입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['아르헨티나', '수도', '부엔오스아이레스'],
        verdict: 'true',
        title: '아르헨티나의 수도는 부엔오스아이레스입니다',
        description: '아르헨티나는 남아메리카 남부에 위치한 국가로 수도는 부엔오스아이레스입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['칠레', '수도', '산티아고'],
        verdict: 'true',
        title: '칠레의 수도는 산티아고입니다',
        description: '남아메리카 서쪽에 위치한 칠레의 수도는 산티아고입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },

    // 아프리카 및 오세아니아
    {
        keywords: ['남아프리카공화국', '남아공', '수도', '프리토리아'],
        verdict: 'true',
        title: '남아공의 행정 수도는 프리토리아입니다',
        description: '남아공은 기능을 나누고 있는데, 행정수도는 프리토리아, 입법수도는 케이프타운, 사법수도는 블룸폰테인입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['케냐', '수도', '나이로비'],
        verdict: 'true',
        title: '케냐의 수도는 나이로비입니다',
        description: '동아프리카에 위치한 케냐의 수도는 나이로비입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['뉴질랜드', '수도', '웰링턴'],
        verdict: 'true',
        title: '뉴질랜드의 수도는 웰링턴입니다',
        description: '뉴질랜드은 오세아니아에 위치한 섬나라로 수도는 웰링턴입니다. 오클랜드가 아닙니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },
    {
        keywords: ['오스트리아', '수도', '빈', '비엔나'],
        verdict: 'true',
        title: '오스트리아의 수도는 빈(비엔나)입니다',
        description: '유럽 중앙에 위치한 오스트리아의 수도는 빈(Wien, Vienna)입니다.',
        sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }]
    },

    // ==================== [BATCH 1] 전 세계 국가 및 도시 (v4.19 확장) ====================
    // --- 아시아 (추가) ---
    { keywords: ['말레이시아', '수도', '쿠알라룸푸르'], verdict: 'true', title: '말레이시아의 수도는 쿠알라룸푸르입니다', description: '동남아시아의 국가로 수도는 쿠알라룸푸르입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['싱가포르', '도시국가'], verdict: 'true', title: '싱가포르는 도시국가입니다', description: '싱가포르는 국가 자체가 하나의 도시인 도시국가입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['이란', '수도', '테헤란'], verdict: 'true', title: '이란의 수도는 테헤란입니다', description: '서아시아(중동)의 국가로 수도는 테헤란입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['이라크', '수도', '바그다드'], verdict: 'true', title: '이라크의 수도는 바그다드입니다', description: '중동의 국가로 수도는 바그다드입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['사우디아라비아', '사우디', '수도', '리야드'], verdict: 'true', title: '사우디아라비아의 수도는 리야드입니다', description: '중동 최대 국가 중 하나로 수도는 리야드입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['이스라엘', '수도', '예루살렘', '텔아비브'], verdict: 'uncertain', title: '이스라엘의 수도는 예루살렘(국제적으론 논쟁 중)입니다', description: '이스라엘은 예루살렘을 수도라고 주장하나, 대부분의 국가는 텔아비브를 수도로 간주합니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['파키스탄', '수도', '이슬라마바드'], verdict: 'true', title: '파키스탄의 수도는 이슬라마바드입니다', description: '남아시아의 국가로 수도는 이슬라마바드입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 유럽 (추가) ---
    { keywords: ['벨기에', '수도', '브뤼셀'], verdict: 'true', title: '벨기에의 수도는 브뤼셀입니다', description: '유럽연합(EU) 본부가 있는 브뤼셀이 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['네덜란드', '수도', '암스테르담'], verdict: 'true', title: '네덜란드의 수도는 암스테르담입니다', description: '행정 기능은 헤이그에 있으나 헌법상 수도는 암스테르담입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['스위스', '수도', '베른'], verdict: 'true', title: '스위스의 수도는 베른입니다', description: '취리히나 제네바가 아닌 베른이 공식 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['포르투갈', '수도', '리스본'], verdict: 'true', title: '포르투갈의 수도는 리스본입니다', description: '이베리아 반도 서쪽 국가 포르투갈의 수도는 리스본입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['스웨덴', '수도', '스톡홀름'], verdict: 'true', title: '스웨덴의 수도는 스톡홀름입니다', description: '북유럽 스칸디나비아 국가 스웨덴의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['노르웨이', '수도', '오슬로'], verdict: 'true', title: '노르웨이의 수도는 오슬로입니다', description: '북유럽 국가 노르웨이의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['덴마크', '수도', '코펜하겐'], verdict: 'true', title: '덴마크의 수도는 코펜하겐입니다', description: '북유럽 국가 덴마크의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['핀란드', '수도', '헬싱키'], verdict: 'true', title: '핀란드의 수도는 헬싱키입니다', description: '북유럽 국가 핀란드의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['폴란드', '수도', '바르샤바'], verdict: 'true', title: '폴란드의 수도는 바르샤바입니다', description: '중앙유럽 국가 폴란드의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['체코', '수도', '프라하'], verdict: 'true', title: '체코의 수도는 프라하입니다', description: '중앙유럽 국가 체코의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['헝가리', '수도', '부다페스트'], verdict: 'true', title: '헝가리의 수도는 부다페스트입니다', description: '중앙유럽 국가 헝가리의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 아메리카 (추가) ---
    { keywords: ['브라질', '수도', '브라질리아'], verdict: 'true', title: '브라질의 수도는 브라질리아입니다', description: '리우데자네이루나 상파울루가 아닌 계획도시 브라질리아가 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['콜롬비아', '수도', '보고타'], verdict: 'true', title: '콜롬비아의 수도는 보고타입니다', description: '남아메리카 북서부 국가 콜롬비아의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['페루', '수도', '리마'], verdict: 'true', title: '페루의 수도는 리마입니다', description: '남아메리카 국가 페루의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['쿠바', '수도', '아바나'], verdict: 'true', title: '쿠바의 수도는 아바나입니다', description: '카리브해 섬나라 쿠바의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 아프리카 ---
    { keywords: ['이집트', '수도', '카이로'], verdict: 'true', title: '이집트의 수도는 카이로입니다', description: '북아프리카 국가 이집트의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['나이지리아', '수도', '아부자'], verdict: 'true', title: '나이지리아의 수도는 아부자입니다', description: '아프리카 인구 1위 국가 나이지리아의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['에티오피아', '수도', '아디스아바바'], verdict: 'true', title: '에티오피아의 수도는 아디스아바바입니다', description: '동아프리카 국가 에티오피아의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['모로코', '수도', '라바트'], verdict: 'true', title: '모로코의 수도는 라바트입니다', description: '카사블랑카가 아닌 라바트가 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 기타 주요 대도시 ---
    { keywords: ['뉴욕', '미국', '최대도시'], verdict: 'true', title: '뉴욕은 미국의 최대 도시입니다', description: '미국의 경제, 문화 중심지이지만 수도는 아닙니다(수도는 워싱턴 D.C.).', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['로스앤젤레스', 'LA', '미국'], verdict: 'true', title: '로스앤젤레스는 미국 서부 최대 도시입니다', description: '할리우드로 유명한 캘리포니아의 대도시입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['시카고', '미국'], verdict: 'true', title: '시카고는 미국 일리노이주의 최대 도시입니다', description: '오대호 연안의 대도시입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['상하이', '중국', '최대도시'], verdict: 'true', title: '상하이는 중국의 최대 경제 도시입니다', description: '중국 경제의 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['시드니', '호주', '최대도시'], verdict: 'true', title: '시드니는 호주의 최대 도시입니다', description: '오페라 하우스로 유명하지만 호주의 수도는 아닙니다(수도는 캔버라).', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['이스탄불', '터키', '튀르키예', '최대도시'], verdict: 'true', title: '이스탄불은 튀르키예의 최대 도시입니다', description: '역사적으로 유명하지만 수도는 아닙니다(수도는 앙카라).', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['상파울루', '브라질', '최대도시'], verdict: 'true', title: '상파울루는 브라질 및 남미 최대 도시입니다', description: '브라질의 경제 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['뭄바이', '인도', '최대도시'], verdict: 'true', title: '뭄바이는 인도의 최대 도시입니다', description: '인도 경제의 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // ==================== [BATCH 2] 전 세계 국가 및 도시 (v4.19 확장) ====================
    // --- 아시아 (추가2) ---
    { keywords: ['우즈베키스탄', '수도', '타슈켄트'], verdict: 'true', title: '우즈베키스탄의 수도는 타슈켄트입니다', description: '중앙아시아의 국가로 수도는 타슈켄트입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['카자흐스탄', '수도', '아스타나'], verdict: 'true', title: '카자흐스탄의 수도는 아스타나입니다', description: '중앙아시아의 국가로 수도는 아스타나입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['네팔', '수도', '카트만두'], verdict: 'true', title: '네팔의 수도는 카트만두입니다', description: '히말라야 산맥에 위치한 국가로 수도는 카트만두입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['스리랑카', '수도', '콜롬보', '코테'], verdict: 'true', title: '스리랑카의 수도는 스리자야와르데네푸라코테입니다', description: '행정 수도는 코테이며 최대 도시는 콜롬보입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['방글라데시', '수도', '다카'], verdict: 'true', title: '방글라데시의 수도는 다카입니다', description: '남아시아의 국가로 수도는 다카입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 유럽 (추가2) ---
    { keywords: ['아일랜드', '수도', '더블린'], verdict: 'true', title: '아일랜드의 수도는 더블린입니다', description: '유럽 서쪽 섬나라 아일랜드의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['오스트리아', '수도', '빈'], verdict: 'true', title: '오스트리아의 수도는 빈입니다', description: '중앙유럽의 국가로 수도는 빈입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['루마니아', '수도', '부쿠레슈티'], verdict: 'true', title: '루마니아의 수도는 부쿠레슈티입니다', description: '동유럽의 국가로 수도는 부쿠레슈티입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['불가리아', '수도', '소피아'], verdict: 'true', title: '불가리아의 수도는 소피아입니다', description: '동유럽의 국가로 수도는 소피아입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['크로아티아', '수도', '자그레브'], verdict: 'true', title: '크로아티아의 수도는 자그레브입니다', description: '남유럽의 국가로 수도는 자그레브입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 아메리카 (추가2) ---
    { keywords: ['베네수엘라', '수도', '카라카스'], verdict: 'true', title: '베네수엘라의 수도는 카라카스입니다', description: '남아메리카 북부 국가 베네수엘라의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['에콰도르', '수도', '키토'], verdict: 'true', title: '에콰도르의 수도는 키토입니다', description: '남아메리카 국가 에콰도르의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['파라과이', '수도', '아순시온'], verdict: 'true', title: '파라과이의 수도는 아순시온입니다', description: '남아메리카 국가 파라과이의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['우루과이', '수도', '몬테비데오'], verdict: 'true', title: '우루과이의 수도는 몬테비데오입니다', description: '남아메리카 국가 우루과이의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['파나마', '수도', '파나마시티'], verdict: 'true', title: '파나마의 수도는 파나마시티입니다', description: '중앙아메리카 국가 파나마의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 아프리카 (추가2) ---
    { keywords: ['알제리', '수도', '알제'], verdict: 'true', title: '알제리의 수도는 알제입니다', description: '북아프리카 국가 알제리의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['가나', '수도', '아크라'], verdict: 'true', title: '가나의 수도는 아크라입니다', description: '서아프리카 국가 가나의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['탄자니아', '수도', '도도마', '다르에스살람'], verdict: 'true', title: '탄자니아의 수도는 도도마입니다', description: '행정 수도는 도도마이며 최대 도시는 다르에스살람입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['세네갈', '수도', '다카르'], verdict: 'true', title: '세네갈의 수도는 다카르입니다', description: '서아프리카 국가 세네갈의 수도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 오세아니아 ---
    { keywords: ['파푸아뉴기니', '수도', '포트모르즈비'], verdict: 'true', title: '파푸아뉴기니의 수도는 포트모르즈비입니다', description: '오세아니아의 국가로 수도는 포트모르즈비입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['피지', '수도', '수바'], verdict: 'true', title: '피지의 수도는 수바입니다', description: '남태평양의 섬나라로 수도는 수바입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // --- 도시 정보 추가 ---
    { keywords: ['토론토', '캐나다', '최대도시'], verdict: 'true', title: '토론토는 캐나다의 최대 도시입니다', description: '온타리오주의 주도이자 경제 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['밴쿠버', '캐나다'], verdict: 'true', title: '밴쿠버는 캐나다 서부의 주요 도시입니다', description: '브리티시컬럼비아주의 큰 항구 도시입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['멜버른', '호주'], verdict: 'true', title: '멜버른은 호주 제2의 도시입니다', description: '빅토리아주의 주도입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['바르셀로나', '스페인'], verdict: 'true', title: '바르셀로나는 스페인 제2의 도시입니다', description: '카탈루냐 지방의 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['밀라노', '이탈리아'], verdict: 'true', title: '밀라노는 이탈리아 북부의 패션 및 경제 중심지입니다', description: '이탈리아에서 두 번째로 큰 도시입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['뮌헨', '독일'], verdict: 'true', title: '뮌헨은 독일 바이에른주의 주도입니다', description: '독일 남부의 주요 도시입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },
    { keywords: ['오사카', '일본'], verdict: 'true', title: '오사카는 일본 관서 지방의 중심 도시입니다', description: '일본 제2의 대도시권 중심지입니다.', sources: [{ title: '외교부', url: 'https://www.mofa.go.kr' }] },

    // ==================== [BATCH 1] 국내 행정구역 (v4.20 확장) ====================
    { keywords: ['서울', '25개 구'], verdict: 'true', title: '서울특별시에는 총 25개의 자치구가 있습니다', description: '강남구, 종로구, 송파구 등 총 25개의 구가 서울을 구성합니다.', sources: [{ title: '서울특별시', url: 'https://www.seoul.go.kr' }] },
    { keywords: ['장안구', '권선구', '팔달구', '영통구', '수원'], verdict: 'true', title: '수원시에는 장안, 권선, 팔달, 영통 4개의 구가 있습니다', description: '수원시는 경기도의 도청 소재지이자 최대 도시입니다.', sources: [{ title: '수원시청', url: 'https://www.suwon.go.kr' }] },
    { keywords: ['분당구', '수정구', '중원구', '성남'], verdict: 'true', title: '성남시에는 수정, 중원, 분당 3개의 구가 있습니다', description: '경기도의 대표적인 주요 도시 중 하나입니다.', sources: [{ title: '성남시청', url: 'https://www.seongnam.go.kr' }] },
    { keywords: ['부산', '광역시', '수도'], verdict: 'true', title: '부산광역시는 대한민국의 제2도시이자 최대 항구도시입니다', description: '서울 다음으로 큰 도시이며 해운대, 광안리 등이 유명합니다.', sources: [{ title: '부산광역시', url: 'https://www.busan.go.kr' }] },
    { keywords: ['인천', '광역시', '공항'], verdict: 'true', title: '인천광역시는 서해안의 중심 도시로 국제공항이 있습니다', description: '인천국제공항과 인천항이 위치한 관문 도시입니다.', sources: [{ title: '인천광역시', url: 'https://www.incheon.go.kr' }] },
    { keywords: ['광주', '광역시', '호남'], verdict: 'true', title: '광주광역시는 호남 지방의 중심 도시입니다', description: '전라권의 최대 도시이며 빛고을이라는 별칭이 있습니다.', sources: [{ title: '광주광역시', url: 'https://www.gwangju.go.kr' }] },
    { keywords: ['대구', '광역시', '영남'], verdict: 'true', title: '대구광역시는 영남 내륙의 중심 도시입니다', description: '팔공산이 위치하며 전통적으로 사과와 섬유 산업이 유명했습니다.', sources: [{ title: '대구광역시', url: 'https://www.daegu.go.kr' }] },
    { keywords: ['대전', '광역시', '과학'], verdict: 'true', title: '대전광역시는 과학과 행정의 중심 도시입니다', description: '대덕연구단지가 위치하며 충청권의 최대 도시입니다.', sources: [{ title: '대전광역시', url: 'https://www.daejeon.go.kr' }] },
    { keywords: ['울산', '광역시', '공업'], verdict: 'true', title: '울산광역시는 대한민국의 대표적인 공업 도시입니다', description: '현대자동차, 현대중공업 등 대규모 공업 단지가 밀집해 있습니다.', sources: [{ title: '울산광역시', url: 'https://www.ulsan.go.kr' }] },
    { keywords: ['세종', '특별자치시', '행정'], verdict: 'true', title: '세종특별자치시는 대한민국의 행정 중심 복합도시입니다', description: '정부세종청사가 위치한 행정 주도 도시입니다.', sources: [{ title: '세종특별자치시', url: 'https://www.sejong.go.kr' }] },
    { keywords: ['제주', '특별자치도', '섬'], verdict: 'true', title: '제주특별자치도는 대한민국 최대의 섬입니다', description: '유네스코 세계자연유산으로 등재된 관광 중심지입니다.', sources: [{ title: '제주특별자치도', url: 'https://www.jeju.go.kr' }] },
    { keywords: ['독도', '경상북도', '울릉군'], verdict: 'true', title: '독도는 행정구역상 경상북도 울릉군 울릉읍에 속합니다', description: '대한민국의 고유 영토로 울릉도 옆에 위치하고 있습니다.', sources: [{ title: '외교부 독도', url: 'https://dokdo.mofa.go.kr' }] },
    { keywords: ['읍', '면', '동', '차이'], verdict: 'true', title: '동은 시 지역에, 읍과 면은 군 지역에 설치되는 행정 단위입니다', description: '인구와 특성에 따라 구분되며 면보다 읍이 인구가 더 많고 도시 형태를 갖춥니다.', sources: [{ title: '행정안전부', url: 'https://www.mois.go.kr' }] },

    // ==================== [BATCH 2] 국내 교통 정보 (v4.20 확장) ====================
    { keywords: ['KTX', 'SRT', '차이'], verdict: 'true', title: 'KTX는 한국철도공사(코레일), SRT는 (주)SR에서 운영하는 고속열차입니다', description: 'KTX는 서울역과 용산역, SRT는 수서역을 주로 이용하며 노선과 운임에 미세한 차이가 있습니다.', sources: [{ title: '레츠코레일', url: 'https://www.letskorail.com' }, { title: 'SRT', url: 'https://www.srail.or.kr' }] },
    { keywords: ['지하철', '1호선', '특징'], verdict: 'true', title: '수도권 지하철 1호선은 대한민국 최초의 지하철 노선입니다', description: '서울역, 종로, 청량리 등을 지나며 경인선, 경부선 등으로 이어지는 매우 긴 노선입니다.', sources: [{ title: '서울교통공사', url: 'http://www.seoulmetro.co.kr' }] },
    { keywords: ['지하철', '2호선', '순환선'], verdict: 'true', title: '수도권 지하철 2호선은 서울 시내를 한 바퀴 도는 순환선입니다', description: '강남, 홍대, 시청, 잠실 등 주요 거점을 연결하며 이용객이 가장 많은 노선입니다.', sources: [{ title: '서울교통공사', url: 'http://www.seoulmetro.co.kr' }] },
    { keywords: ['지하철', '9호선', '급행'], verdict: 'true', title: '9호선은 김포공항에서 강남을 거쳐 중앙보훈병원까지 연결되며 급행 열차가 운행됩니다', description: '황금노선이라 불리며 출퇴근 시간 혼잡도가 높기로 유명합니다.', sources: [{ title: '서울교통공사', url: 'http://www.seoulmetro.co.kr' }] },
    { keywords: ['경강선', '판교', '여주'], verdict: 'true', title: '경강선은 판교에서 출발하여 광주, 이천을 거쳐 여주까지 연결되는 노선입니다', description: '경기도 동남부 지역의 교통 편의를 위해 개통된 철도 노선입니다.', sources: [{ title: '한국철도공사', url: 'https://www.letskorail.com' }] },
    { keywords: ['GTX', '수도권', '광역급행철도'], verdict: 'true', title: 'GTX는 수도권 외곽에서 서울 도심까지 빠르게 연결하는 광역급행철도입니다', description: 'A, B, C 등 여러 노선이 계획 및 건설 중이며 일반 지하철보다 훨씬 빠릅니다.', sources: [{ title: '국토교통부', url: 'https://www.molit.go.kr' }] },
    { keywords: ['인천국제공항', '영종도', '터미널'], verdict: 'true', title: '인천국제공항은 영종도에 위치하며 제1터미널과 제2터미널이 있습니다', description: '대한민국의 관문 공항으로 전 세계로 나가는 국제선이 운행됩니다.', sources: [{ title: '인천국제공항공사', url: 'https://www.airport.kr' }] },
    { keywords: ['김포공항', '국내선', '강서구'], verdict: 'true', title: '김포공항은 서울 강서구에 위치하며 주로 국내선과 일부 단거리 국제선을 운행합니다', description: '제주도나 부산 등으로 갈 때 주로 이용하는 공항입니다.', sources: [{ title: '한국공항공사', url: 'https://www.airport.co.kr' }] },
    { keywords: ['김해공항', '부산', '경남'], verdict: 'true', title: '김해공항은 부산과 경남 지역의 거점 공항입니다', description: '부산 강서구에 위치하며 국내선 및 국제선을 모두 운행합니다.', sources: [{ title: '한국공항공사', url: 'https://www.airport.co.kr' }] },
    { keywords: ['제주공항', '제주도'], verdict: 'true', title: '제주국제공항은 제주도의 유일한 국제공항입니다', description: '전 세계에서 가장 붐비는 노선 중 하나인 서울-제주 노선의 종점입니다.', sources: [{ title: '한국공항공사', url: 'https://www.airport.co.kr' }] },
    { keywords: ['광역버스', '빨간버스'], verdict: 'true', title: '빨간색 광역버스는 수도권 외곽과 서울 도심을 빠르게 연결하는 버스입니다', description: '주요 정류장만 정차하며 고속도로 또는 전용차로를 이용합니다.', sources: [{ title: '경기도버스정보', url: 'http://www.gbis.go.kr' }] },
    { keywords: ['간선버스', '파란버스'], verdict: 'true', title: '파란색 간선버스는 서울 시내 먼 거리를 연결하는 버스입니다', description: '주로 큰 대로를 따라 운행하며 구와 구 사이를 연결합니다.', sources: [{ title: '서울교통정보센터', url: 'http://topis.seoul.go.kr' }] },
    { keywords: ['지선버스', '초록버스'], verdict: 'true', title: '초록색 지선버스는 가까운 거리를 연결하거나 지하철역으로 데려다주는 버스입니다', description: '동네 구석구석을 운행하며 간선버스나 지하철로의 환승을 돕습니다.', sources: [{ title: '서울교통정보센터', url: 'http://topis.seoul.go.kr' }] },
    { keywords: ['마을버스', '노란버스'], verdict: 'true', title: '노란색 또는 작은 초록색 마을버스는 동네 내부의 좁은 길을 운행합니다', description: '가장 짧은 구간을 운행하며 주민들의 이동 편의를 돕습니다.', sources: [{ title: '서울교통정보센터', url: 'http://topis.seoul.go.kr' }] },

    // ==================== [BATCH 1] 북한 지리 정보 (v4.21 확장) ====================
    { keywords: ['북한', '수도', '평양'], verdict: 'true', title: '북한의 수도는 평양직할시입니다', description: '평양은 북한의 정치, 경제, 문화의 중심지입니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['개성', '개성공단'], verdict: 'true', title: '개성은 북한의 주요 도시로 과거 개성공단이 위치했던 곳입니다', description: '고려의 수도였으며 남북 경제 협력의 상징적인 장소였습니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['백두산', '북한', '중국', '경계'], verdict: 'true', title: '백두산은 한반도에서 가장 높은 산으로 북한과 중국의 경계에 있습니다', description: '높이는 2,744m이며 천지가 있는 것으로 유명합니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['금강산', '강원도', '북한'], verdict: 'true', title: '금강산은 북한 강원도에 위치한 명산입니다', description: '계절에 따라 이름이 다르며(봄-금강, 여름-봉래, 가을-풍악, 겨울-개골) 1만 2천 봉으로 유명합니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['묘향산', '북한', '평안북도', '자강도'], verdict: 'true', title: '묘향산은 북안북도와 자강도 경계에 있는 북한의 명산입니다', description: '경치가 묘하고 향기가 난다고 하여 묘향산이라 불립니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['라선', '나선', '특별시'], verdict: 'true', title: '라선(나선)은 북한의 특별시로 대외 무역의 거점입니다', description: '나진과 선봉을 합쳐 만든 행정구역입니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },
    { keywords: ['북한', '정부', '9개 도'], verdict: 'true', title: '북한의 행정구역은 평양 외 9개의 도로 구성되어 있습니다', description: '함경남·북도, 평안남·북도, 황해남·북도, 강원도, 자강도, 양강도가 있습니다.', sources: [{ title: '통일부', url: 'https://www.unikorea.go.kr' }] },

    // ==================== [BATCH 2] 국내 교육 체계 (v4.21 확장) ====================
    { keywords: ['교육', '학제', '6-3-3-4'], verdict: 'true', title: '대한민국의 기본 학제는 초등학교 6년, 중학교 3년, 고등학교 3년, 대학교 4년입니다', description: '초등학교와 중학교 9년은 의무 교육 기간입니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] },
    { keywords: ['특목고', '과학고', '외고', '예고'], verdict: 'true', title: '특수목적고등학교(특목고)는 특정 분야의 인재 양성을 목적으로 합니다', description: '과학고, 외국어고, 국제고, 예술고, 체육고 등이 있습니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] },
    { keywords: ['자사고', '자율형사립고'], verdict: 'true', title: '자율형 사립고등학교(자사고)는 교육 과정을 자율적으로 운영하는 사립 교입니다', description: '학교 운영의 자율성이 일반고등학교보다 큽니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] },
    { keywords: ['학사', '석사', '박사', '순서'], verdict: 'true', title: '대학 학위 순서는 학사(대학), 석사(대학원), 박사(대학원) 순입니다', description: '학사는 보통 4년, 석사는 2년 이상의 과정을 거칩니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] },
    { keywords: ['전문대학', '2년제', '3년제'], verdict: 'true', title: '전문대학은 전문 직업인 양성을 목적으로 하며 보통 2년 또는 3년 과정입니다', description: '실무 중심의 교육을 제공합니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] },
    { keywords: ['종합대학교', '단과대학'], verdict: 'true', title: '종합대학교는 여러 개의 단과대학으로 구성된 대규모 대학입니다', description: '인문, 사회, 자연과학, 공학 등 다양한 전공이 함께 있습니다.', sources: [{ title: '교육부', url: 'https://www.moe.go.kr' }] }
];

// 전역으로 노출
window.COMMON_FAKE_NEWS = COMMON_FAKE_NEWS;
window.OBVIOUS_FACTS = OBVIOUS_FACTS;
