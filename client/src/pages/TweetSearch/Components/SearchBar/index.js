import React, { useState, useEffect } from 'react'
import { useTweetContext } from "../../../../GlobalStates/TweetState"
import { Segment, Input, Button, Icon, Container, Divider } from "semantic-ui-react"
import { SET_KEYWORD } from "../../../../GlobalStates/TweetState/tweetAction"
import KeywordAPI from "../../../../APIs/KeywordAPI"

import "./style.css"


export default function SearchBar() {

    const [tweetState, tweetDispatch] = useTweetContext()
    const [keyword, setKeyword] = useState("")
    const [keywordOptions, setKeywordOptions] = useState([])

    useEffect(() => {
        KeywordAPI.getAllKeywords().then(dbKeywords => {
            setKeywordOptions(dbKeywords.map(dbKeyword => dbKeyword.word))
        })
    }, [])

    const handleSubmit = () => {
        KeywordAPI.createKeyword(keyword).then(dbKeyword => {
            tweetDispatch({ type: SET_KEYWORD, keyword: dbKeyword })
            if (!keywordOptions.includes(dbKeyword.word)) {
                setKeywordOptions([...keywordOptions, dbKeyword.word])
            }
            setKeyword("")
        })

    }

    const handleChange = (event) => {
        setKeyword(event.target.value)
    }

    const handleKeywordClick = keyword => {
        setKeyword(keyword)
    }

    const handleKeywordDelete = keyword => {
        KeywordAPI.deleteKeyword(keyword).then(_ => {
            setKeywordOptions(keywordOptions.filter(option => keyword !== option))
        })
    }

    return (
        <Container fluid style={{padding: "0"}}>
            <Segment>
                <Input placeholder='Search tweets by keyword...' value={keyword} onChange={(event) => handleChange(event)} className="keyword-search" />
                {keyword ? <Button icon color="violet" onClick={handleSubmit} ><Icon name="search" /></Button> : null}
            </Segment>
            
            {keywordOptions.length > 0 &&
                <Segment className="keyword-segment">
                    {keywordOptions.map((keyword, index) => {
                        return (
                            <KeywordButton onKeywordClick={handleKeywordClick} onDelete={handleKeywordDelete} key={index} keyword={keyword} />
                        )
                    })}

                </Segment>
            }
        </Container>
    )

}

function KeywordButton({ onKeywordClick, onDelete, keyword, ...props }) {

    return (
        <Button.Group className="keyword-button">
            <Button color="blue" onClick={() => onKeywordClick(keyword)}>{keyword}</Button>
            <Button className = "icon-button" onClick={() => onDelete(keyword)} style={{ marginRight: '2' }}><Icon className = "icon-button-icon" name="close"/></Button>
        </Button.Group>

    )

}