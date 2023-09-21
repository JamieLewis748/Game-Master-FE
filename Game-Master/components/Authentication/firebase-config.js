import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBXQWLUDG9DRfSNDopsWSfHpopnYsx4uUI",
    authDomain: "fir-authentication-f22fe.firebaseapp.com",
    projectId: "fir-authentication-f22fe",
    storageBucket: "fir-authentication-f22fe.appspot.com",
    messagingSenderId: "756297509095",
    appId: "1:756297509095:web:65e03e6741e8cf45a25a42",
    measurementId: "G-JK3RRBS346"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);