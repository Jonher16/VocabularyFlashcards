# Vocabulary Flashcards

Simple vocabulary flashcard app. It is connected to a firebase database and has firebase login system. Each user can create lists of vocabulary cards and add custom cards to each list. For now, it is only optimized for Japanese. WIP.

## Installation

First of all, create a ```firebase.js``` file in the /src folder and add this piece of code to it:

```
import firebase from "firebase"

const firebaseConfig = {
    "ADD YOUR FIREBASE CONFIG HERE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();

  export {auth, provider, db}
```
Create a firebase database with your Google account and copy and paste the firebase config into the code above. This will make the app be linked to it.
For information on how to create a firebase database, visit https://firebase.google.com/docs/

After doing this, just enter, install dependencies and run the app by executing:
```
npm install
npm start
```
