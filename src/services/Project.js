import firebase from 'firebase/app';
import 'firebase/storage';

export default class Project {
  static async getProjects() {
    const db = firebase.firestore();

    const projectsDoc = await db.collection('projects').get();

    return projectsDoc.docs.map(item => ({
      sku: item.id,
      ...item.data()
    }));
  }

  static async getProject(id) {
    const db = firebase.firestore();
    const storage = firebase.storage().ref();

    const projectData = await db.collection('projects').doc(id).get();

    if (!projectData.exists)  {
      throw new Error('Project not found.');
    }

    const project = projectData.data();
    return {
      sku: id,
      name: project.name,
      encryptableFiles: await Promise.all(project.encryptableFiles.map(async name => {
        return ({
          name: storage.child(name).name,
          fullPath: storage.child(name).fullPath,
          downloadURL: await storage.child(name).getDownloadURL()
        });
      })),
      regularFiles: await Promise.all(project.regularFiles.map(async name => {
        return ({
          name: storage.child(name).name,
          fullPath: storage.child(name).fullPath,
          downloadURL: await storage.child(name).getDownloadURL()
        });
      }))
    };
  }

  static async upsertProject(project) {
    const db = firebase.firestore();
    const storage = firebase.storage().ref();

    const encryptableUploads = await Promise.all(project.encryptableFiles.map(async item => {
      let fullPath =  item.fullPath;

      if (!fullPath) {
        const uploadedItem = await storage.child(`projects/${project.sku}/encryptable/${item.name}`).put(item);
        fullPath = uploadedItem.metadata.fullPath;
      }

      return storage.child(fullPath);
    }));

    const regularUploads = await Promise.all(project.regularFiles.map(async item => {
      let fullPath =  item.fullPath;

      if (!fullPath) {
        const uploadedItem = await storage.child(`projects/${project.sku}/regular/${item.name}`).put(item);
        fullPath = uploadedItem.metadata.fullPath;
      }

      return storage.child(fullPath);
    }));

    await db.collection('projects').doc(project.sku).set({
      name: project.name,
      encryptableFiles: encryptableUploads.map(item => item.fullPath),
      regularFiles: regularUploads.map(item => item.fullPath)
    }, { merge: true });

    return project.sku;
  }

  static async deleteProject(id) {
    const db = firebase.firestore();
    const storage = firebase.storage().ref();

    try {
      await db.collection('projects').doc(id).delete();

      const { items: encryptableFiles } = await storage.child(`projects/${id}/encryptable`).listAll();
      const { items: regularFiles } = await storage.child(`projects/${id}/regular`).listAll();

      await Promise.all(encryptableFiles.map(async file => {
        file.delete();
      }));

      await Promise.all(regularFiles.map(async file => {
        file.delete();
      }));
    } catch (e) {
      console.error(e);
    }
  }
}
