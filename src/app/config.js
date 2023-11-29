const config={
    appwrite:{
        url: String(import.meta.env.VITE_APPWRITE_URL),
        projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
        databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
        bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    },
    firebaseConfig :{
        apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
        authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
        databaseURL: String(import.meta.env.VITE_DATABASEURL),
        projectId: String(import.meta.env.VITE_PROJECTID),
        storageBucket: String(import.meta.env.VITE_STORAGEBUCKET),
        messagingSenderId: String(import.meta.env.VITE_MESSAGINSENDERID),
        appId: String(import.meta.env.VITE_APPID),
        measurementId: String(import.meta.env.VITE_MESUREMENTID),
    }

}
export default config



