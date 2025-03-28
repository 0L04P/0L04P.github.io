const CACHE_NAME = `onePieceSitoCache_v6`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      'onePieceSito.html'
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
