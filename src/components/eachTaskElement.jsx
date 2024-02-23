import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function deleteTask(taskToDelete, setTasks) {
    setTasks(prevValue => {
        let [tasks, doneTasks] = prevValue;
        if (taskToDelete.isDone) {
            let index = doneTasks.indexOf(taskToDelete);
            index>=0 && doneTasks.splice(index, 1)
        } else {
            let index = tasks.indexOf(taskToDelete);
            index>=0 && tasks.splice(index, 1)
        }
        return [[...tasks], [...doneTasks]]
    });
}
function editTask(setIfEdited, taskToEdit, setTasks) {
    setIfEdited(prevState => {
        setTasks(prevValue => {
            let [tasks, doneTasks] = prevValue;
            if (prevState[0]) {
                prevState[1].isDone ? doneTasks.unshift(prevState[1]) : tasks.unshift(prevState[1]);
            }
            if (taskToEdit.isDone) {
                let index = doneTasks.indexOf(taskToEdit);
                index>=0 && doneTasks.splice(index, 1);
            }
            else {
                let index = tasks.indexOf(taskToEdit);
                index>=0 && tasks.splice(index, 1);
            }
            return [[...tasks], [...doneTasks]]
        });
        return [true, taskToEdit];
    });
}

export default function EachTaskElement({ isEdited, setIfEdited, currentTask, setTasks }) {
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        if (changed) {
            setTasks(prevValue => {
                let [tasks, doneTasks] = prevValue;
                if (currentTask.isDone) {
                    tasks.splice(tasks.indexOf(currentTask), 1);
                    doneTasks.push(currentTask);
                }
                else {
                    doneTasks.splice(doneTasks.indexOf(currentTask), 1);
                    tasks.push(currentTask);
                }
                return [[...tasks], [...doneTasks]]
            });
            setChanged(false);
        }
    }, [changed]);
    return (
        <div
            onMouseOver={
                evnt => {
                    if (evnt.currentTarget.querySelector('.options'))
                        evnt.currentTarget.querySelector('.options').style.visibility = 'visible';
                }
            }
            onMouseLeave={
                evnt => {
                    if (evnt.currentTarget.querySelector('.options'))
                        evnt.currentTarget.querySelector('.options').style.visibility = 'hidden';
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
            <div className="options flex gap-2 select-none" style={{ visibility: "hidden" }}>
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