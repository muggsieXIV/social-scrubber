import React from 'react'

import {Card, Image} from "semantic-ui-react"

export default function TweetDisplay({tweet, ...props}) {

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size="mini"
                    src={tweet.profile_image_url}
                />
                <Card.Header>{tweet.name}</Card.Header>
                <Card.Meta>{tweet.username}</Card.Meta>
                <Card.Description>
                    {tweet.text}
                </Card.Description>
            </Card.Content>
        </Card>
    )
    }