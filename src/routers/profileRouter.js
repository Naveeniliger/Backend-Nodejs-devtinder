const express = require("express")
const profileRouter = express.Router()

const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/Validator")




profileRouter.get("/profile", userAuth, (req, res) => {
    try {

        const user = req.user
        res.send(user)
    }
    catch (err) {
        console.error("Error saving user:", err);
        res.status(400).send(err.message);
    }

})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {
        if (!validateEditProfileData(req)) {
            throw new Error("This field cannot be updated...!!")
        }

        const loggedInUser = req.user

        Object.keys(req.body).forEach((k) => {loggedInUser[k] = req.body[k]})
        await loggedInUser.save()
        res.send("profile updated succesfully..")
    }
      catch (err) {
        console.error("Error saving user:", err);
        res.status(400).send(err.message);
    }
})

module.exports = profileRouter