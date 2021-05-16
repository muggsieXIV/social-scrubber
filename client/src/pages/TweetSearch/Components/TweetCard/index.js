import React from "react"
import RejectButton from "../RejectButton"
import {Card, Image} from "semantic-ui-react"

import TweetsAPI from "../../../../APIs/TweetsAPI"

import {useTweetContext} from "../../../../GlobalStates/TweetState"
import {TWEET_SELECTED} from "../../../../GlobalStates/TweetState/tweetAction"
import ContactButton from "../ContactButton"

export default function TweetCard({tweet, ...props}) {

    const [tweetState, tweetDispatch] = useTweetContext()

    const handleReject = () => {
        TweetsAPI.rejectTweet(tweet).then(rejected => {
            console.log("Tweet rejected")
            tweetDispatch({type: TWEET_SELECTED, tweet: tweet})
        })
    }

    

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={tweet.profile_image_url}
                />
                <Card.Header>{tweet.name}</Card.Header>
                <Card.Meta>{tweet.username}</Card.Meta>
                <Card.Description>
                    {tweet.text}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/* <RejectButton onClick={handleReject}/> */}
                <ContactButton dismiss = {handleReject} tweet = {tweet}/>
            </Card.Content>
        </Card>
    )
}