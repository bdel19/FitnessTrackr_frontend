import React, { useState } from "react";
import { createActivity } from "../api";

export default function Activities({ activities, isLoggedIn, token }) {
  const [newActivityName, setNewActivityName] = useState("");
  const [newActivityDescription, setNewActivityDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await createActivity(
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
      {isLoggedIn ? (
        <>
          <h1>newActivitiesform</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter new Activity name"
              onChange={(event) => setNewActivityName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Enter new Activity description"
              onChange={(event) =>
                setNewActivityDescription(event.target.value)
              }
            />
            <button type="submit">Submit</button>
          </form>
          {error ? <p>{error}</p> : null}
        </>
      ) : null}
      <h1>Activities</h1>
      {activities &&
        activities.map((activity) => {
          // console.log(activity);
          return (
            <div key={activity.id}>
              <h2>{activity.name}</h2>
              <p>{activity.description}</p>
            </div>
          );
        })}
    </>
  );
}
