import React, { useState } from "react";
import { createRoutine } from "../api";

export default function myRoutines({ myRoutines }) {
  // const results = await getRoutinesByUser(username);
  console.log("MyRoutines", myRoutines);
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineGoal, setNewRoutineGoal] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await createRoutine(
      newActivityName,
      newActivityDescription,
      token
    );

    if (results.error) {
      setError(results.error);
    }
  };

  return (
    <>
      <h3>CreateRoutineForm</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new Routine name"
          onChange={(event) => setNewRoutineName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter new Routine goal"
          onChange={(event) => setNewRoutineGoal(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error ? <p>{error}</p> : null}
      {myRoutines.length > 0 ? (
        <>
          <h1>Your Created Routines</h1>
        </>
      ) : (
        <h1>No Routines Created Yet!</h1>
      )}
    </>
  );
}
