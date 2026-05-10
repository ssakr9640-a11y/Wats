importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCNW8oqQPlWR2xbMEVrUA7D6QxauW5c-OM",
    authDomain: "moalme-1b9fa.firebaseapp.com",
    projectId: "moalme-1b9fa",
    storageBucket: "moalme-1b9fa.firebasestorage.app",
    messagingSenderId: "485521766774",
    appId: "1:485521766774:web:8bdd58741632e2e70b6257"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title || 'رسالة جديدة';
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/564/564445.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/564/564445.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
