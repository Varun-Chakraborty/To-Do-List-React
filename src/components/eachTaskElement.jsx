import { useEffect, useRef, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { actions } from '../redux/todoSlice';
import { useDispatch } from "react-redux";

export default function EachTaskElement({ currentTask }) {
    const [edited, setIfEdited] = useState(false);
    const inputField = useRef();
    const options = useRef();
    const dispatch = useDispatch();
    const { toggleDone, editTask, deleteTask } = actions;

    useEffect(() => {
        edited && inputField.current.focus();
    }, [edited]);

    return (
        <div
            onMouseOver={() => { if (options.current) options.current.style.visibility = 'visible' }}
            onMouseLeave={() => { if (options.current) { options.current.style.visibility = 'hidden' } }}
            className="flex justify-between items-center bg-violet-200 hover:bg-violet-400 px-4 py-2 rounded-xl cursor-pointer">
            <div className="flex gap-2 items-center">
                <input
                    checked={currentTask.isDone}
                    onChange={evnt => { dispatch(toggleDone({id: currentTask.id, isDone: evnt.currentTarget.checked})) }}
                    className='cursor-pointer'
                    type="checkbox"
                />
                {edited ?
                    <input
                        onKeyDown={evnt => {
                            if (evnt.key === 'Enter') {
                                setIfEdited(false);
                                currentTask.name==='' && dispatch(deleteTask(currentTask.id));
                            }
                        }}
                        ref={inputField}
                        className="bg-inherit outline-none border-b border-black"
                        value={currentTask.name}
                        onChange={evnt => dispatch(editTask({id: currentTask.id, task: evnt.currentTarget.value}))}
                        type="text" /> :
                    <label
                        onDoubleClick={() => setIfEdited(true)}
                        className={(currentTask.isDone ? "line-through" : "") + ' cursor-pointer'}>
                        {currentTask.name}
                    </label>}
            </div>
            <div ref={options} className="options flex gap-2 select-none" style={{ visibility: "hidden" }}>
                {edited ?
                    <button
                        type="button"
                        onClick={() => {
                            setIfEdited(false);
                            currentTask.name==='' && dispatch(deleteTask(currentTask.id));
                        }}
                        className="bg-purple-700 hover:bg-blue-600 cursor-pointer text-white p-2 rounded-2xl">
                        <FaSave />
                    </button> :
                    <button
                        type="button"
                        onClick={() => setIfEdited(true)}
                        className="bg-purple-700 hover:bg-blue-600 cursor-pointer text-white p-2 rounded-2xl">
                        <FaEdit />
                    </button>}
                <button
                    type="button"
                    onClick={() => dispatch(deleteTask(currentTask.id))}
                    className="bg-purple-700 hover:bg-red-600 cursor-pointer text-white p-2 rounded-2xl">
                    <MdDeleteForever />
                </button>
            </div>
        </div>
    );
}