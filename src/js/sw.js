var CACHE_NAME = 'rj-cache-v1';
var urlsToCache = [
    '/',
    '/js',
    '/css',
    '/fonts',
    '/img',
    '/music'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache)
            })
    );
});