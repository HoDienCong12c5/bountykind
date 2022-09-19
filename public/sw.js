self.addEventListener("install", function (event) {
    console.log("Hello world from the Service Worker 🤙");
});

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            '../static'
        ]);
    });
}