// src/UserContext.js
import { createContext } from 'react';

export const UserContext = React.createContext(n);

// Optional: You can also export a custom provider if needed
export const UserProvider = ({ children }) => {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };
  
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};
