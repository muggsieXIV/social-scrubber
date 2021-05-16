import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useUserContext } from "./GlobalStates/UserState"
import UserAPI from "./APIs/UserAPI"

import { SET_USER } from "./GlobalStates/UserState/userAction"
import Home from "./pages/Home"
import Messages from "./pages/Messages"
import Credentials from "./pages/Credentials"
import { Grid, Segment, Header } from 'semantic-ui-react'

import "./globalstyle.css"

import Loader from "./Components/Loader"

export default function Application(props) {

    const [userState, userDispatch] = useUserContext()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        UserAPI.currentUserInfo().then(currentUser => {
            if (currentUser) {
                userDispatch({ type: SET_USER, user: currentUser })
            }
            setReady(true)
        })
    }, [])

    if (ready) {
        return (
            <div>
            <Router>
                {userState.user ?
                    <Switch>
                        <Route>
                            <Home user={userState.user.username}/>
                        </Route>
                    </Switch>
                    : <Credentials />
                }
            </Router>
            </div>

        )
    } else {
        return (
            <Grid centered className="fullscreen" columns={1} verticalAlign="middle">

                <Grid.Column textAlign="center" width={8}>

                    <Loader type="spinningBubbles" height={"20%"} width={"20%"} />


                </Grid.Column>

            </Grid>
        )
    }



}