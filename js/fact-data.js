// 팩트체크 데이터 (fact-data.js)
// 유지보수 및 효율성을 위해 데이터 분리

const COMMON_FAKE_NEWS = [
    // [NEW] 지리/세계 관련 (사용자 요청 보강)
    {
        keywords: ['나이지리아', '아시아', '위치', '어디', '나라', '국가'],
        verdict: 'false',
        title: '나이지리아가 아시아 국가라는 주장',
        description: '나이지리아는 아프리카 서부에 위치한 국가입니다. 아시아가 아닙니다.',
        sources: [
            { title: '외교부: 나이지리아 국가 정보', url: 'https://www.mofa.go.kr' },
            { title: 'Google 지도', url: 'https://www.google.com/maps' }
        ]
    },
    {
        keywords: ['브라질', '유럽'],
        verdict: 'false',
        title: '브라질이 유럽 국가라는 주장',
        description: '브라질은 남아메리카(남미)에 위치한 국가입니다.',
        sources: [
            { title: '외교부: 브라질 국가 정보', url: 'https://www.mofa.go.kr' }
        ]
    },
    {
        keywords: ['이집트', '아시아'],
        verdict: 'uncertain',
        title: '이집트의 대륙 구분',
        description: '이집트는 대부분 아프리카에 속하지만, 시나이 반도는 아시아에 속해 있어 두 대륙에 걸쳐 있습니다. 주로 아프리카 국가로 분류됩니다.',
        sources: [
            { title: '외교부: 이집트 정보', url: 'https://www.mofa.go.kr' }
        ]
    },

    // 정치/시사 관련 사실 정보 (2026년 기준)
    {
        keywords: ['대한민국', '대통령', '이재명'],
        verdict: 'true',
        title: '대한민국 대통령은 이재명입니다',
        description: '2026년 현재 대한민국의 대통령은 이재명입니다. 이것은 공식적인 사실입니다.',
        sources: [
            { title: '대한민국 정부 공식 사이트', url: 'https://www.korea.kr' },
            { title: '청와대', url: 'https://www.president.go.kr' }
        ]
    },
    {
        keywords: ['윤석열', '대통령', '현재', '지금'],
        verdict: 'false',
        title: '윤석열이 현재 대통령이라는 주장',
        description: '윤석열은 이전 대통령이었으며, 2026년 현재 대통령은 이재명입니다.',
        sources: [
            { title: '대한민국 정부', url: 'https://www.korea.kr' }
        ]
    },
    {
        keywords: ['정부', '지원금', '무료', '신청', '링크', '클릭'],
        verdict: 'uncertain',
        title: '정부 지원금 무료 신청 안내 문자',
        description: '정부 지원금 관련 문자나 링크는 사기일 수 있습니다. 반드시 정부24(www.gov.kr) 공식 사이트에서 확인하세요.',
        sources: [
            { title: '정부24 공식 사이트', url: 'https://www.gov.kr' },
            { title: '경찰청: 보이스피싱 예방', url: 'https://www.police.go.kr' }
        ]
    },
    {
        keywords: ['하루', '24시간', '시간'],
        verdict: 'true',
        title: '하루는 24시간입니다',
        description: '지구의 자전 주기를 기준으로 하루는 약 24시간으로 구성됩니다. 이는 과학적인 사실입니다.',
        sources: [
            { title: '한국표준과학연구원', url: 'https://www.kriss.re.kr' },
            { title: '위키백과: 시간', url: 'https://ko.wikipedia.org/wiki/%EC%8B%9C%EA%B0%84' }
        ]
    },
    {
        keywords: ['해', '동쪽', '서쪽', '해뜨는'],
        verdict: 'true',
        title: '해는 동쪽에서 떠서 서쪽으로 집니다',
        description: '지구의 자전으로 인해 해는 매일 동쪽에서 떠올라 서쪽으로 지는 자연 현상을 보입니다.',
        sources: [
            { title: '한국천문연구원', url: 'https://www.kasi.re.kr' }
        ]
    },
    {
        keywords: ['택배', '배송', '확인', '링크', '클릭', '조회'],
        verdict: 'uncertain',
        title: '택배 배송 확인 링크 안내 문자',
        description: '출처가 불분명한 택배 문자는 스미싱일 수 있습니다. 링크를 함부로 클릭하지 말고 택배사 공식 앱을 이용하세요.',
        sources: [
            { title: '경찰청: 스미싱 예방', url: 'https://www.police.go.kr' },
            { title: 'KISA: 스미싱 신고', url: 'https://www.kisa.or.kr' }
        ]
    },
    {
        keywords: ['카드', '정지', '긴급', '연락', '전화'],
        verdict: 'uncertain',
        title: '카드 정지 긴급 연락 요청',
        description: '카드사를 사칭한 보이스피싱일 수 있습니다. 문자에 있는 번호로 전화하지 말고 카드 뒷면의 공식 번호로 확인하세요.',
        sources: [
            { title: '금융감독원: 보이스피싱 예방', url: 'https://www.fss.or.kr' }
        ]
    },

    // 건강/의료 관련 가짜뉴스
    {
        keywords: ['바나나', '코로나', '낫는다', '치료'],
        verdict: 'false',
        title: '바나나로 코로나가 낫는다는 주장',
        description: '바나나에는 코로나 바이러스를 치료하는 효과가 없습니다. 의학적 근거가 전혀 없는 거짓 정보입니다.',
        sources: [
            { title: '팩트체크: 바나나 코로나 치료 허위', url: 'https://www.factcheck.org' }
        ]
    },
    {
        keywords: ['마늘', '코로나', '예방', '치료'],
        verdict: 'false',
        title: '마늘이 코로나를 예방한다는 주장',
        description: '마늘은 건강에 좋은 식품이지만 코로나 바이러스를 예방하거나 치료하는 효과는 없습니다.',
        sources: [
            { title: 'WHO: 마늘 코로나 예방 효과 없음', url: 'https://www.who.int' }
        ]
    },
    {
        keywords: ['뜨거운 물', '코로나', '죽인다', '예방'],
        verdict: 'false',
        title: '뜨거운 물을 마시면 코로나가 예방된다는 주장',
        description: '뜨거운 물을 마시는 것으로는 코로나 바이러스를 예방할 수 없습니다. 백신 접종과 방역 수칙 준수가 중요합니다.',
        sources: [
            { title: '질병관리청: 코로나 예방 수칙', url: 'https://www.kdca.go.kr' }
        ]
    },
    {
        keywords: ['표백제', '소독제', '마시면', '코로나'],
        verdict: 'false',
        title: '표백제나 소독제를 마시면 코로나가 낫는다는 주장',
        description: '절대로 표백제나 소독제를 마시면 안 됩니다! 매우 위험하며 생명을 위협할 수 있습니다.',
        sources: [
            { title: 'CDC: 소독제 섭취 위험 경고', url: 'https://www.cdc.gov' }
        ]
    },
    {
        keywords: ['식초', '암', '치료', '낫는다'],
        verdict: 'false',
        title: '식초로 암을 치료할 수 있다는 주장',
        description: '식초는 암을 치료하지 못합니다. 암 치료는 반드시 의사의 진료를 받아야 합니다.',
        sources: [
            { title: '국립암센터: 암 치료 정보', url: 'https://www.ncc.re.kr' }
        ]
    },
    {
        keywords: ['소금물', '양치', '코로나', '예방'],
        verdict: 'false',
        title: '소금물 양치로 코로나를 예방할 수 있다는 주장',
        description: '소금물 양치는 코로나 예방에 효과가 없습니다. 마스크 착용과 손 씻기가 중요합니다.',
        sources: [
            { title: 'WHO: 코로나 예방 가이드', url: 'https://www.who.int' }
        ]
    },
    {
        keywords: ['레몬', '물', '알칼리', '암', '예방'],
        verdict: 'false',
        title: '레몬물이 몸을 알칼리화해 암을 예방한다는 주장',
        description: '레몬물로 체내 pH를 바꿀 수 없으며, 암 예방 효과도 없습니다.',
        sources: [
            { title: '의학 팩트체크: 레몬물 효능', url: 'https://www.factcheck.org' }
        ]
    },
    {
        keywords: ['백신', '자폐증', '유발', '원인'],
        verdict: 'false',
        title: '백신이 자폐증을 유발한다는 주장',
        description: '백신과 자폐증 사이에는 아무런 관련이 없습니다. 이는 과학적으로 완전히 반박된 거짓 정보입니다.',
        sources: [
            { title: 'CDC: 백신 안전성 정보', url: 'https://www.cdc.gov' }
        ]
    },
    {
        keywords: ['mRNA', '백신', '유전자', '변형', '조작'],
        verdict: 'false',
        title: 'mRNA 백신이 유전자를 변형시킨다는 주장',
        description: 'mRNA 백신은 DNA에 영향을 주지 않으며 유전자를 변형시키지 않습니다. 안전하게 사용할 수 있습니다.',
        sources: [
            { title: '질병관리청: mRNA 백신 설명', url: 'https://www.kdca.go.kr' }
        ]
    },
    {
        keywords: ['물', '하루', '8잔', '반드시', '마셔야'],
        verdict: 'uncertain',
        title: '하루 8잔의 물을 반드시 마셔야 한다는 주장',
        description: '물 섭취량은 개인의 활동량, 건강 상태에 따라 다릅니다. 8잔은 일반적인 권장사항일 뿐 절대적인 기준은 아닙니다.',
        sources: [
            { title: '건강 정보: 적정 수분 섭취량', url: 'https://www.health.kr' }
        ]
    },

    // 과학/기술 관련 가짜뉴스
    {
        keywords: ['5g', '코로나', '확산', '전파', '원인'],
        verdict: 'false',
        title: '5G가 코로나를 전파한다는 주장',
        description: '5G 네트워크와 코로나 바이러스 확산은 전혀 관련이 없습니다. 과학적 근거가 없는 음모론입니다.',
        sources: [
            { title: 'BBC: 5G 코로나 음모론 팩트체크', url: 'https://www.bbc.com' }
        ]
    },
    {
        keywords: ['전자레인지', '음식', '영양소', '파괴'],
        verdict: 'false',
        title: '전자레인지가 음식의 영양소를 파괴한다는 주장',
        description: '전자레인지는 다른 조리 방법과 비슷하거나 오히려 영양소를 더 잘 보존합니다.',
        sources: [
            { title: '식품안전처: 전자레인지 안전성', url: 'https://www.mfds.go.kr' }
        ]
    },
    {
        keywords: ['휴대폰', '전자파', '뇌종양', '암'],
        verdict: 'uncertain',
        title: '휴대폰 전자파가 뇌종양을 유발한다는 주장',
        description: '현재까지 휴대폰 전자파와 뇌종양의 직접적 연관성은 명확히 입증되지 않았습니다. 연구가 계속되고 있습니다.',
        sources: [
            { title: 'WHO: 휴대폰 전자파 연구', url: 'https://www.who.int' }
        ]
    },
    {
        keywords: ['지구', '평평', '평면', '둥글지'],
        verdict: 'false',
        title: '지구가 평평하다는 주장',
        description: '지구는 둥글며, 이는 수많은 과학적 증거로 입증되었습니다. 평평한 지구론은 과학적 근거가 전혀 없습니다.',
        sources: [
            { title: 'NASA: 지구 모양 증거', url: 'https://www.nasa.gov' }
        ]
    },

    // 식품/영양 관련 가짜뉴스
    {
        keywords: ['MSG', '화학조미료', '유해', '독성'],
        verdict: 'false',
        title: 'MSG가 건강에 해롭다는 주장',
        description: 'MSG는 적정량 섭취 시 안전한 식품첨가물입니다. FDA와 WHO에서 안전성을 인정했습니다.',
        sources: [
            { title: '식품안전처: MSG 안전성', url: 'https://www.mfds.go.kr' }
        ]
    },
    {
        keywords: ['탄산음료', '뼈', '녹인다', '칼슘'],
        verdict: 'false',
        title: '탄산음료가 뼈를 녹인다는 주장',
        description: '탄산음료가 직접 뼈를 녹이지는 않습니다. 다만 과다 섭취 시 칼슘 흡수를 방해할 수 있습니다.',
        sources: [
            { title: '영양학 팩트체크', url: 'https://www.nutrition.or.kr' }
        ]
    },
    {
        keywords: ['계란', '콜레스테롤', '하루', '1개', '제한'],
        verdict: 'uncertain',
        title: '계란은 하루 1개만 먹어야 한다는 주장',
        description: '건강한 사람은 하루 2-3개의 계란을 먹어도 괜찮습니다. 개인의 건강 상태에 따라 다를 수 있습니다.',
        sources: [
            { title: '영양학회: 계란 섭취 가이드', url: 'https://www.nutrition.or.kr' }
        ]
    },
    {
        keywords: ['밤', '늦게', '먹으면', '살', '찐다'],
        verdict: 'uncertain',
        title: '밤에 먹으면 더 살이 찐다는 주장',
        description: '체중 증가는 총 칼로리 섭취량에 달려있습니다. 먹는 시간보다 얼마나 먹는지가 더 중요합니다.',
        sources: [
            { title: '영양학 연구: 식사 시간과 체중', url: 'https://www.nutrition.or.kr' }
        ]
    },

    // 사회/정치 관련 가짜뉴스
    {
        keywords: ['정부', '지원금', '무료', '신청', '링크'],
        verdict: 'uncertain',
        title: '정부 지원금 무료 신청 안내',
        description: '정부 지원금 관련 문자나 링크는 사기일 수 있습니다. 반드시 정부 공식 사이트에서 확인하세요.',
        sources: [
            { title: '정부24 공식 사이트', url: 'https://www.gov.kr' }
        ]
    },
    {
        keywords: ['택배', '배송', '확인', '링크', '클릭'],
        verdict: 'uncertain',
        title: '택배 배송 확인 링크 안내',
        description: '출처가 불분명한 택배 문자는 스미싱일 수 있습니다. 링크를 함부로 클릭하지 마세요.',
        sources: [
            { title: '경찰청: 스미싱 예방', url: 'https://www.police.go.kr' }
        ]
    },

    // 환경/기후 관련 가짜뉴스
    {
        keywords: ['지구온난화', '거짓', '조작', '음모'],
        verdict: 'false',
        title: '지구온난화가 거짓이라는 주장',
        description: '지구온난화는 과학적으로 입증된 사실입니다. 전 세계 과학자들의 합의된 의견입니다.',
        sources: [
            { title: 'IPCC: 기후변화 보고서', url: 'https://www.ipcc.ch' }
        ]
    },

    // 재난/안전 관련 가짜뉴스
    {
        keywords: ['지진', '예측', '발생', '대비'],
        verdict: 'uncertain',
        title: '특정 날짜에 지진이 발생한다는 예측',
        description: '현재 과학 기술로는 지진을 정확히 예측할 수 없습니다. 근거 없는 지진 예측은 믿지 마세요.',
        sources: [
            { title: '기상청: 지진 정보', url: 'https://www.kma.go.kr' }
        ]
    },

    // 경제/금융 관련 가짜뉴스
    {
        keywords: ['주식', '무조건', '수익', '보장', '투자'],
        verdict: 'false',
        title: '무조건 수익을 보장하는 투자',
        description: '수익을 보장하는 투자는 없습니다. 이런 광고는 대부분 사기입니다.',
        sources: [
            { title: '금융감독원: 투자 사기 예방', url: 'https://www.fss.or.kr' }
        ]
    },
    {
        keywords: ['가상화폐', '코인', '100배', '수익', '보장'],
        verdict: 'false',
        title: '가상화폐로 100배 수익 보장',
        description: '고수익을 보장하는 가상화폐 투자는 사기일 가능성이 높습니다. 매우 조심하세요.',
        sources: [
            { title: '금융감독원: 가상화폐 투자 주의', url: 'https://www.fss.or.kr' }
        ]
    },

    // 생활 관련 가짜뉴스
    {
        keywords: ['치약', '여드름', '바르면', '없어진다'],
        verdict: 'false',
        title: '치약을 바르면 여드름이 없어진다는 주장',
        description: '치약은 피부 자극을 유발할 수 있습니다. 여드름 치료는 피부과 전문의와 상담하세요.',
        sources: [
            { title: '피부과학회: 여드름 치료', url: 'https://www.derma.or.kr' }
        ]
    },
    {
        keywords: ['머리', '자주', '감으면', '빠진다'],
        verdict: 'false',
        title: '머리를 자주 감으면 머리카락이 빠진다는 주장',
        description: '머리를 감는 것과 탈모는 직접적인 관련이 없습니다. 오히려 청결 유지가 두피 건강에 좋습니다.',
        sources: [
            { title: '피부과학회: 탈모 정보', url: 'https://www.derma.or.kr' }
        ]
    },
    {
        keywords: ['선풍기', '밀폐', '공간', '사망', '질식'],
        verdict: 'false',
        title: '밀폐된 공간에서 선풍기를 켜면 사망한다는 주장',
        description: '선풍기로 인한 질식사는 과학적 근거가 없습니다. 다만 적절한 환기는 건강에 좋습니다.',
        sources: [
            { title: '의학 팩트체크', url: 'https://www.factcheck.org' }
        ]
    },

    // 교육/학습 관련
    {
        keywords: ['뇌', '10퍼센트', '10%', '사용'],
        verdict: 'false',
        title: '인간은 뇌의 10%만 사용한다는 주장',
        description: '인간은 뇌의 거의 모든 부분을 사용합니다. 10% 신화는 과학적 근거가 없습니다.',
        sources: [
            { title: '신경과학회: 뇌 사용 팩트체크', url: 'https://www.neurology.or.kr' }
        ]
    },

    // 동물/자연 관련
    {
        keywords: ['금붕어', '기억력', '3초', '짧다'],
        verdict: 'false',
        title: '금붕어의 기억력은 3초라는 주장',
        description: '금붕어는 최소 3개월 이상 기억할 수 있습니다. 3초 기억력은 잘못된 정보입니다.',
        sources: [
            { title: '동물학 연구', url: 'https://www.science.org' }
        ]
    }
];

const OBVIOUS_FACTS = [
    {
        keywords: ['사람', '죽는다', '사망', '생명', '인간'],
        verdict: 'true',
        title: '사람은 죽는다는 사실',
        description: '모든 생명체는 언젠가 죽습니다. 이것은 생물학적으로 명백한 사실입니다.',
        sources: [
            { title: '생물학 기초 지식', url: 'https://www.science.org' }
        ]
    },
    {
        keywords: ['태양', '동쪽', '뜬다', '떠오른다', '해'],
        verdict: 'true',
        title: '태양은 동쪽에서 뜬다',
        description: '지구의 자전 방향 때문에 태양은 동쪽에서 떠서 서쪽으로 집니다. 이것은 천문학적 사실입니다.',
        sources: [
            { title: '천문학 기초', url: 'https://www.nasa.gov' }
        ]
    },
    {
        keywords: ['물', '끓는점', '100도', '섭씨'],
        verdict: 'true',
        title: '물의 끓는점은 100도',
        description: '표준 기압(1기압)에서 물의 끓는점은 섭씨 100도입니다. 이것은 과학적 사실입니다.',
        sources: [
            { title: '화학 기초 지식', url: 'https://www.science.org' }
        ]
    },
    {
        keywords: ['지구', '둥글다', '구형', '지구모양', '동그랗다'],
        verdict: 'true',
        title: '지구는 둥글다',
        description: '지구는 구형입니다. 이것은 수많은 과학적 증거로 입증된 사실입니다.',
        sources: [
            { title: 'NASA: 지구 모양', url: 'https://www.nasa.gov' }
        ]
    },
    {
        keywords: ['북한', '공산주의', '독재', '김정은'],
        verdict: 'true',
        title: '북한은 공산주의 독재 국가입니다',
        description: '북한은 조선로동당이 지배하는 사회주의/공산주의 체제로, 국제사회에서 독재 국가로 분류됩니다.',
        sources: [
            { title: '통일부: 북한 정보', url: 'https://www.unikorea.go.kr' }
        ]
    },
    {
        keywords: ['중력', '존재', '떨어진다', '낙하', '사과'],
        verdict: 'true',
        title: '중력이 존재한다',
        description: '중력은 실제로 존재하는 자연의 힘입니다. 물체가 떨어지는 것은 중력 때문입니다.',
        sources: [
            { title: '물리학 기초', url: 'https://www.science.org' }
        ]
    },
    {
        keywords: ['서울', '수도', '대한민국', '한국'],
        verdict: 'true',
        title: '대한민국의 수도는 서울입니다',
        description: '서울은 대한민국의 수도이자 가장 큰 도시입니다.',
        sources: [
            { title: '대한민국 정부', url: 'https://www.korea.kr' }
        ]
    },
    {
        keywords: ['하늘', '파랗다', '푸르다', '색'],
        verdict: 'true',
        title: '하늘이 파랗게 보이는 이유',
        description: '태양 빛이 대기를 통과하면서 산란되기 때문에 맑은 날 하늘은 파랗게 보입니다.',
        sources: [
            { title: '기상청: 하늘의 색', url: 'https://www.kma.go.kr' }
        ]
    },
    {
        keywords: ['풀', '초록색', '식물', '엽록소'],
        verdict: 'true',
        title: '식물의 잎은 초록색입니다',
        description: '대부분의 식물은 광합성을 위해 초록색 색소인 엽록소를 가지고 있습니다.',
        sources: [
            { title: '식물학 기초', url: 'https://www.science.org' }
        ]
    },
    {
        keywords: ['독도', '우리땅', '대한민국', '한국'],
        verdict: 'true',
        title: '독도는 대한민국의 영토입니다',
        description: '독도는 역사적, 지리적, 국제법적으로 명백한 대한민국의 고유 영토입니다.',
        sources: [
            { title: '외교부: 독도', url: 'https://dokdo.mofa.go.kr' }
        ]
    }
];

// 전역으로 노출
window.COMMON_FAKE_NEWS = COMMON_FAKE_NEWS;
window.OBVIOUS_FACTS = OBVIOUS_FACTS;
