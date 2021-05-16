import React, { useState } from "react"

import {Container, Input, Icon, Divider, Message, Button} from "semantic-ui-react"

export default function SignupPassword({uniqueUsername, validPassword, passwordError, currentPassword, handlePasswordChange, checkPassword, ...props}) {

    const [visible, setVisible] = useState(false)

    const toggleVisiblity = () => {
        setVisible(!visible)
    }

    if (!uniqueUsername) {
        return null
    } else if (validPassword) {
        return (
            <Container fluid>
                <Input
                    type="password"
                    fluid
                    disabled
                    icon="lock open"
                    iconPosition="left"
                    label={<Button color="green"><Icon name="check"/></Button>}
                    labelPosition="right"
                    placeholder="Password"
                    value={currentPassword}
                />
            </Container>
        )
    } else {
        return (
            <Container fluid>
                <Input
                    type={visible ? "text" : "password"}
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label={<Button onClick = {toggleVisiblity}><Icon name={visible ? "hide" : "eye"} /></Button>}
                    labelPosition="right"
                    placeholder="Password"
                    value={currentPassword}
                    onChange={e => handlePasswordChange(e.target.value)}
                />
                <Divider hidden fitted/>
                {passwordError ? <Message compact negative content={passwordError} /> : null}
                {currentPassword &&
                    <Button animated onClick={checkPassword}>
                        <Button.Content visible>Signup</Button.Content>
                        <Button.Content hidden>
                            <Icon name="twitter" />
                        </Button.Content>
                    </Button>}

            </Container>

        )
    }
}