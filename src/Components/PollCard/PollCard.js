import { Container, Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function PollCard(props) {
    return (
        <div style={{background:"rgba(245, 245, 245, 0.75)", boxShadow:"0px 4px 4px 5px rgba(0, 0, 0, 0.1)", width:"90%", maxHeight:"30%", margin:"1.5rem auto"}}>
            {<Flex padding="1rem">
                <Box flexDir="row" flex="1">
                    <Text>Opinium Research</Text>
                </Box>
                <Box flex="1">
                    <Text align="right">29/12/2022</Text>
                </Box>
            </Flex>}
            <ResponsiveContainer>
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
            </ResponsiveContainer>
        </div>)
}

export default PollCard;

