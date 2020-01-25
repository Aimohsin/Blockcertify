import firebase from 'firebase/app'
import 'firebase/auth'

//const settings = {timestampsInSnapshots: true};
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBNCcpn85P82VUStZMF2Z35H9dEZnXuLRE",
    authDomain: "fyp-dvs.firebaseapp.com",
    databaseURL: "https://fyp-dvs.firebaseio.com",
    projectId: "fyp-dvs",
    storageBucket: "fyp-dvs.appspot.com",
    messagingSenderId: "121063323212",
    appId: "1:121063323212:web:3f046238def54053a726e9",
    measurementId: "G-BV97CF26KW"
};
firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings(settings);

export default firebase;
// Initialize Firebase

