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
