import React, {} from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {TweetProvider} from "../../GlobalStates/TweetState"
import {MessageProvider} from "../../GlobalStates/MessageState"
import TweetDisplay from "./Components/TweetDisplay"

export default function TweetSearch(props) {

    return (
        <TweetProvider>
            <MessageProvider>
                <TweetDisplay/>
            </MessageProvider>
        </TweetProvider>

    )

}