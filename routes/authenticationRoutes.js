const User = require("../controllers/userController")
const passport = require("../config/passport")
const isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {

    app.get("/api/currentUser", function (req, res) {

        if (!req.user) {
            res.json(null)
        } else {
            res.json(req.user)
        }
    })

    app.post("/api/signup", function (req, res) {

        User.createUser(req.body.username, req.body.password).then(newUser => {
            res.json(newUser)
        })


    })

    app.post("/api/getCredentials", (req, res) => {
        User.findUser(req.body.username).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.json(null)
            }
        })
    })

    app.post("/api/login", passport.authenticate('local'), (req, res) => {

        res.json(req.user)
    })

    app.get("/api/logout", (req, res) => {
        req.logout()
        res.end()
    })
}