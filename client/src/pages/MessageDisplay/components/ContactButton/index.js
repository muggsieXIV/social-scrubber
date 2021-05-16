import React, {useState} from 'react'
import {Button} from "semantic-ui-react"

import ContactAPI from "../../../../APIs/ContactAPI"
import TweetsAPI from '../../../../APIs/TweetsAPI'
import MessageAPI from "../../../../APIs/MessageAPI"

import {useTweetContext} from "../../../../GlobalStates/TweetState"
import {useMessageContext} from "../../../../GlobalStates/MessageState"

import {TWEET_SELECTED} from "../../../../GlobalStates/TweetState/tweetAction"

import {Message, Container} from "semantic-ui-react"

import "./style.css"




export default function ContactButton({tweet, messageText, ...props}) {

    const [tweetState, tweetDispatch] = useTweetContext()
    const [messageState, _] = useMessageContext()
    const [confirmation, setConfirmation] = useState(false)
    const [error, setError] = useState(false)
    

    const createContact = () => {
        return ContactAPI.createContact(tweet.author_id, tweet.username, tweet.name, tweet.profile_img_url)
    }
    
    const createTweet = () => {
        return TweetsAPI.createTweet(tweet.id, tweetState.keyword.id, tweet.created_at, tweet.text, tweet.author_id)
    }

    const handleSubmit = () => {
        
        createContact().then(dbContact => {
            createTweet().then(dbTweet => {
                MessageAPI.createMessage(messageText, dbContact.authorId, tweetState.keyword.id, messageState.current_message_template.id, dbTweet.tweetId).then(message => {
                    if (!message) {
                        console.log("Already have contacted this user")
                        //Alert that tweeter has already been contacted
                        setError(true)
                        setTimeout(() => {
                            setError(false)
                            tweetDispatch({type: TWEET_SELECTED, tweet: tweet})
                        }, 750)
                    } else {
                        console.log("Message saved!")
                        // Say that message has been sent
                        setConfirmation(true)
                        setTimeout(() => {
                            setConfirmation(false)
                            tweetDispatch({type: TWEET_SELECTED, tweet: tweet})
                        }, 750)
                    }
                    
                })
            })
        })
    }



    return (
        <Container fluid>
            <Button primary onClick = {handleSubmit}>Send Message</Button>
            {confirmation ? <Message className="alert" positive header="Message Sent!"/> : null}
            {error ? <Message className="alert" negative content="Oops, looks like you have already contacted this user."/> : null}
        </Container>
        
        
        
    )

}