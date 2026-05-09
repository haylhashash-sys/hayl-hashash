/*
 * ============================================================
 * HAYL HASHASH — Service Worker
 * © 2025 Hayl Hashash. جميع الحقوق محفوظة.
 * لا يجوز إعادة النشر أو التعديل بدون إذن صريح.
 * ============================================================
 */

const CACHE_NAME = 'hayl-hashash-v11';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES.map(f => new Request(f, { cache: 'reload' })));
    }).catch(() => caches.open(CACHE_NAME).then(c => c.addAll(['./','./index.html'])))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
