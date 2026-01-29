// 메인 애플리케이션
class FactCheckApp {
    constructor() {
        // 1. 음성인식 초기화 (안전 장치 적용)
        try {
            if (window.FactCheckVoice) {
                this.speechRecognition = new window.FactCheckVoice();
            } else {
                console.warn('FactCheckVoice class not found.');
                this.createDummySpeechRecognition();
            }
        } catch (e) {
            console.error('Speech recognition init failed:', e);
            this.createDummySpeechRecognition();
        }

        // 2. 팩트체커 초기화 (안전 장치 적용)
        try {
            if (window.FactChecker) {
                this.factChecker = new window.FactChecker();
            } else {
                console.error('FactChecker class not found.');
                this.factChecker = { version: 'Error', check: async () => ({ title: '오류', description: '팩트체크 기능 초기화 실패', verdict: 'uncertain' }), clearCache: () => { } };
            }
        } catch (e) {
            console.error('FactChecker init failed:', e);
            this.factChecker = { version: 'Error', check: async () => ({ title: '오류', description: '팩트체크 기능 초기화 실패', verdict: 'uncertain' }), clearCache: () => { } };
        }

        this.deferredPrompt = null;

        // 3. UI 요소 초기화 (필수)
        try {
            this.initElements();
        } catch (e) {
            console.error('Element initialization failed:', e);
            alert('앱 UI 초기화 중 오류가 발생했습니다. 페이지를 새로고침해주세요.');
        }

        // 4. 이벤트 리스너 등록 (필수 - 초기화 버튼 등)
        try {
            this.initEventListeners();
        } catch (e) {
            console.error('Event listeners init failed:', e);
        }

        // 5. PWA 기능 (선택적)
        try {
            this.initPWA();
        } catch (e) {
            console.warn('PWA init failed:', e);
        }
    }

    createDummySpeechRecognition() {
        this.speechRecognition = {
            start: () => alert('음성 인식 기능을 사용할 수 없습니다.'),
            stop: () => { },
            speak: () => { },
            stopSpeaking: () => { },
            isListening: false
        };
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

        // 버전 표시 - factChecker가 에러 상태여도 작동해야 함
        if (this.appVersionEl && this.factChecker) {
            this.appVersionEl.textContent = this.factChecker.version || '4.3';
        }
    }

    initEventListeners() {
        // null 체크를 포함한 안전한 이벤트 리스너 등록
        if (this.voiceBtn) {
            this.voiceBtn.addEventListener('click', () => {
                try { this.handleVoiceInput(); } catch (e) { console.error(e); alert('음성 입력 오류'); }
            });
        }

        if (this.checkBtn) {
            this.checkBtn.addEventListener('click', () => {
                try { this.handleCheck(); } catch (e) { console.error(e); }
            });
        }

        if (this.newCheckBtn) {
            this.newCheckBtn.addEventListener('click', () => this.resetForm());
        }

        // 시스템 초기화 버튼 - 가장 중요!
        if (this.resetAppBtn) {
            this.resetAppBtn.addEventListener('click', () => {
                if (confirm('모든 기록을 초기화하고 앱을 다시 시작할까요?')) {
                    try {
                        if (this.factChecker) this.factChecker.clearCache();
                        location.reload(true);
                    } catch (e) {
                        alert('초기화 중 오류가 발생했으나 강제로 새로고침합니다.');
                        location.reload(true);
                    }
                }
            });
        }

        if (this.factInput) {
            this.factInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleCheck();
                }
            });
        }

        if (this.installBtn) {
            this.installBtn.addEventListener('click', () => {
                try { this.handleInstall(); } catch (e) { console.error(e); }
            });
        }

        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.hideInstallModal());
        }

        // 음성 출력 잠금 해제
        const unlockAudio = () => {
            try {
                if (this.speechRecognition && this.speechRecognition.synth) {
                    const u = new SpeechSynthesisUtterance('');
                    this.speechRecognition.synth.speak(u);
                }
            } catch (e) { }
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
    }

    initPWA() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            const hasSeenModal = localStorage.getItem('hasSeenInstallModal');
            if (!hasSeenModal) {
                setTimeout(() => this.showInstallModal(), 3000);
                localStorage.setItem('hasSeenInstallModal', 'true');
            }
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA 설치 완료');
            this.deferredPrompt = null;
        });
    }

    showInstallModal() {
        if (this.installModal) this.installModal.classList.remove('hidden');
    }

    hideInstallModal() {
        if (this.installModal) this.installModal.classList.add('hidden');
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
        this.deferredPrompt = null;
        this.hideInstallModal();
    }

    handleVoiceInput() {
        if (this.speechRecognition.isListening) {
            this.speechRecognition.stop();
            return;
        }

        this.speechRecognition.stopSpeaking();
        this.voiceBtn.classList.add('listening');
        this.voiceBtn.querySelector('.voice-text').textContent = '듣는 중... (클릭하여 완료)';

        this.speechRecognition.start(
            (transcript, isFinal) => {
                if (this.factInput) this.factInput.value = transcript;
            },
            (error) => {
                if (this.voiceBtn) {
                    this.voiceBtn.classList.remove('listening');
                    this.voiceBtn.querySelector('.voice-text').textContent = '음성으로 말하기';
                }
                if (error && error !== 'no-speech' && error !== 'aborted') {
                    console.error('음성 인식 오류:', error);
                    // alert 대신 디버그 패널 사용
                    const debugConsole = document.getElementById('debugConsole');
                    const debugMessage = document.getElementById('debugMessage');
                    if (debugConsole && debugMessage) {
                        debugMessage.textContent = error;
                        debugConsole.style.display = 'block';
                    } else {
                        alert(error); // 패널이 없으면 백업으로 alert
                    }
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
        this.showLoading();
        try {
            const result = await this.factChecker.check(text);
            this.showResult(result);
        } catch (error) {
            this.hideLoading();
            alert(error.message || '오류가 발생했습니다.');
        }
    }

    showLoading() {
        if (this.checkBtn) this.checkBtn.disabled = true;
        if (this.loading) this.loading.classList.remove('hidden');
        if (this.result) this.result.classList.add('hidden');
    }

    hideLoading() {
        if (this.checkBtn) this.checkBtn.disabled = false;
        if (this.loading) this.loading.classList.add('hidden');
    }

    showResult(result) {
        this.hideLoading();
        // TTS
        try {
            const speechText = `${result.title}. ${result.description}`;
            this.speechRecognition.speak(speechText);
        } catch (e) { }

        const html = this.generateResultHTML(result);
        if (this.resultContent) this.resultContent.innerHTML = html;
        if (this.result) {
            this.result.classList.remove('hidden');
            this.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const replayBtn = document.getElementById('replayVoiceBtn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                try {
                    const speechText = `${result.title}. ${result.description}`;
                    this.speechRecognition.speak(speechText);
                } catch (e) { }
            });
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
        if (this.factInput) this.factInput.value = '';
        if (this.result) this.result.classList.add('hidden');
        if (this.factInput) this.factInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// DOM 로드 완료 후 앱 초기화 (비상 안전 장치 포함)
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c[FactWise Luxury v4.3] 시작...', 'color: #D4AF37; font-weight: bold;');
    try {
        window.app = new FactCheckApp();
    } catch (e) {
        console.error('CRITICAL: 앱 초기화 대실패', e);
        alert('앱을 시작하는 도중 심각한 오류가 발생했습니다. 확인을 누르면 시스템을 초기화합니다.');
        // 비상 초기화
        localStorage.clear();
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (let registration of registrations) registration.unregister();
            });
        }
        location.reload(true);
    }
});
