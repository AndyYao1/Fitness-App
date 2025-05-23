'use client'

import React, { useEffect, useState } from "react";
import ExerciseChart from "../components/exerciseChart.js";
import { loadWorkoutData } from "../actions/workouts.ts";

function WorkoutsDashboard() {
    const [parsedData, setParsedData] = useState(new Map());

    const fetchData = async () => {
        try {
            loadWorkoutData()
                .then(workoutData => {
                    let workoutMap = new Map();
                    for (let workout of workoutData) {
                        if (workoutMap.has(workout.name)) {
                            workoutMap.get(workout.name).push({ "date": Date.parse(workout.date), "lbs": workout.lbs, "reps": workout.reps });
                        } else {
                            workoutMap.set(workout.name, [{ "date": Date.parse(workout.date), "lbs": workout.lbs, "reps": workout.reps }]);
                        }
                    }
                    setParsedData(workoutMap);
                });
        } catch {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="page" id="Dashboard">
            <h1 className="pageHeader"> Dashboard </h1>
            <div className="allChartsContainer">
                {Array.from(parsedData)?.map((data, index) => (
                    <ExerciseChart data={data} key={data[0] + index} />
                ))}
            </div>
        </div>
    );
}

export default WorkoutsDashboard;