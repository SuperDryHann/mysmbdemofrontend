import React from 'react';

interface AdminConsentButtonProps {
  tenantId: string;
  clientId: string;
}

const AdminConsentButton: React.FC<AdminConsentButtonProps> = ({tenantId, clientId}) => {
  const handleAdminConsent = () => {
    const url = `https://login.microsoftonline.com/${tenantId}/adminconsent?client_id=${clientId}`;
    
    // Open the URL in a new window (popup)
    const width = 600;
    const height = 800;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    
    window.open(url, 'adminConsentPopup', `width=${width},height=${height},top=${top},left=${left}`);
  };

  return (
    <button onClick={handleAdminConsent}>
      Request Admin Consent
    </button>
  );
};

export default AdminConsentButton;
