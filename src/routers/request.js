

const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require ("../middlewares/auth")
const ConnectionRequest = require ("../models/connectionRequest")
const User = require ("../models/user")


requestRouter.post("/request/send/:status/:touserId" , userAuth, async (req , res) => {

    try{

        const fromUserId = req.user._id
        const toUserId = req.params.touserId
        const status = req.params.status

        const allowedStatus = ["Ignored" , "Interested"]
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({ message : "Invalid Status Type - " + status})
        }

        const requestToExistingUser = await ConnectionRequest.findOne({
            $or : [
                {fromUserId , toUserId} , 
                {fromUserId : toUserId , toUserId : fromUserId}
            ]
        })

        if(requestToExistingUser) {
            return res.status(400).send("Connection Request already present")
        }

        const toUserInDb = await User.findById(toUserId)
        if(!toUserInDb){
            return res.status(404).send({message : "User not found"})
        }

        


        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
        {
            return res.status(404).send({message : "You cannot request yourself"})
        }

        const data = await connectionRequest.save()


        res.json({
            message : req.user.firstName + " sent " + status + " status to " + toUserInDb.firstName,
            data,
        })

        

    }
    catch(err) {
        res.status(400).send("ERROR" + err.message)
    }
})







module.exports = requestRouter