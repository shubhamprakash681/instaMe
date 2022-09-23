import {
  Box,
  Container,
  Input,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { createRef, useEffect } from "react";
import { useState } from "react";
import "./app.css";
import LoginPage from "./Components/LoginPage";
import Message from "./Components/Message";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/loginHandler";
import { logoutHandler } from "./firebase/logoutHandler";
import {
  addUserToDb,
  loadAllUsers,
  submitHandler,
  loadGeneralMsg,
} from "./firebase/fireStore";
import SideBar from "./Components/SideBar";

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [otherUser, setOtherUser] = useState();

  useEffect(() => {
    loadAllUsers(setAllUsers);

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    // message query gen & loading
    loadGeneralMsg(setMessages, user, otherUser);
    // message query gen & loading

    // to run also on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // message query gen & loading
    loadGeneralMsg(setMessages, user, otherUser);
    // message query gen & loading
  }, [user, otherUser]);

  // automatic scrolling to div end
  const [hbgActive, setHbgActive] = useState(false);
  const messageEndRef = createRef();
  useEffect(() => {
    const scrollToBottom = () => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({
          behaviour: "smooth",
        });
      }
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // console.log("user: ", user);
    // console.log("allusers:- ", allUsers);
    addUserToDb(user, allUsers);
  }, [allUsers]);

  return (
    <>
      <Box className="box">
        {user ? (
          <Container h={"100vh"} bg={"white"}>
            {hbgActive && (
              <SideBar
                allUsers={allUsers}
                setOtheruser={setOtherUser}
                setHbgActive={setHbgActive}
              />
            )}

            {/* div with vertical flex display */}
            <VStack h={"full"} className="v-stack-1">
              <HStack className="top-container" w={"full"}>
                <HamburgerIcon
                  id="hbg-icon"
                  onClick={() => setHbgActive(!hbgActive)}
                />
                <Button
                  className="btn"
                  onClick={logoutHandler}
                  bg={"rgb(227, 108, 126)"}
                >
                  Logout
                </Button>
              </HStack>

              <VStack
                h={"full"}
                w={"full"}
                className="v-stack-2"
                onClick={() => {
                  if (hbgActive) {
                    setHbgActive(!hbgActive);
                  }
                }}
              >
                {otherUser ? (
                  messages.map((item, index) => {
                    return (
                      <Message
                        key={index}
                        avtar_uri={item.avtar_uri}
                        text={item.text}
                        user={item.uid === user.uid ? "self" : "other"}
                      />
                    );
                  })
                ) : (
                  <div className="initial-screen">
                    <h1>Welcome to InstaMe</h1>
                    <p>Select a user to access chat</p>
                  </div>
                )}

                <div ref={messageEndRef}></div>
              </VStack>

              <form
                id="lower-form"
                onSubmit={submitHandler(
                  user,
                  otherUser,
                  message,
                  setMessage,
                  setMessages
                )}
              >
                <HStack>
                  <Input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Message"
                  />
                  <Button className="btn" type="submit" bg={"purple"}>
                    Send
                  </Button>
                </HStack>
              </form>
            </VStack>
          </Container>
        ) : (
          <LoginPage />
        )}
      </Box>
    </>
  );
}

export default App;
