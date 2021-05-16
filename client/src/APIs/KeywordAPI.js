import Axios from "axios"

const KeywordAPI = {
    
    getAllKeywords() {
        return Axios({
            method: "GET",
            url: "api/keywords"
        }).then(keywords => {

            return keywords.data
        })
    },

    deleteKeyword(keyword) {
        return Axios({
            method: "DELETE",
            url: "api/keywords/" + keyword
        }).then(result => {
            
            return 
        })
    },

    createKeyword(keyword) {
        return Axios({
            method: "POST",
            url: "api/keywords/" + keyword
        }).then(keyword => {

            return keyword.data
        })
    }



}

export default KeywordAPI

