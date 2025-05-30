self.VERSION = '58';
const CACHE_NAME = `oloAppCards_CACHE` + self.VERSION;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        '/',
        '/oloTraduzioni.html',
        '/oloAppCards.html',
        '/oloTraduzioni.js',
        '/oloAppCards.js',
        '/fallback.html', // Ensure fallback.html is cached
      ]);
      self.skipWaiting(); // Immediately activate the new service worker
    } catch (e) {
      console.error('Failed to pre-cache resources during install:', e);
    }
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('oloAppCards_CACHE') && name !== CACHE_NAME)
        .map(name => caches.delete(name))
    );
    self.clients.claim(); // Take control of open clients
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    
    try {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;

      const fetchResponse = await fetch(event.request);
      
      if (
        event.request.method !== 'GET' || 
        event.request.url.startsWith('chrome-extension') ||
        event.request.url.includes('extension') ||
        !(event.request.url.indexOf('http') === 0)
      ) {
        return fetchResponse;
      }

      cache.put(event.request, fetchResponse.clone());
      return fetchResponse;
    } catch (e) {
      console.error('Fetch failed; returning fallback page:', e);
      return caches.match('/fallback.html');
    }
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ type: 'VERSION', version: self.VERSION });
  }
});


/* old
self.VERSION = '52';
const CACHE_NAME = `oloAppCards_CACHE` + self.VERSION;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
		'/',
		'/oloTraduzioni.html',
		'/oloAppCards.html',
		'/oloTraduzioni.js',
		'/oloAppCards.js',
      ]);
    } catch (e) {
      console.error('Failed to pre-cache resources during install:', e);
    }
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const fetchResponse = await fetch(event.request);

      if (
        event.request.url.startsWith('chrome-extension') ||
        event.request.url.includes('extension') ||
        !(event.request.url.indexOf('http') === 0)
      ) return fetchResponse;

      cache.put(event.request, fetchResponse.clone());
      return fetchResponse;
    } catch (e) {
      console.error('Fetch failed; returning fallback page:', e);
      return caches.match('/fallback.html');
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.source.postMessage({ type: 'VERSION', version: self.VERSION });
  }
});
*/
