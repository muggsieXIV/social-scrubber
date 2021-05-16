const db = require("../models")

module.exports = {

    findUser(username) {

        return db.User.findOne({ where: { username: username } })
    },

    createUser(username, password) {

        return db.User.create({ username: username, password: password }).then(user => {
            return user
        })

    }
}