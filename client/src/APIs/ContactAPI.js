import Axios from "axios"

const ContactAPI = {

    createContact(authorId, username, name, imgUrl) {
        return Axios({
            method: "POST",
            url: "/api/contact",
            data : {authorId: authorId, username: username, name: name, imgUrl: imgUrl}
        }).then(response => {
            return response.data
        })
    }
}

export default ContactAPI

// ContactAPI.createContact(122345, "Gabe", "Gabe", "mmmhmmmm").then(data => {
//     console.log(data)
// })