// index.js
import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import http from "http"
import connectDB from "./modules/chat/services/chatService.js"

dotenv.config()

// Create the Express application
const app = express()
app.use(bodyParser.json())
const server = http.createServer(app)
// Initialize WebSocket server for the Chat module
import initChatSocket from "./modules/chat/index.js"
initChatSocket(server)

// Import module routes
import authRoutes from "./modules/auth/index.js"
import bookingRoutes from "./modules/booking/routes/bookingRoutes.js"
import chatRoutes from "./modules/chat/routes/chatRoutes.js"
import paymentRoutes from "./modules/payment/routes/paymentRoutes.js"

// Mount routes (like an API Gateway)
app.use("/auth", authRoutes)
app.use("/booking", bookingRoutes)
app.use("/chat", chatRoutes)
app.use("/payment", paymentRoutes)

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 8000
connectDB()
.then(
    app.listen (PORT, ()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
)
.catch((error) => {
    console.log(`Mongodb connection failed  ${error}`);
})


