import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import config from '../app/config'

export class AuthService{
    firebaseApp;
    firebaseAuth;



    constructor(){
        try {
            this.firebaseApp = initializeApp(config.firebaseConfig);
            this.firebaseAuth = getAuth(this.firebaseApp);
            console.log('Firebase service initialized ')
        } catch (error) {
            console.log('Error initializing firebase::', error)
        }

    }



}

const authService = new AuthService();
export default authService;