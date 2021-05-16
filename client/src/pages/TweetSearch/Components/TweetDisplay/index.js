import React, { useState, useEffect } from 'react'

import { useTweetContext } from "../../../../GlobalStates/TweetState"
import { useMessageContext } from "../../../../GlobalStates/MessageState"

import { REFRESH_TWEETS } from "../../../../GlobalStates/TweetState/tweetAction"
import { LOAD_ALL_MESSAGE_TEMPLATES } from "../../../../GlobalStates/MessageState/messageAction"

import TweetsAPI from "../../../../APIs/TweetsAPI"
import MessageTemplateAPI from "../../../../APIs/MessageTemplateAPI"

import TweetCard from "../TweetCard"
import { Card, Container, Segment, Divider, Icon } from "semantic-ui-react"
import SearchBar from "../SearchBar"

export default function TweetDisplay(props) {

    const [tweetState, tweetDispatch] = useTweetContext()
    const [messageState, messageDispatch] = useMessageContext()
    const [moreTweets, setMoreTweets] = useState(true)

    const [loadingTweets, setLoadingTweets] = useState(false)

    const getNewTweets = () => {
        if (tweetState.keyword) {
            setLoadingTweets(true)
            TweetsAPI.getNewTweets(tweetState.keyword.word).then(tweets => {
                console.log(tweets)

                if (tweets.length > 0) {
                    tweetDispatch({ type: REFRESH_TWEETS, tweets: tweets })
                } else {
                    setMoreTweets(false)
                }
                setLoadingTweets(false)
            })
        }
    }

    useEffect(() => {
        if (tweetState.activeTweets.length == 0) {
            getNewTweets()
        }
    }, [tweetState.activeTweets, tweetState.keyword])

    useEffect(() => {
        MessageTemplateAPI.getAllTemplates().then(templateObjects => {
            messageDispatch({ type: LOAD_ALL_MESSAGE_TEMPLATES, all_message_templates: templateObjects })
        })
    }, [])

    return (
        <Container>
            <SearchBar />

            <Divider horizontal style={{ lineColor: "blue" }}><Icon name="twitter" color="blue" />TWEETS<Icon name="twitter" color="blue" /></Divider>

            {!moreTweets ? <Segment>You've searched all recent tweets for this keyword. Try changing keywords!</Segment> :
                (loadingTweets ? "test" :
                    <Card.Group centered>
                        {tweetState.activeTweets.map((tweet, index) => {
                            return (
                                <TweetCard key={index} tweet={tweet} />
                            )
                        })}
                    </Card.Group>)}
        </Container>

    )

}