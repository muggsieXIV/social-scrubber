const db = require("../models")
const { Sequelize } = require("../models")
const { Op } = Sequelize

const Blacklist = {
    
    findOnBlacklist(authorId, userId) {
        
        return db.Blacklist.findAll({where: {
            authorId: authorId,
            userId: userId
        }})
    },

    findAllOnBlacklist(authorIdList, userId) {
        
        const authorIdQueries = authorIdList.map(authorId => {
            return {authorId: authorId}
        })
        return db.Blacklist.findAll({where: {
            userId: userId,
            [Op.or] : authorIdQueries
        }}).then(data => {
            return data
        })
    },

    addToBlackList(authorId, userId) {
        return this.findOnBlacklist(authorId, userId).then(dbBlacklister => {

            if (dbBlacklister.length != 0) {
                
                return dbBlacklister[0]
            }
            else {
                
                return db.Blacklist.create({authorId: authorId, UserId: userId})
            }
        })
    }
}

module.exports = Blacklist

