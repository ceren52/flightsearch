import React, { useState, useEffect } from 'react';

function FlightList({ flights, userDepartureAirport, userArrivalAirport, selectedDate }) {
  const [sortBy, setSortBy] = useState('departureTime');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureTime);
    return (
      flight.from === userDepartureAirport &&
      flight.to === userArrivalAirport &&
      flightDate.getDate() === selectedDate.getDate() &&
      flightDate.getMonth() === selectedDate.getMonth() &&
      flightDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const sortedFlights = filteredFlights.slice().sort((a, b) => {
    if (sortBy === 'departureTime') {
      return a.departureTime.localeCompare(b.departureTime);
    } else if (sortBy === 'returnTime') {
      return a.returnTime.localeCompare(b.returnTime);
    } else if (sortBy === 'duration') {
      return a.duration - b.duration;
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  if (isLoading) {
    return <div>Loading available flights ...</div>;
  }

  return (
    <div className="flight-list">
      <div>
        <label>Filter</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="departureTime">Departure Time</option>
          <option value="returnTime">Arrival Time</option>
          <option value="duration">Flight Duration</option>
          <option value="price">Price</option>
        </select>
      </div>
      {sortedFlights.length === 0 ? (
        <p>Unfortunately, no flights match your criteria</p>
      ) : (
        <ul>
          {sortedFlights.map((flight) => (
            <div key={flight.id} className="flight-box">
              <div>Airline: {flight.airline}</div>
              <div>From: {flight.from} & To: {flight.to}</div>
              <div>Departure Time: {flight.departureTime} & Arrival Time: {flight.returnTime}</div>
              <div>Price: ${flight.price}</div>
              <button>Choose</button> 
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FlightList;
