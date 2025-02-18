// modules/chat/models/ChatMessage.js
import mongoose from "mongoose"

const chatMessageSchema = new mongoose.Schema({
    chatRoomId: String,
    senderId: String,
    receiverId: String,
    message: String,
    fileUrl: String,
    timestamp: { type: Date, default: Date.now },
})

export default mongoose.model("ChatMessage", chatMessageSchema)
