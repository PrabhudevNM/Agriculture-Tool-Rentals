import mongoose from "mongoose";

const configureDB=async()=>{
    try {
        const db=await mongoose.connect(process.env.DB_URL)
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }
}

export default configureDB