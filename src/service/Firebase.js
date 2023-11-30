import { initializeApp } from 'firebase/app';
import config from '../app/config';
import Notify from '../components/Notify'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signOut, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseApp = initializeApp(config.firebaseConfig)
const messaging = getMessaging()
const auth = getAuth()
const firestore = getFirestore()

const unsubscribe  = onAuthStateChanged(auth, (user) => {
    if (user) {
    } else {
    }
});

export const messagingToken = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: config.firebaseVapidKey });
        localStorage.setItem('webDeviceToken', token)
    } catch (err) {
        console.log('Error while getting messaging token', err);
    }
}

export const onMessageListner = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            //console.log('Message Listner from Firebase', payload)
            resolve(payload)
        })
    })
}

export const createAccountWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const loginUserWithEmailAndPassword = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}

export const loginWithGoogle = ()=>{
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
}

export const userDataToFirestore = async (user) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return updateDoc(doc(firestore, "users", user.uid), user);
    } else {
        return setDoc(doc(firestore, "users", user.uid), user);
    }
}

export const emailVerificationLink = () => {
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };
    sendEmailVerification(auth.currentUser).catch((err) => { console.log(err) })
}

export const logout = (()=>{
    return signOut(auth)
    .then(()=>{
        localStorage.setItem('authenticated', false)
    })
})