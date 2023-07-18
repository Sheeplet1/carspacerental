export const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRadians = (angle) => angle * (Math.PI / 180);

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const r = 6371;

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = r * c;

  return parseFloat(distance.toFixed(2));
};


export const calculateTotalPrice = (hourlyPrice, startDate, endDate, startTime, endTime) => {
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  let totalHours;
  if (endTime >= startTime) {
    totalHours = (endTime - startTime) + (diffInDays - 1) * 24;
  } else {
    totalHours = ((24 - startTime) + endTime) + (diffInDays - 2) * 24;
  }

  const totalPrice = totalHours * hourlyPrice;

  return totalPrice;
}

export const getDate = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours === 23 ? new Date(date.setDate(date.getDate() + 1)) : date;
}

export const getNextHour = () => {
  const nextHour = new Date().getHours() + 1;
  return nextHour === 24 ? 0 : nextHour;
}

const BACKEND_PORT = 5000;

export const makeRequest = async (route, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`http://localhost:${BACKEND_PORT}${route}`, options);

  const data = await response.json();

  return data;
};

export const checkPasswordValidation = (password) => {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(password)) {
    return "Password must not contain Whitespaces";
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(password)) {
    return "Password must have at least one Uppercase Character";
  }


  const isContainsLowercase = /^(?=.*[a-z])/;
  if (!isContainsLowercase.test(password)) {
    return "Password must have at least one Lowercase Character";
  }


  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(password)) {
    return "Password must contain at least one Digit";
  }


  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(password)) {
    return "Password must contain at least one Special Symbol";
  }


  const isValidLength = /^.{8,20}$/;
  if (!isValidLength.test(password)) {
    return "Password must be 8-20 Characters Long";
  }

  return "";
}

export const testListings = [
  {
    listing_id: 1,
    address: {
      "formatted_address": "1 George St, Sydney NSW 2000, Australia",
      "streetNumber": "1",
      "street": "George Street",
      "city": "Sydney",
      "state": "NSW",
      "postcode": "2000",
      "country": "Australia",
      "lat": -33.8599354,
      "lng": 151.2090295,
      "place_id": "ChIJP3Sa8ziYEmsRUKgyFmh9AQM"
    },
    type: 'Carport',
    max_vehicle_size: 'Bike',
    access_type: 'Key',
    ev_charging: true,
    description: 'This is a description This is a description This is a description This is a description This is a description This is a description',
    instructions: 'This is the instructions',
    casual_booking: true,
    monthly_booking: true,
    pricing: {
      "hourly_rate": 100,
      "monthly_rate": 1000,
    },
    images: ['/assets/images/sport-car.png', '/assets/images/ornament.png', '/assets/images/marker.png'],
    "availability": {
      "is_24_7": true,
      "start_time": "10:00",
      "end_time": "12:00",
      "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "safety_features": ["CCTV", "On-site security", "Well lit"],
    "amenities": ["Restrooms", "Nearby shopping", "Charging station"],
  },
  {
    listing_id: 2,
    address: {
      "formatted_address": "1 George St, Sydney NSW 2000, Australia",
      "streetNumber": "1",
      "street": "George Street",
      "city": "Sydney",
      "state": "NSW",
      "postcode": "2000",
      "country": "Australia",
      "lat": -37.8136276,
      "lng": 144.9630576,
      "place_id": "ChIJ90260rVG1moRkM2MIXVWBAQ"
    },
    type: 'Carport',
    max_vehicle_size: 'Van',
    access_type: 'Passcode',
    ev_charging: true,
    description: 'This is a description',
    instructions: 'This is the instructions',
    casual_booking: true,
    monthly_booking: false,
    pricing: {
      "hourly_rate": 70,
      "monthly_rate": 1200,
    },
    images: ['/assets/images/sport-car.png', '/assets/images/ornament.png', '/assets/images/marker.png'],
    "availability": {
      "is_24_7": true,
      "start_time": "0:00",
      "end_time": "23:00",
      "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "safety_features": ["CCTV", "On-site security", "Well lit"],
    "amenities": ["Restrooms", "Nearby shopping", "Charging station"],
  },
  {
    listing_id: 3,
    address: {
      "formatted_address": "1 George St, Sydney NSW 2000, Australia",
      "streetNumber": "1",
      "street": "George Street",
      "city": "Sydney",
      "state": "NSW",
      "postcode": "2000",
      "country": "Australia",
      "lat": -27.4697707,
      "lng": 153.0251235,
      "place_id": "ChIJM1uo4rURkWsRQZbOYnSbAQE"
    },
    type: 'Carport',
    max_vehicle_size: 'Van',
    access_type: 'Passcode',
    ev_charging: true,
    description: 'This is a description',
    instructions: 'This is the instructions',
    casual_booking: false,
    monthly_booking: true,
    pricing: {
      "hourly_rate": 70,
      "monthly_rate": 1200,
    },
    images: ['/assets/images/sport-car.png', '/assets/images/ornament.png', '/assets/images/marker.png'],
    "availability": {
      "is_24_7": true,
      "start_time": "00:00",
      "end_time": "23:00",
      "available_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "safety_features": ["CCTV", "On-site security", "Well lit"],
    "amenities": ["Restrooms", "Nearby shopping", "Charging station"],
  },
]
