import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_W7klDKAsZ-IihvJbQKiDXmL2vc6VH8w",
    authDomain: "interview-prep-c02f6.firebaseapp.com",
    projectId: "interview-prep-c02f6",
    storageBucket: "interview-prep-c02f6.firebasestorage.app",
    messagingSenderId: "975198935448",
    appId: "1:975198935448:web:8b0ee073bd3cec90a273ed",
    measurementId: "G-EXRQ2EDJJ0",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
};

export default app;
