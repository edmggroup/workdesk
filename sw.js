// Caches the app shell so Workdesk opens on a flaky connection and can be
// installed to the home screen. Data calls to script.google.com are never cached.
// Bump CACHE_NAME only when manifest.json or this file changes.
const CACHE_NAME = 'workdesk-shell-v3';
const SHELL = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
// Each file is cached on its own, so one missing file (e.g. an icon) can't stop the app from installing.
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null))))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(n => Promise.all(n.filter(x => x !== CACHE_NAME).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin || url.search) return;
  // network first, cache as fallback — so a new deployment shows up straight away
  e.respondWith(fetch(e.request).then(r => { if (r && r.status === 200) { const c = r.clone(); caches.open(CACHE_NAME).then(x => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
});
