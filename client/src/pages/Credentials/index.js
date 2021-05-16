import React from 'react'
import { Route, Link, Switch } from "react-router-dom"

import { Container, Segment, Grid } from "semantic-ui-react"

import Login from "./Login"
import Signup from "./Signup"

import "./style.css"

export default function Credentials(props) {


    return (
        <Container fluid className="backing overflow">
            <Switch>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route>
                    <Login />
                </Route>
            </Switch>
        </Container>

    )
}