import { Container } from '@chakra-ui/react'
import { useEffect, useState, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function PollCard(props) {
    return (
        <ResponsiveContainer width="100%" height="25%">
            <BarChart
                width="100%"
                height="100%"
                data={props.data.Data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="Party" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Points" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>)
}

export default PollCard;