
const mongoose = require("mongoose")
const validate = require("validator")

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required : true , 
    },
    gender: {
        type : String,
        required : true , 
        enum : {
           values : ["female" , "male" , "others"],
           message : `{VALUE} is incorrect gender type`
        }
    },
    skills: {
        type : [String]
    }
},
{
    timestamps : true
}
)

module.exports = mongoose.model("User", userschema)