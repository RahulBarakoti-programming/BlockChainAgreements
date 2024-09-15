import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const signupUser = async (userData) => {

  try {

    const response = await axios.post(`${API_URL}/auth/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const { token, user } = response.data;


    localStorage.setItem('token', token);


    return {
      success: true,
      message: 'Signup successful',
      user,
    };
  } catch (error) {

    if (error.response) {

      return {
        success: false,
        message: error.response.data.message || 'Signup failed',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response received from the server',
      };
    } else {
      return {
        success: false,
        message: error.message || 'Signup failed',
      };
    }
  }
};
export const loginUser = async (data) => {

  try {

    const response = await axios.post(`${API_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const { token } = response.data;


    localStorage.setItem('token', token);


    return {
      success: true,
      message: 'Signup successful',

    };
  } catch (error) {

    if (error.response) {

      return {
        success: false,
        message: error.response.data.message || 'Signup failed',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response received from the server',
      };
    } else {
      return {
        success: false,
        message: error.message || 'Signup failed',
      };
    }
  }
};



