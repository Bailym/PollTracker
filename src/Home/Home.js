import './Home.css';
import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react'
import axios from 'axios';
import PollCard from '../Components/PollCard/PollCard.js';
import HistoryChart from '../Components/HistoryChart/HistoryChart';


function Home() {

  const [pollCards, setPollCards] = useState([]);

  useEffect(() => {

    //retrieved all polls from collection
    async function getPoll() {

      var tempPollCards = []  ///temp array to hold poll cards

      //make the request
      await axios.get("/api/polls/get/")
        .then((response) => {

          //iterate through the data and create a poll card for each poll
          for (let i = 0; i < response.data.length; i++) {
            tempPollCards.push(<PollCard key={i} data={response.data[i]} />)
          }
        })

      //update the state with the new poll cards
      setPollCards(tempPollCards);
    }

    getPoll();
  }, []);

  return (
    <Flex data-testid="home-component" id="homeFlex" flexDir={["column","column","row"]} h={"95vh"}>
      <Flex id="pollCardsBox" order={1} flex={2} overflowX={["scroll","scroll", "none"]} minH={["30vh", "30vh", "90vh"]} maxH={["30vh", "30vh", "90vh"]} margin={"1vw 2vh"} bgColor={"#E5F3F4"} flexDir={["row", "row","column"]} overflowY={["none","none","scroll"]}>
        {pollCards}
      </Flex>
      <Box id="rightBox" order={2} flex={4} margin={"2vh"}>
        <Flex height="90vh" flexDir="column" justify="center" >
          <Box flex="1"  bgColor="#E5F3F4" >
            <HistoryChart />
          </Box>
          <Box flex="1" marginTop="2vw" bgColor="#E5F3F4">

          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
