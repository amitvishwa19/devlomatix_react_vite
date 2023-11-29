import config from "../app/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client()
    account;

    constructor() {
        console.log('AuthService Called')
       
        this.client.setEndpoint(config.appwrite.url).setProject(config.appwrite.projectId);
        this.account = new Account(this.client)
    }

    async createAccount( email, password ) {
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password)

            if (userAccount) {
                return userAccount;
            } else {
                return { msg: 'error creating user account' }
            }
            
        } catch (error) {
            console.log('Error while creating appwrite account::', error)
        }
    }

    async login(email, password ) {
        try {
            const user = await this.account.createEmailSession(email, password)
            if (user) {
                return user;
            } else {
                return { msg: 'error login user account' }
            }
        } catch (error) {
            console.log('Error while login appwrite account::', error)
        }
    }

    async getCurrentUser() {
        try {
              const user = await this.account.get()
              return user;
        } catch (error) {
            console.log('Error getting user::', error)
        }
        return null;
    }

    async logout() {
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log('Error logging out::', error)
        }
    }

};

const authService = new AuthService();

export default authService;