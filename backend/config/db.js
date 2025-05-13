const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI).then((con) =>{console.log(`MongoDB connected: ${con.connection.host}`)})
        console.log("MongoDB connected Atlas")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB