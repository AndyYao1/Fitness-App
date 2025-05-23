'use client'

import React, { useState } from "react";
import { LineChart, CartesianGrid, XAxis, Tooltip, YAxis, Line, Label, ResponsiveContainer } from "recharts";
import { Button } from "react-bootstrap";
import "./exerciseChart.css";

function ExerciseChart({ data }) {
    // filters data based on date range
    const filterData = (newDateRange) => {
        const today = new Date()
        const startDate = new Date(today);
        switch (newDateRange) {
            case "1M":
                startDate.setMonth(today.getMonth() - 1);
                break;
            case "3M":
                startDate.setMonth(today.getMonth() - 3);
                break;
            case "6M":
                startDate.setMonth(today.getMonth() - 6);
                break;
            case "1Y":
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            default:
                startDate.setFullYear(today.getFullYear() - 30);
                break;
        }

        return data[1]
            .filter(d => d.date >= startDate)
            .sort((a, b) => a.date - b.date);
    };

    // default to data from past month
    const [dateRange, setDateRange] = useState("1M");
    const [filteredData, setFilteredData] = useState(filterData(dateRange));

    // MM/DD/YYYY => MM/DD/YY for shorter date display
    const formatDate = (date) => {
        let formattedDate = new Date(date).toLocaleDateString();
        formattedDate = formattedDate.substring(0, formattedDate.length - 4).concat(formattedDate.substring(formattedDate.length - 2));
        return formattedDate;
    }

    // Tooltip to display lbs and reps when hovering over data point
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="customChartTooltip">
                    <p className="customChartTooltipInfo">{`${formatDate(label)}`}</p>
                    <p className="customChartTooltipInfo">{`lbs: ${payload[0].value}`}</p>
                    <p className="customChartTooltipInfo">{`reps: ${payload[0].payload.reps}`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <div className="chartContainer">
            <div className="exerciseChartHeader">
                {data[0]}
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => { setFilteredData(filterData("ALL")); setDateRange("ALL"); }}>ALL</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => { setFilteredData(filterData("1Y")); setDateRange("1Y"); }}>1Y</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => { setFilteredData(filterData("6M")); setDateRange("6M"); }}>6M</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => { setFilteredData(filterData("3M")); setDateRange("3M"); }}>3M</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => { setFilteredData(filterData("1M")); setDateRange("1M"); }}>1M</Button>
            </div>
            {filteredData.length > 0 ?
                <ResponsiveContainer className="exerciseChartBody">
                    <LineChart data={filteredData}
                        margin={{
                            top: 5,
                            right: 60,
                            left: 20,
                            bottom: 65,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(date) => formatDate(date)}>
                            <Label value="Date" position="bottom" offset={-2} />
                        </XAxis>
                        <YAxis type="number" domain={['dataMin - 20', 'dataMax + 20']}>
                            <Label value="Weight (lbs)" position="insideLeft" angle="-90" style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="lbs" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                : <div className="exercisePlaceholder"> No data recorded for {dateRange} </div>
            }
        </div>
    )
}

export default ExerciseChart;