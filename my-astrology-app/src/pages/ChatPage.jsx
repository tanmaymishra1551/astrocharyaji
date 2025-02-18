// src/pages/ChatPage.jsx (ES Module syntax)
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ChatPage = () => {
    const { id } = useParams(); // 'id' here is the astrologer ID
    const { user } = useSelector((state) => state.auth);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const socketRef = useRef();

    // Derive roomId from user.id and astrologer id (id)
    const roomId =
        user && id ? `chat_${[user.id, id].sort().join('_')}` : null;

    useEffect(() => {
        if (!roomId) return;
        socketRef.current = io("/wsapi", {
            path: '/ws/chat',
            query: { token: localStorage.getItem('token') },
        });

        console.log('Socket:', socketRef.current);

        // Join the room after connection
        socketRef.current.emit('joinRoom', { roomId });

        socketRef.current.on('receiveMessage', (data) => {
            console.log("Socket connected:", socketRef.current.id);
            if (data.senderId !== user.id) {
                toast.info('New message received');
            }
            setMessages((prev) => [...prev, data]);
        });

        // Cleanup on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, user.id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const messageData = {
            roomId,
            senderId: user.id,
            message: input,
            timestamp: new Date(),
        };
        const obj = JSON.stringify(messageData)
        console.log(`MessageData is ${obj}`)
        console.log('Socket second:', socketRef.current);

        socketRef.current.emit('sendMessage', messageData);
        setInput('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/chat/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // Send a message with the file URL
            const messageData = {
                roomId,
                senderId: user.id,
                message: '', // If only sending a file
                fileUrl: data.fileUrl,
                timestamp: new Date(),
            };
            socketRef.current.emit('sendMessage', messageData);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    return (
        <div className="p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
                Chat Room with Astrologer {id} (User: {user.id})
            </h2>

            {/* Chat Messages */}
            <div className="h-64 border p-2 mb-4 overflow-y-auto">
                {messages.length === 0 && (
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        <p className="text-sm text-gray-600">
                            <span className="font-bold">{msg.senderId}</span> at{" "}
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                        {msg.message && <p>{msg.message}</p>}
                        {msg.fileUrl && (
                            <div className="mt-2">
                                <a
                                    href={msg.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View File
                                </a>
                                <img
                                    src={msg.fileUrl}
                                    alt="Uploaded file"
                                    className="max-w-xs mt-2 border rounded"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Message Input and File Upload */}
            <form onSubmit={handleSendMessage} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <input type="file" onChange={handleFileChange} className="block" />
                    {previewUrl && (
                        <div className="mt-2 sm:mt-0">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-16 h-16 object-cover border rounded"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleFileUpload}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Upload File
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatPage;
