// modules/chat/controllers/chatController.js
import { v2 as cloudinary } from "cloudinary"
import ChatMessage from "../models/ChatMessage.js"

// Configure Cloudinary (using credentials from .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const saveMessage = async (data) => {
    console.log("Message received from frontend:", data);
    const chatMsg = new ChatMessage(data)
    await chatMsg.save()
}

export const uploadFile = async (req, res) => {
    try {
        const filePath = req.file.path // Assumes usage of a middleware like multer
        const result = await cloudinary.uploader.upload(filePath)
        res.status(200).json({ fileUrl: result.secure_url })
    } catch (error) {
        res.status(500).json({ error: "File upload failed" })
    }
}
