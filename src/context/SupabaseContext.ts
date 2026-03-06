import React, { createContext, useContext } from 'react';

const SupabaseContext = createContext(null);

export const SupabaseProvider: React.FC = ({ children }) => {
    return <SupabaseContext.Provider value={null}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => useContext(SupabaseContext);