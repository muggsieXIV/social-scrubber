const db = require("../models")
const { Sequelize } = require("../models")
const { Op } = Sequelize

const Contact = {
    
    findContact(authorId, userId) {
        return db.Contact.findOne({where : { authorId: authorId, userId:userId }})
    },

    findAllContacts(authorIdList, userId) {
        
        const authorIdQueries = authorIdList.map(authorId => {
            return {authorId: authorId}
        })
        
        return db.Contact.findAll({where: {
            userId: userId,
            [Op.or] : authorIdQueries
        }}).then(data => {
            return data
        })
    },

    createContact(contactBody, userId) {
        return this.findContact(contactBody.authorId, userId).then(dbContact => {
            if (dbContact) {
                return dbContact
            } else {
                return db.Contact.create({...contactBody, UserId: userId})
            }
        })
    }

}

module.exports = Contact
