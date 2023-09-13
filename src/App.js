import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFlights } from './mock-api/mock-api';
import FlightList from './FlightList';

const airports = [
  'IST - Istanbul Airport',
  'JFK - John F. Kennedy International Airport',
  'DXB - Dubai International Airport',
  'LAX - Los Angeles International Airport',
  'FRA - Frankfurt Airport',
  'SFO - San Francisco International Airport',
  'CDG - Charles de Gaulle Airport',
  'DOH - Hamad International Airport',
  'ORD - Chicago OHare International Airport'
];

function App() {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [oneWay, setOneWay] = useState(false);
  const [flights, setFlights] = useState([]);
  const [noFlightsFound, setNoFlightsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 365);

  const handleDepartureAirportChange = (event) => {
    setDepartureAirport(event.target.value);
  };

  const handleArrivalAirportChange = (event) => {
    setArrivalAirport(event.target.value);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleOneWayChange = () => {
    setOneWay(!oneWay);
    if (oneWay) {
      setReturnDate(null);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const flights = await getFlights();
      setFlights(flights);

      if (filteredFlights.length === 0) {
        setNoFlightsFound(true);
      } else {
        setNoFlightsFound(false);
      }
    } catch (error) {
      console.error('Uçuş verileri alınamadı', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchFlights() {
      try {
        const flights = await getFlights();
        setFlights(flights);

        if (filteredFlights.length === 0) {
          setNoFlightsFound(true);
        } else {
          setNoFlightsFound(false);
        }
      } catch (error) {
        console.error('Uçuş verileri alınamadı', error);
      }
    }

    if (departureAirport && arrivalAirport && departureDate && !isLoading) {
      fetchFlights();
    }
  }, [departureAirport, arrivalAirport, departureDate, oneWay, isLoading]);

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureTime);
    return (
      flight.from === departureAirport &&
      flight.to === arrivalAirport &&
      flightDate.getDate() === departureDate.getDate() &&
      flightDate.getMonth() === departureDate.getMonth() &&
      flightDate.getFullYear() === departureDate.getFullYear()
    );
  });

  const filteredReturnFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureTime);
    return (
      flight.from === arrivalAirport &&
      flight.to === departureAirport &&
      flightDate.getDate() === returnDate?.getDate() &&
      flightDate.getMonth() === returnDate?.getMonth() &&
      flightDate.getFullYear() === returnDate?.getFullYear()
    );
  });

  return (
    <div className="App">
      <div class="header">
        <h1>Discover your next destination</h1>
      </div>
      <div class="topnav">
        <a href="#">Flights</a>
        <a href="#">Log In</a>
      </div>

      <div>
        <label>Departure Airport</label>
        <input
          type="text"
          value={departureAirport}
          onChange={handleDepartureAirportChange}
          list="departureAirports"
          placeholder="Enter departure place"
        />
        <datalist id="departureAirports">
          {airports.map((airport, index) => (
            <option key={index} value={airport} />
          ))}
        </datalist>
      </div>
      <div>
        <label>Arrival Airport</label>
        <input
          type="text"
          value={arrivalAirport}
          onChange={handleArrivalAirportChange}
          list="arrivalAirports"
          placeholder="Enter arrival place"
        />
        <datalist id="arrivalAirports">
          {airports.map((airport, index) => (
            <option key={index} value={airport} />
          ))}
        </datalist>
      </div>
      <div>
        <label>Depart</label>
        <DatePicker
          selected={departureDate}
          onChange={handleDepartureDateChange}
          minDate={new Date()}
          maxDate={maxDate}
        />
      </div>
      {!oneWay && (
        <div>
          <label>Return</label>
          <DatePicker
            selected={returnDate}
            onChange={handleReturnDateChange}
            minDate={departureDate}
            maxDate={maxDate}
          />
        </div>
      )}
      <div>
        <label>One way</label>
        <input type="checkbox" checked={oneWay} onChange={handleOneWayChange} />
      </div>
      <button onClick={handleSearch}>Search Flights</button>

      {isLoading ? (
        <div>Loading flights data...</div>
      ) : noFlightsFound ? (
        <div>
          Unfortunately, we did not find such a flight. Try to change the departure date or airport so we can search for an alternative flight.
        </div>
      ) : filteredFlights.length > 0 ? (
        <FlightList
          flights={filteredFlights}
          userDepartureAirport={departureAirport}
          userArrivalAirport={arrivalAirport}
          selectedDate={departureDate}
        />
      ) : null}

      {!oneWay && filteredReturnFlights.length > 0 && (
        <FlightList
          flights={filteredReturnFlights}
          userDepartureAirport={arrivalAirport}
          userArrivalAirport={departureAirport}
          selectedDate={returnDate}
        />
      )}
    </div>
  );
}

export default App;
