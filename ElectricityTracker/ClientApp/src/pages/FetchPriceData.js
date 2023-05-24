import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PriceTable from '../components/PriceTable';

import 'react-tabs/style/react-tabs.css';
import './FetchPriceData.css';

const FetchPriceData = () => {
    // State variables
    const [price, setPrice] = useState([]);
    const [cheapestDay, setCheapestDay] = useState(null);
    const [expensiveDay, setExpensiveDay] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const populatePriceData = () => {
        fetch('electricityprice')
            .then(response => response.json())
            .then(data => {
                setPrice(data);
                setLoading(false);

                const { cheapest, expensive } = findCheapestAndExpensiveDays(data);
                setCheapestDay(cheapest);
                setExpensiveDay(expensive);
            })
            .catch(error => {
                // Handle any error that occurred during the fetch request
                setError(error);
            });
    };

    const findCheapestAndExpensiveDays = (data) => {
        let cheapest = null;
        let expensive = null;

        data.forEach((item) => {
            if (!cheapest || item.price < cheapest.price) {
                cheapest = item;
            }

            if (!expensive || item.price > expensive.price) {
                expensive = item;
            }
        });

        return { cheapest, expensive };
    };

    useEffect(() => {
        populatePriceData();
    });

    const formatDate = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    const renderPriceTable = () => {
        return (
            <PriceTable
                price={price}
                cheapestDay={cheapestDay}
                expensiveDay={expensiveDay}
                formatDate={formatDate}
            />
        );
    };

    const renderPriceChart = () => {
        try {
            // Prepare chart data
            const chartData = price.map(item => ({
                date: formatDate(item.dateTime),
                price: item.price,
            }));

            // Render the chart
            return (
                <LineChart width={1300} height={500} data={chartData}  margin={{ top: 80, right: 30, left: 20, bottom: 5 }}>
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

    const renderLoadingMessage = () => {
        return <p><em>Loading price data...</em></p>;
    };

    const renderErrorMessage = () => {
        return <p>Error occurred while fetching price data.</p>;
    };

    if (error) {
        return renderErrorMessage();
    }

    return (
        <div>
            <h2>Electricity Stock Price from last 7 days</h2>
            <p>
                Here are the displayed electricity stock prices from the past 7 days,
                along with the lowest and highest prices of each day.
            </p>
            {loading ? renderLoadingMessage() : (
                <Tabs>
                    <TabList>
                        <Tab>Chart View</Tab>
                        <Tab>Table View</Tab>
                    </TabList>
                    <TabPanel>
                        <p className="chart-info">
                            Hover over the chart line to view detailed date, time, and price information.
                        </p>
                        {renderPriceChart()}
                    </TabPanel>
                    <TabPanel>
                        {renderPriceTable()}
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
};

export default FetchPriceData;