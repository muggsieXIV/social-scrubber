const TweetFilter = require("./TweetFilter")
const TwitterAPI = require("./TwitterAPI")
const Keyword = require("../controllers/keywordController")

const TweetAssembler = {

    async compileNewTweets(keyword, userId, mostRecentTweetId = null, oldestTweetId = null) {
        
        var tweets;
        if (!mostRecentTweetId) {
            tweets = await this.compileTweetsNoBounds(keyword, userId, [])
        } else {
            const newerTweets = await this.compileRecentTweets(keyword, userId, [], null, mostRecentTweetId)
            const olderTweets = await this.compileOlderTweets(keyword, userId, [], oldestTweetId)
            tweets = newerTweets.concat(olderTweets).slice(0, 20)
        }
        return tweets
    },

    async compileTweetsNoBounds(keyword, userId, currentTweets, oldestId = null) {
        if (currentTweets.length >= 20) {
            return currentTweets
        } else {
            if (oldestId) {
                const recentTweets = await TwitterAPI.fetchAndPrepareTweets(keyword, newestTweetId = null, oldestTweetId = oldestId)
                const filteredTweets = await TweetFilter.filterTweets(recentTweets, userId)

                if (recentTweets.lenth == 0 ) {
                    return currentTweets
                } else {
                    currentTweets = currentTweets.concat(filteredTweets)
                    oldestId = recentTweets[recentTweets.length - 1]['id']
                    return this.compileTweetsNoBounds(keyword, userId, currentTweets, oldestId)
                }
            } else {
                const recentTweets = await TwitterAPI.fetchAndPrepareTweets(keyword)
                const filteredTweets = await TweetFilter.filterTweets(recentTweets, userId)

                if (recentTweets.length == 0 ) {
                    return currentTweets
                } else {
                    currentTweets = currentTweets.concat(filteredTweets)
                    oldestId = recentTweets[recentTweets.length - 1]['id']
                    return this.compileTweetsNoBounds(keyword, userId, currentTweets, oldestId)
                }
            }
        }
    },

    async compileOlderTweets(keyword, userId, currentTweets, oldestId) {
        if (currentTweets.length >= 20) {
            return currentTweets
        } else {

            const recentTweets = await TwitterAPI.fetchAndPrepareTweets(keyword, newestTweetId = null, oldestTweetId = oldestId)
            const filteredTweets = await TweetFilter.filterTweets(recentTweets, userId)

            if (recentTweets.length == 0) {
                return currentTweets
            } else {
                currentTweets = currentTweets.concat(filteredTweets)
                oldestId = recentTweets[recentTweets.length - 1]['id']
                return this.compileOlderTweets(keyword, userId, currentTweets, oldestId)
            }
        }
    },

    async compileRecentTweets(keyword, userId, currentTweets, oldestQueryId, userMostRecentId) {
        if (currentTweets.length >= 20) {
            return currentTweets
        } else {
            if (oldestQueryId) {

                const recentTweets = await TwitterAPI.fetchAndPrepareTweets(keyword, newestTweetId = oldestQueryId, oldestTweetId = userMostRecentId, searchInterval = true)
                const filteredTweets = await TweetFilter.filterTweets(recentTweets, userId)

                if (recentTweets.length == 0) {
                    return currentTweets
                } else {
                    currentTweets = currentTweets.concat(filteredTweets)

                    oldestQueryId = recentTweets[recentTweets.length - 1]['id']
                    return this.compileRecentTweets(keyword, userId, currentTweets, oldestQueryId, userMostRecentId)
                }
            } else {
                const recentTweets = await TwitterAPI.fetchAndPrepareTweets(keyword, newestTweetId = userMostRecentId)
                const filteredTweets = await TweetFilter.filterTweets(recentTweets, userId)

                if (recentTweets.length == 0) {
                    return currentTweets
                } else {
                    currentTweets = currentTweets.concat(filteredTweets)
                    oldestQueryId = recentTweets[recentTweets.length - 1]['id']
                    return this.compileRecentTweets(keyword, userId, currentTweets, oldestQueryId, userMostRecentId)
                }

            }
        }
    }

}

module.exports = TweetAssembler

async function test() {
    const result = await TweetAssembler.compileOlderTweets("celery", 1, [], '1313585318143066112')
    console.log(result.map(data => data.id))
}

// test()