import React from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 2000);
  return <p>You have successfully logged out!</p>;
}
