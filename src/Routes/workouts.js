import React, { useState } from "react";
import "./pages.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import { workoutsData } from "../data/workouts.ts";
import WorkoutsList from "../Components/workoutsList";

function Workouts(){
    const curr = new Date();
    const today = curr.toISOString().split('T')[0];
    const [date, setDate] = useState();

    return(
        <div className="page" id="workouts">
            <h1 className="pageHeader"> Workouts </h1>
            <Form.Group className="addDateGroup">
                <Form.Label id="addDateLabel">Select Date:</Form.Label>
                <Form.Control id="addDateInput" type="date" defaultValue={today} onSelect={setDate}/>
                <Button variant="primary" size="lg" id="addDateButton" type="submit">
                    Add Date
                </Button>
            </Form.Group>
            <WorkoutsList workoutsData={workoutsData}/>
        </div>
    );
}

export default Workouts;