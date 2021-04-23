import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    console.log('from local storage', localStorage.getItem('token'))

    useEffect(() => {
        fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, 
            {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
                    'Content-type':'application/json'
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBookings(data);
        });
    }, [])

    return (
        <div>
            <h1>You have {bookings.length} bookings.</h1>
            {
                bookings.map(booking => {
                    return (
                        <li>
                            {booking.name} 
                            from: {(new Date(booking.checkIn)).toDateString('dd/MM/yyyy')} 
                            to: {(new Date(booking.checkOut)).toDateString('dd/MM/yyyy')} 
                        </li>
                    )
                })
            }
        </div>
    );
};

export default Bookings;