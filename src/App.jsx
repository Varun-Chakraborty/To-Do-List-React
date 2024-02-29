import Navbar from "./components/navbar";
import MainWindow from "./components/mainWindow";
import { TaskContextProvider } from "./context/tasksContext";
import { ShowDoneTaskContextProvider } from "./context/showDoneTaskContext";
import { useEffect, useState } from "react";
import { EditTaskStateContextProvider } from "./context/editTaskStateContext";


export default function App() {
    const [{ undoneTasks, doneTasks }, setTasks] = useState({ undoneTasks: [], doneTasks: [] });
    const [showDone, setShowDone] = useState(false);
    const [loading, setIfLoading] = useState(true);
    const [isEdited, setIfEdited] = useState({ state: false, taskData: { name: '', isDone: false }, index: -1 });

    useEffect(() => {
        setTasks(
            {
                undoneTasks:
                    localStorage.getItem('tasks') ?
                        JSON.parse(localStorage.getItem('tasks')) : [],
                doneTasks:
                    localStorage.getItem('doneTasks') ?
                        JSON.parse(localStorage.getItem('doneTasks')) : []
            }
        );
        setIfLoading(false);
    }, []);

    useEffect(() => {
        !loading && localStorage.setItem('tasks', JSON.stringify(undoneTasks));
    }, [undoneTasks]);

    useEffect(() => {
        !loading && localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }, [doneTasks]);

    return (
        <EditTaskStateContextProvider value={{ isEdited, setIfEdited }}>
            <ShowDoneTaskContextProvider value={{ showDone, setShowDone }}>
                <TaskContextProvider value={{ undoneTasks, doneTasks, setTasks }}>
                    <div className="bg-violet-100 h-screen w-screen flex justify-center items-center">
                        <Navbar />
                        <section className="bg-violet-200 rounded-2xl p-4 flex flex-col justify-between h-5/6">
                            <MainWindow />
                        </section>
                    </div>
                </TaskContextProvider>
            </ShowDoneTaskContextProvider>
        </EditTaskStateContextProvider>
    );
}