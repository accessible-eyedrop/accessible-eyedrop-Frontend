import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAUZ3O-aB1-njtohuihox7oGunilYoN54s",
    authDomain: "smartdrop-888c8.firebaseapp.com",
    projectId: "smartdrop-888c8",
    storageBucket: "smartdrop-888c8.firebasestorage.app",
    messagingSenderId: "582305410662",
    appId: "1:582305410662:web:b1851cea0b7128d83487a7"
  };
  

// Check if all required config values are present
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing Firebase config value for ${key}`);
  }
});

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;