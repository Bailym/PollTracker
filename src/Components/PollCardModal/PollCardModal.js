import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, ListIcon, List, ListItem, Text } from '@chakra-ui/react'
import { CalendarIcon, Search2Icon, UpDownIcon, DragHandleIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import Moment from 'react-moment';

function PollCardModal(props) {

    const [data, setData] = useState(props.data)

    return (<>
        <Modal isOpen={props.isOpen} onClose={props.onClose} size="xs">
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
                            <Text display="inline" >Date Published: <Moment format ="DD/MM/YYYY">{data.DatePublished}</Moment></Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color='green.500' />
                            <Text display="inline" >Start Date: <Moment format ="DD/MM/YYYY">{data.SurveyDate.StartDate}</Moment></Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={CalendarIcon} color='green.500' />
                            <Text display="inline" >End Date: <Moment format ="DD/MM/YYYY">{data.SurveyDate.EndDate}</Moment></Text>
                        </ListItem>
                        <ListItem>
                            <ListIcon as={UpDownIcon} color='green.500' />
                            <Text display="inline" >Changes With: <Moment format ="DD/MM/YYYY">{data.ChangesWith}</Moment> </Text>
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