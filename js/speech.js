// 네이티브 SpeechRecognition API 참조 저장 (이름 충돌 방지)
const NativeSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 음성 인식 기능
class FactCheckVoice {
    constructor() {
        // 브라우저 호환성 확인
        this.recognition = null;
        this.isListening = false;

        if (NativeSpeechRecognition) {
            this.recognition = new NativeSpeechRecognition();
        }

        if (this.recognition) {
            this.setupRecognition();
        }

        // TTS (Text-to-Speech) 지원 확인
        this.synth = window.speechSynthesis;
    }

    setupRecognition() {
        // 한국어 설정
        this.recognition.lang = 'ko-KR';

        // 연속 인식 (사용자 요청: 너무 빨리 끊기지 않게)
        this.recognition.continuous = true;

        // 중간 결과 표시
        this.recognition.interimResults = true;

        // 최대 대안 개수
        this.recognition.maxAlternatives = 1;
    }

    start(onResult, onError) {
        if (!this.recognition) {
            onError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해주세요.');
            return;
        }

        if (this.isListening) {
            this.stop();
            return;
        }

        this.isListening = true;

        // 결과 처리
        this.recognition.onresult = (event) => {
            let transcript = '';
            let isFinal = false;

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    isFinal = true;
                }
            }

            onResult(transcript, isFinal);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);

            let errorMessage = '음성 인식 중 오류가 발생했습니다.';

            switch (event.error) {
                case 'no-speech':
                    // no-speech 에러는 자동 재시작 (더 오래 기다리기 위해)
                    console.log('No speech detected, restarting...');
                    if (this.isListening) {
                        // 잠시 후 재시작
                        setTimeout(() => {
                            if (this.isListening) {
                                try {
                                    this.recognition.start();
                                } catch (e) {
                                    console.error('Failed to restart recognition:', e);
                                }
                            }
                        }, 100);
                    }
                    return; // 에러 메시지 표시하지 않음
                case 'audio-capture':
                    errorMessage = '마이크를 찾을 수 없습니다. 마이크를 연결해주세요.';
                    this.isListening = false;
                    break;
                case 'not-allowed':
                    errorMessage = '마이크 사용 권한이 필요합니다. 브라우저 설정에서 권한을 허용해주세요.';
                    this.isListening = false;
                    break;
                case 'network':
                    errorMessage = '네트워크 연결 상태를 확인해주세요. (구글 서버 연결 실패)';
                    this.isListening = false;
                    break;
                case 'service-not-allowed':
                    errorMessage = '브라우저가 음성 인식을 차단했습니다.<br><br>1. <strong>Chrome 브라우저</strong>를 사용해주세요.<br>2. <strong>HTTPS 보안 연결</strong>인지 확인해주세요.<br>3. 광고 차단기나 백신이 막고 있을 수 있습니다.';
                    this.isListening = false;
                    break;
                case 'aborted':
                    errorMessage = null; // 사용자가 중단한 경우 메시지 생략
                    this.isListening = false;
                    break;
                default:
                    this.isListening = false;
                    break;
            }

            if (errorMessage) {
                // 디버깅을 위해 에러 코드 포함
                onError(`${errorMessage} (에러 코드: ${event.error})`);
            } else {
                // 알 수 없는 에러
                onError(`알 수 없는 오류가 발생했습니다. (에러 코드: ${event.error})`);
            }
        };

        // 인식 종료 처리
        this.recognition.onend = () => {
            // continuous 모드에서 자동 재시작
            if (this.isListening) {
                console.log('Recognition ended, restarting...');
                setTimeout(() => {
                    if (this.isListening) {
                        try {
                            this.recognition.start();
                        } catch (e) {
                            console.error('Failed to restart recognition:', e);
                            this.isListening = false;
                        }
                    }
                }, 100);
            }
        };

        try {
            this.recognition.start();
        } catch (error) {
            this.isListening = false;
            onError('음성 인식을 시작할 수 없습니다.');
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    // TTS: 텍스트를 음성으로 읽기
    speak(text) {
        if (!this.synth) return;

        // 진행 중인 모든 음성 중단
        this.stopSpeaking();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    // 음성 출력 중단
    stopSpeaking() {
        if (this.synth && this.synth.speaking) {
            this.synth.cancel();
        }
    }
}

// 전역으로 내보내기
window.FactCheckVoice = FactCheckVoice;
