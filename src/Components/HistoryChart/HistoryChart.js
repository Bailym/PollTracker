import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import { useEffect, useState } from "react"

function HistoryChart() {

    const [pollData, setPollData] = useState([]);

    useEffect(() => {

        //retrieved all polls from collection
        async function getPoll() {

            var tempData = []  ///temp array to hold data

            //make the request
            await axios.get("/api/polls/gethistory")
                .then((response) => {
                    tempData = response.data;
                })

            //update the state with the new poll data
            setPollData(tempData);
        }

        getPoll();  //call the function above
    }, []);

    return (
        <ResponsiveContainer>
            <LineChart
                data={pollData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis dataKey="Date" />
                <CartesianGrid strokeDasharray="4 1 2" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="linear"
                    dataKey="CON"
                    stroke="#0958b3"
                    strokeWidth={3}
                />
                <Line
                    type="linear"
                    dataKey="LAB"
                    stroke="#ff0000"
                    strokeWidth={3}
                />
                <Line
                    type="linear"
                    dataKey="LDEM"
                    stroke="#ff8812"
                    strokeWidth={3}
                />
                <Line
                    type="linear"
                    dataKey="GRN"
                    stroke="#02ed39"
                    strokeWidth={3}
                />
                <Line
                    type="linear"
                    dataKey="REFUK"
                    stroke="#5cdee0"
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>)
}

export default HistoryChart