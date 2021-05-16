const Keyword = require("../controllers/keywordController")
const Contact = require("../controllers/contactController")
const Blacklist = require("../controllers/blacklistController")
const TwitterAPI = require("./TwitterAPI")


const TweetFilter = {

    async filterTweets(tweets, userId) {

        tweets = await this.filterByContacts(tweets, userId)
        tweets = await this.filterByBlacklist(tweets, userId)
        tweets = this.filterByName(tweets)
        return tweets
    },

    filterByName(tweets) {
        
        return tweets.filter(tweet => {
            if (tweet.name) {
            
               return tweet.name.split(" ").length === 2
            } else {
                return false
            }
            
        })
    },


    async filterByContacts(tweets, userId) {
        var authorIds = tweets.map(tweet => tweet.author_id)
        var contacts = await Contact.findAllContacts(authorIds, userId)
        var contactIds = contacts.map(contact => contact.author_id)
        return tweets.filter(tweet => !contactIds.includes(tweet.author_id))
    },

    async filterByBlacklist(tweets, userId) {
        var authorIds = tweets.map(tweet => tweet.author_id)
        var blacklist = await Blacklist.findAllOnBlacklist(authorIds, userId)
        var blacklistIds = blacklist.map(author => author.authorId)
        return tweets.filter(tweet => !blacklistIds.includes(tweet.author_id))
    }

}

module.exports = TweetFilter

