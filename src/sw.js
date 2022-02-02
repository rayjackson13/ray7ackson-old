var CACHE_NAME = 'rj-cache-v1';
var urlsToCache = [ 
    '/',
    '/css/bootstrap.css',
    '/css/style.css',
    '/fonts/Acme-Regular.ttf',
    '/fonts/Gilroy-Light.otf',
    '/fonts/gilroy.otf',
    '/img/arrow.svg',
    '/img/audio/bg.jpg',
    '/img/bg.jpeg',
    '/img/bg-new.jpeg',
    '/img/favicon/android-chrome-192x192.png',
    '/img/favicon/android-chrome-512x512.png',
    '/img/favicon/apple-touch-icon.png',
    '/img/favicon/browserconfig.xml',
    '/img/favicon/favicon-16x16.png',
    '/img/favicon/favicon-32x32.png',
    '/img/favicon/favicon.ico',
    '/img/favicon/mstile-144x144.png',
    '/img/favicon/mstile-150x150.png',
    '/img/favicon/mstile-310x150.png',
    '/img/favicon/mstile-310x310.png',
    '/img/favicon/mstile-70x70.png',
    '/img/favicon/safari-pinned-tab.svg',
    '/img/favicon/site.webmanifest',
    '/img/home.jpg',
    '/img/me.jpg',
    '/img/music.jpg',
    '/img/player.jpg',
    '/img/quiet.png',
    '/img/slide2.jpg',
    '/img/ss.jpg',
    '/index.html',
    '/js/index.js',
    '/lib/bootstrap.min.css',
    '/lib/fa.min.js',
    '/lib/slick.css',
    '/manifest.json',
    '/sw.js' 
]

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache)
            })
            .then(() => self.skipWaiting())
    );
    console.log('%cSW: Installed.', '#f5a623');
});

self.addEventListener('fetch', function(event) {
    console.log('%cSW: Fetch.', '#f5a623');
    event.respondWith(networkOrCache(event.request)
        .catch(() => useFallback()));
});

self.addEventListener('activate', function(event) {
    console.log('%cSW: Activated.', '#f5a623');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('idle', function(e) {
    console.log('%cSW: Idle.', '#f5a623');
});

self.addEventListener('terminate', function(e) {
    console.log('%cSW: Terminated.', '#f5a623');
});

self.addEventListener('error', function(e) {
    console.log('%cSW: Error.', '#f5a623');
});

function networkOrCache(request) {
    return fetch(request)
        .then(function(response) {
            return response.ok ? response : fromCache(request);
        })
        .catch(function() { return fromCache(request) });
}

const FALLBACK =
    '<div>\n' +
    '    <div>App Title</div>\n' +
    '    <div>you are offline</div>\n' +
    '    <img src="/svg/or/base64/of/your/dinosaur" alt="dinosaur"/>\n' +
    '</div>';

// Он никогда не упадет, т.к мы всегда отдаем заранее подготовленные данные.
function useFallback() {
    return Promise.resolve(new Response(FALLBACK, { headers: {
        'Content-Type': 'text/html; charset=utf-8'
    }}));
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}
