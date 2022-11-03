import {Box, Flex, Text } from '@chakra-ui/react'
import Moment from 'react-moment';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';



function PollCard(props) {
    return (
        <div style={{ background: "rgba(245, 245, 245, 0.75)", boxShadow: "0px 4px 4px 5px rgba(0, 0, 0, 0.1)", width: "90%", height: "30%", margin: "1.5rem auto" }}>
            <Flex>
                <Box flexDir="row" flex="1" margin="1rem">
                    <Text>{props.data.Source}</Text>
                </Box>
                <Box flex="1" margin="1rem">
                    <Text align="right"><Moment format='DD/MM/YYYY'>{props.data.DatePublished}</Moment></Text>
                </Box>
            </Flex>
            <ResponsiveContainer>
                <BarChart
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 60,
                    }}
                    data={props.data.Data}>
                    <XAxis dataKey="Party" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Points" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PollCard;

