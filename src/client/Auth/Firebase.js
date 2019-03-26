import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyBrR96oPuOFBuZY2N-WeuzlDxPl8cw5RT0",
    authDomain: "ietracker.firebaseapp.com",
    databaseURL: "https://ietracker.firebaseio.com",
    projectId: "ietracker",
    storageBucket: "ietracker.appspot.com",
    messagingSenderId: "196119604026"
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);

        this.auth = firebase.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
};

export default Firebase;