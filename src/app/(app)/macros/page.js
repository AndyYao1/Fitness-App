'use client'

import React, { useState } from "react";
import { Card, Col, Form, Row, Container, Button, Modal } from "react-bootstrap";
import { macrosData } from "../data/macros.ts";
import MealCard from "../components/mealCard.js";

function Macros() {
    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
    }

    // default date is today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [allMacrosData, setAllMacrosData] = useState(macrosData.find((macroData) => macroData.date === formatDate(date))?.meals);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const isNullOrNumber = (input) => {
        return (input === undefined) || (!isNaN(input));
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        });
        if (!!errors[field]){
            setErrors({
                ...errors,
                [field]:null
            })
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setForm({});
        setErrors({});
        setShow(true);
    }

    const validateForm = () => {
        const {name, calories, fat, carbohydrates, protein, image} = form;
        const newErrors = {};

        if (!name || name === ""){
            newErrors.name = "Please enter a name";
        }
        if (!isNullOrNumber(calories)){
            newErrors.calories = "Please enter a valid number";
        }
        if (!isNullOrNumber(fat)){
            newErrors.fat = "Please enter a valid number";
        }
        if (!isNullOrNumber(carbohydrates)){
            newErrors.carbohydrates = "Please enter a valid number";
        }
        if (!isNullOrNumber(protein)){
            newErrors.protein = "Please enter a valid number";
        }
        return newErrors;
    }

    // TODO: Add to DB
    const handleAddMacro = (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0){
            setErrors(formErrors)
            event.stopPropagation();
        } else {
            setAllMacrosData([...allMacrosData, form])
            handleClose();
        }
    }

    // TODO: Remove from DB
    const handleRemove = (indexToRemove) => {
        setAllMacrosData(prev => prev.filter((_, idx) => idx !== indexToRemove));
    }

    // need to update list of meals after date change
    const handleDateChange = (e) => {
        setDate(e.target.value);
        setAllMacrosData(macrosData.find((macroData) => macroData.date === formatDate(e.target.value))?.meals);
        setTimeout(() => e.target.blur(), 50);
    }

    return (
        <div className="page" id="workouts">
            <h1 className="pageHeader"> Meals </h1>
            <Form.Group className="addDateGroup">
                <Form.Label className="addDateLabel">Select Date:</Form.Label>
                <Form.Control className="addDateInput" type="date" value={date} onChange={handleDateChange} />
            </Form.Group>
            <Container>
                <Row xs={3} md={4} className="g-3">
                    {allMacrosData ? allMacrosData.map((meal, idx) =>
                        <MealCard key={meal.name + idx} data={meal} idx={idx} handleRemove={handleRemove} />)
                        : null}
                    <Col className="d-flex">
                        <Card className="macroCard flex-fill p-2">
                            <Card.Img className="addMealImg" src={"/gray-plus.png"} onClick={handleShow}></Card.Img>
                            <Card.Body className="d-flex align-items-center">
                                <Card.Text>
                                    Add existing item or create new item
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Meal</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='editMacrosModalBody'>
                                <Form id="addMacroForm" onSubmit={handleAddMacro} noValidate >
                                    <Form.Group>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control type="text" size="sm" onChange={(e) => setField('name', e.target.value)} required isInvalid={!!errors.name}/>
                                        <Form.Control.Feedback type="invalid"> {errors.name} </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Calories:</Form.Label>
                                        <Form.Control type="text" size="sm" onChange={(e) => setField('calories', e.target.value)} isInvalid={!!errors.calories}/>
                                        <Form.Control.Feedback type="invalid"> {errors.calories} </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Fat:</Form.Label>
                                        <Form.Control type="text" size="sm" onChange={(e) => setField('fat', e.target.value)} isInvalid={!!errors.fat}/>
                                        <Form.Control.Feedback type="invalid"> {errors.fat} </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Carbs:</Form.Label>
                                        <Form.Control type="text" size="sm" onChange={(e) => setField('carbohydrates', e.target.value)} isInvalid={!!errors.carbohydrates}/>
                                        <Form.Control.Feedback type="invalid"> {errors.carbohydrates} </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Protein:</Form.Label>
                                        <Form.Control type="text" size="sm" onChange={(e) => setField('protein', e.target.value)} isInvalid={!!errors.protein}/>
                                        <Form.Control.Feedback type="invalid"> {errors.protein} </Form.Control.Feedback>
                                    </Form.Group>
                                    <div>Image: <Form.Control type="text" size="sm" onChange={(e) => setField('image', e.target.value)} /></div>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit" form="addMacroForm">
                                    Save Changes
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Macros;