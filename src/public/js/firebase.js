// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDDTGeGd3BXjoLaO4KOwJv1x4RNiX56jD0",
  authDomain: "adrianqr-a4ca1.firebaseapp.com",
  databaseURL: "https://adrianqr-a4ca1-default-rtdb.firebaseio.com",
  projectId: "adrianqr-a4ca1",
  storageBucket: "adrianqr-a4ca1.appspot.com",
  messagingSenderId: "881410179094",
  appId: "1:881410179094:web:2c1f9de1821fa73865b537",
  measurementId: "G-9PS1LH72CX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const fs = firebase.firestore();
//firebase.analytics();