const CACHE_NAME = 'factwise-v4.9';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css?v=4.9',
    '/js/app.js?v=4.9',
    '/js/speech.js?v=4.9',
    '/js/fact-data.js?v=4.9',
    '/js/factcheck.js?v=4.9'
];

// 설치 이벤트
self.addEventListener('install', (event) => {
    console.log('Service Worker 설치 중...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('캐시 열기 완료');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('캐시 추가 실패:', error);
            })
    );

    // 즉시 활성화
    self.skipWaiting();
});

// 활성화 이벤트
self.addEventListener('activate', (event) => {
    console.log('Service Worker 활성화 중...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('모든 캐시 강제 삭제:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );

    // 즉시 제어 시작
    return self.clients.claim();
});

// Fetch 이벤트 - 네트워크 우선 전략
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // 성공적인 응답이면 캐시에 저장
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // 네트워크 실패 시 캐시에서 반환
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }

                        // 캐시에도 없으면 오프라인 페이지 반환 (선택적)
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});
