var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        picture: {type:String,  default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
    },
    {
        timestamps: true
    }
)

//below method matchPassword checks the entered password is correct or not by matching with bcrypted password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//userSchema.pre('save') will be triggered on schema before saving and next is a middleware , 
//below we store the password in an encrypted format
//the below will before saving the user to DB will encrypt the password
userSchema.pre('save', async function(next){
    if(!this.isModified){ //if the current password is not modified then move on to the next
        next()
    }

    //if password is modified then create a salt for the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)