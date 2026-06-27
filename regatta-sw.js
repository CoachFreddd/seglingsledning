const CACHE_NAME = "regattaapp-offline-v3";
const APP_ASSETS = [
  "./",
  "./regattaapp_37.html",
  "./ledning.html",
  "./admin.html",
  "./flags/flag-1.png",
  "./flags/flag-2.png",
  "./flags/flag-3.png",
  "./flags/Flag-A.png",
  "./flags/Flag-AP.png",
  "./flags/flag-firstlikehts.png",
  "./flags/Flag-H.png",
  "./flags/Flag-i.png",
  "./flags/Flag-N.png",
  "./flags/Flag-P.png",
  "./flags/Flag-Svart.png",
  "./flags/Flag-U.png",
  "./flags/Flag-X.png",
  "./flags/Flag-Z.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./regattaapp_37.html"));
    })
  );
});
