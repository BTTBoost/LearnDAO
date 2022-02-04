import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Chat = () => {
  const { isAuthenticated, user, isInitializing, isInitialized } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    console.log("isInitialized :>> ", isInitialized);
    console.log("isAuthenticated :>> ", isAuthenticated);
    if (isInitialized && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated]);
  if (isInitializing) {
    return <span>Loading...</span>;
  }

  if (user) return <div>{user.getUsername()}</div>;
  else return <div></div>;
};

export default Chat;
