"use strict";

const CACHE_NAME = "classic-cards-v2";

const APP_FILES = [
    "./",
    "./index.html",
    "./css/style.css?v=4",
    "./js/app.js?v=6",
    "./manifest.json"
];


/* =========================
   Install
   ========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))

    );

    self.skipWaiting();
});


/* =========================
   Activate
   ========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(
                            cacheName =>
                                cacheName !== CACHE_NAME
                        )
                        .map(
                            cacheName =>
                                caches.delete(cacheName)
                        )

                );

            })

    );

    self.clients.claim();
});


/* =========================
   Fetch
   ========================= */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);

            })

    );

});
