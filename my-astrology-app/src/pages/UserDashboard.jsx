import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [astrologers, setAstrologers] = useState([]);

    useEffect(() => {
        // Replace with an actual API call.
        setAstrologers([
            { id: 1, name: 'Astrologer A', specialty: 'Vedic Astrology' },
            { id: 2, name: 'Astrologer B', specialty: 'Western Astrology' },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{user.username} Dashboard</h2>
            <ul className="space-y-4">
                {astrologers.map((ast) => (
                    <li key={ast.id} className="p-4 border rounded">
                        <h3 className="text-xl font-semibold">{ast.name}</h3>
                        <p>{ast.specialty}</p>
                        <Link to={`/booking/${ast.id}`} className="text-blue-500 underline">
                            Book a session
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard