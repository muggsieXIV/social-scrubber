import React from "react"

import { Container, Input, Button, Icon, Message, Divider } from "semantic-ui-react"

export default function LoginUsername({ currentUsername, handleUsernameChange, loadingUsername, usernameError, checkUsername, validUser, ...props }) {

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
    } else if (validUser) {
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
                {usernameError ? <Message compact negative content="Username does not match any registered accounts" /> : null}
                <Divider hidden fitted/>
                {currentUsername &&
        
                    <Button animated="vertical" onClick={checkUsername}>
                        <Button.Content visible>Continue</Button.Content>
                        <Button.Content hidden>
                            <Icon name="double angle down" />
                        </Button.Content>
                </Button> }
                

            </Container>
        )
    }

}