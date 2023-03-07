import { Box, Flex, Text } from '@chakra-ui/react'
import Moment from 'react-moment';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PollCardModal from '../PollCardModal/PollCardModal'
import { useState } from 'react'


function PollCard(props) {

    const [openModal, setOpenModal] = useState(false)

    function onClose(){
        setOpenModal(false)
    }

    return (
        <Box bg={"rgba(245, 245, 245, 0.75)"} boxShadow={"0px 4px 4px 5px rgba(0, 0, 0, 0.1)"} minW={"90%"} h={["22vh","22vh","30vh"]} margin= {["2rem 1rem","1rem", "1.5rem auto"]}   onClick={() => { setOpenModal(true) }}>
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
                    <XAxis dataKey="partyLabel" label/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pointsValue" name="Points" />
                </BarChart>
            </ResponsiveContainer>
            <PollCardModal isOpen={openModal} onClose={()=> onClose()} data={props.data} />
        </Box>
    )
}

export default PollCard;
