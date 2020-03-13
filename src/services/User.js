import firebase from 'firebase/app';
import 'firebase/auth';

export default class User {
  static async getUser(id) {
    const db = firebase.firestore();

    const userDoc = await db.collection('users').doc(id).get();
    const user = userDoc.data();

    return user;
  }
}
