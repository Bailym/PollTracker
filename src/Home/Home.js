import './Home.css';
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react'
import axios from 'axios';
import PollCard from '../Components/PollCard/PollCard.js';
import HistoryChart from '../Components/HistoryChart/HistoryChart';
import RSSFeedPane from '../Components/RSSFeedPane/RSSFeedPane';


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

      //scroll the history chart to the right
      document.getElementById("historybox").scrollLeft = document.getElementById("historybox").scrollWidth;
    }

    getPoll();
  }, []);

  return (
    <Flex data-testid="home-component" id="homeFlex" flexDir={["column", "column", "row"]} h={"95vh"} overflowX={"hidden"}>
      <Flex id="pollCardsFlexCol" flexDir={"column"} order={1} flex={2}>
      <Text textAlign={"center"} fontSize={"2rem"}>Recent Polls</Text>
        <Flex id="pollCardsBox" overflowX={["scroll", "scroll", "none"]} h={["30vh", "30vh", "90vh"]} margin={"0vw 2vh"} bgColor={"#E5F3F4"} flexDir={["row", "row", "column"]} overflowY={["hidden", "hidden", "scroll"]}>
          {pollCards}
        </Flex>
      </Flex>
      <Box id="rightBox" order={2} flex={4} margin={"0vw 2vh"} maxW={[null,null,"75vw"]} >
      <Text textAlign={"center"} fontSize={"2rem"}>Pollling Trend</Text>
        <Flex height="90vh" flexDir="column" justify="center">
          <Box flex="1" bgColor="#E5F3F4" overflowX={"scroll"} id="historybox">
            <HistoryChart />
          </Box>
          <Text textAlign={"center"} fontSize={"2rem"}>News</Text>
          <Box flex="1" bgColor="#E5F3F4" data-testid="rss-pane-content" overflowY={"scroll"} padding={"1rem"}>
            <RSSFeedPane />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
