// Kill-switch service worker.
// The previous site registered a cache-first worker ('portfolio-v4'); the new
// site is served without one. This build wipes all caches, unregisters itself,
// and reloads any open clients so returning visitors get the live site.
self.addEventListener('install', function () {
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) {
        clients.forEach(function (client) { client.navigate(client.url); });
      })
  );
});
