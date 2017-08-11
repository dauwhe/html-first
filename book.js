// register service worker

if ('serviceWorker' in navigator) {
  // path is relative to where book.js is loaded...
  navigator.serviceWorker.register('../sw.js', {
    scope: location.pathname
  }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

var button = document.createElement('button');
button.innerText = 'Keep This Book (offline)';

// populate the cache with the bits from the nav
button.onclick = function() {
  // create a list of primary publication resources
  var spine = document.querySelectorAll("nav[role='doc-toc'] a");
  var manifestArray = [];
  for (var spineItem of spine) {
    manifestArray.push(spineItem.href)
  };
  // add them all to the cache
  caches.open('web-publication').then((cache) => {
    cache.addAll(manifestArray).then(console.log);
  });
}
// TODO: add a .prepend() shim...this doesn't work in Edge...yet?
document.body.prepend(button);
