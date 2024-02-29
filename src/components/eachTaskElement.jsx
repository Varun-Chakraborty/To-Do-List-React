import { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useEditTaskContext } from "../context/editTaskStateContext";
import { useTaskContext } from "../context/tasksContext";

function deleteTask(taskToDelete, setTasks) {
    setTasks(({undoneTasks, doneTasks}) => {
        if (taskToDelete.isDone) {
            let index = doneTasks.indexOf(taskToDelete);
            index >= 0 && doneTasks.splice(index, 1)
        } else {
            let index = undoneTasks.indexOf(taskToDelete);
            index >= 0 && undoneTasks.splice(index, 1)
        }
        return { undoneTasks: [...undoneTasks], doneTasks: [...doneTasks] };
    });
}
function editTask(setIfEdited, taskToEdit, setTasks) {
    setIfEdited(({state, taskData, index}) => {
        setTasks(({ undoneTasks, doneTasks }) => {
            if (state) {
                taskData.isDone ? doneTasks.splice(index, 0, taskData) : undoneTasks.splice(index, 0, taskData);
            }
            if (taskToEdit.isDone) {
                index = doneTasks.indexOf(taskData);
                index >= 0 && doneTasks.splice(index, 1);
            }
            else {
                index = undoneTasks.indexOf(taskToEdit);
                index >= 0 && undoneTasks.splice(index, 1);
            }
            return {undoneTasks: [...undoneTasks], doneTasks: [...doneTasks]}
        });
        return { state: true, taskData: taskToEdit, index };
    });
}

export default function EachTaskElement({ currentTask }) {
    const { setTasks } = useTaskContext();
    const { setIfEdited } = useEditTaskContext();
    const [changed, setChanged] = useState(false);
    const options = useRef();
    useEffect(() => {
        if (changed) {
            setTasks(({undoneTasks, doneTasks}) => {
                if (currentTask.isDone) {
                    undoneTasks.splice(undoneTasks.indexOf(currentTask), 1);
                    doneTasks.push(currentTask);
                }
                else {
                    doneTasks.splice(doneTasks.indexOf(currentTask), 1);
                    undoneTasks.push(currentTask);
                }
                return {undoneTasks: [...undoneTasks], doneTasks: [...doneTasks]}
            });
            setChanged(false);
        }
    }, [changed]);
    return (
        <div
            onMouseOver={
                evnt => {
                    if (options.current)
                        options.current.style.visibility = 'visible';
                }
            }
            onMouseLeave={
                evnt => {
                    if (options.current)
                        options.current.style.visibility = 'hidden';
                }
            }
            className="flex justify-between items-center bg-violet-200 hover:bg-violet-400 px-4 py-2 rounded-xl cursor-pointer"
        >
            <div className="flex gap-2 items-center">
                <input
                    checked={currentTask.isDone}
                    onChange={
                        evnt => {
                            currentTask.isDone = evnt.currentTarget.checked;
                            setChanged(true);
                        }
                    }
                    className='cursor-pointer'
                    type="checkbox"
                    name=""
                    id={currentTask.name}
                />
                <label className={(currentTask.isDone ? "line-through" : "") + ' cursor-pointer'} htmlFor={currentTask.name}>{currentTask.name}</label>
            </div>
            <div ref={options} className="options flex gap-2 select-none" style={{ visibility: "hidden" }}>
                <div
                    onClick={() => editTask(setIfEdited, currentTask, setTasks)}
                    className="bg-purple-700 hover:bg-blue-600 cursor-pointer text-white p-2 rounded-2xl">
                    <FaEdit />
                </div>
                <div
                    onClick={() => deleteTask(currentTask, setTasks)}
                    className="bg-purple-700 hover:bg-red-600 cursor-pointer text-white p-2 rounded-2xl">
                    <MdDeleteForever />
                </div>
            </div>
        </div>
    );
}