// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/zero-labs/MobyDickNav/sw.js', { scope: '/zero-labs/MobyDickNav/' }).then(function(reg) {

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

// create a list of primary publication resources, 
// which could be sent to the service worker
var spine = document.querySelectorAll("nav[role='doc-toc'] a");
var manifestArray = [];
      for (var spineItem of spine) {
          manifestArray.push(spineItem.href)
          };

// send a message to a service worker
function sendMessage(message) {
    navigator.serviceWorker.controller.postMessage(message);
  };
