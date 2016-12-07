var CACHE_VERSION = "1",
	assests = [
		'/',
		'/ext.js',
		'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-classic-sandbox/resources/theme-classic-sandbox-all-debug.css'
	];

self.addEventListener('install', function (event) {
	console.log('installing cache...');
	event.waitUntil(caches.open(CACHE_VERSION)
		.then(function (cache) {
			console.log('Opened cache...');
			return cache.addAll(assests);
		}));
});

self.addEventListener('fetch', function (event) {
	//debugger;
	console.log('Inside fetch...');
	event.respondWith(
		caches.match(event.request)
		.then(function (response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);

});