import React from 'react'

import {useMessageContext} from "../../../../GlobalStates/MessageState"
import {SELECT_MESSAGE_TEMPLATE} from "../../../../GlobalStates/MessageState/messageAction"
import {Segment, Button} from 'semantic-ui-react'


export default function Sidebar(props) {

    const [messageState, messageDispatch] = useMessageContext()

    const handleTemplateSelect = template => {
        
        messageDispatch({type: SELECT_MESSAGE_TEMPLATE, current_message_template: template})
    }

    
    return (
        <Segment>
            {messageState.all_message_templates.map((template, index) => {
                return <TemplateButton template = {template} key = {index} onClick = {() => handleTemplateSelect(template)}/>
            })}
        </Segment>
    )

}

function TemplateButton({template, onClick, ...props}) {
    
    return (
        <Button primary onClick = {onClick} fluid>{template.title}</Button> 
    )
    
    

}