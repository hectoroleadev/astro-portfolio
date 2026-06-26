importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js'
);

const { registerRoute, setCatchHandler } = workbox.routing;
const { CacheFirst, NetworkFirst } = workbox.strategies;
const { precacheAndRoute, matchPrecache } = workbox.precaching;

const OFFLINE_URL = '/offline.html';

const cacheFirstRoutes = [
  'https://storage.hectorolea.dev/hector-olea.jpg',
  'https://storage.hectorolea.dev/hector-olea-resume.pdf',
];

precacheAndRoute(self.__WB_MANIFEST);

cacheFirstRoutes.forEach((route) => {
  registerRoute(new RegExp(route), new CacheFirst());
});

// Navigations go to the network first, falling back to cache when offline.
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages' })
);

// When a navigation can't be served (offline + not cached), show the
// precached offline page instead of the browser error screen.
setCatchHandler(async ({ request }) => {
  if (request.destination === 'document') {
    return (await matchPrecache(OFFLINE_URL)) || Response.error();
  }
  return Response.error();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: 'NEW_VERSION' });
    });
  });
});
