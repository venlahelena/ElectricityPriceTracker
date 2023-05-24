import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PriceChart = ({ price, formatDate, setError }) => {
    try {
        // Prepare chart data
        const chartData = price.map(item => ({
            date: formatDate(item.dateTime),
            price: item.price,
        }));

        // Render the chart
        return (
            <LineChart width={1300} height={500} data={chartData} margin={{ top: 80, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    angle={45} // Set the angle to 45 degrees
                    textAnchor="start" // Align the labels to the start of the ticks
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
        );
    } catch (error) {
        // Handle any error that occurs during rendering
        setError(error);
        return null;
    }
};

export default PriceChart;