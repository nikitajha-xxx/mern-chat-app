var mongoose = require('mongoose')
const mongoDBURL = process.env.DB_URL

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(mongoDBURL)
        console.log(`DB Connected ${conn.connection.host}`)
    }catch(err){
        console.log(`Error: ${err}`)
        process.exit();
    }
}

module.exports = connectDB
