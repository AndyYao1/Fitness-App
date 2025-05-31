'use client'

import React, { useState, useEffect } from "react";
import { Button, Form, Accordion } from "react-bootstrap";
import WorkoutsListItem from "../components/workoutsListItem.js";
import { saveWorkoutData, loadWorkoutData, deleteWorkout } from "../actions/workouts.ts";

function Workouts(){
    const [allWorkoutsData, setAllWorkoutsData] = useState([]);
    // default date is today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const dates = allWorkoutsData.map((workout) => workout.date);
    const [activeKey, setActiveKey] = useState(null);

    const fetchData = async () => {
        try {
            loadWorkoutData()
                .then(workoutData => {
                    let workoutMap = new Map();
                    for (let workout of workoutData){
                        if (workoutMap.has(workout.date)){
                            workoutMap.get(workout.date).push(workout);
                            } else {
                            workoutMap.set(workout.date, [workout]);
                        }
                    }
                    
                    const formattedWorkouts = Array.from(workoutMap)
                        .sort()
                        .toReversed()
                        .map(([date, exercises]) => ({date:date, workouts:exercises}));
                        
                    setAllWorkoutsData(formattedWorkouts);
                    setActiveKey(formattedWorkouts[0].date)});
        }
        catch {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDate = (event) => {
        event.preventDefault();
        if (dates.includes(date)){
            setActiveKey(date);
        } else { 
            const newDate = new Date(date);
            const newWorkout = { "date": date, "workouts": [] };
            const updated = [...allWorkoutsData];

            let insertIndex = updated.findIndex((item) => {
                const existingDate = new Date(item.date);
                return newDate > existingDate;
            });

            if (insertIndex === -1) {
                // New date is older than all existing ones — push to end
                updated.push(newWorkout);
            } else {
                // Insert before the first older date
                updated.splice(insertIndex, 0, newWorkout);
            }

            setDate(new Date().toISOString().split('T')[0]);
            setAllWorkoutsData(updated);
            setActiveKey(date);
        }
    }

    const handleSaveWorkouts = async (date, workouts, changed) => {
        if (changed) {
            saveWorkoutData(date, workouts);
        }
    }

    const handleDeleteWorkout = async (date, workout) => {
        deleteWorkout(date,workout);
    }

    return(
        <div className="page" id="workouts">    
            <h1 className="pageHeader"> Workouts </h1>
            <Form.Group className="addDateGroup">
                <Form.Label className="addDateLabel">Select Date:</Form.Label>
                <Form.Control className="addDateInput" type="date" value={date} onChange={e => {
                    setDate(e.target.value);
                    setTimeout(() => e.target.blur(), 50);
                }}/>
                <Button variant="primary" size="lg" className="addDateButton" onClick={handleAddDate}>
                    Add Date
                </Button>
            </Form.Group>
            <Accordion activeKey={activeKey} onSelect={(key) => {setActiveKey(key)}}>
                {allWorkoutsData.map((workout) => 
                    <WorkoutsListItem 
                        key={workout.date} 
                        date={workout.date} 
                        workouts={workout.workouts}
                        saveWorkouts={handleSaveWorkouts}
                        isActive={activeKey == workout.date}
                        deleteWorkout={handleDeleteWorkout}
                    />)
                }
            </Accordion>
        </div>
    );
}

export default Workouts;