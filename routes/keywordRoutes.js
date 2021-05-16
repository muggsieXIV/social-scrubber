const Keyword = require("../controllers/keywordController")

module.exports = function(app) {

    app.get("/api/keywords", (req, res) => {
        
        Keyword.getAllKeywords(req.user.id).then(records => {
            res.json(records)
        })
    })

    app.post("/api/keywords/:keyword", (req, res) => {
        var keyword = req.params.keyword
        var userId = req.user.id
        Keyword.findKeyword(keyword, userId).then(dbKeyword => {
            if (dbKeyword) {
                
                res.json(dbKeyword)
            } else {
                Keyword.createKeyword(keyword, userId).then(dbKeyword => {
                    
                    res.json(dbKeyword)
                })
            }
        })
    })

    app.delete("/api/keywords/:keyword", (req, res) => {
        var keyword = req.params.keyword
        var userId = req.user.id
        Keyword.deleteKeyword(keyword, userId).then(result => {
            res.json(result)
        })
    })

}