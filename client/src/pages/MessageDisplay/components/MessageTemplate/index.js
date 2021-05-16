import React, { useState, useEffect } from 'react'

import { TextArea, Form, Container, Button, Grid, Divider } from "semantic-ui-react"

import { useMessageContext } from "../../../../GlobalStates/MessageState"
import { CLEAR_MESSAGE_TEMPLATE, LOAD_ALL_MESSAGE_TEMPLATES } from "../../../../GlobalStates/MessageState/messageAction"
import MessageTemplateObj from "../../../../utils/MessageTemplate"

import NewMessageTemplate from "../NewMessageTemplate"
import Sidebar from "../Sidebar"
import TweetDisplay from "../TweetDisplay"
import ContactButton from "../ContactButton"

import "./style.css"

export default function MessageTemplate({ tweet, ...props }) {

    const [messageState, messageDispatch] = useMessageContext()
    const [messageBody, editMessageBody] = useState(messageState.current_message_template ? messageState.current_message_template.message : "")
    const [newTemplate, setNewTemplate] = useState(false)

    useEffect(() => {

        if (messageState.current_message_template) {


            editMessageBody(messageState.current_message_template.createMessageFromTemplate(processTweetForTemplate(tweet)))
        }

    }, [messageState.current_message_template, tweet])

    const handleChange = edited => {

        editMessageBody(edited)
    }

    const startNewTemplate = () => {
        setNewTemplate(true)
        messageDispatch({ type: CLEAR_MESSAGE_TEMPLATE })
    }

    const finishedNewTemplate = (templateObj) => {
        messageDispatch({type: LOAD_ALL_MESSAGE_TEMPLATES, all_message_templates: [...messageState.all_message_templates, new MessageTemplateObj(templateObj)] })
        setNewTemplate(false)
    }

    if (!newTemplate) {
        return (

            <Container fluid>
                <Grid celled="internally">
                    <Grid.Column width={4}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid celled="internally">
                            <Grid.Row>
                                <Grid.Column width={16} textAlign="center">
                                    <Form>
                                        <TextArea 
                                        value={messageBody} 
                                        onChange={(event) => handleChange(event.target.value)} 
                                        placeholder = "Select a template message, create a new template, or write a custom message"
                                        style={{ minHeight: 200 }}
                                        />
                                    </Form>
                                    <Divider hidden/>
                                    <Button primary onClick={() => startNewTemplate(true)}>Create New Template</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row textAlign = "center">
                                <Grid.Column verticalAlign="middle" width={16}>
                                    <TweetDisplay tweet={tweet} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <ContactButton tweet = {tweet} messageText = {messageBody}/>
                    </Grid.Column>
                </Grid>
            </Container>
        )

    } else {
        return (
            <NewMessageTemplate tweet = {tweet} finishedTemplate = {finishedNewTemplate} onBack = {() => setNewTemplate(false)}/>
        )
    }
}


function processTweetForTemplate(tweet) {

    const processedTweet = { ...tweet }
    const firstAndLast = processedTweet.name.split(" ")
    processedTweet["lastName"] = firstAndLast[1]
    processedTweet["firstName"] = firstAndLast[0]
    return processedTweet
}