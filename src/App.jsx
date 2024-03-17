import { Navbar, MainWindow } from "./components";
import { TaskContextProvider, ShowDoneTaskContextProvider } from "./contexts";
import { useEffect, useState } from "react";


export default function App() {
    const [todos, setTodos] = useState([]);
    const [showDone, setShowDone] = useState(false);
    const [loading, setIfLoading] = useState(true);

    useEffect(() => {
        let todos = JSON.parse(localStorage.getItem('todos'));
        setTodos(todos ? todos : []);
        loading && setIfLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    function addTask(newTask) {
        newTask && setTodos(todos => [{ id: Date.now(), name: newTask, isDone: false }, ...todos]);
    }

    function deleteTask(id) {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    function editTask(id, task) {
        setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, name: task, isDone: false } : todo));
    }

    function toggleDone(id, isDone) {
        setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, isDone } : todo));
    }

    return (
        <ShowDoneTaskContextProvider value={{ showDone, setShowDone }}>
            <TaskContextProvider value={{ todos, setTodos, addTask, deleteTask, editTask, toggleDone }}>
                <div className="bg-violet-100 h-screen w-screen flex justify-center items-center">
                    <Navbar />
                    <section className="bg-violet-200 rounded-2xl p-4 flex flex-col justify-between h-5/6">
                        <MainWindow />
                    </section>
                </div>
            </TaskContextProvider>
        </ShowDoneTaskContextProvider>
    );
}