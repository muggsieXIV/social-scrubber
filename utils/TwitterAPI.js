const Axios = require("axios")
const getTweets = require("../routes/tweetRoutes")

const TwitterAPI = {

    fetchAndPrepareTweets(keyword, newestTweetId = null, oldestTweetId = null, searchInterval = false) {
        return this.getTweets(keyword, newestTweetId, oldestTweetId, searchInterval).then(tweets => {
            return this.zipTweets(tweets)
        })
    },

    zipTweets(axiosResponse) {

        if (!axiosResponse["data"]) {
            return []
        }
        else {
            const compiled = []
            const tweets = axiosResponse["data"];
            const included = axiosResponse["includes"]["users"]
            for (var i = 0; i < tweets.length; i++) {
                data = { ...included[i], ...tweets[i] }
                compiled.push(data)
            }
            return compiled
        }
    },

    getTweets(keyword, newestTweetId = null, oldestTweetId = null, searchInterval = false) {
        var queryUrl = `https://api.twitter.com/2/tweets/search/recent?query=${keyword} -is:retweet&expansions=author_id&max_results=50&user.fields=profile_image_url&tweet.fields=created_at`
        if (searchInterval && newestTweetId && oldestTweetId) {
            queryUrl += `&since_id=${oldestTweetId}`
            queryUrl += `&until_id=${newestTweetId}`
        }
        else {
            if (newestTweetId) {
                queryUrl += `&since_id=${newestTweetId}`
            }
            else if (oldestTweetId) {
                queryUrl += `&until_id=${oldestTweetId}`
            }
        }
       
        return Axios({
            url: queryUrl,
            method: "GET",
            headers: {
                Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAALKUHQEAAAAAmLh%2F9myLpcEpy79YVs0bxrhO7Tc%3D8N72bjRZx6ZGAIme0oNnbzxYW9s8Uc7m8204CyMGhyhbJgouaP"
            }
        }).then(response => {
            return response.data
        })
    }
}

module.exports = TwitterAPI

