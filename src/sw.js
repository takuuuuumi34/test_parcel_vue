const version = "1.0.0"
const CACHE = version + '::PWAsite'
const ORIGIN = location.protocol + '//' + location.hostname;
const STATIC_FILES = [
  ORIGIN + "/",
  ORIGIN + "/index.html",
  ORIGIN + "/2fc397f26a1b76824c8ea93f5e051b0f.js",
  ORIGIN + "/7773ab89af7fcdc9d879da3bea032573.js",
  ORIGIN + "/d412d55f28519c0115f42b4906bc52a9.js",
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      // return cache.addAll([
      //   'index.html',
      // ]);
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});


function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    });
}

self.addEventListener('activate', event => {
  console.log('service worker: activate');
    // delete old caches
  event.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', function(event) {
  console.log('service worker: fetch');
  console.log(event);
  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
    // caches.match() always resolves
    // but in case of success response will have value
    // if (response !== undefined) {
    //   return response;
    // } else {
    //   console.log(response);
    //   return fetch(new Request(event.request), { cache: 'no-cache', mode: 'no-cors' }).then(function (response) {
    //     // response may be used only once
    //     // we need to save clone to put one copy in cache
    //     // and serve second one
    //     let responseClone = response.clone();
        
    //     caches.open(CACHE).then(function (cache) {
    //       cache.put(event.request, responseClone);
    //     });
    //     return response;
    //   }).catch(function () {
    //     return caches.match('index.html');
    //   });
    // }
  }));
});