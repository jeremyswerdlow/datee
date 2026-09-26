const CACHE_NAME = "datee-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const url = new URL(request.url);
    const isImage =
        url.origin === self.location.origin &&
        /\.(png|jpg|jpeg|gif|webp|svg|avif)$/i.test(url.pathname);

    if (!isImage) {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(request).then((networkResponse) => {
                if (!networkResponse.ok) {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();

                caches.open("datee-images-v1").then((cache) => {
                    cache.put(request, responseToCache);
                });

                return networkResponse;
            });
        }),
    );
});
