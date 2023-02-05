
import firebase from "firebase/compat/app";
import "firebase/compat/database"

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "studentapp-59858.firebaseapp.com",
  projectId: "studentapp-59858",
  storageBucket: "studentapp-59858.appspot.com",
  messagingSenderId: "684686868175",
  appId: "1:684686868175:web:6fd7601d70567aa639c1ba"
};

// Initialize Firebase
const fireDb =firebase.initializeApp(firebaseConfig);

// export const auth=app.auth()
export default fireDb.database().ref();