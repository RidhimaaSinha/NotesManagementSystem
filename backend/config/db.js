import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected succesfully")
    } catch(err){
        console.error("error connecting to db", err)
        process.exit(1)
    }
}

export default connectDB