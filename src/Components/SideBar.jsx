import { HStack, VStack } from "@chakra-ui/react";
import React from "react";
import "../style/sidebar.css";

const SideBar = ({ allUsers, setOtheruser, setHbgActive }) => {
  return (
    <>
      <VStack h={"90%"} w={"300px"} className="sidebar-background">
        <HStack w={"full"}>
          <h2>All Users</h2>
        </HStack>
        <VStack overflow={"auto"} h={"full"} w={"full"}>
          {allUsers.map((user, index) => {
            return (
              <>
                <div
                  key={user.uid}
                  className="sidebar-element"
                  onClick={() => {
                    setOtheruser(user.uid);
                    setHbgActive(false);
                  }}
                >
                  <HStack>
                    <p>{user.displayName}</p>
                  </HStack>
                  <HStack>
                    <p>{user.email}</p>
                  </HStack>
                </div>
              </>
            );
          })}
        </VStack>
      </VStack>
    </>
  );
};

export default SideBar;
