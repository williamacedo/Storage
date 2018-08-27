import firebase from 'firebase';

let config = {
   apiKey: "AIzaSyCStywi2WBlq4U6PbfDQ01zkSDWWCZGLwg",
   authDomain: "projeto-teste-4354f.firebaseapp.com",
   databaseURL: "https://projeto-teste-4354f.firebaseio.com",
   projectId: "projeto-teste-4354f",
   storageBucket: "projeto-teste-4354f.appspot.com",
   messagingSenderId: "949847838320"
 };

firebase.initializeApp(config);

export default firebase;
