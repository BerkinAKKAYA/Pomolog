const CACHE_NAME = "version-1";
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/login.css',
    '/js/Authentication.js',
    '/js/ChartManager.js',
    '/js/Clock.js',
    '/js/ColorToggle.js',
    '/js/Database.js',
    '/js/LogManager.js',
    '/js/MonthSelectorButtons.js',
    '/js/TabDisplay.js',
    '/js/Utils.js'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => {
            console.log("Cache", CACHE_NAME, "opened.");
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => { return response || fetch(event.request); })
            .catch(error => console.log("Error!", error))
    );
});