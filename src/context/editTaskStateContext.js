import { createContext, useContext } from "react";

const editTaskStateContext = createContext({isEdited: { state: false, taskData: {}, index: -1 }, setIfEdited: ()=>{}});
export const EditTaskStateContextProvider = editTaskStateContext.Provider;
export const useEditTaskContext = () => useContext(editTaskStateContext);