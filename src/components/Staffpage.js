import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Staffpage() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userLogged');
        setEmail(userEmail);
        if (userEmail) {
            axios.get('http://localhost:8000/getAllReservations')
            .then((response) => {
                console.log(response.data);
                setReservations(response.data);
                setFilteredReservations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
        }
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = reservations.filter(reservation =>
            reservation.phoneNumber.includes(value) || reservation.email.includes(value)
        );
        setFilteredReservations(filtered);
    };

    const handleStatusChange = (id) => {
        const updatedReservations = filteredReservations.map(reservation => {
            if (reservation._id === id) {
                reservation.isCompleted = !reservation.isCompleted;
                // Send API request to update reservation status
                axios.put(`http://localhost:8000/updateReservationStatus/${id}`, {
                    isCompleted: reservation.isCompleted
                })
                .then((response) => {
                    console.log('Reservation status updated successfully:', response.data);
                    toast.success('Reservation status updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating reservation status:', error);
                    toast.error('Error updating reservation status');
                });
            }
            return reservation;
        });
        setFilteredReservations(updatedReservations);
    };

    return (
        <div className='mt-20 px-4'>
            <h1 className="text-3xl font-semibold mb-6">Staff Page</h1>
            <input
                type="text"
                placeholder="Search by phone number or email"
                value={searchText}
                onChange={handleSearch}
                className="w-full mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Reservation Date</th>
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
                                <td className="border border-gray-300 px-4 py-2">{reservation.firstname}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.reserveDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.phoneNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.occasion}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.bookAt}</td>
                                <td className="border border-gray-300 px-4 py-2">{reservation.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className={`px-4 py-2 rounded ${
                                            reservation.isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                                        }`}
                                        onClick={() => handleStatusChange(reservation._id)}
                                    >
                                        {reservation.isCompleted ? 'Completed' : 'Mark as Completed'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
