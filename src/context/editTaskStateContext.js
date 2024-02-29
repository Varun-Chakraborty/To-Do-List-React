import { createContext, useContext } from "react";

const editTaskStateContext = createContext({ state: false, taskData: {} });
export const EditTaskStateContextProvider = editTaskStateContext.Provider;
export const useEditTaskContext = () => useContext(editTaskStateContext);