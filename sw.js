self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Chrome will apparently check for chrome-extension:// URLs...who knew?!
  if (event.request.url.startsWith('chrome-extension')) return;
  event.respondWith(caches.match(event.request).then(function(response) {
    let fetchPromise = fetch(event.request).then(function (response) {
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      let responseClone = response.clone();

      // we add a separate sub-resources area for these bits
      caches.open('web-publication').then(function (cache) {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(function () {
      // TODO: find this awesomeness and put it in this repo to handle 404's
      return caches.match('/sw-test/gallery/myLittleVader.jpg');
    });

    return response || fetchPromise;
  }));
});
