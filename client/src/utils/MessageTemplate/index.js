const Helpers = require("./helpers")

class MessageTemplate {

    constructor(templateData) {
        this.templateData = templateData;
        this.message = this.templateData.text;
        this.title = this.templateData.shortTitle;
        this.messageId = this.templateData.id;
        this.keywordId = this.templateData.keywordId
        this.templateValues = Helpers.findTemplateValues(this.message)
    }

    createMessageFromTemplate(templateValues) {
        return Helpers.fillTemplate(this.message, templateValues)
    }



}

export default MessageTemplate

// const mt = new MessageTemplate("My name is {{name}}, and I am {{age}} years old")
// console.log(mt.templateValues)
// console.log(mt.createMessageFromTemplate({name: "Gabe", age: "21"}))