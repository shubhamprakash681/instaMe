import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

export const googleLoginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};


// const listAllUsers = (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   auth
//     .listUsers(1000, nextPageToken)
//     .then((listUsersResult) => {
//       listUsersResult.users.forEach((userRecord) => {
//         console.log('user', userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch((error) => {
//       console.log('Error listing users:', error);
//     });
// };
// // Start listing users from the beginning, 1000 at a time.
// listAllUsers();