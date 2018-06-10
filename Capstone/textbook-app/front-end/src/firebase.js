import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC9cOneduBiRb_pI9Lr5MNrHvytrqYDbsA",
  authDomain: "my-project-danielle.firebaseapp.com",
  databaseURL: "https://my-project-danielle.firebaseio.com",
  projectId: "my-project-danielle",
  storageBucket: "my-project-danielle.appspot.com",
  messagingSenderId: "890274670267"
};
firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth