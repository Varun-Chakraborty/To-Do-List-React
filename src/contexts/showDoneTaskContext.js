import { createContext, useContext } from "react";

const showDoneTaskContext = createContext({ showDone: false, setShowDone: () => { } });
export const ShowDoneTaskContextProvider = showDoneTaskContext.Provider;
export const useShowDoneTaskContext = () => useContext(showDoneTaskContext);