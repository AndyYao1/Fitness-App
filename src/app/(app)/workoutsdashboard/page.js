'use client'

import React, { useEffect, useState } from "react";
import ExerciseChart from "../components/exerciseChart.js";
import { loadWorkoutData } from "../actions/workouts.ts";
import { Form, Row, Col } from "react-bootstrap";

function WorkoutsDashboard() {
    const [parsedData, setParsedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        try {
            loadWorkoutData()
                .then(workoutData => {
                    let workoutMap = new Map();
                    for (let workout of workoutData) {
                        if (workoutMap.has(workout.name)) {
                            workoutMap.get(workout.name).push({ "date": Date.parse(workout.date.replace(/-/g, '\/')), "lbs": workout.lbs, "reps": workout.reps });
                        } else {
                            workoutMap.set(workout.name, [{ "date": Date.parse(workout.date.replace(/-/g, '\/')), "lbs": workout.lbs, "reps": workout.reps }]);
                        }
                    }
                    setParsedData(Array.from(workoutMap));
                });
        } catch {

        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const filteredParsedData = parsedData.filter(data => data[0].toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="page" id="Dashboard">
            <h1 className="pageHeader"> Dashboard </h1>
            <div className="allChartsContainer">
                <Form className="workoutSearchBarForm">
                    <Form.Group as={Row}>
                        <Form.Label column sm="1"> Search: </Form.Label>
                        <Col sm="4">
                            <Form.Control type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
                {filteredParsedData?.map((data, index) => (
                    <ExerciseChart data={data} key={data[0] + index} />
                ))}
            </div>
        </div>
    );
}

export default WorkoutsDashboard;