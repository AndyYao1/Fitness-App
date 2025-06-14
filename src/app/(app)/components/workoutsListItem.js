'use client'

import './workoutsListItem.css';
import { Accordion, Button, ListGroup, Form, Col, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { saveWorkoutData } from '../actions/workouts';

function WorkoutsListItem({ date, workouts, saveWorkouts, isActive, deleteWorkout, allWorkoutNames }) {
    const [exercises, setExercises] = useState(workouts);
    const [changed, setChanged] = useState(false);

    const handleRemoveExercise = (removedIndex) => {
        setExercises(exercises.filter((_, index) => index !== removedIndex));
        deleteWorkout(date, exercises[removedIndex]);
    }

    const handleAddExercise = () => {
        const newExercise = { name: "", lbs: "", reps: "", workout_id: crypto.randomUUID?.() };
        setExercises(prev => [...prev, newExercise]);
        setChanged(true);
    };

    const handleUpdateExercise = (updatedIndex, field, value) => {
        setExercises(prev => prev
            .map((exercise, index) =>
                index == updatedIndex ? { ...exercise, [field]: value } : exercise));
        setChanged(true);
    }

    // used to save workouts to DB when closing accordion
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (!isActive) {
            saveWorkouts(date, exercises, changed);
            setChanged(false);
        }

    }, [isActive]);

    // refs and useeffect needed to save workouts to DB when navigating to different page or refreshing
    const exerciseRef = useRef(exercises);
    useEffect(() => {
        exerciseRef.current = exercises;
    }, [exercises]);

    const isActiveRef = useRef(isActive);
    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    useEffect(() => {
        const handlePageHide = () => {
            if (isActiveRef.current){
                const data = {
                    date: date,
                    exercises: exerciseRef.current
                }

                const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                navigator.sendBeacon('../api/saveWorkouts', blob);
            }
        };

        window.addEventListener('pagehide', handlePageHide);

        return () => {
            window.removeEventListener('pagehide', handlePageHide);
            if (isActiveRef.current) {
                saveWorkoutData(date, exerciseRef.current);
            }
        }
    }, []);

    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
    }

    return (
        <Accordion.Item eventKey={date}>
            <Accordion.Header> {formatDate(date)} </Accordion.Header>
            <Accordion.Body>
                <ListGroup>
                    {exercises?.map((exercise, index) => (
                        <ListGroup.Item className='exerciseListItem' key={exercise.workout_id}>
                            <Form>
                                <Row xs={16}>
                                    <Col xs={3}>
                                        <input type='text' placeholder='Enter exercise' value={exercise.name} onChange={(e) => handleUpdateExercise(index, "name", e.target.value)} list='exerciseList' />
                                        <datalist id='exerciseList'>
                                            {allWorkoutNames.map(name => <option key={name}> {name} </option>)}
                                        </datalist> :
                                    </Col>
                                    <Col xs={1}><Form.Control size="sm" type="text" value={exercise.reps} onChange={(e) => handleUpdateExercise(index, "reps", e.target.value)} /></Col>
                                    <Col xs={1}>reps</Col>
                                    <Col xs={1}><Form.Control size="sm" type="text" value={exercise.lbs} onChange={(e) => handleUpdateExercise(index, "lbs", e.target.value)} /></Col>
                                    <Col xs={1}>lbs</Col>
                                    <Col>
                                        <Button className='exerciseBtnRight' size="sm" variant="danger" onClick={() => { handleRemoveExercise(index) }}> Remove </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item> <Button size="sm" onClick={handleAddExercise}>Add Exercise</Button> <Button size="sm" onClick={() => console.log(exercises)}>Log</Button>  </ListGroup.Item>
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default WorkoutsListItem;