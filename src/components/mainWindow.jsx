import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";

import { tasksContext } from "../context/tasks";
import NewTask from "./newTask";
import DisplayTasks from "./displayTasks";

export default function MainWindow() {
    const [[tasks, doneTasks], setTasks] = useState([[], []]);
    const [loading, setIfLoading] = useState(true);
    const [showDoneTasks, setShowDoneTasks] = useState(false);
    const [isEdited, setIfEdited] = useState([false, { name: '', isDone: false }]);

    useEffect(() => {
        setTasks(
            [
                localStorage.getItem('tasks') ?
                    JSON.parse(localStorage.getItem('tasks')) : [],
                localStorage.getItem('doneTasks') ?
                    JSON.parse(localStorage.getItem('doneTasks')) : []
            ]
        );
        setIfLoading(false);
    }, []);

    useEffect(() => {
        !loading && localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        !loading && localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }, [doneTasks]);

    return (
        <>
            <tasksContext.Provider value={{isEdited, setIfEdited}} >
                <div className="flex flex-col gap-3">
                    <h1 className="uppercase font-bold font-serif text-xl sm:text-2xl text-center">to-do list - your personal daily task manager</h1>
                    <NewTask isEdited={isEdited} setIfEdited={setIfEdited} tasks={tasks} doneTasks={doneTasks} setTasks={setTasks} />
                    <hr className="border-black w-full" />
                    <button className={"outline-none px-3 py-2 rounded-lg text-white cursor-pointer flex items-center gap-2 select-none w-fit "
                        + (showDoneTasks ? 'bg-green-600 hover:bg-green-500' : 'bg-violet-600 hover:bg-violet-500')}
                        onClick={
                            evnt => {
                                evnt.preventDefault();
                                setShowDoneTasks(previousState => !previousState)
                            }
                        }
                        type="submit">
                        <div className={"bg-white text-black rounded-sm text-lg"}>
                            <div className={(showDoneTasks ? 'opacity-100' : 'opacity-0') + ' transition-all'}>
                                <TiTick />
                            </div>
                        </div>
                        <div className="">Show finished</div>
                    </button>
                </div>
                <DisplayTasks isEdited={isEdited} setIfEdited={setIfEdited} tasks={tasks} setTasks={setTasks} doneTasks={doneTasks} showDoneTasks={showDoneTasks} />
            </tasksContext.Provider>
        </>
    );
}