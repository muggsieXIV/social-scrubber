const db = require("../models")

const Message = {

    createMessage(messageBody, userId) {
        
        return db.Message.create({...messageBody, UserId: userId})
    },

    findUserMessages(userId) {
        return db.Message.findAll({where : {UserId : userId}})
    },

    findMessageToAuthor(authorId, userId) {
        return db.Message.findOne({where: {UserId: userId, AuthorId: authorId}})
    }

}

module.exports = Message