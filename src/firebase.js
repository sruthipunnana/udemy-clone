
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACsmkqSFCeFglPJF5b_9h5MJiOVCGBzfk",
  authDomain: "udemy-clone-1d6be.firebaseapp.com",
  projectId: "udemy-clone-1d6be",
  storageBucket: "udemy-clone-1d6be.appspot.com",
  messagingSenderId: "379148928633",
  appId: "1:379148928633:web:ea5b865f61e1e977d976a8"
};


//  connect the react to firebase
export const app = firebase.initializeApp(firebaseConfig); 

// connect the react to firestore
export const myDB=  firebase.firestore()