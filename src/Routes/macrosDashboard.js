import React, { useState } from "react";
import "./pages.css";
import { macrosData } from "../data/macros.ts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Form } from "react-bootstrap";
import MacroChart from "../Components/macroChart.js";

function MacrosDashboard() {
    let caloriesLineChartData = new Map();
    let fatLineChartData = new Map();
    let carbohydratesLineChartData = new Map();
    let proteinLineChartData = new Map();

    for (let macro of macrosData.toReversed()) {
        for (let data of macro.meals) {
            const parsedDate = Date.parse(macro.date);
            if (data.calories !== undefined) {
                if (caloriesLineChartData.has(parsedDate)){
                    caloriesLineChartData.set(parsedDate, caloriesLineChartData.get(parsedDate) + data.calories);
                } else {
                    caloriesLineChartData.set(parsedDate, data.calories);
                }
            }
            if (data.carbohydrates !== undefined) {
                if (carbohydratesLineChartData.has(parsedDate)){
                    carbohydratesLineChartData.set(parsedDate, carbohydratesLineChartData.get(parsedDate) + data.carbohydrates);
                } else {
                    carbohydratesLineChartData.set(parsedDate, data.carbohydrates);
                }
            }
            if (data.fat !== undefined) {
                if (fatLineChartData.has(parsedDate)){
                    fatLineChartData.set(parsedDate, fatLineChartData.get(parsedDate) + data.fat);
                } else {
                    fatLineChartData.set(parsedDate, data.fat);
                }
            }
            if (data.protein !== undefined) {
                if (proteinLineChartData.has(parsedDate)){
                    proteinLineChartData.set(parsedDate, proteinLineChartData.get(parsedDate) + data.protein);
                } else {
                    proteinLineChartData.set(parsedDate, data.protein);
                }
            }
        }
    }

    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        const arr = date.split("-")
        return arr[1] + "/" + arr[2] + "/" + arr[0]
    }

    // MM/DD/YYYY to YYYY-MM-DD, only used to set default value of date field on initial render to latest date from DB
    const unformatDate = (date) => {
        const arr = date.split("/")
        return arr[2] + "-" + arr[0] + "-" + arr[1]
    }

    const [pieChartDate, setPieChartDate] = useState(macrosData[0].date);
    const pieChartAllMeals = macrosData.find((data) => data.date === pieChartDate)?.meals;

    let fatPieChartCnt = 0;
    let carbohydratesPieChartCnt = 0;
    let proteinPieChartCnt = 0;
    let caloriesPieChartCnt = 0;

    pieChartAllMeals?.forEach((meal) => {
        fatPieChartCnt += !isNaN(meal.fat) ? meal.fat : 0;
        carbohydratesPieChartCnt += !isNaN(meal.carbohydrates) ? meal.carbohydrates : 0;
        proteinPieChartCnt += !isNaN(meal.protein) ? meal.protein : 0;
        caloriesPieChartCnt += !isNaN(meal.calories) ? meal.calories : 0;
    });
    const pieChartData = [
        { "name": "fat", "value": fatPieChartCnt },
        { "name": "carbohydrates", "value": carbohydratesPieChartCnt },
        { "name": "protein", "value": proteinPieChartCnt }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderPieChartLegend = (props) => {
        const { payload } = props;
        return (
            <>
                Calories: {caloriesPieChartCnt}
                <ul>
                    {
                        payload.map((entry, index) => (
                            <li key={`item-${index}`} style={{"color": COLORS[index % COLORS.length]}}>
                                <span style={{"color": "black"}}>
                                    {entry.value.charAt(0).toUpperCase() + entry.value.slice(1) + ": " + entry.payload.value}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </>
        );
    }

    const handleDateChange = (e) => {
        setPieChartDate(formatDate(e.target.value));
        setTimeout(() => e.target.blur(), 50);
    }

    return (
        <div className="page" id="Dashboard">
            <h1 className="pageHeader"> Dashboard </h1>
            <Form.Group className="addDateGroup">
                <Form.Label className="addDateLabel">Select Date:</Form.Label>
                <Form.Control className="addDateInput" defaultValue={unformatDate(pieChartDate)} type="date" onChange={handleDateChange} />
            </Form.Group>
            { pieChartAllMeals?.length > 0 ?
                <PieChart width={600} height={300}>
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        fill="#82ca9d"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}
                    </Pie>
                    <Legend width={200} align="right" verticalAlign="middle" content={renderPieChartLegend} />
                </PieChart> : 
                <div className="macroPieChartPlaceholder"> No macros recorded for {pieChartDate} </div>
            }
            <div className="allChartsContainer">
                <MacroChart data={caloriesLineChartData} macro="Calories"/>
                <MacroChart data={fatLineChartData} macro="Fat"/>
                <MacroChart data={carbohydratesLineChartData} macro="Carbs"/>
                <MacroChart data={proteinLineChartData} macro="Protein"/>
            </div>
        </div>
    );
}

export default MacrosDashboard;