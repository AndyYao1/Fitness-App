import React from "react";
import "./pages.css";
import { workoutsData } from "../data/workouts.ts";
import ExerciseChart from "../Components/exerciseChart.js";

function Dashboard(){
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
                { Array.from(parsedData).map((data) => (
                    <ExerciseChart data={data}/>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;