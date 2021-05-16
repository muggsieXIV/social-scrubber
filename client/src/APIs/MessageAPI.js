import Axios from "axios"

const MessageAPI = {

    createMessage(text, authorId, keywordId, messageTemplateId, tweetId) {
        return Axios({
            method: "POST",
            url: "/api/message",
            data : {text: text, AuthorId: authorId, KeywordId: keywordId, MessageTemplateId: messageTemplateId, TweetId: tweetId}
        }).then(response => {
            return response.data
        })
    }

}

export default MessageAPI