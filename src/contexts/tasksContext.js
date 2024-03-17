import { createContext, useContext } from "react";

const tasksContext = createContext({
    todos: [{ id: 0, name: 'hey', isDone: false }],
    setTodos:
        () => { },
    addTask:
        (newTask) => { },
    editTask:
        (id, task) => { },
    deleteTask:
        (id) => { },
    toggleDone:
        (id, isDone) => { },
});
export const TaskContextProvider = tasksContext.Provider;
export const useTaskContext = () => useContext(tasksContext);