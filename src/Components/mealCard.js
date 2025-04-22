import 'bootstrap/dist/css/bootstrap.min.css';
import './mealCard.css'
import { Card, Button, Col} from "react-bootstrap";
import React, { useState } from "react";
import mealImgPlaceholder from "../Assets/dinner-placeholder.png";

function MealCard({data}){
    return(
        <Col className="d-flex">
            <Card className="macroCard flex-fill p-1">
                <Card.Img className="macroCardImg" src={data.image? data.image: mealImgPlaceholder} ></Card.Img>
                <Card.Body>       
                    <Card.Text>
                        <Card.Title>{data.name}</Card.Title>
                        {data.calories? <div>Calories: {data.calories}</div>: null}
                        {data.fat? <div>Fat: {data.fat}</div>: null}
                        {data.carbohydrates? <div>Carbs: {data.carbohydrates}</div>: null}
                        {data.protein? <div>Protein: {data.protein}</div>: null}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default MealCard;