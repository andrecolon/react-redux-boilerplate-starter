import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});
// export const startLogin = () => {
//   return () => {
//     return firebase.auth().signInWithPopup(googleAuthProvider);
//   }
// }

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

export const logout = () => ({
  type: 'LOGOUT',
});

// LONG
// export const startLogout = () => {
//   return () => {
//     return firebase.auth().signOut();
//   }
// }

// SHORT
export const startLogout = () => () => firebase.auth().signOut();
