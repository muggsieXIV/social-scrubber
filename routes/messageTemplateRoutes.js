const MessageTemplate = require("../controllers/messageTemplateController");
const { useReducer } = require("react");


module.exports = function(app) {

    app.get("/api/messagetemplate", (req, res) => {
        var userId = req.user.id;
        MessageTemplate.findUserMessageTemplates(userId).then(dbMessageTemplates => {
            res.json(dbMessageTemplates)
        })
    })

    app.post("/api/messagetemplate", (req, res) => {
        var userId = req.user.id;
        var template = req.body

        MessageTemplate.findMessageTemplateByTitle(template["shortTitle"], userId).then(dbTemplate => {
            if (!dbTemplate) {
                MessageTemplate.createMessageTemplate(template, userId).then(newTemplate => {
                    res.json(newTemplate)
                })
            } else {
                res.json(dbTemplate)
            }
        })
    })

    app.get("/api/messagetemplate/:shortTitle", (req, res) => {
        var userId = req.user.id
        var shortTitle = req.params.shortTitle

        MessageTemplate.findMessageTemplateByTitle(shortTitle, userId).then(dbTemplate => {
            res.json(dbTemplate)
        })
    })

}