self.addEventListener('install', function(event) {
/*  event.waitUntil(
    caches.open('v5').then(function(cache) {
      return cache.addAll([
        // TODO: populate the cache from the page...not the SW
        'MobyDickNav/css/mobydick.css',
        'MobyDickNav/html/c001.html'
      ]);
    })
  );*/
});



self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      // handle additional fetches for things we did not *explicitly* cache
      // from within book.js (which lives in the Window global scope)
      // TODO: these fetches will hit the cache again...we need to do both...
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        // we add a separate sub-resources area for these bits
        caches.open('web-publication-sub-resources').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        // TODO: find this awesomeness and put it in this repo to handle 404's
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});


// TODO: complete experiment of message-based cache population
// TODO: alternatively use code in book.js to do the cache population
self.addEventListener('message', function (event) {
  console.log('postMessage received', event.data);
  event.waitUntil(
  caches.open('v5').then(function(cache) {
    // TODO: use the message-based info to add to the cache
     return cache.add('MobyDickNav/html/c002.html')
  }));
});
