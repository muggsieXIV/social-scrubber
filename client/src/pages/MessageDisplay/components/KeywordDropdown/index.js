import React, { useState, useEffect } from 'react'

import { Dropdown } from "semantic-ui-react"

import KeywordAPI from "../../../../APIs/KeywordAPI"

import "./style.css"

export default function KeywordDropdown({ handleKeywordChange, ...props }) {


    const [currentKeyword, editCurrentKeyword] = useState("")
    const [keywordOptions, setKeywordOptions] = useState([])
    const [newIndex, setNewIndex] = useState(-1)

    useEffect(() => {
        KeywordAPI.getAllKeywords().then(dbKeywords => {
            const options = dbKeywords.map(keywordObj => {
                return {
                    key: keywordObj.id,
                    text: keywordObj.word,
                    value: keywordObj.word
                }
            })
            setKeywordOptions(options)
        })
    }, [])


    const handleChange = (_, target) => {
        editCurrentKeyword(target.value)
        handleKeywordChange(target.value)

    }

    const handleAddition = (_, target) => {
        
        if (!keywordOptions.includes(target.value)) {

            const newObj = { key: newIndex, text: target.value, value: newIndex }
            setKeywordOptions([...keywordOptions, newObj])
            setNewIndex(newIndex - 1)
            handleKeywordChange(target.value)
        }
        
    }

    return (
        <Dropdown

            className="dropdown"
            placeholder="Template Keyword"
            options={keywordOptions}
            search
            fluid
            selection
            allowAdditions
            clearable
            value={currentKeyword}
            onChange={(_, target) => handleChange(_, target)}
            additionLabel="New keyword: "
            additionPosition="bottom"
            onAddItem={(_, target) => handleAddition(_, target)}
    

        />
    )

}