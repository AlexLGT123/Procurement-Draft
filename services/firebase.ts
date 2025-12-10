
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKYmQZhxdpvOAbGjKg1wDUqA5799vGCns",
  authDomain: "gen-lang-client-0283240776.firebaseapp.com",
  projectId: "gen-lang-client-0283240776",
  storageBucket: "gen-lang-client-0283240776.firebasestorage.app",
  messagingSenderId: "680970812511",
  appId: "1:680970812511:web:a1933e4ed06721110aefea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.
        console.warn('Firestore persistence failed-precondition: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence unimplemented');
    }
});
