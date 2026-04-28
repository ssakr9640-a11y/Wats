importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCNW8oqQPlWR2xbMEVrUA7D6QxauW5c-OM",
    authDomain: "moalme-1b9fa.firebaseapp.com",
    projectId: "moalme-1b9fa",
    storageBucket: "moalme-1b9fa.firebasestorage.app",
    messagingSenderId: "485521766774",
    appId: "1:485521766774:web:8bdd58741632e2e70b6257"
});

const messaging = firebase.messaging();

// التعامل مع الإشعارات من سيرفر فايربيز لو التطبيق مقفول
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = "مذكراتي الاحترافية 📝";
    const notificationOptions = {
        body: "لقد نسيت تدوين بعض الأفكار الهامة اليوم...",
        icon: "https://cdn-icons-png.flaticon.com/512/732/732214.png",
        tag: "fake_note"
    };
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// فتح التطبيق لما تدوس على الإشعار الوهمي العادي
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.includes(self.registration.scope) && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/'); 
        })
    );
});

self.addEventListener('install', (event) => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
