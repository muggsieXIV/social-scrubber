const Contact = require("../controllers/contactController")
const Tweet = require("../controllers/tweetController")
const Blacklist = require("../controllers/blacklistController")
const TweetAssembler = require("../utils/TweetAssembler")
const Keyword = require("../controllers/keywordController")

module.exports = function(app) {
    
    app.post("/api/tweet/approvetweet", (req, res) => {
        const userId = req.user.id
        const tweetBody = req.body
        Tweet.createTweet(tweetBody, userId).then(dbTweet => {
            res.json(dbTweet)
        })
    })

    app.post("/api/tweet/blacklisttweet", (req, res) => {
        
        Blacklist.addToBlackList(req.body.author_id, req.user.id).then(dbBlacklister => {
            res.json(dbBlacklister)
        })
    })

    app.post("/api/tweet/gettweets/", async (req, res) => {
        
        const userId = req.user.id
        const {mostRecentId, oldestId, keyword} = req.body
        const tweets = await TweetAssembler.compileNewTweets(keyword, userId, mostRecentId, oldestId)
        await Keyword.createKeyword(keyword, userId)
        res.json(tweets)
    })
}

