import { createContext, Dispatch, SetStateAction } from "react";

type RouteHistoryContextType = {
  routeHistory: string[];
  setRouteHistory: Dispatch<SetStateAction<string[]>>;
};

export const RouteHistoryContext = createContext<RouteHistoryContextType>({
  routeHistory: [],
  setRouteHistory: () => {}, // Provide a dummy function if necessary
});
/*
export const useRouteHistory = () => {
  const context = useContext(RouteHistoryContext);
  if (!context) {
    throw new Error('useRouteHistory must be used within a RouteHistoryProvider');
  }
  return context;
};

export const RouteHistoryProvider: React.FC = ({ children }) => {
  const [routeHistory, setRouteHistory] = React.useState<string[]>([]);

  const addCustomStringToHistory: Dispatch<SetStateAction<string[]>> = (customString) => {
    setRouteHistory((prevHistory: string[]) => [...prevHistory, customString]);
  };

  const contextValue: RouteHistoryContextType = {
    routeHistory,
    addCustomStringToHistory,
  };

  return (
    <RouteHistoryContext.Provider value={contextValue}>
      {children}
    </RouteHistoryContext.Provider>
  );
};
*/
