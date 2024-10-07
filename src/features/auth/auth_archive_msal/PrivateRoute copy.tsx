import { useEffect, ReactNode } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

interface PrivateRouteProps {
    children: ReactNode; // Explicitly declare that children will be of type ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = useIsAuthenticated();
    const { instance, inProgress } = useMsal(); // Track the MSAL process status

    useEffect(() => {
        async function redirectLogin() {
            try {
                if (!isAuthenticated && inProgress === 'none') { // Ensure no process is ongoing
                    await instance.initialize();  // Ensures the instance is ready (asynchronous process)
                    instance.loginRedirect();
                }
            } catch (error) {
                console.error('Initialization or redirect failed:', error);
            }
        }

        redirectLogin();
    }, [isAuthenticated, instance, inProgress]);

    // Return null if not authenticated and MSAL is in progress
    if (!isAuthenticated && inProgress !== 'none') {
        return null; // This prevents rendering anything if login is still processing. This ensures completion of the code.
    }

    return <>{children}</>;
};

export default PrivateRoute;
