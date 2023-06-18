import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import {
  Activities,
  Routines,
  Register,
  SingleRoutine,
  Login,
  Logout,
  MyRoutines,
} from "./";
import { getRoutinesByUser, fetchMyData, fetchActivities } from "../api";

export default function App() {
  const [activities, setActivities] = useState();
  const [token, setToken] = useState();
  const [routines, setRoutines] = useState();
  const [singleRoutine, setSingleRoutine] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myData, setMyData] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myRoutines, setMyRoutines] = useState({});

  const getToken = () => {
    {
      window.localStorage.getItem("token")
        ? (setToken(window.localStorage.getItem("token")), setIsLoggedIn(true))
        : null;
    }
  };

  const getMyData = async () => {
    const results = await fetchMyData(token);
    console.log("getMyData", results);
    setUsername(results.username);
  };

  const getMyRoutines = async () => {
    const results = await getRoutinesByUser(username, token);
    setMyRoutines(results);
  };

  const getActivities = async () => {
    const result = await fetchActivities();
    setActivities(result);
    // console.log("getActivities", result);
  };

  const Navigation = () => {
    // const token = true;
    return (
      <header>
        <h1>Welcome To FitnessTrackr!</h1>
        <nav>
          <Link to="/"> Home </Link>
          {token ? (
            <>
              <Link to="/routines"> Routines </Link>
              <Link to={`/users/${username}/routines`}>My Routines</Link>
              <Link to="/activities">Activities</Link>
              <Link
                to="/logout"
                onClick={() => {
                  window.localStorage.removeItem("token");
                  setToken("");
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/routines"> Routines </Link>
              <Link to="/activities">Activities</Link>
              <Link to="/users/login">Log In</Link>
              <Link to="/users/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
  };

  useEffect(() => {
    getToken();
    {
      isLoggedIn
        ? (getMyData(), getMyRoutines(), getActivities())
        : console.log("getMyData Failed");
    }
  }, [isLoggedIn]);

  return (
    <main>
      <Navigation />
      <Routes>
        <Route exact path="/" />
        <Route
          path="/routines"
          element={
            <Routines
              setRoutines={setRoutines}
              routines={routines}
              setSingleRoutine={setSingleRoutine}
            />
          }
        />
        <Route
          path="/routines/:routineID"
          element={<SingleRoutine singleRoutine={singleRoutine} />}
        />
        <Route
          path="/activities"
          element={
            <Activities
              setActivities={setActivities}
              activities={activities}
              isLoggedIn={isLoggedIn}
              token={token}
              getActivities={getActivities}
            />
          }
        />
        <Route
          path={`/users/:username/routines`}
          element={<MyRoutines myRoutines={myRoutines} />}
        />
        <Route
          path="/users/login"
          element={
            <Login
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/users/register"
          element={
            <Register
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </main>
  );
}
