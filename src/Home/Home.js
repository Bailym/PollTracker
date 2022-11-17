import './Home.css';
import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react'
import axios from 'axios';
import PollCard from '../Components/PollCard/PollCard.js';


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
    <Flex height="95vh" data-testid="home-component">
      <Box flex="2" height="90vh" margin="2vh" bgColor="#E5F3F4" overflowY="scroll">
        {pollCards}
      </Box>
      <Box flex="4" margin="2vh">
        <Flex height="90vh" flexDir="column" justify="center">
          <Box flex="1" margin="0 1vw 1vw 1vw" bgColor="#E5F3F4">


          </Box>
          <Box flex="1" margin="1vw 1vw 0 1vw" bgColor="#E5F3F4">

          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
