var mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true},
        password: {type:String, required:true},
        picture: {type:String, required:true, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)