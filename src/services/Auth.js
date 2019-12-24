import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

export default class Auth {
  static async Login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      return {
        loggedIn: true,
        message: null
      };
    } catch (error) {
      const message = this.handleErrors(error);

      return {
        loggedIn: false,
        message
      };
    }
  }

  static handleErrors({ code }) {
    let message;

    switch (code) {
      case 'auth/wrong-password':
        message  = 'Usuário e/ou senha inválidos';
        break;

      case 'auth/invalid-email':
        message  = 'E-mail inválido';
        break;

      case 'auth/user-disabled':
        message  = 'Usuário bloqueado';
        break;

      case 'auth/user-not-found':
        message  = 'Usuário não encontrado';
        break;

      default:
        message  = 'Erro interno, procure o adminstrador do sistema.';
        break;
    }

    return message;
  }
}
