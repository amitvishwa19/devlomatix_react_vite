import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, updateDoc,getDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import config from '../app/config'


export class FirebaseService {

    firebaseApp;
    firebaseAuth;
    firestore;
    firebaseMessaging;

    constructor() {
        try {
            this.firebaseApp = initializeApp(config.firebaseConfig);
            this.firebaseAuth = getAuth(this.firebaseApp);
            this.firestore = getFirestore(this.firebaseApp);
            this.firebaseMessaging = getMessaging(this.firebaseApp);
            console.log('Firebase service initialized')
        } catch (error) {
            console.log('Error initializing firebase::', error)
        }
    }

    async getMessagingToken(){
       return await getToken(this.firebaseMessaging, {vapidKey:'BKSXErnEXglVeFiYEtRO5Q4YLvEW0hCzmYz3HQIh4xljUknXbLZm8Or1k5TmiHOOrHNrR_kvdom0KzMhzWhbAHo'})
    }

    async onMessageListner(){
        new Promise(resolve=>{
            onMessage(this.firebaseMessaging, payload=>{
                resolve(payload)
            })
        })
    }

    async createUserWithEmailAndPassword  (email,password){
        return await createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    }

    async logUserDataToFirestore(user){ 
        const docRef = doc(this.firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return updateDoc(doc(this.firestore, "users", user.uid), user);
          } else {
            return setDoc(doc(this.firestore, "users", user.uid), user);
          }
    }
}


const firebaseService = new FirebaseService();

export default firebaseService;



