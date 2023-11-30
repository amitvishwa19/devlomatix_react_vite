importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");


const firebaseConfig = {
    apiKey: "AIzaSyA0ePkSco3jBKR8Gii2osux9778Ju3WnCo",
    authDomain: "devlomatix-c999c.firebaseapp.com",
    databaseURL: "https://devlomatix-c999c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "devlomatix-c999c",
    storageBucket: "devlomatix-c999c.appspot.com",
    messagingSenderId: "670445737708",
    appId: "1:670445737708:web:b83be4dfaa907e6c43b7c9",
    measurementId: "G-QEL0EDSYM0"
};

const app = firebase.initializeApp(firebaseConfig)


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});