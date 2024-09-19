import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://lewisjassy43:7d3bbxJMExEGaLMv@cluster0.k8nilwb.mongodb.net//reactjs-food-delivery-app').then(()=>{
       console.log('DB connected') ;
    })
}