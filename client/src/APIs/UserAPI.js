import Axios from "axios"
import bcrypt, { hash } from "bcryptjs"

const UserAPI = {

    currentUserInfo() {
        return Axios({
            method: "GET",
            url: "/api/currentUser"
        }).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
        })
    },

    getCredentials(username) {
        return Axios({
            method: "POST",
            url: "/api/getCredentials",
            data: { username: username }
        }).then(dbUser => {
            return dbUser.data
        })
    },

    login(username) {

        return Axios({
            method: "POST",
            url: "/api/login",
            data: { username: username, password: "unnecessary" }
        }).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
            return null
        })


    },

    signup(username, password) {
        password = this.encrypt(password)
        return Axios({
            method: "POST",
            url: "/api/signup/",
            data: { username: username, password: password }
        }).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
            return null
        })
    },

    encrypt(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    },

    validatePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword)
    }
}

export default UserAPI