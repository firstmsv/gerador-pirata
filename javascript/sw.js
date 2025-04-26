const CACHE_NAME = 'gerador-pirata-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  'https://cdn-icons-png.flaticon.com/512/1995/1995488.png',
  'https://img.freepik.com/free-vector/vintage-paper-texture_1048-10911.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});