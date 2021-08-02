import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDcMSgGLrt12GHHN_pDoBM1-RkE9Uz7228",
  authDomain: "vocabulary-7ddb2.firebaseapp.com",
  projectId: "vocabulary-7ddb2",
  storageBucket: "vocabulary-7ddb2.appspot.com",
  messagingSenderId: "498840376875",
  appId: "1:498840376875:web:d34bd88d2881b9e80bbc6e"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();

  export {auth, provider, db}