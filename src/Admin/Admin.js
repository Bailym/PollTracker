import { FormControl, FormLabel, Input, Box, Button, Grid, GridItem } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Container, Select, Alert, AlertIcon, AlertTitle, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import axios from 'axios';


function Admin() {
    // Note the use of "fill" for the hex color property. This is because the rechart component uses the "fill" property to change the colour of the bars on the homepage.
    const [pollDetails, setPollDetails] = useState({
        sourceValue: "",
        datePublishedValue: "",
        startDateValue: "",
        endDateValue: "",
        changesWithValue: "",
        sampleSizeValue: "",
        partyDetails: [
            {
                partyLabel: "LAB",
                fill: "#ff0000",
                pointsValue: 0
            },
            {
                partyLabel: "CON",
                fill: "#0958b3",
                pointsValue: 0
            },
            {
                partyLabel: "LDEM",
                fill: "#ff8812",
                pointsValue: 0
            },
            {
                partyLabel: "GRN",
                fill: "#02ed39",
                pointsValue: 0
            },
            {
                partyLabel: "REF",
                fill: "#5cdee0",
                pointsValue: 0
            },
            {
                partyLabel: "SNP",
                fill: "#ebeb02",
                pointsValue: 0
            },
            {
                partyLabel: "OTHER",
                fill: "#9aa09c",
                pointsValue: 0
            },
        ]
    });

    const [partyPointsInputComponents, setPartyPointsInputComponents] = useState([]);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [success, setSuccess] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [enteredAdminPassword, setEnteredAdminPassword] = useState("");
    const [sourceOptions, setSourceOptions] = useState([]);

    /* On mount - Fetch the possible sources from DB */
    useEffect(() => {
        async function getSources() {
            await axios.get("/api/sources/get")
                .then(response => {
                    setSourceOptions(response.data.map(source => <option key={source._id} value={source.Name}>{source.Name}</option>));
                })
        }
        getSources();
    }, [])

    /* After sources are fetched - Create the party points input components */
    useEffect(() => {
        var partyPointsInputComponents = [];

        for (let i = 0; i < pollDetails.partyDetails.length; i++) {
            let currentParty = pollDetails.partyDetails[i].partyLabel;
            let currentPartyHexValue = pollDetails.partyDetails[i].fill;
            partyPointsInputComponents.push(
                <GridItem key={i} bgColor={currentPartyHexValue} borderRadius="10px">
                    <FormControl>
                        <FormLabel textAlign="center">{currentParty}</FormLabel>
                        <NumberInput min={0} max={100} bgColor="#fff" id={`points${currentParty}`}>
                            <NumberInputField data-testid="points-lab" borderTopRadius="0" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </GridItem>
            )
        }
        setPartyPointsInputComponents(partyPointsInputComponents);
    }, [sourceOptions, pollDetails.partyDetails])

    function adminLoginAttempt() {
        setEnteredAdminPassword(document.getElementById("adminpassword").value);
    }

    function formChanged() {
        let partyDetailsCopy = pollDetails.partyDetails;

        partyDetailsCopy.forEach(party => {
            let currentPointsValue = document.getElementById(`points${party.partyLabel}`) ? document.getElementById(`points${party.partyLabel}`).value : 0;
            party.pointsValue = parseInt(currentPointsValue);
        });

        setPollDetails({
            sourceValue: document.getElementById("source").value,
            datePublishedValue: document.getElementById("datePublished").value,
            startDateValue: document.getElementById("startDate").value,
            endDateValue: document.getElementById("endDate").value,
            changesWithValue: document.getElementById("changesWith").value,
            sampleSizeValue: document.getElementById("sampleSize").value,
            partyDetails: partyDetailsCopy
        });
    }

    async function submitForm(e) {
        e.preventDefault();
        let isFormValid = validateForm();

        if (isFormValid) {
            setError(false);
            await axios.post("/api/polls/add", pollDetails)
                .then(function (response) {
                    showSuccess("Poll added successfully");
                    resetFormInputs(e);
                })
                .catch(function (error) {
                    showError("Error adding poll");
                });
        }
    }

    function resetFormInputs(e) {
        e.target.reset();
        pollDetails.partyDetails.forEach(party => {
            document.getElementById(`points${party.partyLabel}`).value = null
        });
    }

    function validateForm() {
        let isFormValid = true;

        if (!checkPointsTotalInRange()) {
            isFormValid = false;
            showError("Points total must be between 1 and 100");
            return isFormValid;
        }

        return isFormValid;
    }

    function checkPointsTotalInRange() {
        let pointsRunningTotal = 0;

        pollDetails.partyDetails.forEach(party => {
            if (!isNaN(party.pointsValue)) {
                pointsRunningTotal += party.pointsValue
            }
        });

        let isPointsTotalInRange = pointsRunningTotal > 0 && pointsRunningTotal <= 100;

        return isPointsTotalInRange
    }

    function showError(errorText) {
        setSuccess(false);
        setError(true);
        setErrorText(errorText);
    }

    function showSuccess(successText) {
        setError(false);
        setSuccess(true);
        setSuccessText(successText);
    }

    if (enteredAdminPassword === process.env.REACT_APP_ADMIN_PASS) {
        return (
            <Container data-testid="admin-form">
                <form onSubmit={(e) => submitForm(e)} onChange={() => formChanged()}>
                    <FormControl isRequired>
                        <FormLabel>Source</FormLabel>
                        <Select placeholder='Select source' id="source" data-testid="source">
                            {sourceOptions}
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Date Published</FormLabel>
                        <Input type="date" id="datePublished" data-testid="date-published" />
                    </FormControl>
                    <Flex flexDir="row">
                        <FormControl flex="1">
                            <FormLabel>Start Date</FormLabel>
                            <Input type="date" id="startDate" data-testid="start-date" />
                        </FormControl>
                        <FormControl flex="1">
                            <FormLabel>End Date</FormLabel>
                            <Input type="date" id="endDate" data-testid="end-date" />
                        </FormControl>
                    </Flex>
                    <FormControl>
                        <FormLabel>Changes With</FormLabel>
                        <Input type="date" id="changesWith" data-testid="changes-with" />
                    </FormControl>
                    <FormLabel>Sample Size</FormLabel>
                    <NumberInput min={1} max={99999} id="sampleSize">
                        <NumberInputField data-testid="sample-size" />
                    </NumberInput>
                    <Grid gridTemplateColumns="repeat(3,1fr)" gridTemplateRows="repeat(3,1fr)" gap="3" marginTop="1rem" marginBottom="2rem">
                        {partyPointsInputComponents}
                        <GridItem colSpan="2">
                            <Button type="submit" width="100%" height="100%" data-testid="add-poll-submit">Add Poll</Button>
                        </GridItem>
                    </Grid>
                </form>
                {error ? <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{errorText}</AlertTitle>
                </Alert> : null}
                {success ? <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>{successText}</AlertTitle>
                </Alert> : null}
            </Container>)
    }
    else {
        return (
            <Box data-testid="admin-pass-form">
                <FormLabel>Admin Password:</FormLabel><Input type="password" id="adminpassword" data-testid="admin-pass-input"></Input>
                <Button onClick={(e) => adminLoginAttempt()} data-testid="admin-pass-submit">Enter</Button>
            </Box>)
    }
}

export default Admin;
