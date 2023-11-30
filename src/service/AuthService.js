import { messagingToken, createAccountWithEmailAndPassword, userDataToFirestore, emailVerificationLink, loginUserWithEmailAndPassword, logout, loginWithGoogle } from './Firebase'

export class AuthService {

    constructor() {
        try {
            this.appNotificationService()
            console.log('Auth service initialized ')
        } catch (error) {
            console.log('Error initializing AuthService::', error)
        }

    }

    async appNotificationService() {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            messagingToken()
        }
        //messagingToken()  
    }

    async register(email, password) {
        await createAccountWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    emailVerified: false,
                    avatar: user?.photoURL,
                    dnd: false,
                    loggedIn: false,
                    webDeviceToken: localStorage.getItem('webDeviceToken'),
                    mobileDeviceToken: null,
                    LoginType: 'email'
                }
                userDataToFirestore(userData)
                localStorage.setItem('userData', JSON.stringify(userData))
                localStorage.setItem('emailVerified', false)
                localStorage.setItem('authenticated', false)
                emailVerificationLink()
                logout()
            })
    }

    async login(email, password) {
        await loginUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const userData = {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    emailVerified: user?.emailVerified,
                    avatar: user?.photoURL,
                    dnd: false,
                    loggedIn: false,
                    webDeviceToken: localStorage.getItem('webDeviceToken'),
                    mobileDeviceToken: null,
                    LoginType: 'email'
                }
                userDataToFirestore(userData)
                localStorage.setItem('userData', JSON.stringify(userData))
                localStorage.setItem('emailVerified', user?.emailVerified)

            })
    }

    async googleLogin() {
        loginWithGoogle()
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    emailVerified: user?.emailVerified,
                    avatar: user?.photoURL,
                    dnd: false,
                    loggedIn: true,
                    webDeviceToken: localStorage.getItem('webDeviceToken'),
                    mobileDeviceToken: null,
                    LoginType: 'email'
                }
                userDataToFirestore(userData)
                localStorage.setItem('userData', JSON.stringify(userData))
                localStorage.setItem('emailVerified', user?.emailVerified)
                localStorage.setItem('authenticated', true)
            })
    }

    async logout() {


    }


}

const authService = new AuthService();
export default authService;

