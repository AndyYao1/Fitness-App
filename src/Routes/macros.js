import React, { useState } from "react";
import { Card, Col, Form, Row, Container } from "react-bootstrap";
import { macrosData } from "../data/macros.ts";
import MealCard from "../Components/mealCard.js"
import addImage from "../Assets/gray-plus.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./pages.css";

function Macros(){
    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
    }

    // default date is today
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const allMacrosData = macrosData.find((macroData) => macroData.date === formatDate(date));

    return(
        <div className="page" id="workouts">    
            <h1 className="pageHeader"> Meals </h1>
            <Form.Group className="addDateGroup">
                <Form.Label className="addDateLabel">Select Date:</Form.Label>
                <Form.Control className="addDateInput" type="date" value={date} onChange={e => {
                    setDate(e.target.value);
                    setTimeout(() => e.target.blur(), 50);
                }}/>
            </Form.Group>
            <Container>
                <Row xs={3} md={4} className="g-3">
                    {allMacrosData?.meals
                        .map((meal) => <MealCard data={meal}/>)}
                    <Col className="d-flex">
                        <Card className="macroCard flex-fill p-2">
                            <Card.Img src={addImage}></Card.Img>
                            <Card.Body className="d-flex align-items-center">
                                <Card.Text>
                                    Add existing item or create new item
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Macros;