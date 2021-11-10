/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-2451eec';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./povidky_z_jedne_kapsy_001.html","./povidky_z_jedne_kapsy_002.html","./povidky_z_jedne_kapsy_005.html","./povidky_z_jedne_kapsy_007.html","./povidky_z_jedne_kapsy_006.html","./povidky_z_jedne_kapsy_008.html","./povidky_z_jedne_kapsy_009.html","./povidky_z_jedne_kapsy_010.html","./povidky_z_jedne_kapsy_011.html","./povidky_z_jedne_kapsy_012.html","./povidky_z_jedne_kapsy_013.html","./povidky_z_jedne_kapsy_014.html","./povidky_z_jedne_kapsy_015.html","./povidky_z_jedne_kapsy_016.html","./povidky_z_jedne_kapsy_018.html","./povidky_z_jedne_kapsy_019.html","./povidky_z_jedne_kapsy_017.html","./povidky_z_jedne_kapsy_020.html","./povidky_z_jedne_kapsy_021.html","./povidky_z_jedne_kapsy_022.html","./povidky_z_jedne_kapsy_023.html","./povidky_z_jedne_kapsy_024.html","./povidky_z_jedne_kapsy_025.html","./povidky_z_jedne_kapsy_026.html","./povidky_z_jedne_kapsy_027.html","./povidky_z_jedne_kapsy_028.html","./povidky_z_jedne_kapsy_029.html","./povidky_z_jedne_kapsy_030.html","./povidky_z_jedne_kapsy_031.html","./povidky_z_jedne_kapsy_032.html","./povidky_z_jedne_kapsy_033.html","./resources.html","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/index.xml","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
