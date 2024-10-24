import React from "react";
import * as microsoftTeams from "@microsoft/teams-js"; // Import Teams SDK
import {PublicClientApplication, RedirectRequest, Configuration} from "@azure/msal-browser";
import {useMsal, useIsAuthenticated} from '@azure/msal-react';


// MSAL configuration
const azureEntraClientID: string = process.env.REACT_APP_AZURE_ENTRA_CLIENT_ID || "";
const azureEntraClientScope = process.env.REACT_APP_AZURE_ENTRA_SCOPE || "";


const msalConfig: Configuration = {
  auth: {
    clientId: azureEntraClientID, 
    authority: '',
    redirectUri: `${process.env.REACT_APP_FRONTEND_URL}`,
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage", // You can also use "localStorage" if you prefer
    storeAuthStateInCookie: true, // Set to true if you're having issues with IE11 or Edge
  },
};

// Define the scopes required for authentication

const ConsentButton: React.FC = () => {

  const handleAuthRedirect = async () => {
    try {
      // Initialize Microsoft Teams SDK
      await microsoftTeams.app.initialize();

      // Get context for the Teams tab
      const context = await microsoftTeams.app.getContext();

      // Set the authority dynamically based on the tenant ID from context
      msalConfig.auth.authority = `https://login.microsoftonline.com/${context.user?.tenant?.id}`;
      // Create a new instance of MSAL
      const msalInstance = new PublicClientApplication(msalConfig);

      // Define the scopes request
      const scopesArray = azureEntraClientScope.split(" ");
      const scopesRequest: RedirectRequest = {
        scopes: scopesArray,
        loginHint: context.user?.loginHint,
      };

      // Trigger MSAL login redirect
      await msalInstance.initialize();
      const response = await msalInstance.loginPopup(scopesRequest);
      console.log(response);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <button onClick={handleAuthRedirect} style={buttonStyle}>
      Authenticate with Microsoft
    </button>
  );
};

// Optional: Style for the button
const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#0078d4",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ConsentButton;
