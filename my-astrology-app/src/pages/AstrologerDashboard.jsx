import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AstrologerDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Replace with an actual API call.
        setAppointments([
            { id: 1, user: 'User A', time: '10:00 AM' },
            { id: 2, user: 'User B', time: '2:00 PM' },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Astrologer Dashboard</h2>
            <ul className="space-y-4">
                {appointments.map((appt) => (
                    <li key={appt.id} className="p-4 border rounded">
                        <h3 className="text-xl font-semibold">Appointment with {appt.user}</h3>
                        <p>Time: {appt.time}</p>
                        <Link to={`/chat/${appt.id}`} className="text-blue-500 underline">
                            Chat with User
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AstrologerDashboard
