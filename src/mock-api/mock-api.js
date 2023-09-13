
const mockFlights = [
    {
        id: 1,
        airline: 'Turkish Airlines',
        from: 'IST - Istanbul Airport',
        to: 'JFK - John F. Kennedy International Airport',
        departureTime: '2023-09-15T10:00:00Z',
        returnTime: '2023-09-15T14:13:00Z',
        price: 800,
      },
      {
        id: 2,
        airline: 'Emirates',
        from: 'DXB - Dubai International Airport',
        to: 'LAX - Los Angeles International Airport',
        departureTime: '2023-09-16T12:30:00Z',
        returnTime: '2023-09-16T18:45:00Z',
        price: 950,
      },
      {
        id: 3,
        airline: 'Lufthansa',
        from: 'FRA - Frankfurt Airport',
        to: 'SFO - San Francisco International Airport',
        departureTime: '2023-09-18T14:15:00Z',
        returnTime: '2023-09-18T10:30:00Z',
        price: 900,
      },
    {
      id: 4,
      airline: 'Airline 1',
      from: 'JFK - John F. Kennedy International Airport',
      to: 'LAX - Los Angeles International Airport',
      departureTime: '2023-09-20T08:00:00',
      returnTime: '2023-09-20T12:00:00',
      price: 300,
    },
    {
      id: 5,
      airline: 'Airline 2',
      from: 'LAX - Los Angeles International Airport',
      to: 'ORD - Chicago OHare International Airport',
      departureTime: '2023-09-22T10:30:00',
      returnTime: '2023-09-22T14:45:00',
      price: 250,
    },
  {
    id: 6,
    airline: 'Pegasus Airlines',
    from: 'IST - Istanbul Airport',
    to: 'CDG - Charles de Gaulle Airport',
    departureTime: '2023-09-17T09:30:00Z',
    returnTime: '2023-09-17T15:45:00Z',
    price: 600,
  },
  {
    id: 7,
    airline: 'Qatar Airways',
    from: 'IST - Istanbul Airport',
    to: 'DOH - Hamad International Airport',
    departureTime: '2023-09-19T16:45:00Z',
    returnTime: '2023-09-19T08:20:00Z',
    price: 750,
  },
  {
    id: 8,
    airline: 'Turkish Airlines',
    from: 'IST - Istanbul Airport',
    to: 'JFK - John F. Kennedy International Airport',
    departureTime: '2023-09-15T13:00:00Z',
    returnTime: '2023-09-15T14:16:00Z',
    price: 600,
  },
  {
    id: 9,
    airline: 'Turkish Airlines',
    from: 'IST - Istanbul Airport',
    to: 'JFK - John F. Kennedy International Airport',
    departureTime: '2023-09-15T16:00:00Z',
    returnTime: '2023-09-15T14:19:00Z',
    price: 700,
  },
  
  {
    id: 10,
    airline: 'Turkish Airlines',
    from: 'JFK - John F. Kennedy International Airport',
    to: 'IST - Istanbul Airport',
    departureTime: '2023-09-20T16:00:00Z',
    returnTime: '2023-09-20T14:19:00Z',
    price: 700,
  },
  ];
  
  function getFlights() {
    return Promise.resolve(mockFlights);
  }
  
  module.exports = { getFlights };