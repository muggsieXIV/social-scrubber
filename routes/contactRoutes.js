const Contact = require("../controllers/contactController")

module.exports = function(app) {

    app.post("/api/contact", (req, res) => {
        var userId = req.user.id;
        var contactBody = req.body;
        Contact.findContact(contactBody.authorId, userId).then(dbContact => {
            if (dbContact) {
                res.json(dbContact)
            } else {
                Contact.createContact(contactBody, userId).then(dbContact =>{
                    res.json(dbContact)
                })
            }
        })
    })

}