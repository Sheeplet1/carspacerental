export const calculateDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRadians = (angle) => angle * (Math.PI / 180);

  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const r = 6371;

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = r * c;

  return parseFloat(distance.toFixed(2));
};

export const calculateTotalPrice = (
  hourlyPrice,
  startDate,
  endDate,
  startTime,
  endTime
) => {
  const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  let totalHours;
  if (endTime >= startTime) {
    totalHours = endTime - startTime + (diffInDays - 1) * 24;
  } else {
    totalHours = 24 - startTime + endTime + (diffInDays - 2) * 24;
  }

  const totalPrice = totalHours * hourlyPrice;

  return totalPrice;
};

export const getDate = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours === 23 ? new Date(date.setDate(date.getDate() + 1)) : date;
};

export const getNextHour = () => {
  const nextHour = new Date().getHours() + 1;
  return nextHour === 24 ? 0 : nextHour;
};

const BACKEND_PORT = 5000;

export const makeRequest = async (route, method, body) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `http://localhost:${BACKEND_PORT}${route}`,
    options
  );

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

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/;
  if (!isContainsSymbol.test(password)) {
    return "Password must contain at least one Special Symbol";
  }

  const isValidLength = /^.{8,20}$/;
  if (!isValidLength.test(password)) {
    return "Password must be 8-20 Characters Long";
  }

  return "";
};

const readAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File Reading Error"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const fileToDataUrl = async (file) => {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  if (!valid) {
    return {
      error: "provided file is not a png, jpg or jpeg image.",
    };
  }
  try {
    const dataUrl = await readAsDataURL(file);
    return dataUrl;
  } catch (error) {
    return { error: error.message };
  }
};

export const testListings = [
  {
    listing_id: "60f50c257c39b32c70fd8f9d",
    provider:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    address: {
      formatted_address: "1 George St, Sydney NSW 2000, Australia",
      streetNumber: "1",
      street: "George Street",
      city: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      lat: -33.8599354,
      lng: 151.2090295,
      place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
    },
    listing_type: "Carport",
    max_vehicle_size: "Bike",
    access_type: "Key",
    ev_charging: true,
    description:
      "This is a carport located in the heart of Sydney, suitable for bikes. It offers secure access with a key and has EV charging facilities available.",
    instructions:
      "Please use the key provided to access the carport. Feel free to charge your electric vehicle if needed.",
    casual_booking: true,
    monthly_booking: true,
    pricing: {
      hourly_rate: 100,
      monthly_rate: 1000,
    },
    images: [
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
    ],
    availability: {
      is_24_7: true,
      start_time: "10:00",
      end_time: "12:00",
      available_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    safety_features: ["CCTV", "On-site security", "Well lit"],
    amenities: ["Restrooms", "Nearby shopping", "Charging station"],
  },
  {
    listing_id: "60f50c257c39b32c70fd8f9e",
    provider:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvYW5uYSBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.VFLDVgRl5Ne05g1xIyKKCJ_xBWeJvLTVmbxAebH7P0s",
    address: {
      formatted_address: "25 York St, Sydney NSW 2000, Australia",
      streetNumber: "25",
      street: "York Street",
      city: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      lat: -33.866169,
      lng: 151.205218,
      place_id: "ChIJN5s-J0eYEmsRB0M-gC7P0SI",
    },
    listing_type: "Garage",
    max_vehicle_size: "Compact Car",
    access_type: "Code",
    ev_charging: false,
    description:
      "This is a garage located in the Sydney CBD, suitable for compact cars. It has secure access with a code provided.",
    instructions:
      "To access the garage, use the provided code on the keypad. Remember to park your vehicle properly.",
    casual_booking: true,
    monthly_booking: false,
    pricing: {
      hourly_rate: 80,
      monthly_rate: null,
    },
    images: [
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
    ],
    availability: {
      is_24_7: false,
      start_time: "08:00",
      end_time: "18:00",
      available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    safety_features: ["On-site security", "Video surveillance"],
    amenities: ["Nearby restaurants", "Public transportation"],
  },
  {
    listing_id: "60f50c257c39b32c70fd8f9f",
    provider:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvcmRhbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.VPZmRoHhK31Sb4q6GWA9yON3uGXdG1mAXaQPtR9vCNU",
    address: {
      formatted_address: "48 Alfred St, Sydney NSW 2000, Australia",
      streetNumber: "48",
      street: "Alfred Street",
      city: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      lat: -33.861074,
      lng: 151.207209,
      place_id: "ChIJCd4MtTWYEmsRJtiG64nMoFQ",
    },
    listing_type: "Parking Lot",
    max_vehicle_size: "SUV",
    access_type: "Ticket",
    ev_charging: true,
    description:
      "This is a parking lot conveniently located in the heart of Sydney. It can accommodate SUVs and offers ticket-based access. It also provides EV charging options.",
    instructions:
      "Upon arrival, please take a ticket from the machine at the entrance. Make sure to park your vehicle in the designated areas.",
    casual_booking: true,
    monthly_booking: false,
    pricing: {
      hourly_rate: 60,
      monthly_rate: null,
    },
    images: [
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
    ],
    availability: {
      is_24_7: true,
      start_time: "07:00",
      end_time: "23:00",
      available_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    safety_features: ["CCTV", "On-site security"],
    amenities: ["Restrooms", "Nearby cafes", "EV charging stations"],
  },
  {
    listing_id: "60f50c257c39b32c70fd8fa0",
    provider:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc2ggRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.IRLss22BQaWGQ9bWvoZm3IgaOa84T3cS21I1UsSW_Yw",
    address: {
      formatted_address: "16 Pitt St, Sydney NSW 2000, Australia",
      streetNumber: "16",
      street: "Pitt Street",
      city: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      lat: -33.864978,
      lng: 151.209349,
      place_id: "ChIJ92S4pgmYEmsRy6g2mhCWeTk",
    },
    listing_type: "Underground Garage",
    max_vehicle_size: "Sedan",
    access_type: "Remote Control",
    ev_charging: false,
    description:
      "This underground garage is located near Circular Quay in Sydney. It can accommodate sedans and offers remote control access for convenience.",
    instructions:
      "Please use the remote control provided to access the garage. Remember to park your vehicle properly and avoid blocking any designated areas.",
    casual_booking: true,
    monthly_booking: true,
    pricing: {
      hourly_rate: 120,
      monthly_rate: 1500,
    },
    images: [
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
    ],
    availability: {
      is_24_7: true,
      start_time: "00:00",
      end_time: "23:59",
      available_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    safety_features: ["On-site security", "Video surveillance", "Well lit"],
    amenities: ["Restrooms", "Nearby restaurants", "Shopping center"],
  },
  {
    listing_id: "60f50c257c39b32c70fd8fa1",
    provider:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1bGlhbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.IRNEtN3IFPdLppd9QlwKHz7d65kQVs2KU1FOPZirC68",
    address: {
      formatted_address: "10 Market St, Sydney NSW 2000, Australia",
      streetNumber: "10",
      street: "Market Street",
      city: "Sydney",
      state: "NSW",
      postcode: "2000",
      country: "Australia",
      lat: -33.870355,
      lng: 151.208775,
      place_id: "ChIJG6G9eXKuEmsRRWJi-EhWdtQ",
    },
    listing_type: "Open Parking Space",
    max_vehicle_size: "Motorcycle",
    access_type: "Free",
    ev_charging: false,
    description:
      "This open parking space is conveniently located near the bustling market area in Sydney. It is suitable for motorcycles and offers free access.",
    instructions:
      "Feel free to park your motorcycle in the designated space. No need for access codes or keys.",
    casual_booking: true,
    monthly_booking: false,
    pricing: {
      hourly_rate: 10,
      monthly_rate: null,
    },
    images: [
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
      "/assets/images/carpark.jpg",
    ],
    availability: {
      is_24_7: true,
      start_time: "00:00",
      end_time: "23:59",
      available_days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    safety_features: ["Well lit"],
    amenities: ["Nearby markets", "Public transportation"],
  },
];
