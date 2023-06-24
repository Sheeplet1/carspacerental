export const makeRequest = async (route, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`http://localhost:${BACKEND_PORT}${route}`, options);

  const data = await response.json();

  return data;
};
