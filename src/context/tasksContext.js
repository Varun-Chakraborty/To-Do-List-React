import { createContext, useContext } from "react";

const tasksContext = createContext({ undoneTasks: [], doneTasks: [], setTasks: () => { } });
export const TaskContextProvider = tasksContext.Provider;
export const useTaskContext = () => useContext(tasksContext);