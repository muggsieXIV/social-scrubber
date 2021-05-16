import Axios from 'axios'
import MessageTemplate from "../utils/MessageTemplate"

const MessageTemplateAPI = {

    getAllTemplates() {
        return Axios({
            method: "GET",
            url: "/api/messagetemplate"
        }).then(messageTemplates => {
            messageTemplates = messageTemplates.data.map(template => {
                return new MessageTemplate(template)
            })
            return messageTemplates
        })
    },

    getTemplateByTitle(shortTitle) {
        return Axios({
            method: "GET",
            url: "/api/messagetemplate/" + shortTitle
        }).then(response => {
            return response.data
        })
    },

    createNewTemplate(title, text, keywordId) {
        return Axios({
            method: "POST",
            url: "/api/messagetemplate",
            data: {shortTitle: title, text: text, KeywordId: keywordId}
        }).then(response => {
            return response.data
        })
    }

}

export default MessageTemplateAPI