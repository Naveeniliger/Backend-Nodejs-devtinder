
const validate = require("validator")


const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("Enter Name correclty")
    }
    else if (!validate.isEmail(emailId)) {
        throw new Error("Enter a valid email")
    }
    else if(!validate.isStrongPassword(password)) {
        throw new Error("Enter a Strong Password")
    }

}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName" , "lastName" , "gender" , "about" , "skills"]
    const isEditAllowed = Object.keys(req.body).every((f) => allowedEditFields.includes(f))
    return isEditAllowed


}

module.exports = {validateSignUpData , validateEditProfileData}