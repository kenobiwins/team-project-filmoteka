import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCebWfsV7NOjyL02i7fSXE4AU5yFpXdziw',
  authDomain: 'filmoteka-6b0fa.firebaseapp.com',
  projectId: 'filmoteka-6b0fa',
  storageBucket: 'filmoteka-6b0fa.appspot.com',
  messagingSenderId: '761691286246',
  appId: '1:761691286246:web:7601ab645d132396eb6927',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// init services
const db = getFirestore(app);
console.log(db);
export { db };
