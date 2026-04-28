const CACHE_NAME = 'vault-cache-v1';

// لما المستخدم يدوس على الإشعار الوهمي
self.addEventListener('notificationclick', function(event) {
    // نقفل الإشعار من الشاشة
    event.notification.close();

    // ندور لو التطبيق مفتوح في أي تابة في الخلفية، نجيبه قدام
    // لو مش مفتوح، نفتح تابة جديدة للتطبيق
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                // لو لاقاه مفتوح بيعمل فوكس عليه
                if (client.url.includes(self.registration.scope) && 'focus' in client) {
                    return client.focus();
                }
            }
            // لو مش مفتوح خالص، بيفتحه من جديد
            if (clients.openWindow) {
                return clients.openWindow('/'); 
            }
        })
    );
});

// تثبيت الـ Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
