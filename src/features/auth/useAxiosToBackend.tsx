// Custom hook to create an Axios instance with an interceptor to attach the Authorization header
import axios from 'axios';
import { app, authentication } from '@microsoft/teams-js'; // Import the new Teams SDK


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true,
});

// Add an interceptor to attach the Authorization header
const useAxiosToBackend= () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        await app.initialize();
        const accessToken = await authentication.getAuthToken();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Error acquiring token silently", error);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosToBackend;