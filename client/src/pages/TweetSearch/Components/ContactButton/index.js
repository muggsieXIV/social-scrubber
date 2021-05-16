import React, { useState } from 'react'
import { Button, Dimmer, Container, Segment, Icon} from "semantic-ui-react"

import MessageDisplay from "../../../MessageDisplay"


import "./style.css"


export default function ContactButton({ tweet, dismiss, ...props }) {

    const [dimmerActive, setDimmerActive] = useState(false)


    const openDimmer = () => {
        setDimmerActive(true)
    }

    const addClient = () => {
    }

    const closeDimmer = () => {
        setDimmerActive(false)
    }

    return (
        <Container fluid className="no-padding">
            <Button primary onClick={openDimmer}>Contact</Button>
            {/* <Button color={"green"} onClick={addClient}>Add Client</Button> */}
            <Button onClick={dismiss} color={"red"} floated="right">Dismiss</Button>
            <Dimmer page active = {dimmerActive} onClickOutside={closeDimmer}>
                <MessageDisplay tweet={tweet} closeDimmer={closeDimmer} />
            </Dimmer>
        </Container>
    )
        
        

}
