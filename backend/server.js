import express from 'express'
import cors from 'cors'
import { connectDB, disconnectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './Routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express()
const port = 4000

const server = app.listen(() => {
    console.log(`Server is running`);
});

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/",(req,res)=>{
        res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

const gracefulShutdown =  async () => {
    console.log('Shutting down gracefully...')
    await disconnectDB();
    server.close(() => {
        console.log('Service worker closed successfully.')
        process.exit(0)  // exit with success code
    })
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

//mongodb+srv://dulanjalisenarathna93:E2JUb0zfaT2FVp8D@cluster0.exkxkun.mongodb.net/?