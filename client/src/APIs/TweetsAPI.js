import Axios from "axios"

const TweetsAPI = {

    getNewTweets(keyword, mostRecentId = null, oldestId = null) {
        return Axios({
            method: "POST", 
            url: "/api/tweet/gettweets/",
            data: {
                keyword: keyword, 
                mostRecentId: mostRecentId, 
                oldestId: oldestId}
            }).then(response => {
                const tweets = response.data
                console.log(tweets)
                for (const tweet of tweets) {
                    tweet.keyword = keyword
                }
                return tweets
            })
    },

    createTweet(tweetId, keywordId, tweetDate, text, authorId) {
        return Axios({
            method: "POST",
            url: "/api/tweet/approvetweet",
            data: {tweetId: tweetId, KeywordId: keywordId, tweetDate: tweetDate, text: text, AuthorId: authorId}
        }).then(response => {
            
            return response.data
        })
    },

    rejectTweet(tweetInfo) {
        return Axios({
            method: "POST",
            url: "/api/tweet/blacklisttweet",
            data: {author_id: tweetInfo.author_id}
        }).then(response => {
            return response.data
        })
    }

}

export default TweetsAPI