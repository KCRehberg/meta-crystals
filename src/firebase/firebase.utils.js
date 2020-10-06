import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD4QRV4ypcomA43kISHmY6ci8pOGFs7XmU',
  authDomain: 'meta-crystals.firebaseapp.com',
  databaseURL: 'https://meta-crystals.firebaseio.com',
  projectId: 'meta-crystals',
  storageBucket: 'meta-crystals.appspot.com',
  messagingSenderId: '1005839015079',
  appId: '1:1005839015079:web:96a4219a74ec11a9e10f82',
  measurementId: 'G-18RK25NX0H',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
