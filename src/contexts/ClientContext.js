import React, { createContext, useState, useContext, useEffect } from 'react';
import Anthropic from '@anthropic-ai/sdk';

// Create a Context
const ClientContext = createContext();

// Create a Provider Component
export const ClientProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [client, setClient] = useState(null);

  // Initialize or update the client when the apiKey changes
  useEffect(() => {
    if (apiKey) {
      const newClient = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });
      setClient(newClient);
    } else {
      setClient(null); // Reset client if no apiKey
    }
  }, [apiKey]);

  return (
    <ClientContext.Provider value={{ client, apiKey, setApiKey }}>
      {children}
    </ClientContext.Provider>
  );
};

// Custom hook for accessing the Client Context
export const useClient = () => useContext(ClientContext);
