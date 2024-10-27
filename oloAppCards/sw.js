self.VERSION = '10';
const CACHE_NAME = `oloAppCards_CACHE_v` + self.VERSION;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      'conanSito.html'
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
         // cache.put(event.request, fetchResponse.clone());

        if (
            event.request.url.startsWith('chrome-extension') ||
            event.request.url.includes('extension') ||
            !(event.request.url.indexOf('http') === 0)
        ) return;
          //lo sposto qui
        cache.put(event.request, fetchResponse.clone());
          
          return fetchResponse;
        } catch (e) {
          // The network failed.                    
          console.log('The network failed:');
		      console.log(e);
        }
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.source.postMessage({ type: 'VERSION', version: self.VERSION });
  }
});
