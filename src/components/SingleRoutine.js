import React, { Fragment } from "react";

export default function SingleRoutine({ singleRoutine }) {
  console.log("singleRoutine", singleRoutine);
  return (
    <div id="routineCard">
      <h1>{singleRoutine.name}</h1>
      <h2>{singleRoutine.goal}</h2>
      <h6>{singleRoutine.creatorName}</h6>
      {singleRoutine.activities.map((activity) => {
        return (
          <div key={activity.id} id="activityCard">
            <h3>{activity.name}</h3>
            <h4>{activity.description}</h4>
            <ul>
              <li>Count: {activity.count}</li>
              <li>Duration: {activity.duration}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
