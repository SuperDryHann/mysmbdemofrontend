import { PublicClientApplication, Configuration } from "@azure/msal-browser";

// Ensure that environment variables are defined or use fallback types
const azureAdClientID: string = process.env.REACT_APP_AZURE_B2C_CLIENT_ID || "";
const azureAdTenantName: string = process.env.REACT_APP_AZIRE_B2C_TENANT_NAME || "";
const azureAdPolicyName: string = process.env.REACT_APP_AZURE_B2C_POLICY_NAME || "";

// MSAL configuration type to ensure strong typing
const msalConfig: Configuration = {
  auth: {
    clientId: azureAdClientID, 
    authority: `https://${azureAdTenantName}.b2clogin.com/${azureAdTenantName}.onmicrosoft.com/${azureAdPolicyName}`,
    knownAuthorities: [`${azureAdTenantName}.b2clogin.com`],
    redirectUri: `${process.env.REACT_APP_FRONTEND_URL}`,
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // You can also use "localStorage" if you prefer
    storeAuthStateInCookie: true, // Set to true if you're having issues with IE11 or Edge
  },
};

// Create an instance of PublicClientApplication
const msalInstance = new PublicClientApplication(msalConfig);

export { msalInstance, msalConfig };
