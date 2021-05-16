const Message = require("../controllers/messageController")

module.exports = function(app) {

    app.get("/api/message/:authorId", (req, res) => {
        var userId = req.user.id;
        var authorId = eval(req.params.authorId)

        Message.findMessageToAuthor(authorId, userId).then(dbMessage => {
            res.json(dbMessage)
        })
    })

    app.post("/api/message", (req, res) => {
        var userId = req.user.id;
        var messageBody = req.body

        Message.findMessageToAuthor(messageBody.AuthorId, userId).then(dbMessage => {
            if (dbMessage) {
                res.json(null)
            } else {
                Message.createMessage(messageBody, userId).then(dbMessage => {
                    res.json(dbMessage)
                })
            }
        })

       
    })

}