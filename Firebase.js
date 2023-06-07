import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA_ViuMLGI1hyu3vTPpXPLZyM_glH9pkjU',
  authDomain: 'restaurantekaren-bc29b.firebaseapp.com',
  databaseURL: 'https://restaurantekaren-bc29b-default-rtdb.firebaseio.com',
  projectId: 'restaurantekaren-bc29b',
  storageBucket: 'restaurantekaren-bc29b.appspot.com',
  messagingSenderId: '86617007754',
  appId: '1:86617007754:web:c6a783e7fc978bbd52ef73',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
