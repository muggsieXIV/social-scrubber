import React from "react"

import { Segment, Button, Icon, Grid, Divider } from "semantic-ui-react"


import MessageTemplate from "./components/MessageTemplate"

import "./style.css"


export default function MessageDisplay({ closeDimmer, tweet, ...props }) {

    return (

        <Segment size="massive" id="dimmer" className="overflow">

            <Button icon color="red" onClick={closeDimmer} floated="right" size="small" id="close-button">
                <Icon size="small" inverted name="close" />
            </Button>
            <Divider/>
            
            <MessageTemplate tweet = {tweet}/>
                
            
            
        

        </Segment>
    )

}