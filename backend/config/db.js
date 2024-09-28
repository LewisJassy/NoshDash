import mongoose from "mongoose";

async function connectDB () {
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
       console.log('DB connected') ;
    });
}

async function disconnectDB() {
    await mongoose.disconnect().then(() => {
        console.log("DB disconnected")
    })
}

export { disconnectDB, connectDB };