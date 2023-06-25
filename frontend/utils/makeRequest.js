import axios from 'axios'

export const makeRequest = async (route, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (body !== undefined) {
    options.data = body;
  }

  const response = await axios(`http://localhost:${BACKEND_PORT}${route}`, options);

  return response.data;
};
