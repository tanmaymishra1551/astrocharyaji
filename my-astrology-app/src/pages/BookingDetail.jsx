// src/pages/BookingDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookingDetail = () => {
    const { id } = useParams(); // This is astrologer ID.
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        // Simulate fetching booking details.
        setBooking({
            bookingId: id,
            astrologerId: id,
            timeSlot: '2025-03-20T15:00:00Z',
            status: 'Pending',
        });
    }, [id]);

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Booking Detail</h2>
            <p>Booking ID: {booking.bookingId}</p>
            <p>Time Slot: {new Date(booking.timeSlot).toLocaleString()}</p>
            <p>Status: {booking.status}</p>
            <div className="mt-4 flex space-x-4">
                <Link to={`/chat/${booking.astrologerId}`} className="bg-green-500 text-white px-4 py-2 rounded">
                {/* <Link to={`/chat/${booking.bookingId}`} className="bg-green-500 text-white px-4 py-2 rounded"> */}
                    Open Chat
                </Link>
                <Link to="/payment" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Make Payment
                </Link>
            </div>
        </div>
    );
};

export default BookingDetail;
