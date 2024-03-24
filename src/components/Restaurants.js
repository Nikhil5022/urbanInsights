import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Restaurants() {
    const [formData, setFormData] = useState({
        firstname: '',
        reserveDate: '',
        phoneNumber: '',
        occasion: '',
        bookAt: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post('http://localhost:8000/reservations', formData).then((response) => {
            console.log(response.data);
            toast.success('Reservation made successfully');
        }).catch((error) => {
            console.error('Error making reservation:', error);
        });
        setFormData({
            firstname: '',
            reserveDate: '',
            phoneNumber: '',
            occasion: '',
            bookAt: '',
            email: ''
        });
    };

    return (
        <div className='h-screen w-full overflow-hidden items-center my'>
            <div className="max-w-md mx-auto p-8 mt-20 rounded-md shadow-lg"
            >
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Make a Reservation</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstname" className="block text-gray-800 mb-1">First Name</label>
                        <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="reserveDate" className="block text-gray-800 mb-1">Reserve On</label>
                        <input type="date" id="reserveDate" name="reserveDate" value={formData.reserveDate} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-gray-800 mb-1">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="occasion" className="block text-gray-800 mb-1">Occasion</label>
                        <input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="bookAt" className="block text-gray-800 mb-1">Book At</label>
                        <select id="bookAt" name="bookAt" value={formData.bookAt} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500">
                            <option value="">Select a restaurant</option>
                            <option value="restaurant1">Restaurant 1</option>
                            <option value="restaurant2">Restaurant 2</option>
                            <option value="restaurant3">Restaurant 3</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="email" className="block text-gray-800 mb-1">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500" />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button type="submit" className="w-1/2 bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-500">Make Reservation</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
