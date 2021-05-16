import React from 'react'

import {Input, Container, Button, Icon, Message, Divider} from "semantic-ui-react"

export default function SignupUsername({uniqueUsername, loadingUsername, usernameError, currentUsername,  handleUsernameChange, checkUsername,  ...props}) {

    if (loadingUsername) {

        return (
            <Container fluid>

                <Input
                    fluid
                    loading
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    value={currentUsername}
                />
            </Container>
        )
    } else if (uniqueUsername) {
        return (
            <Container fluid>
                <Input
                    fluid
                    disabled
                    icon="user"
                    label={<Button color = "green"><Icon name="check"/></Button>}
                    labelPosition="right"
                    iconPosition="left"
                    value={currentUsername}
                    onChange={() => { }} />
                    <Divider hidden fitted/>
                    
                    
            </Container>
        )
    } else {
        return (
            <Container fluid>

                <Input
                    fluid  
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    value={currentUsername}
                    onChange={e => handleUsernameChange(e.target.value)} />
                {usernameError ? <Message compact negative content={usernameError} /> : null}
                <Divider hidden fitted/>
                {currentUsername.length > 4 &&
        
                    <Button animated="vertical" onClick={checkUsername}>
                        <Button.Content visible>Set Username</Button.Content>
                        <Button.Content hidden>
                            <Icon name="double angle down" />
                        </Button.Content>
                </Button> }
                

            </Container>
        )
    }

}