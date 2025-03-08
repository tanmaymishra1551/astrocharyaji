// api/index.js
import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "../modules/chat/services/chatService.js"
import serverless from "serverless-http" // Wraps the Express app

dotenv.config()

// Create the Express application
const app = express()
app.use(bodyParser.json())

// -- WebSocket initialization --
// Note: Vercel does not support long-lived WebSocket connections.
// If needed, disable or remove this on Vercel.
// import initChatSocket from "../modules/chat/index.js";
// initChatSocket(server);

// Import module routes
import authRoutes from "../modules/auth/index.js"
import bookingRoutes from "../modules/booking/routes/bookingRoutes.js"
import chatRoutes from "../modules/chat/routes/chatRoutes.js"
import paymentRoutes from "../modules/payment/routes/paymentRoutes.js"

// Mount routes
app.use("/auth", authRoutes)
app.use("/booking", bookingRoutes)
app.use("/chat", chatRoutes)
app.use("/payment", paymentRoutes)

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message })
})

// Connect to your database (if needed)
connectDB().catch((error) => {
    console.error(`MongoDB connection failed: ${error}`)
})

// Instead of starting the server with app.listen, export the app wrapped by serverless-http
export default serverless(app)
