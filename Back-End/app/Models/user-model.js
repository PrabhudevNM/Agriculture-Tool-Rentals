import { Schema,model } from "mongoose";

const userSchema= new Schema({
    username:String,
    email:String,
    password:String,
    phone:Number,
    file:String,
    role: {
        type: String,
        default: 'user',
    },
},{timestamps:true})

const User= model('User',userSchema)

export default User

