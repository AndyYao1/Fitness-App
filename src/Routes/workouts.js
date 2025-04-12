import React, { useState } from "react";
import "./pages.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Accordion } from "react-bootstrap";
import { workoutsData } from "../data/workouts.ts";
import WorkoutsListItem from "../Components/workoutsListItem.js";

function Workouts(){
    const [allWorkoutsData, setAllWorkoutsData] = useState(workoutsData);
    // default date is today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const dates = allWorkoutsData.map((workout) => workout.date);
    // console.log(allWorkoutsData);
    const [activeKey, setActiveKey] = useState(allWorkoutsData[0].date);

    const handleAddDate = (event) => {
        event.preventDefault();
        const formattedDate = formatDate(date)
        if (dates.includes(formattedDate)){
            setActiveKey(formattedDate);
        } else { // TODO: Add to DB
            const newDate = new Date(formattedDate);
            const newWorkout = { "date": formattedDate };
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
            setActiveKey(formattedDate);
        }
    }

    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
    }

    return(
        <div className="page" id="workouts">    
            <h1 className="pageHeader"> Workouts </h1>
            <Form.Group className="addDateGroup">
                <Form.Label id="addDateLabel">Select Date:</Form.Label>
                <Form.Control id="addDateInput" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <Button variant="primary" size="lg" id="addDateButton" onClick={handleAddDate}>
                    Add Date
                </Button>
            </Form.Group>
            <Accordion activeKey={activeKey} onSelect={(key) => {setActiveKey(key)}}>
                {allWorkoutsData.map((workout) => <WorkoutsListItem key={workout.date} data={workout}/>)}
            </Accordion>
        </div>
    );
}

export default Workouts;