import firebase from 'firebase/app';
import 'firebase/auth';
import { Auth } from '.';

export default class User {
  static async getUser() {
    const uid = await Auth.getUID();
    console.log('uid', uid);
    firebase.auth().getUser(uid);
  }
}
