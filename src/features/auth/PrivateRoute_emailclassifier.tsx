import {useEffect, useState, ReactNode} from 'react';
import {app, authentication} from '@microsoft/teams-js'; // Import the new Teams SDK
import AdminConsentButton from './AdminConsentButton'; // Import the AdminConsentButton component
import {jwtDecode} from 'jwt-decode';
import useAxiosToBackend from './useAxiosToBackend';
import { ConnectedTvOutlined } from '@mui/icons-material';

const PrivateRoute = ({ children }: {children: ReactNode}) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticatedSso, setIsAuthenticatedSso] = useState(false); // State to track SSO authentication
    const [isConsented, setIsConsented] = useState(true); // State to track admin
    const [tenantId, setTenantId] = useState('');
    const axiosToBackend = useAxiosToBackend();
    const clientId = process.env.REACT_APP_AZURE_ENTRA_CLIENT_ID || '';



    useEffect(() => {
        async function teamsSsoToken() {
            try {
                // Teams SSO
                await app.initialize(); // Initialize the Teams SDK
                const authToken = await authentication.getAuthToken();
                const decodedToken: {tid:string} = jwtDecode(authToken);
                setTenantId(decodedToken.tid);
                setIsAuthenticatedSso(true); // If token is acquired, user is authenticated



                // check if admin has consented
                const response = await axiosToBackend.get(
                    '/email_classifier/check_admin_consent/',
                    {headers: { 'Content-Type': 'application/json'}}
                );
                console.log(response.data);
                if(['ErrorAccessDenied'].includes(response?.data?.error?.code)){
                    setIsConsented(false);
                }
                else if (response?.data?.message === 'success'){
                    setIsConsented(true);
                }

                setLoading(false);
            } catch (error) {
                console.error('Token acquisition failed:', error);
                setIsAuthenticatedSso(false); // If token acquisition fails, user is not authenticated
            }
        }
        teamsSsoToken();

    }, []);

    // Render nothing while loading
    if (loading) {
        return null;
    }

    // If the user is not authenticated, display a message or handle redirection
    if (!isAuthenticatedSso) {
        return <div>You are not authenticated.</div>; // You can replace this with a redirect if needed
    }

    if (!isConsented) {
        return <div><AdminConsentButton tenantId={tenantId} clientId={clientId}/></div>;
    }

    // Render the children when authenticated
    return <>
    {children}
    </>;
};

export default PrivateRoute;
