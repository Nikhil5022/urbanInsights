import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userLogged');
        setEmail(userEmail);
        if (userEmail) {
            axios.get('http://localhost:8000/reservations', {
                params: {
                    email: userEmail
                }
            })
            .then((response) => {
                console.log(response.data);
                setReservations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
        }
    }, []);

    return (
        <div className="container mx-auto my-10 px-4 mt-20">
            <h1 className="text-3xl font-semibold mb-6">My Reservations</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reservations.map((reservation, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-lg font-semibold mb-4">Reservation {index + 1}</p>
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">Name:</span> {reservation.firstname}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Reservation Date:</span> {reservation.reserveDate}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Phone Number:</span> {reservation.phoneNumber}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Occasion:</span> {reservation.occasion}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Booked At:</span> {reservation.bookAt}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Email:</span> {reservation.email}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
