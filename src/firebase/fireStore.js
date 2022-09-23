import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from "./firebase";
export const db = getFirestore(firebaseApp);

export const submitHandler =
  (user, otherUser, message, setMessage, setMessages) => async (event) => {
    // to prevent page reloading on form data submission
    event.preventDefault();

    if (message && user && otherUser) {
      try {
        await addDoc(collection(db, "Messages"), {
          text: message,
          uid: user.uid,
          avtar_uri: user.photoURL,
          createdAt: serverTimestamp(),
          receiversUId: otherUser,
          transactionBetween: [user.uid, otherUser],
        });
        // console.log("added");
      } catch (err) {
        console.log(err);
        alert(err);
      }

      // message query gen & loading
      loadGeneralMsg(setMessages, user, otherUser);
      // message query gen & loading
    }else if (!otherUser) {
      alert(`Select a user first`)
    }
    setMessage("");
  };

export const addUserToDb = async (user, allUsers) => {
  if (user) {
    // console.log("here2");
    let isCurrentUserAlreadyPresent = allUsers.find((us) => {
      return us.uid === user.uid;
    });
    // console.log("isCurrentUserAlreadyPresent", isCurrentUserAlreadyPresent);

    if (!isCurrentUserAlreadyPresent) {
      try {
        const { uid, email, displayName } = user;
        await addDoc(collection(db, "Users"), {
          uid,
          email,
          displayName,
        });
        console.log("New user added to DB");
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }
};

export const loadGeneralMsg = (setMessages, user, otherUser) => {
  // console.log("user", user);
  // console.log("oterUser", otherUser);
  if (user && otherUser) {
    const q = query(
      collection(db, "Messages"),
      where("transactionBetween", "array-contains", user.uid)
    );
    let allGeneralMessages = [];

    onSnapshot(q, (snap) => {
      allGeneralMessages = snap.docs.map((item) => {
        return item.data();
      });

      let sent = allGeneralMessages.filter((msg) => {
        return (msg.uid === user.uid) && (msg.receiversUId === otherUser);
      });
      // console.log("sent:- ", sent);

      let received = allGeneralMessages.filter((msg) => {
        return (msg.uid === otherUser) && (msg.receiversUId === user.uid);
      });
      // console.log("received:- ", received);

      allGeneralMessages = [...sent, ...received];
      allGeneralMessages = allGeneralMessages.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      // console.log("allGeneralMessages", allGeneralMessages);

      setMessages(
        allGeneralMessages.map((item) => {
          return item;
        })
      );
    });
  }
};


const allUsersQuery = query(collection(db, "Users"));
export const loadAllUsers = (setAllUsers) => {
  let allusersdata = [];
  onSnapshot(allUsersQuery, (snap) => {
    snap.docs.forEach((item) => {
      allusersdata.push(item.data());
    });
    setAllUsers(allusersdata);
  });
};
