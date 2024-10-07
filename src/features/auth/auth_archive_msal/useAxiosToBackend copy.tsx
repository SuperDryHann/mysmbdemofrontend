// Custom hook to create an Axios instance with an interceptor to attach the Authorization header
import axios from 'axios';
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useContext } from 'react';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true,
});

// Add an interceptor to attach the Authorization header
const useAxiosToBackend= () => {
  const { instance, accounts } = useMsal(); // MSAL instance and account
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const account = accounts[0]; // Assuming there's one account
        const response = await instance.acquireTokenSilent({
          scopes: ["https://ahsuspensequery.onmicrosoft.com/1c4ab0a2-4f93-4dbe-b017-1d8924a25887/Api.ReadWrite.All"],
          account: account,
        });
        if (response && response.accessToken) {
          config.headers.Authorization = `Bearer ${response.accessToken}`;
        }
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          console.error("Interaction required for token acquisition", error);
        } else {
          console.error("Error acquiring token silently", error);
        }
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