

const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://NamasteDev:4n4AXL4NOX30dHg1@devtinder.aafq3jm.mongodb.net/devTinder")
}



module.exports = connectDB 