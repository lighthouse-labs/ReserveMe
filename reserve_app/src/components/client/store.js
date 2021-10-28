import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Calendar from 'react-calendar';

export default function Store(props) {

  const location = useLocation()
  const { store_id } = location.state;
  const [isLoading, setLoading] = useState(true);
  const [store, setStore] = useState();
  const [reservationDay, onDayChange] = useState(new Date(Date.now()));

  useEffect(() => {
    axios.get(`/api/stores/${store_id}`)
    .then(res => {
     if (res.status === 200) {
       setStore(res.data);
       setLoading(false);
     } else {
       const error = new Error(res.error);
       throw error;
     }
    })
     .catch(err => {
       console.error(err);
       alert('Error. Please try again');
     });
  });

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  let storeObj = store[0];

  return (
    <div className="Store">
      <h1>Store</h1>
      <p>This store's name is: {storeObj.name}</p>

      <Calendar
        onChange={onDayChange}
        value={reservationDay}
        maxDate = {new Date(Date.now() + 12096e5)}
        minDate = {new Date(Date.now())}
      />

      <p>Picked day {reservationDay.toISOString().slice(0, 19).replace('T', ' ')}</p>
    </div>
  )
}