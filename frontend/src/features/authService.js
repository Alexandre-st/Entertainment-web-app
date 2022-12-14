import axios from 'axios';

const URL = 'api/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;