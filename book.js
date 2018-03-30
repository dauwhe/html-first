if ('serviceWorker' in navigator) {
  // path is relative to where book.js is loaded...
  navigator.serviceWorker.register('../sw.js', {
    // strip any file name, so we're scoping for this spot in the hierarchy
    scope: './'
  }).then(function(reg) {

    // TODO: understand these states better, so fauxFrame runs correctly
    if(reg.installing) {
      console.log('Service worker installing');
      keep();
    } else if(reg.waiting) {
      console.log('Service worker installed');
      keep();
    } else if(reg.active) {
      console.log('Service worker active');
      keep();
    }
  }).catch(function(error) {
    // registration failed
    console.error('Registration failed with ' + error);
  });
}

let publication_path = location.pathname;
let pathname_array = location.pathname.split('/');
if (pathname_array[pathname_array.length-1] !== "") {
  // there's something on the end of the path...probably a "filename"
  // first, remove the filename
  pathname_array.pop();
  // then, put things back together and add the trailing slash
  publication_path = pathname_array.join('/') + '/';
}

function collectSpine() {
  let nav = document.querySelectorAll("nav[role='doc-toc'] a");
  let spine = [];
  for (let resource of nav) {
    spine.push({
      href: resource.href,
      type: resource.type
    });
  }
  return spine;
}

function checkCachedStatus(cache) {
//  let toolbar = document.getElementById('web-publication-toolbar');
  let spine = collectSpine();
  for (let resource of spine) {
    cache.match(resource.href).then((response) => {
      if (undefined !== response && response.status === 200) {
        // let's just make sure anything's in here for now...
        console.log(resource.href, response.status);
        return;
      }
    });
  }
}

// either iframe (and collect via fetch-listner in SW) or directly add to cache
function fauxFrame(resource) {
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

function keep() {
  let spine = collectSpine();
  // start by caching the Table of Contents
  // TODO: install a separate ServiceWorker to handle these requests?
  caches.open(publication_path).then((cache) => {
    spine.map((resource) => {
      // check cache before fauxFraming
      cache.match(resource.href).then((response) => {
        if (undefined === response || response.status !== 200) {
          // cache miss or failure, so fauxFrame
          fauxFrame(resource);
        } else {
          console.log('already cached', resource.href);
        }
      });
    });
  });
}

function discard() {
  caches.delete(publication_path).then((status) => {
    console.log('deleted?', status);
  });
}
