const db = require("../models")

const Keyword = {

    getAllKeywords(userId) {
        return db.Keyword.findAll({ where: { userId: userId } }).then(records => {
            return records
        })
    },

    findKeyword(keyword, userId) {
        keyword = keyword.toLowerCase()
        return db.Keyword.findOne({ where: { word: keyword, userId: userId } }).then(records => {
            return records
        })
    },

    createKeyword(keyword, userId) {
        keyword = keyword.toLowerCase()
        return this.findKeyword(keyword, userId).then(dbKeyword => {
            if (dbKeyword) {
                return dbKeyword
            } else {
                return db.Keyword.create({ word: keyword, UserId: userId })
            }
        })
    },

    deleteKeyword(keyword, userId) {
        return db.Keyword.destroy({
            where: {
                word: keyword,
                userId: userId
            }
        })
    }

}

module.exports = Keyword