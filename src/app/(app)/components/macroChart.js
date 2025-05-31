'use client'

import React, {useState} from "react";
import "./exerciseChart.css";
import { LineChart, CartesianGrid, XAxis, Tooltip, YAxis, Line, Label, ResponsiveContainer } from "recharts";
import { Button } from "react-bootstrap";

function MacroChart({data, macro}){
    // default to data from past month
    const [dateRange, setDateRange] = useState("1M");

    // filters data based on date range
    const today = new Date()
    const startDate = new Date();
    switch (dateRange) {
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
    
    const filteredData = data.size > 0 ? Array.from(data)
        .map(macroData => ({"date": Date.parse(macroData[0].replace(/-/g, '\/')), "value": macroData[1]}))
        .filter(macroData => macroData.date >= startDate)
        .sort((a,b) => a.date > b.date) : [];


    // MM/DD/YYYY => MM/DD/YY for shorter date display 
    const formatDate = (date) => {
        let formattedDate = new Date(date).toLocaleDateString();
        formattedDate = formattedDate.substring(0, formattedDate.length - 4).concat(formattedDate.substring(formattedDate.length - 2));
        return formattedDate;
    }

    // Tooltip to display lbs and reps when hovering over data point
    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length){
            return (
                <div className="customChartTooltip">
                    <p className="customChartTooltipInfo">{`${formatDate(label)}`}</p>
                    <p className="customChartTooltipInfo">{`${macro}: ${payload[0].value}g`}</p>
                </div>
              );
        }

        return null;
    }
    
    return(
        <div className="chartContainer">
            <div className="exerciseChartHeader">
                {macro}
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => setDateRange("ALL")}>ALL</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => setDateRange("1Y")}>1Y</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => setDateRange("6M")}>6M</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => setDateRange("3M")}>3M</Button>
                <Button size="sm" className="exerciseChartHeaderBtn" onClick={() => setDateRange("1M")}>1M</Button>
            </div>
            <ResponsiveContainer className="exerciseChartBody">
                <LineChart data={filteredData} key={macro}
                    margin={{
                        top: 5,
                        right: 60,
                        left: 20,
                        bottom: 65}}>
                    <CartesianGrid strokeDasharray="3 2"/>
                    <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(date) => formatDate(date)}>
                        <Label value="date" position="bottom" offset={-2}/>
                    </XAxis>
                    <YAxis type="number" domain={[dataMin => Math.max(0, dataMin - 200), 'dataMax']}>
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MacroChart;