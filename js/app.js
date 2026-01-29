// 메인 애플리케이션
class FactCheckApp {
    constructor() {
        // 안전 장치: 음성인식 초기화 중 에러가 나도 앱은 죽지 않게 함
        try {
            if (window.FactCheckVoice) {
                this.speechRecognition = new window.FactCheckVoice();
            } else {
                console.warn('FactCheckVoice class not found. Speech recognition disabled.');
                this.speechRecognition = { start: () => { }, stop: () => { }, speak: () => { }, stopSpeaking: () => { } }; // 더미 객체
            }
        } catch (e) {
            console.error('Speech recognition init failed:', e);
            this.speechRecognition = { start: () => { }, stop: () => { }, speak: () => { }, stopSpeaking: () => { } }; // 더미 객체
        }

        this.factChecker = new window.FactChecker();
        this.deferredPrompt = null;

        this.initElements();

        // 요소 초기화 후 안전하게 이벤트 리스너 등록
        try {
            this.initEventListeners();
        } catch (e) {
            console.error('Event listeners init failed:', e);
        }

        this.initPWA();
    }

    initElements() {
        // 입력 요소
        this.factInput = document.getElementById('factInput');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.checkBtn = document.getElementById('checkBtn');

        // 표시 요소
        this.loading = document.getElementById('loading');
        this.result = document.getElementById('result');
        this.resultContent = document.getElementById('resultContent');
        this.appVersionEl = document.getElementById('appVersion');

        // 기타 버튼
        this.newCheckBtn = document.getElementById('newCheckBtn');
        this.resetAppBtn = document.getElementById('resetAppBtn');

        // PWA 모달
        this.installModal = document.getElementById('installModal');
        this.installBtn = document.getElementById('installBtn');
        this.closeModalBtn = document.getElementById('closeModalBtn');

        // 버전 표시
        if (this.appVersionEl) {
            this.appVersionEl.textContent = this.factChecker.version;
        }
    }

    initEventListeners() {
        // 음성 입력 버튼
        this.voiceBtn.addEventListener('click', () => this.handleVoiceInput());

        // 확인하기 버튼
        this.checkBtn.addEventListener('click', () => this.handleCheck());

        // 새로 확인하기 버튼
        this.newCheckBtn.addEventListener('click', () => this.resetForm());

        // 시스템 초기화 버튼
        if (this.resetAppBtn) {
            this.resetAppBtn.addEventListener('click', () => {
                if (confirm('모든 기록을 초기화하고 앱을 다시 시작할까요?')) {
                    this.factChecker.clearCache();
                    location.reload(true);
                }
            });
        }

        // Enter 키로 확인
        this.factInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleCheck();
            }
        });

        // PWA 설치 버튼
        if (this.installBtn) {
            this.installBtn.addEventListener('click', () => this.handleInstall());
        }

        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.hideInstallModal());
        }

        // 음성 출력 잠금 해제 (모바일 브라우저 대응)
        const unlockAudio = () => {
            if (this.speechRecognition.synth) {
                const u = new SpeechSynthesisUtterance('');
                this.speechRecognition.synth.speak(u);
                console.log('Audio unlocked');
            }
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
    }

    initPWA() {
        // PWA 설치 프롬프트 캡처
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;

            // 설치 모달 표시 (처음 방문 시)
            const hasSeenModal = localStorage.getItem('hasSeenInstallModal');
            if (!hasSeenModal) {
                setTimeout(() => this.showInstallModal(), 3000);
                localStorage.setItem('hasSeenInstallModal', 'true');
            }
        });

        // 설치 완료 이벤트
        window.addEventListener('appinstalled', () => {
            console.log('PWA 설치 완료');
            this.deferredPrompt = null;
        });
    }

    showInstallModal() {
        if (this.installModal) {
            this.installModal.classList.remove('hidden');
        }
    }

    hideInstallModal() {
        if (this.installModal) {
            this.installModal.classList.add('hidden');
        }
    }

    async handleInstall() {
        if (!this.deferredPrompt) {
            alert('이미 설치되었거나 설치할 수 없습니다.');
            this.hideInstallModal();
            return;
        }

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;

        console.log(`설치 결과: ${outcome}`);
        alert(`PWA 설치 결과: ${outcome === 'accepted' ? '성공적으로 설치되었습니다!' : '설치가 취소되었습니다.'}`);
        this.deferredPrompt = null;
        this.hideInstallModal();
    }

    handleVoiceInput() {
        if (this.speechRecognition.isListening) {
            this.speechRecognition.stop();
            return;
        }

        // 음성 출력 중단 (충돌 방지)
        this.speechRecognition.stopSpeaking();

        this.voiceBtn.classList.add('listening');
        this.voiceBtn.querySelector('.voice-text').textContent = '듣는 중... (클릭하여 완료)';

        // 음성 인식 시작 (continuous 모드이므로 수동으로 멈출 때까지 계속 듣거나 브라우저 타임아웃까지 대기)
        this.speechRecognition.start(
            (transcript, isFinal) => {
                this.factInput.value = transcript;
            },
            (error) => {
                this.voiceBtn.classList.remove('listening');
                this.voiceBtn.querySelector('.voice-text').textContent = '음성으로 말하기';

                if (error && error !== 'no-speech' && error !== 'aborted') {
                    alert(error);
                }
            }
        );
    }

    async handleCheck() {
        const text = this.factInput.value.trim();

        if (!text) {
            alert('확인할 내용을 입력해주세요.');
            this.factInput.focus();
            return;
        }

        // UI 업데이트
        this.showLoading();

        try {
            // 팩트체크 실행
            const result = await this.factChecker.check(text);

            // 결과 표시
            this.showResult(result);
        } catch (error) {
            this.hideLoading();
            alert(error.message || '오류가 발생했습니다.');
        }
    }

    showLoading() {
        this.checkBtn.disabled = true;
        this.loading.classList.remove('hidden');
        this.result.classList.add('hidden');
    }

    hideLoading() {
        this.checkBtn.disabled = false;
        this.loading.classList.add('hidden');
    }

    showResult(result) {
        this.hideLoading();

        // 럭셔리: 결과 읽어주기 (TTS)
        const speechText = `${result.title}. ${result.description}`;
        this.speechRecognition.speak(speechText);

        // 결과 HTML 생성
        const html = this.generateResultHTML(result);
        this.resultContent.innerHTML = html;

        // 결과 영역 표시
        this.result.classList.remove('hidden');

        // 결과로 스크롤
        this.result.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 다시 듣기 버튼 이벤트 연결
        const replayBtn = document.getElementById('replayVoiceBtn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => this.speechRecognition.speak(speechText));
        }
    }

    generateResultHTML(result) {
        const verdictMap = {
            'true': { label: '✓ 사실로 확인됨', class: 'true' },
            'false': { label: '✗ 허위로 확인됨', class: 'false' },
            'uncertain': { label: '? 확인 불확실', class: 'uncertain' }
        };

        const verdict = verdictMap[result.verdict] || verdictMap['uncertain'];

        let html = `
            <div class="result-badge ${verdict.class}">
                ${verdict.label}
            </div>
            
            <h3 class="result-title">
                ${result.title}
            </h3>
            
            <p class="result-description">
                ${result.description}
            </p>

            <button id="replayVoiceBtn" class="btn btn-outline" style="width: auto; margin-bottom: 2rem;">
                🔊 다시 듣기
            </button>
        `;

        // 출처 링크 (한 칸 비우고 출력하도록 여백 추가)
        if (result.sources && result.sources.length > 0) {
            html += `
                <div class="result-sources" style="margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem;">
                    <h4 class="sources-title" style="margin-bottom: 1.5rem; color: var(--clr-luxury-gold);">🔗 관련 뉴스 및 정보 확인</h4>
            `;

            result.sources.forEach(source => {
                html += `
                    <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="source-link">
                        ${source.title}
                    </a>
                `;
            });

            html += `</div>`;
        }

        return html;
    }

    resetForm() {
        this.factInput.value = '';
        this.result.classList.add('hidden');
        this.factInput.focus();

        // 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// DOM 로드 완료 후 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.clear();
    console.log('%c[FactWise Luxury v3.0] 레이싱 엔진 가동됨', 'color: #D4AF37; font-weight: bold; font-size: 14px; text-shadow: 0 0 5px rgba(212,175,55,0.5);');
    const app = new FactCheckApp();
});
