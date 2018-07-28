self.addEventListener('install', function(event) {
    var urlsToCache = [
      '/',
      'js/main.js',
      'css/main.css',
      'imgs/icon.png',
      'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
      'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
    ];
  
    event.waitUntil(
      // TODO: open a cache named 'wittr-static-v1'
      // Add cache the urls from urlsToCache
      caches.open('wittr-static-v1').then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
});

self.addEventListener('fetch', function(event) {
    console.log("New SW");
    console.log(event.request);
    caches.open('wittr-static-v1').then(function(cache){
        cache.match(event.request).then(function(response) {
            return response;
        });
    });

    // event.respondWith(
    //     fetch(event.request).then(function(response) {
    //         if (response.status === 404) {
    //             return fetch('/imgs/dr-evil.gif');
    //         }
    //         return response;
    //     }).catch(function() {
    //         return new Response("Bummer, nothing to display");
    //     })
    // );
});