const VERSION = 4;

//cache all resources when a new service worker of the latest build is comissioned.
const CACHE_NAME = `cra-clone-by-hasan__${VERSION}`;

//install event service worker
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return fetch("resources-manifest.json")
                .then(res => res.json())
                .then(resourcesManifest => {
                    return cache.addAll(['/', ...resourcesManifest]);
                })
        })
    )
})

//activate event service worker
//removes old caches to free memory on hard drive
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(cacheKeys => {
            let removeableKeys = cacheKeys.filter(key => key !== CACHE_NAME)
            removeableKeys.forEach(key => {
                caches.delete(key)
            })
        }).catch(err => {
            console.log(err, err.message)
            return true;
        })
    )
})

//fetch event service worker
//triggered for everything such as static assets, api requests, etc...
function cacheThenToNetwork(e) {
    let cloneEvent = e.request.clone();

    return caches.match(e.request).then(res => {
        return res || fetch(cloneEvent);
    })
};

self.addEventListener("fetch", e => {
    e.respondWith(cacheThenToNetwork(e))
})