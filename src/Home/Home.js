import './Home.css';
import React, { PureComponent, useState, useEffect } from 'react';
import { Input, Button, Flex, Spacer, Box } from '@chakra-ui/react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import PollCard from '../Components/PollCard/PollCard.js';


function Home() {


  const [data, setData] = useState([]);

  useEffect(() => {

    //retrieved a poll by id
    async function getPoll() {

      let id = "6356d166b79a0a51bb4a876e"  //read the value from the input field

      //make the request
      await axios.get("/api/polls/get/" + id)
        .then((response) => {
          setData(response.data.Data);
        })
    }

    getPoll();
  }, []);

  return (
    <Flex>
      <Box flex="2" height="92vh" margin="2vh" bgColor="#E5F3F4">
        <PollCard data={data} />
      </Box>
      <Box flex="4" margin="2vh">
        <Flex height="92vh" flexDir="column" justify="center">
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
