const db = require("../models")

const MessageTemplate = {

    findMessageTemplateById(messageId) {
        return db.MessageTemplate.findAll({ where: { id: messageId} })
    },

    findUserMessageTemplates(userId) {
        return db.MessageTemplate.findAll({where: {UserId: userId}})
    },
    
    findMessageTemplateByTitle(messageTitle, userId) {
        messageTitle = messageTitle.toLowerCase()
        return db.MessageTemplate.findOne({where: {shortTitle: messageTitle, UserId: userId}})
    },

    createMessageTemplate(messageBody, userId) {
        messageBody["shortTitle"] = messageBody["shortTitle"].toLowerCase()
        return db.MessageTemplate.create({ ...messageBody, UserId: userId })
    },

    updateMessageTemplate(newMessageBody, messageId) {
        return db.MessageTemplate.find({where: {id: messageId}}).update(newMessageBody)
    },

    deleteMessageTemplate(messageId) {
        return db.Keyword.destroy({
            where: {
                id: messageId
            }
        })
    }

}

module.exports = MessageTemplate
