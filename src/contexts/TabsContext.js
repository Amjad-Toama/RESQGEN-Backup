import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <TabsContext.Provider value={{ tabValue, setTabValue }}>
            {children}
        </TabsContext.Provider>
    );
}

export const useTabs = () => useContext(TabsContext);