import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({
  setToken,
  setIsLoggedIn,
  username,
  setUsername,
  password,
  setPassword,
}) {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const results = await login({ username, password });

    if (!results.error) {
      setToken(results.token);
      window.localStorage.setItem("token", results.token);
      setIsLoggedIn(true);
      navigate("/");
    } else if (results.error) {
      setError(results.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Submit</button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
}
