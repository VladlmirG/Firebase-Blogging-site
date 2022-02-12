// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyBJ2ATlcVqycdEQBiRtFFU3X36RxuxYSnE",
    authDomain: "notake-website.firebaseapp.com",
    projectId: "notake-website",
    storageBucket: "notake-website.appspot.com",
    messagingSenderId: "672967233755",
    appId: "1:672967233755:web:6c3f3d8b614214bc1afcfe"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let auth = firebase.auth();


const logoutUser = () => {
  auth.signOut();
  location.reload();
}