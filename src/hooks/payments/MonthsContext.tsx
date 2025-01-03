import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MonthsContextProps {
    months: number;
    setMonths: React.Dispatch<React.SetStateAction<number>>;
}

const MonthsContext = createContext<MonthsContextProps | undefined>(undefined);

const MonthsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [months, setMonths] = useState<number>(1);

    return (
        <MonthsContext.Provider value={{ months, setMonths }}>
            {children}
        </MonthsContext.Provider>
    );
};

const useMonthsContext = (): MonthsContextProps => {
    const context = useContext(MonthsContext);
    if (!context) {
        throw new Error('useMonthsContext must be used within a MonthsProvider');
    }
    return context;
};

export { useMonthsContext };
export default MonthsProvider;