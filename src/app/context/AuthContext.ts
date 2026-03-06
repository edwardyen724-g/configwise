import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const value = {}; // Implement your auth logic here
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSession = () => useContext(AuthContext);
