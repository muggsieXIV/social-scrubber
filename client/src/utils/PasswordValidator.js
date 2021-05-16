

class PasswordValidator {

    constructor(password) {

        this.errorOptions = {
            0: "Password must be 8 characters or longer",
            1: "Password must contain at least one lowercase letter",
            2: "Password must contain at least one uppercase letter",
            3: "Password must contain at least one number"
        }

        this.password = password
        this.lowercaseRegex = new RegExp(".*[a-z]+.*", "g")
        this.uppercaseRegex = new RegExp(".*[A-Z]+.*", "g")
        this.numberRegex = new RegExp(".*[0-9]+.*", "g")

        this.errorNumber = this.validatePassword();
        this.errorMessage = this.errorOptions[this.errorNumber] || null


    }

    validatePassword() {

        if (this.password.length < 8) {
            return 0
        }
        if (!this.password.match(this.lowercaseRegex)) {
            return 1
        } 
        if (!this.password.match(this.uppercaseRegex)) {
            return 2
        }
        if (!this.password.match(this.numberRegex)) {
            return 3
        }
        return null
    }

    getErrorNumber() {
        return this.errorNumber
    }

    getErrorMessage() {
        return this.errorMessage
    }
}

export default PasswordValidator