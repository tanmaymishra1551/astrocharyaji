import { Server } from "socket.io"
import ChatMessage from "../../modules/chat/models/ChatMessage.js"

const initChatSocket = (server) => {
    const io = new Server(server, {
        path: "/ws/chat",
        cors: {
            origin: "*", 
            methods: ["GET", "POST"],
        },
    })

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`)

        // Event for joining a chat room
        socket.on("joinRoom", ({ roomId }) => {
            socket.join(roomId)
            console.log(`User ${socket.id} joined room ${roomId}`)
        })

        // Event for sending messages
        socket.on("sendMessage", async ({ roomId, message, senderId }) => {
            console.log(
                `Message from ${senderId} to receiver ${roomId} is: ${message}`
            )
            io.to(roomId).emit("receiveMessage", { message, senderId })

            // Save the message to MongoDB
            try {
                await ChatMessage.create({
                    roomId,
                    senderId,
                    roomId,
                    message,
                })
                console.log("Message stored in database")
            } catch (error) {
                console.error("Error storing message:", error)
            }
        })

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`)
        })
    })

    return io
}

export default initChatSocket
