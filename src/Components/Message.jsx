import React from "react";
import "../style/message.css";
import { HStack, Avatar, Text } from "@chakra-ui/react";

const Message = ({ avtar_uri, text, user = "other" }) => {
  return (
    <>
      <HStack
        alignSelf={user === "self" ? "flex-end" : "flex-start"}
        id="msg-h-stack"
      >
        {user === "other" && <Avatar src={avtar_uri} alignSelf={'flex-start'}/>}
        <Text w={"full"}>{text}</Text>
        {user === "self" && <Avatar src={avtar_uri} alignSelf={'flex-end'}/>}
      </HStack>
    </>
  );
};

export default Message;