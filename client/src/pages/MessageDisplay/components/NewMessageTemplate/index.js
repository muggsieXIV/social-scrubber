import React, { useState} from 'react'
import { TextArea, Container, Button, Grid, Form, Divider, Input, Icon } from 'semantic-ui-react'

import KeywordDropdown from "../KeywordDropdown"

import KeywordAPI from '../../../../APIs/KeywordAPI'
import MessageTemplateAPI from '../../../../APIs/MessageTemplateAPI'
import "./style.css"





export default function NewMessageTemplate({ tweet, finishedTemplate, onBack, ...props }) {

    const [currentTemplate, editCurrentTemplate] = useState("")
    const [associatedKeyword, setAssociatedKeyword] = useState()
    const [title, editTitle] = useState("")


    const additions = [
        { visible: "full name", addition: "{{name}}" },
        { visible: "first name", addition: "{{firstName}}" },
        { visible: "last name", addition: "{{lastName}}" }

    ]

    const handleTemplateChange = edited => {
        editCurrentTemplate(edited)
    }

    const handleTemplateClick = addition => {
        editCurrentTemplate(currentTemplate + addition)
    }

    const handleKeywordChange = (keyword) => {
        setAssociatedKeyword(keyword)
    }

    const handleTitleChange = title => {
        editTitle(title)
    }

    const goBack = () => {
        onBack()
        // setAssociatedKeyword("")
        // editCurrentTemplate("")
        // editTitle("")
    }

    const handleTemplateSubmit = () => {

        handleUniqueTitleValidation(title).then(valid => {

            if (!handleTitleTemplateValidation(title, currentTemplate)) {
                console.log("Some fields are empty")
                return 
            }

            if (!valid) {
                console.log("Title already in use")
                //Set alert
            } else {
                if (!associatedKeyword || associatedKeyword == "") {
                    MessageTemplateAPI.createNewTemplate(title, currentTemplate, null).then(template => {
                        finishedTemplate(template)
                    })
                } else {
                    KeywordAPI.createKeyword(associatedKeyword).then(keyword => {
                        MessageTemplateAPI.createNewTemplate(title, currentTemplate, keyword.id).then(template => {
                            finishedTemplate(template)
                        })
                    })
                }
            }
        })


    }

    return (
        <Container fluid>
             <Button content = "Back to tweets" icon="left arrow" labelPosition = "left" floated="left" size="small" onClick = {goBack}/>
            
            <Grid celled="internally">

                <Grid.Column width={12}>
                    <Input size="small" placeholder="Template Title" onChange = {(e, {value}) => handleTitleChange(value)}/>
                    <Divider />
                    <Form>

                        <TextArea
                            value={currentTemplate}
                            placeholder="Write your new message template here. Use the 'template buttons' to create placeholders which will be filled based on the user whom you are contacting."
                            onChange={(e) => handleTemplateChange(e.target.value)}
                            style={{ minHeight: 200 }}
                        />
                    </Form>
                    <Divider />
                    <Grid centered columns={4}>
                        {additions.map((addition, index) => {
                            return (
                                <Grid.Column key={index}>
                                    <Button primary onClick={() => handleTemplateClick(addition.addition)}>{addition.visible}</Button>
                                </Grid.Column>
                            )
                        })}
                    </Grid>
                </Grid.Column>
                <Grid.Column width={4}>
                    <KeywordDropdown handleKeywordChange={handleKeywordChange} />
                    <Divider />
                    <Button fluid onClick = {handleTemplateSubmit}>Submit</Button>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

const handleUniqueTitleValidation = title => {
    return MessageTemplateAPI.getTemplateByTitle(title).then(template => {
        if (!template) {
            return true;
        } else {
            return false
        }
    })
}

const handleTitleTemplateValidation = (title, template) => {
    if (title.length === 0 || template.length < 20) {
        return false
    }
    return true
}
