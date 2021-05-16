import React, {useState} from 'react'

import { Container, Input, Button, Icon, Message, Divider } from "semantic-ui-react"

export default function LoginPassword({ validUser, currentPassword, handlePasswordChange, passwordError, checkPassword, validPassword, ...props }) {

    const [visible, setVisible] = useState(false)

    const toggleVisiblity = () => {
        setVisible(!visible)
    }

    if (!validUser) {
        return null
    } else if (validPassword) {
        return (
            <Container fluid>n
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
                {passwordError ? <Message compact negative content="Password incorrect" /> : null}
                {currentPassword &&
                    <Button animated onClick={checkPassword}>
                        <Button.Content visible>Login</Button.Content>
                        <Button.Content hidden>
                            <Icon name="twitter" />
                        </Button.Content>
                    </Button>}

            </Container>

        )
    }

}