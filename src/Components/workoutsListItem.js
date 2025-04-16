import 'bootstrap/dist/css/bootstrap.min.css';
import './workoutsListItem.css'
import { Accordion, Button, ListGroup, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";

function WorkoutsListItem({data}){
    const [exercises, setExercises] = useState(data.workouts);

    // TODO: Add, remove, save to DB
    const handleRemoveExercise = (name) => {
        setExercises(exercises.filter(exercise => exercise.name !== name));
    }

    const handleAddExercise = () => {
        if (exercises) {
            setExercises([...exercises, {"lbs":"", "reps":""}]);
        } else {
            setExercises([{"lbs":"", "reps":""}])
        }
    }

    const handleSaveExercise = () => {
        return;
    }

    return(
        <Accordion.Item eventKey={data.date}>
            <Accordion.Header> {data.date} </Accordion.Header>
            <Accordion.Body>
                <ListGroup>
                    { exercises?.map(exercise => (
                        <ListGroup.Item className='exerciseListItem' key={exercise.name}>
                            <Form>
                                <Row xs={16}>
                                    <Col xs={2}> <Form.Control size="sm" placeholder="Enter exercise" type="text" defaultValue={exercise.name}/></Col>: 
                                    {
                                        Object.entries(exercise)
                                        .filter(([key]) => key !== "name")
                                        .reverse()
                                        .map(([key, value]) => 
                                        <>
                                        <Col xs={1}><Form.Control size="sm" type="text" defaultValue={value}/></Col>
                                        <Col xs={1}>{key}</Col>
                                        </>)
                                    }
                                    <Col>
                                        <Button className='exerciseBtnRight' size="sm" variant="danger" onClick={() => {handleRemoveExercise(exercise.name)}}> Remove </Button>
                                        <Button className='exerciseBtnRight' size="sm" onClick={handleSaveExercise}> Save </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item> <Button size="sm" onClick={handleAddExercise}>Add Exercise</Button> </ListGroup.Item>
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default WorkoutsListItem;