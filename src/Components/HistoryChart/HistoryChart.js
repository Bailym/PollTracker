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

            setPollData(tempData);
        }

        getPoll();  //call the function above
    }, []);

    return (
        <ResponsiveContainer width={2000}>
            <LineChart
                data={pollData}
                margin={{
                    top: 10, right: 10, left: 0, bottom: 10,
                }}
            >
                <Legend align='right' layout='vertical' verticalAlign='middle'/>
                <XAxis dataKey="DatePublished" />
                <CartesianGrid strokeDasharray="4 1 2" />
                <YAxis />
                <Tooltip />
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
                    dataKey="REF"
                    stroke="#5cdee0"
                    strokeWidth={3}
                />
                <Line
                    type="linear"
                    dataKey="SNP"
                    stroke="#ebeb02"
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>)
}

export default HistoryChart