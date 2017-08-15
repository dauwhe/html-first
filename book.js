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
  var manifestArray = ['./'];
  for (var spineItem of spine) {
    manifestArray.push(spineItem.href)
  }

  // Use hidden iframes to "force" browser to request all the things...
  manifestArray.forEach((item) => {
    let iframe = document.createElement('iframe');
    iframe.src = item;
    iframe.style.display = 'none';
    document.body.append(iframe);
  });
}

let button = document.createElement('button');
button.id = 'keep-web-publication';
button.innerText = 'Keep This Book (offline)';
// populate the cache with the bits from the nav
button.onclick = function() {
  registerServiceWorker();
}

let message = document.createElement('div');
message.id = 'kept-web-publication';
message.style.background = '#efefef';
message.innerText = 'You have kept a copy of this Web Publication.';

// TODO: Add update button

let toolbar = document.createElement('nav');
toolbar.id = 'web-publication-toolbar';
toolbar.style.border = '1px solid blue';
toolbar.style.display = 'none';
toolbar.append(button, message);

// TODO: add .append()/.prepend() shims...this doesn't work in Edge...yet?
document.body.prepend(toolbar);

function checkRegistration() {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (undefined !== reg) {
      message.style.display = '';
      button.style.display = 'none';
    } else {
      message.style.display = 'none';
      button.style.display = '';
    }
    toolbar.style.display = '';
  });
}
checkRegistration();
