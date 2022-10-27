import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, VStack, Box, StackDivider, IconButton, Button, Form } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import axios from 'axios';


function Admin() {

    const [partyComponents, setPartyComponents] = useState([]);

    //runs when + button is clicked
    function addParty() {

        //create a temp object and push a new party component to it
        let newPartyComponents = partyComponents;

        newPartyComponents.push(<Box key={partyComponents.length}>
            <FormControl>
                <FormLabel>Party</FormLabel>
                <Input placeholder='Party' name={"party" + partyComponents.length} />
            </FormControl>
            <FormControl>
                <FormLabel>Points</FormLabel>
                <NumberInput defaultValue={0} min={0} max={100} name={"points" + partyComponents.length}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </Box>)

        //update state 
        setPartyComponents([...newPartyComponents]);
    }

    //Handles form submit 
    async function submitForm(e) {
        e.preventDefault(); //prevent refresh

        //get the form data
        let source = e.target.source.value;
        let datePublished = e.target.datepublished.value;
        let startDate = e.target.startdate.value;
        let endDate = e.target.enddate.value;
        let changesWith = e.target.changeswith.value;

        let parties = [];

        for (var i = 0; i < partyComponents.length; i++) {
            parties.push({
                Party: e.target["party" + i].value,
                Points: e.target["points" + i].value
            })
        }

        //send the data to the server using axios
        await axios.post("/api/polls/add", {
            source: source,
            datePublished: datePublished,
            startDate: startDate,
            endDate: endDate,
            changesWith: changesWith,
            parties: parties
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={(e) => submitForm(e)}>
                <FormControl isRequired>
                    <FormLabel>Source</FormLabel>
                    <Input placeholder='Source' name="source" />
                </FormControl>
                <FormControl>
                    <FormLabel>Date Published</FormLabel>
                    <Input type="date" name="datepublished" />
                </FormControl>
                <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" name="startdate" />
                </FormControl>
                <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" name="enddate" />
                </FormControl>
                <FormControl>
                    <FormLabel>Changes With</FormLabel>
                    <Input type="date" name="changeswith" />
                </FormControl>
                <VStack
                    spacing={4}
                    align='stretch'
                >
                    {partyComponents}
                    <IconButton aria-label='Search database' icon={<AddIcon />} onClick={() => addParty()} />
                </VStack>
                <Button type="submit">Button</Button>
            </form>
        </div>
    );
}

export default Admin;
