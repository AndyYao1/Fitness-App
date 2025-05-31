'use client'

import './mealCard.css';
import { Card, Button, Col, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { MdDelete, MdEdit } from 'react-icons/md';

function MealCard({ data, handleRemove, handleSave }) {
    const [name, setName] = useState(data.name);
    const [calories, setCalories] = useState(data.calories);
    const [fat, setFat] = useState(data.fat);
    const [carbohydrates, setCarbohydrates] = useState(data.carbohydrates);
    const [protein, setProtein] = useState(data.protein);
    const [image, setImage] = useState(data.image);

    // Modal
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(data);
    const [errors, setErrors] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setErrors({});
    };

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            e.stopPropagation();
        } else {
            setName(form.name);
            setCalories(form.calories);
            setFat(form.fat);
            setCarbohydrates(form.carbohydrates);
            setProtein(form.protein);
            setImage(form.image);
            form.macro_id = data.macro_id;
            handleSave(form);
            handleClose();
        }
    }

    const isNullOrNumber = (input) => {
        return (input === undefined) || (!isNaN(input));
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

    return (
        <Col className="d-flex">
            <Card className="macroCard flex-fill p-1">
                <Card.Img className="macroCardImg" src={image ? image : "/dinner-placeholder.png"} ></Card.Img>
                <div className='macroCardBtnContainer'>
                    <Button className="macroCardBtn" size="sm" variant="danger" onClick={() => handleRemove(data.macro_id)}><MdDelete></MdDelete></Button>
                    <Button className="macroCardBtn" size="sm" onClick={handleShow}><MdEdit></MdEdit></Button>
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    {calories ? <div>Calories: {calories}</div> : null}
                    {fat ? <div>Fat: {fat}</div> : null}
                    {carbohydrates ? <div>Carbs: {carbohydrates}</div> : null}
                    {protein ? <div>Protein: {protein}</div> : null}
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Macros</Modal.Title>
                </Modal.Header>
                <Modal.Body className='editMacrosModalBody'>
                    <Form id="saveChangeForm" onSubmit={handleSubmit} noValidate>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control defaultValue={name} type="text" size="sm" onChange={(e) => setField('name', e.target.value)} required isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid"> {errors.name} </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Calories:</Form.Label>
                            <Form.Control defaultValue={calories} type="text" size="sm" onChange={(e) => setField('calories', e.target.value)} isInvalid={!!errors.calories} />
                            <Form.Control.Feedback type="invalid"> {errors.calories} </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fat:</Form.Label>
                            <Form.Control defaultValue={fat} type="text" size="sm" onChange={(e) => setField('fat', e.target.value)} isInvalid={!!errors.fat} />
                            <Form.Control.Feedback type="invalid"> {errors.fat} </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Carbs:</Form.Label>
                            <Form.Control defaultValue={carbohydrates} type="text" size="sm" onChange={(e) => setField('carbohydrates', e.target.value)} isInvalid={!!errors.carbohydrates} />
                            <Form.Control.Feedback type="invalid"> {errors.carbohydrates} </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Protein:</Form.Label>
                            <Form.Control defaultValue={protein} type="text" size="sm" onChange={(e) => setField('protein', e.target.value)} isInvalid={!!errors.protein} />
                            <Form.Control.Feedback type="invalid"> {errors.protein} </Form.Control.Feedback>
                        </Form.Group>
                        <div>Image: <Form.Control defaultValue={image} type="text" size="sm" onChange={(e) => setField("image", e.target.value)} /></div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit' form='saveChangeForm'>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default MealCard;