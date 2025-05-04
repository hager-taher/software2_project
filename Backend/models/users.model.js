const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username :{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)  
}


module.exports = mongoose.model('users',userSchema);

