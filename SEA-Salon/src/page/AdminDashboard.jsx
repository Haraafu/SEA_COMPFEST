import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/services', {
                name: name,
                duration: parseInt(duration, 10),
            });
            console.log('Service added:', response.data);
            setServices([...services, response.data]);
            setName('');
            setDuration('');
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('path-to-your-background-image.jpg')" }}>
            <div className="absolute top-0 right-0 p-4">
                <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700">
                    Log out
                </button>
            </div>
            <div className="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
                <h1 className="text-white text-3xl font-bold mb-4">Admin Dashboard</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-300">Service Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-500 rounded-md bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-300">Duration (minutes)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-500 rounded-md bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                        Add Service
                    </button>
                </form>
                <h2 className="text-2xl font-semibold text-white mb-2">Existing Services</h2>
                <ul className="text-white">
                    {services.map((service) => (
                        <li key={service._id} className="mb-1">
                            {service.name} - {service.duration} minutes
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
