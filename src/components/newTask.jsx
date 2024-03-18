import { useRef, useState } from "react";
import {actions} from '../redux/todoSlice';
import { useDispatch } from "react-redux";

export default function NewTask() {
    const dispatch = useDispatch();
    const { addTask } = actions;
    const [task, setTask] = useState('');
    const inputField = useRef();

    return (
        <div className="space-y-3">
            <h2 className="font-bold uppercase self-start font-serif">add task</h2>
            <form
                onSubmit={evnt => {
                    evnt.preventDefault();
                    dispatch(addTask(task));
                    setTask('');
                }}
                className="flex flex-col sm:flex-row justify-between w-full gap-3">
                <input
                    ref={inputField}
                    value={task}
                    onChange={evnt => setTask(evnt.currentTarget.value)}
                    className="px-3 py-2 rounded-xl w-full outline-none bg-violet-100"
                    placeholder="Enter your task"
                    type="text"
                    name=""
                    id=""
                />
                <button
                    className="bg-violet-700 hover:bg-violet-600 text-white px-3 py-2 rounded-xl outline-none uppercase font-serif w-fit"
                    type="submit"
                >save</button>
            </form>
        </div>
    );
}