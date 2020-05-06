import firebase from 'firebase/app';
import 'firebase/storage';

export default class Project {
  static async getCourses() {
    const db = firebase.firestore();

    const coursesDoc = await db.collection('courses').get();

    return coursesDoc.docs.map(item => ({
      sku: item.id,
      ...item.data()
    }));
  }

  static async getCourse(id) {
    const db = firebase.firestore();

    const courseData = await db.collection('courses').doc(id).get();

    if (!courseData.exists)  {
      throw new Error('Course not found.');
    }

    const course = courseData.data();
    return {
      sku: id,
      name: course.name,
      link: course.link
    };
  }

  static async upsertCourse(course) {
    const db = firebase.firestore();

    await db.collection('courses').doc(course.sku).set({
      name: course.name,
      link: course.link
    }, { merge: true });

    return course.sku;
  }

  static async deleteCourse(id) {
    const db = firebase.firestore();

    try {
      await db.collection('courses').doc(id).delete();
    } catch (e) {
      console.error(e);
    }
  }
}
