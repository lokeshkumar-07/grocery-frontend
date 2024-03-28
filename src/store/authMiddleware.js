import { logout } from '../features/authSlice';
import axios from 'axios';

const isTokenExpiredError = (error) => {
  return error.response && error.response.status === 403 && error.response.data.message === 'Token Expired';
};

const authMiddleware = ({ dispatch }) => (next) => async (action) => {
  try {
    const result = await next(action);

    if (result && result.error && isTokenExpiredError(result.error)) {
      dispatch(logout()); // Dispatch the logout action
    }

    return result;
  } catch (error) {
    if (isTokenExpiredError(error)) {
      dispatch(logout()); // Dispatch the logout action
    }
    throw error;
  }
};

export default authMiddleware;