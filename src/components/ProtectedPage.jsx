// src/pages/ProtectedPage.jsx
import React from 'react';
import { useMsal } from '@azure/msal-react';

const ProtectedPage = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Only accessible by authenticated users.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
