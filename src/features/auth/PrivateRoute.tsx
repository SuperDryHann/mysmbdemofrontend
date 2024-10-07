import { useEffect, useState, ReactNode } from 'react';
import { app, authentication } from '@microsoft/teams-js'; // Import the new Teams SDK

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticatedSso, setIsAuthenticatedSso] = useState(false); // State to track SSO authentication

    useEffect(() => {
        async function teamsSsoToken() {
            try {
                await app.initialize(); // Initialize the Teams SDK
                const authToken = await authentication.getAuthToken(); // Try to get the auth token
                console.log("Authentication Token:", authToken);
                setIsAuthenticatedSso(true); // If token is acquired, user is authenticated
            } catch (error) {
                console.error('Token acquisition failed:', error);
                setIsAuthenticatedSso(false); // If token acquisition fails, user is not authenticated
            } finally {
                setLoading(false); // End the loading state
            }
        }

        // Call the async function to initialize and get the auth token
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

    // Render the children when authenticated
    return <>{children}</>;
};

export default PrivateRoute;
