import React, { useState } from "react";
import { Button, Form, Accordion } from "react-bootstrap";
import { workoutsData } from "../data/workouts.ts";
import WorkoutsListItem from "../Components/workoutsListItem.js";
import "./pages.css";

function Workouts(){
    const [allWorkoutsData, setAllWorkoutsData] = useState(workoutsData);
    // default date is today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const dates = allWorkoutsData.map((workout) => workout.date);
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

    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
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
                {allWorkoutsData.map((workout) => <WorkoutsListItem key={workout.date} data={workout}/>)}
            </Accordion>
        </div>
    );
}

export default Workouts;