import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
    const [reservations, setReservations] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filterRestaurant, setFilterRestaurant] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/getAllReservations')
            .then((response) => {
                console.log(response.data);
                setReservations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleFilterRestaurantChange = (event) => {
        setFilterRestaurant(event.target.value);
    };

    const handleFilterDateChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleFilterStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const filteredReservations = reservations.filter((reservation) =>
        reservation.phoneNumber.includes(searchInput) ||
        reservation.email.includes(searchInput) ||
        reservation._id.includes(searchInput)
    ).filter((reservation) =>
        filterRestaurant ? reservation.bookAt === filterRestaurant : true
    ).filter((reservation) =>
        // filterDate ? reservation.reserveDate === filterDate : true
        filterDate ? reservation.reserveDate.includes(filterDate) : true
    ).filter((reservation) =>
        filterStatus ? (filterStatus === 'completed' ? reservation.isCompleted : !reservation.isCompleted) : true
    );

    return (
        <div className='mt-20 px-4'>
            <h1 className="text-3xl font-semibold mb-6">Admin Page</h1>
            <div className="flex justify-between items-center mb-4 w-full">
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded mr-4"
                    placeholder="Search by phone, email, or reservation ID"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded mr-4"
                        value={filterRestaurant}
                        onChange={handleFilterRestaurantChange}
                    >
                        <option value="">Filter by Restaurant</option>
                        <option value="restaurant1">Restaurant 1</option>
                        <option value="restaurant2">Restaurant 2</option>
                        <option value="restaurant3">Restaurant 3</option>
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded mr-4"
                        value={filterDate}
                        onChange={handleFilterDateChange}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded mr-4"
                        value={filterStatus}
                        onChange={handleFilterStatusChange}
                    >
                        <option value="">Filter by Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Reservation ID</th>
                            <th className="border border-gray-300 px-4 py-2">First Name</th>
                            <th className="border border-gray-300 px-4 py-2">Reserved Date</th>
                            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                            <th className="border border-gray-300 px-4 py-2">Occasion</th>
                            <th className="border border-gray-300 px-4 py-2">Booked At</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td className="border border-gray-300 px-4 py-2">{reservation._id}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.firstname}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.reserveDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.phoneNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.occasion}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.bookAt}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {reservation.isCompleted ? 'Completed' : 'Pending'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
