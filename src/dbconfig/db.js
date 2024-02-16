import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        mongoose.connection.on("Connected",()=>{
            console.log("Connected to DB");
        })
    } catch (error) {
        console.log("failed to connect to DB",error);
    }
}