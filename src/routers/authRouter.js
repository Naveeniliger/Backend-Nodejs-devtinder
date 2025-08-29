

const express = require("express")
const authRouter = express.Router()
const { validateSignUpData } = require("../utils/Validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")






authRouter.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req)
        const { firstName, lastName, emailId, password, gender , skills } = req.body


        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({ firstName, lastName, emailId, password: passwordHash, gender, skills})
        console.log(passwordHash)
        await user.save()
        res.send("user added succesfully..")
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(400).send(err.message);
    }
})



authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("User Not Found Please Sign Up")
        }

        const ispasswordValid = await bcrypt.compare(password, user.password)
        if (ispasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$2001")
            res.cookie("token", token)
            res.send("login successfull")
        }
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(400).send(err.message);
    }


})


authRouter.post("/logout" , async (req , res) =>{
    res.cookie("token" , null , {
        expires: new Date(Date.now())
    })
    res.send("Logout succesfull")
})


module.exports = authRouter
