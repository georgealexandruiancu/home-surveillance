import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyALCt4Kjh-IUhFHIn7z57S7j8HJ4YVgcP8",
    authDomain: "proiectunitbv-4c182.firebaseapp.com",
    databaseURL: "https://proiectunitbv-4c182.firebaseio.com",
    projectId: "proiectunitbv-4c182",
    storageBucket: "proiectunitbv-4c182.appspot.com",
    messagingSenderId: "486158175268",
    appId: "1:486158175268:web:0709fb63895983fe331cb1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
// firebase.initializeApp(config);

export default firebase;