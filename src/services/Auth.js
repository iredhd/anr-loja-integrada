import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { User } from '.';

export default class Auth {
  static async Login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const uid = firebase.auth().currentUser.uid;

      const user = await User.getUser(uid);

      return {
        loggedIn: true,
        message: null,
        user: {
          ...user,
          email,
          id: uid
        }
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

  static handleErrors({ code }) {
    let message;

    switch (code) {
      case 'auth/wrong-password':
        message = 'Usuário e/ou senha inválidos';
        break;

      case 'auth/invalid-email':
        message = 'E-mail inválido';
        break;

      case 'auth/user-disabled':
        message = 'Usuário bloqueado';
        break;

      case 'auth/user-not-found':
        message = 'Usuário não encontrado';
        break;

      default:
        message = 'Erro interno, procure o adminstrador do sistema.';
        break;
    }

    return message;
  }
}
