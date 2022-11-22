import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ListIcon, List, ListItem, Text } from '@chakra-ui/react'
import { CalendarIcon, Search2Icon, UpDownIcon, DragHandleIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

function PollCardModal(props) {

    const [data, setData] = useState(props.data)

    useEffect(() => {

        console.log(data)
    })


    return (<>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Poll Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <List spacing={3}>
                        <ListItem >
                            <ListIcon as={Search2Icon} color='green.500'/>
                            <Text display="inline">Source: {data.Source} </Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color='green.500' />
                            <Text display="inline" >Date Published: {data.DatePublished} </Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color='green.500' />
                            <Text display="inline" >Start Date: {data.SurveyDate.StartDate}</Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color='green.500' />
                            <Text display="inline" >End Date: {data.SurveyDate.EndDate} </Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={UpDownIcon} color='green.500' />
                            <Text display="inline" >Changes With: {data.ChangesWith} </Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={DragHandleIcon} color='green.500' />
                            <Text display="inline" >Sample Size: {data.SampleSize} </Text>
                        </ListItem>
                    </List>


                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}

export default PollCardModal