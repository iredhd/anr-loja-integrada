
require('dotenv').config();
const fs = require('fs');

const firebaserc = {
  'projects': {
    'default': process.env.REACT_APP_FIREBASE_PROJECT_ID
  }
};

fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc));
