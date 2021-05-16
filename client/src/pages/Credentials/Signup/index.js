import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Segment, Grid, Divider, Header, Container, Message } from "semantic-ui-react"

import {useUserContext} from "../../../GlobalStates/UserState"
import {SET_USER} from "../../../GlobalStates/UserState/userAction"

import UserAPI from "../../../APIs/UserAPI"

import PasswordValidator from "../../../utils/PasswordValidator"
import SignupUsername from "../components/SignupUsername"
import SignupPassword from "../components/SignupPassword"

export default function Signup(props) {

    const [userState, userDispatch] = useUserContext()

    const [uniqueUsername, setUniqueUsername] = useState(false);
    const [loadingUsername, setLoadingUsername] = useState(false)
    const [usernameError, setUsernameError] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false)

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
            setUniqueUsername(false);
            setLoadingUsername(false);
            setUsernameError(false);
            setValidPassword(false);
            setPasswordError(false);
        }
    }, [])

    const checkUsername = () => {
        setLoadingUsername(true)
        UserAPI.getCredentials(currentUsername).then(dbUser => {

            setLoadingUsername(false)

            if (dbUser) {
                editUsername("")
                setUsernameError("That username is already in use!")
                setTimeout(() => { setUsernameError(false) }, 2000)
            } else {
                setUniqueUsername(currentUsername)
            }
        })
    }

    const checkPassword = () => {
        const passVal = new PasswordValidator(currentPassword)
        var errorMessage = passVal.getErrorMessage()
        if (!errorMessage) {
            setValidPassword(true)
            UserAPI.signup(currentUsername, currentPassword).then(newUser => {
                login(newUser)
                
            })
        } else {
            setPasswordError(errorMessage)
            editPassword("")
            setTimeout(() => {
                setPasswordError("")
            }, 2000)
        }
    }
    
    const login = user => {
        UserAPI.login(user.username).then(dbUser => {
            userDispatch({type: SET_USER, user: dbUser})
        })
    }



    return (
        <Grid centered verticalAlign="middle" style={{ height: "100%" }}>
            <Grid.Row>

                <Grid.Column computer={5} tablet={8} mobile={12}>
                    <Segment textAlign="center" style={{width: "100%"}} loading={validPassword ? true : false}>

                        <Header color="blue" size="huge">Create Account</Header>

                        <SignupUsername
                            currentUsername={currentUsername}
                            handleUsernameChange={handleUsernameChange}
                            loadingUsername={loadingUsername}
                            usernameError={usernameError}
                            checkUsername={checkUsername}
                            uniqueUsername={uniqueUsername} />

                        <Divider hidden />
                        <SignupPassword
                            uniqueUsername={uniqueUsername}
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
                                    <Link to="/">Login</Link>
                                </Header>
                                <Divider />
                                <Message.Content>
                                    If you already have an account.
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