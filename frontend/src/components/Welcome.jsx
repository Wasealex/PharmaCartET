import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const userInfo = useSelector((state) => state.auth);
  const userName = userInfo?.userInfo?.name;
  return (
    <h1>
      Welcome <b>{userName}</b>, what do you like to purchase?
    </h1>
  );
};

export default Welcome;
