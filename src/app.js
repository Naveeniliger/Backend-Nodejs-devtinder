

const express = require("express")
const connectDB = require("./config/database")
const cookies = require("cookie-parser")
const authRoter = require("./routers/authRouter")
const profileRouter = require ("./routers/profileRouter")
const requestRouter = require ("./routers/request")



const app = express()
app.use(express.json());
app.use(cookies())

app.use("/" , authRoter)
app.use("/" , profileRouter)
app.use("/" , requestRouter)




connectDB().then(() => {
    console.log("database connection established..")
    app.listen(7777, () => {
        console.log("Server succesfully listening to port 7777...")
    })
})
    .catch((err) => {
        console.error("database cannot be connected..")
    })


