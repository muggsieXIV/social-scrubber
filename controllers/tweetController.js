const db = require("../models")

const Tweet = {
    
    findTweetbyId(tweetBody, userId) {
        return db.Tweet.findOne({where : {tweetId: tweetBody.tweetId, AuthorId : tweetBody.AuthorId, UserId: userId} })
    },

    createTweet(tweetBody, userId) {
        return this.findTweetbyId(tweetBody, userId).then(dbTweet => {
            if (dbTweet) {
                return dbTweet
            } else {
                return db.Tweet.create({...tweetBody, UserId: userId})
            }
        })
    }
}

module.exports = Tweet
