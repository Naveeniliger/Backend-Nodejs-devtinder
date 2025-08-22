

const express = require("express")

const app = express()



app.use("/hello",(req , res) => {
    res.send("Hello world/hello after dev")
})
app.use("/about",(req , res) => {
    res.send("Hello world/about after nodemon")
})
app.use((req , res) => {
    res.send("Hello world")
})
app.use("/",(req , res) => {
    res.send("Hello world")
})



app.listen(7777 , () => {
    console.log("Server succesfully listening to port 7777")
})