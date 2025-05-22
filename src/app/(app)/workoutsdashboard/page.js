import React from "react";
import { workoutsData } from "../data/workouts.ts";
import ExerciseChart from "../components/exerciseChart.js";

function WorkoutsDashboard(){
    let parsedData = new Map();
    for (let workout of workoutsData.toReversed()) {
        for (let data of workout.workouts) {
            if (parsedData.has(data.name)) {
                parsedData.get(data.name).push({"date": Date.parse(workout.date), "lbs": data.lbs, "reps": data.reps});
            } else {
                parsedData.set(data.name, [{"date": Date.parse(workout.date), "lbs": data.lbs, "reps": data.reps}]);
            }
        }
    }
    
    return(
        <div className="page" id="Dashboard"> 
            <h1 className="pageHeader"> Dashboard </h1>
            <div className="allChartsContainer">
                { Array.from(parsedData).map((data, index) => (
                    <ExerciseChart data={data} key={data[0]+index}/>
                ))}
            </div>
        </div>
    );
}

export default WorkoutsDashboard;