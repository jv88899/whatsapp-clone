import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyD0ArWFpUXz0jNDS2z2wEqGAde2iZSFYZw",
  authDomain: "whatsapp-clone-1abf3.firebaseapp.com",
  projectId: "whatsapp-clone-1abf3",
  storageBucket: "whatsapp-clone-1abf3.appspot.com",
  messagingSenderId: "639620617052",
  appId: "1:639620617052:web:2c877b37401b638b0a6799",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};
