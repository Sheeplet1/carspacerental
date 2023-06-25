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

  const response = await fetch(`http://127.0.0.1:${BACKEND_PORT}${route}`, options);

  return response.data;
};
