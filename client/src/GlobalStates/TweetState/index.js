import React, {useReducer, useContext, createContext} from 'react'
import {REFRESH_BOUNDS, REFRESH_TWEETS, SET_KEYWORD, TWEET_SELECTED} from "./tweetAction"

const TweetContext = createContext()
const {Provider} = TweetContext

const reducer = (state, action) =>{
    switch (action.type) {
        case REFRESH_BOUNDS:
            if (eval(action.tweetId) > eval(state.mostRecentId) || !state.mostRecentId) {
                return {...state, mostRecentId: action.tweetId}
            } else if (eval(action.tweetId) < eval(state.oldestId) || !state.oldestId) {
                return {...state, oldestId: action.tweetId}
            } else {
                return state
            }
            break

        case SET_KEYWORD:
            return {...state, keyword: action.keyword, pendingTweets: [], activeTweets: []}
            break

        case TWEET_SELECTED:
            const filteredTweets = state.activeTweets.filter(tweet => tweet !== action.tweet)
            if (state.pendingTweets.length > 0) {
                filteredTweets.push(state.pendingTweets[0])
                return {...state, activeTweets: filteredTweets, pendingTweets: state.pendingTweets.slice(1)}
            } else {
                return {...state, activeTweets: filteredTweets}
            }
            break
            
        case REFRESH_TWEETS:
            return {...state, activeTweets: action.tweets.slice(0, 5), pendingTweets: action.tweets.slice(5)}

    }


}

const TweetProvider = ({value=[], ...props}) => {

    const [state, dispatch] = useReducer(reducer, {
        keyword: null,
        activeTweets: [],
        pendingTweets: [],
        mostRecentId: null,
        oldestId: null
    })

    return (
        <Provider value = {[state, dispatch]} {...props}/>
    )
}

const useTweetContext = () => {
    return useContext(TweetContext)
}

export {useTweetContext, TweetProvider}