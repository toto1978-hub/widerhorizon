
// factcheck.js의 로직을 테스트하기 위한 스크립트
// 로컬 환경에서 실행 가능하도록 시뮬레이션

const fs = require('fs');
const path = require('path');

// 1. factcheck.js 파일 읽기 (window 객체 시뮬레이션 필요)
const factCheckCode = fs.readFileSync(path.join(__dirname, 'js', 'factcheck.js'), 'utf8');

// window 객체 시뮬레이션
const window = {
    localStorage: {
        getItem: () => null,
        setItem: () => { }
    }
};

// 코드 실행 (FactChecker 클래스를 현재 스코프에 가져옴)
eval(factCheckCode.replace('window.FactChecker = FactChecker;', 'module.exports = FactChecker;'));
const FactChecker = module.exports;

async function runTests() {
    const checker = new FactChecker();

    const testCases = [
        { input: "1 + 1은 2인가요?", expectedVerdict: "true", label: "산수 계산 (일치)" },
        { input: "100 * 2 = 300", expectedVerdict: "false", label: "산수 계산 (허위)" },
        { input: "하늘은 파랗다", expectedVerdict: "true", label: "상식 (하늘)" },
        { input: "서울은 한국의 수도인가?", expectedVerdict: "true", label: "상식 (수도)" },
        { input: "지구가 평평하다", expectedVerdict: "false", label: "가짜뉴스 DB (지구)" },
        { input: "독도는 우리땅", expectedVerdict: "true", label: "상식 (독도)" },
        { input: "10 + 20", expectedVerdict: "true", label: "산수 계산 (결과값)" }
    ];

    console.log("=== 팩트체크 성능 개선 테스트 시작 ===\n");
    let passed = 0;

    for (const test of testCases) {
        try {
            const result = await checker.check(test.input);
            const isPassed = result.verdict === test.expectedVerdict;

            console.log(`[${isPassed ? 'PASS' : 'FAIL'}] ${test.label}`);
            console.log(`  - 입력: ${test.input}`);
            console.log(`  - 결과: ${result.verdict} (${result.title})`);

            if (isPassed) passed++;
        } catch (error) {
            console.log(`[ERROR] ${test.label}: ${error.message}`);
        }
    }

    console.log(`\n=== 테스트 결과: ${passed}/${testCases.length} 통과 ===`);
}

runTests();
