import { render } from "@testing-library/react"
import { Box, Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from "react"

function HistoryChart() {

    const [pollData, setPollData] = useState([]);

    useEffect(() => {

        //retrieved all polls from collection
        async function getPoll() {

            var tempData = []  ///temp array to hold data

            //make the request
            await axios.get("/api/polls/get/")
                .then((response) => {
                    tempData = response.data;
                })

            console.log(tempData);
            //update the state with the new poll cards
            setPollData(tempData);
        }

        getPoll();  //call the function above
    }, []);


    return (
        <Box data-testid="history-chart">


        </Box>)

}

export default HistoryChart