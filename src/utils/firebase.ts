import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from 'src/config';

if (!firebase.apps.length) {
  //99firebase.initializeApp(firebaseConfig);
}

export default firebase;
