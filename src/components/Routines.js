import React, { useEffect } from "react";
import { fetchRoutines } from "../api";
import { useNavigate, useParams } from "react-router";

export default function Routines({ routines, setRoutines, setSingleRoutine }) {
  const navigate = useNavigate();
  let { routineID } = useParams;
  const getRoutines = async () => {
    const result = await fetchRoutines();
    setRoutines(result);
    console.log("ROUTINES", result);
  };

  useEffect(() => {
    getRoutines();
  }, []);
  return (
    <>
      <h1>Routines</h1>
      {routines &&
        routines.map((routine) => {
          return (
            <div key={routine.id} id="routineCard">
              <h2
                onClick={() => {
                  routineID = routine.id;
                  setSingleRoutine(routine);
                  navigate(`/routines/${routineID}`);
                }}
              >
                {routine.name}
              </h2>
              <p>{routine.goal}</p>
            </div>
          );
        })}
    </>
  );
}
