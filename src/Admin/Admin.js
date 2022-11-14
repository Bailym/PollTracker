import { FormControl, FormLabel, Input, VStack, Box, Button, Divider, IconButton } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Container, Select, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from 'react';
import axios from 'axios';


function Admin() {

    const [partyComponents, setPartyComponents] = useState([]);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [success, setSuccess] = useState(false);
    const [successText, setSuccessText] = useState("");

    //runs when + button is clicked
    function addParty() {

        //create a temp object and push a new party component to it
        let newPartyComponents = partyComponents;

        newPartyComponents.push(<Box key={partyComponents.length} bgColor={partyComponents.length % 2 === 0 ? "#f2fffb" : "#fff"}>
            <Divider />
            <IconButton icon={<MinusIcon />} width="100%" color="#ff0000" onClick={(e) => removeParty(e)} />
            <FormControl isRequired>
                <FormLabel>Party</FormLabel>
                <Select placeholder='Party' name={"party" + partyComponents.length}>
                    <option>CON</option>
                    <option>LAB</option>
                    <option>LDEM</option>
                    <option>GRN</option>
                    <option>REFUK</option>
                    <option>SNP</option>
                    <option>OTHER</option>
                </Select>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Points</FormLabel>
                <NumberInput defaultValue={0} min={1} max={100} name={"points" + partyComponents.length}>
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

    //remove an added party component
    function removeParty(e) {

        //start with the immediate parent node. This will differ depending on which part of the button is clicked since the button has children inside it.
        let nodeToRemove = e.target.parentNode;

        //if the parent node is not a div, i.e. you have clicked the icon or svg inside the button, then get the parent of the parent node.
        while (nodeToRemove.tagName !== "DIV") {
            nodeToRemove = nodeToRemove.parentNode;
        }

        nodeToRemove.remove();
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
        let pointsTotal = 0;
        let selectedParties = [];

        for (var i = 0; i < partyComponents.length; i++) {

            if (e.target["party" + i]) {
                //get the correct colour for the party (This could be a dedicated document property once/if a Party collection is created)
                let party = e.target["party" + i].value;
                let fillColour = "#9fa39d";

                //Hardcoded party colours BAD
                if (party === "CON") {
                    fillColour = "#0958b3";
                }
                else if (party === "LAB") {
                    fillColour = "#ff0000";
                }
                else if (party === "LDEM") {
                    fillColour = "#ff8812";
                }
                else if (party === "SNP") {
                    fillColour = "#ebeb02"
                }
                else if (party === "GRN") {
                    fillColour = "#02ed39"
                }
                else if (party === "REFUK") {
                    fillColour = "#5cdee0"
                }

                parties.push({
                    Party: e.target["party" + i].value,
                    Points: e.target["points" + i].value,
                    fill: fillColour
                })

                //Keep a running total of the points
                pointsTotal += parseInt(e.target["points" + i].value)

                //Keep a list of the selected parties
                selectedParties.push(e.target["party" + i].value);
            }
        }

        let formValid = true;

        //if the total points is over 100, then show an error
        if (pointsTotal > 100) {
            setSuccess(false);
            setError(true);
            setErrorText("Total points cannot be over 100");
            formValid = false;
        }

        //if selectedParties contains the same party more than once, then show an error
        if (selectedParties.length !== new Set(selectedParties).size) {
            setSuccess(false);
            setError(true);
            setErrorText("You cannot select the same party more than once");
            formValid = false;
        }

        //if all checks pass, then submit the form
        if (formValid) {
            setError(false); //clear any previous errors

            //send the data to the server using axios, log to console if successful
            await axios.post("/api/polls/add", {
                source: source,
                datePublished: datePublished,
                startDate: startDate,
                endDate: endDate,
                changesWith: changesWith,
                parties: parties
            })
                .then(function (response) {
                    setSuccess(true);
                    setSuccessText("Poll added successfully");
                    //clear the form
                    e.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <Container>
            {error ? <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{errorText}</AlertTitle>
            </Alert> : null}
            {success ? <Alert status='success'>
                <AlertIcon />
                <AlertTitle>{successText}</AlertTitle>
            </Alert> : null}
            <form onSubmit={(e) => submitForm(e)}>
                <FormControl isRequired>
                    <FormLabel>Source</FormLabel>
                    <Input placeholder='Source' name="source" />
                </FormControl>
                <FormControl isRequired>
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
                    margin="2rem 0"
                >
                    {partyComponents}
                    <IconButton aria-label='Search database' icon={<AddIcon />} onClick={() => addParty()} />
                </VStack>
                <Button type="submit">Button</Button>
            </form>
        </Container>
    );
}

export default Admin;
