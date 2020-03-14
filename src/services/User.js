import firebase from 'firebase/app';

export default class User {
  static async getUser(id) {
    const db = firebase.firestore();

    const userDoc = await db.collection('users').doc(id).get();

    return userDoc.data();
  }
}
