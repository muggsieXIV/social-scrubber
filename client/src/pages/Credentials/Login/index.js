import React, { useState, useRef, useEffect } from 'react'

import { Link } from "react-router-dom"

import { useUserContext } from "../../../GlobalStates/UserState"
import { SET_USER } from "../../../GlobalStates/UserState/userAction"

import { Segment, Grid, Divider, Container, Message, Header } from "semantic-ui-react"
import UserAPI from '../../../APIs/UserAPI'

import LoginUsername from '../components/LoginUsername'
import LoginPassword from '../components/LoginPassword'

export default function Credentials(props) {

    const [_, userDispatch] = useUserContext()

    const [validUser, setValidUser] = useState(false);
    const [loadingUsername, setLoadingUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false)
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [currentUsername, editUsername] = useState("")
    const [currentPassword, editPassword] = useState("")

    const handleUsernameChange = edited => {
        editUsername(edited)
    }

    const handlePasswordChange = edited => {
        editPassword(edited)
    }

    useEffect(() => {
        return () => {
            editUsername("")
            editPassword("")
            setValidUser(false);
            setLoadingUsername(false);
            setUsernameError(false);
            setPasswordError(false);
            setValidPassword(false);
        }
    }, [])

    const checkUsername = () => {
        setLoadingUsername(true)
        UserAPI.getCredentials(currentUsername).then(user => {
            setLoadingUsername(false);
            if (!user) {
                editUsername("")
                setUsernameError(true)
                setTimeout(() => { setUsernameError(false) }, 2000)

            } else {
                setValidUser(user)

            }
        })
    }

    const checkPassword = () => {
        if (!UserAPI.validatePassword(currentPassword, validUser.password)) {
            editPassword("")
            setPasswordError(true);
            setTimeout(() => { setPasswordError(false) }, 2000);
        } else {
            setValidPassword(true);
            login()
        }
    }

    const login = () => {
        UserAPI.login(validUser.username).then(dbUser => {
            
            userDispatch({ type: SET_USER, user: dbUser })
        })
    }

    return (
        <Grid centered verticalAlign="middle" style={{ height: "100%" }}>
            <Grid.Row>

                <Grid.Column computer={5} tablet={8} mobile={12}>
                    <Segment textAlign="center" style={{width: "100%"}} loading={validPassword ? true : false}>

                        <Header color="blue" size="huge">Login</Header>

                        <LoginUsername
                            currentUsername={currentUsername}
                            handleUsernameChange={handleUsernameChange}
                            loadingUsername={loadingUsername}
                            usernameError={usernameError}
                            checkUsername={checkUsername}
                            validUser={validUser} />

                        <Divider hidden />
                        <LoginPassword
                            validUser={validUser}
                            currentPassword={currentPassword}
                            handlePasswordChange={handlePasswordChange}
                            passwordError={passwordError}
                            checkPassword={checkPassword}
                            validPassword={validPassword}
                        />

                    </Segment>
                    <Divider horizontal><span className="horizontal-divider">OR</span></Divider>
                    <Segment textAlign="center" style={{width: "100%"}}>
                        <Container fluid>
                            <Message compact>
                                <Header size="large">
                                    <Link to="/signup">Signup</Link>
                                </Header>
                                <Divider />
                                <Message.Content>
                                    Create an account and make customer aquisition easier than ever.
                                </Message.Content>
                            </Message>
                        </Container>
                    </Segment>

                </Grid.Column>

                <Grid.Column computer={11} tablet={8} only="computer tablet">


                </Grid.Column>
            </Grid.Row>

        </Grid>

    )
}
