// register service worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // path is relative to where book.js is loaded...
    navigator.serviceWorker.register('../sw.js', {
      // strip any file name, so we're scoping for this spot in the hierarchy
      scope: './'
    }).then(function(reg) {

      // TODO: understand these states better, so fauxFrame runs correctly
      if(reg.installing) {
        console.log('Service worker installing');
        fauxFramePrimaryResources();
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
        fauxFramePrimaryResources();
      }
      // setup display options on the toolbar
      checkRegistration();
    }).catch(function(error) {
      // registration failed
      console.error('Registration failed with ' + error);
    });
  }
}
function fauxFramePrimaryResources() {
  console.log('faux framing');
  var spine = document.querySelectorAll("nav[role='doc-toc'] a");

  // start by caching the Table of Contents
  caches.open('web-publication').then((cache) => {
    for (var resource of spine) {
      // undeclared type, so assume it's HTML + dependencies
      if (resource.type === '') {
        // Use hidden iframes to "force" browser to request all the things...
        let iframe = document.createElement('iframe');
        iframe.src = resource.href;
        iframe.style.display = 'none';
        document.body.append(iframe);
        console.log('iframed', resource.href);
      } else {
        console.log('fetching', resource.href);
        // it's got a specific type, so let's just cache it
        cache.add(resource.href)
          .then(() => console.log('successfully cached', resource.href));
      }
    }
  });
}

// inject the pub-bar rel="import"
let pubbar_link = document.createElement('link');
pubbar_link.rel = 'import';
pubbar_link.href = '../pub-bar.html';
document.head.appendChild(pubbar_link);

// add the pub-bar (get it?!)
let pubbar = document.createElement('pub-bar');
// start hidden until the SW's all good and ready
pubbar.style.display = 'none';
document.body.prepend(pubbar);

function checkRegistration() {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (undefined !== reg) {
      pubbar.setAttribute('offline', '');
    } else {
      pubbar.removeAttribute('offline');
    }
    pubbar.style.display = '';
  });
}
checkRegistration();
