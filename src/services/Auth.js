import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

export default class Auth {
  static async Login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = firebase.auth().currentUser.uid;
      console.log('current', uid);
      const user = await axios.get(
        `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/users/${uid}.json`
      );

      console.log('uer', user);
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

  static async Logout() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log('error', e);
    }
  }

  static async getUID() {
    return localStorage.getItem('uid');
  }

  static async setUID(uid) {
    localStorage.setItem('uid', uid);
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
