import './Home.css';
import React, { PureComponent, useState, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';


function Home() {


  const [data, setData] = useState([]);

  //retrieved a poll by id
  async function getPoll() {

    let id = document.getElementById("poll-id").value;  //read the value from the input field

    //make the request
    await axios.get("/api/polls/get/" + id)
      .then((response) => {
        setData(response.data.Data);
      })
  }


  return (
    <div>
      <p>Home</p>
      <Input placeholder="Poll ID" id="poll-id"></Input>
      <Button onClick={() => getPoll()}>Get Poll</Button>
      <ResponsiveContainer width="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Party" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Points" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Home;
