import { useEffect, useRef, useState } from "react";
import { useEditTaskContext } from "../context/editTaskStateContext";
import { useTaskContext } from "../context/tasksContext";

function addTaskHook(newTask, setTasks) {
    if (newTask) setTasks(({ undoneTasks, doneTasks }) => ({ undoneTasks:[...undoneTasks, { name: newTask, isDone: false }], doneTasks }));
}

export default function NewTask({ }) {
    const { isEdited, setIfEdited } = useEditTaskContext();
    const { setTasks } = useTaskContext();
    const [value, setValue] = useState('');
    const inputField = useRef();
    useEffect(() => {
        if (isEdited.state) {
            setValue(isEdited.taskData.name);
            inputField.current.focus();
        }
    }, [isEdited]);
    return (
        <div className="space-y-3">
            <h2 className="font-bold uppercase self-start font-serif">{isEdited[0] ? 'edit task' : 'add task'}</h2>
            <div className="flex flex-col sm:flex-row justify-between w-full gap-3">
                <input
                    ref={inputField}
                    value={value}
                    onChange={
                        evnt => {
                            setValue(evnt.currentTarget.value);
                        }
                    }
                    onKeyDown={
                        evnt => {
                            if (evnt.key === 'Enter') {
                                addTaskHook(value, setTasks);
                                setValue('');
                                isEdited.state && setIfEdited({ state: false, taskData: { name: '', isDone: false }, index: -1 });
                            }
                        }
                    }
                    className="px-3 py-2 rounded-xl w-full outline-none bg-violet-100"
                    placeholder="Enter your task"
                    type="text"
                    name=""
                    id=""
                />
                <button
                    className="bg-violet-700 hover:bg-violet-600 text-white px-3 py-2 rounded-xl outline-none uppercase font-serif w-fit"
                    onClick={
                        evnt => {
                            const value = evnt.currentTarget.previousElementSibling.value;
                            addTaskHook(value, setTasks);
                            setValue('');
                            isEdited.state && setIfEdited({ state: false, taskData: '', index: -1 });
                        }
                    }
                    type="submit"
                >{isEdited.state ? 'update' : 'save'}</button>
            </div>
        </div>
    );
}