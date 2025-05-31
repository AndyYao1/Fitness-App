'use client'

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Form } from "react-bootstrap";
import MacroChart from "../components/macroChart.js";
import { loadAllMacroData } from "../actions/macros.ts";

function MacrosDashboard() {
    let caloriesLineChartData = new Map();
    let fatLineChartData = new Map();
    let carbohydratesLineChartData = new Map();
    let proteinLineChartData = new Map();

    const [macrosData, setMacrosData] = useState([]);
    const [pieChartDate, setPieChartDate] = useState(null);
    const fetchData = async () => {
        try {
            loadAllMacroData().then(allMacroData => {
                let mostRecentDate;
                if (allMacroData.length > 0) {
                    mostRecentDate = allMacroData.reduce((mostRecentMeal, currMeal) => 
                        mostRecentMeal.date > currMeal.date ? mostRecentMeal : currMeal).date;
                } else {
                    mostRecentDate = new Date();
                }

                setMacrosData(allMacroData);
                setPieChartDate(mostRecentDate);
            });
        } catch {

        }
    }

    useEffect(() => { fetchData() }, []);

    if (macrosData.length > 0) {
        for (let data of macrosData) {
            if (data.calories !== undefined) {
                if (caloriesLineChartData.has(data.date)) {
                    caloriesLineChartData.set(data.date, caloriesLineChartData.get(data.date) + data.calories);
                } else {
                    caloriesLineChartData.set(data.date, data.calories);
                }
            }
            if (data.carbohydrates !== undefined) {
                if (carbohydratesLineChartData.has(data.date)) {
                    carbohydratesLineChartData.set(data.date, carbohydratesLineChartData.get(data.date) + data.carbohydrates);
                } else {
                    carbohydratesLineChartData.set(data.date, data.carbohydrates);
                }
            }
            if (data.fat !== undefined) {
                if (fatLineChartData.has(data.date)) {
                    fatLineChartData.set(data.date, fatLineChartData.get(data.date) + data.fat);
                } else {
                    fatLineChartData.set(data.date, data.fat);
                }
            }
            if (data.protein !== undefined) {
                if (proteinLineChartData.has(data.date)) {
                    proteinLineChartData.set(data.date, proteinLineChartData.get(data.date) + data.protein);
                } else {
                    proteinLineChartData.set(data.date, data.protein);
                }
            }
        }
    }

    // YYYY-MM-DD to MM/DD/YYYY, convert date format from react form to DB
    const formatDate = (date) => {
        if (date) {
            const arr = date.split("-");
            return arr[1] + "/" + arr[2] + "/" + arr[0];
        } else {
            return "";
        }
    }

    const pieChartAllMeals = macrosData?.filter(meal => meal.date == pieChartDate);

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
                            <li key={`item-${index}`} style={{ "color": COLORS[index % COLORS.length] }}>
                                <span style={{ "color": "black" }}>
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
        setPieChartDate(e.target.value);
        setTimeout(() => e.target.blur(), 50);
    }

    return (
        <div className="page" id="Dashboard">
            <h1 className="pageHeader"> Dashboard </h1>
            <Form.Group className="addDateGroup">
                <Form.Label className="addDateLabel">Select Date:</Form.Label>
                <Form.Control className="addDateInput" defaultValue={pieChartDate} type="date" onChange={handleDateChange} />
            </Form.Group>
            {pieChartAllMeals?.length > 0 ?
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
                        {pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <Legend width={200} align="right" verticalAlign="middle" content={renderPieChartLegend} />
                </PieChart> :
                <div className="macroPieChartPlaceholder"> No macros recorded for {formatDate(pieChartDate)} </div>
            }
            <div className="allChartsContainer">
                <MacroChart data={caloriesLineChartData} macro="Calories" />
                <MacroChart data={fatLineChartData} macro="Fat" />
                <MacroChart data={carbohydratesLineChartData} macro="Carbs" />
                <MacroChart data={proteinLineChartData} macro="Protein" />
            </div>
        </div>
    );
}

export default MacrosDashboard;