import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/todoSlice';
import { nanoid } from "@reduxjs/toolkit";


function generateRandom() {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let word = '';
    for (let i = 0; i < 11; i++) {
        let index = Math.round(Math.random() * (charSet.length - 1));
        word += i === 4 ?
            ' ' : charSet[index];
    }
    return word;
}

export default function NoItemComponent() {
    const { populateTask } = actions;
    const dispatch = useDispatch();
    const showDone = useSelector(state => state.showDone);
    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center px-4 py-2">
            <div>
                <p>None to display yet</p>
                <p>{showDone ? '' : '\nThere might be some in finished tasks'}</p>
            </div>
            <button
                type="button"
                className="p-2 select-none bg-violet-700 hover:bg-violet-600 border-2 border-violet-600 rounded-xl outline-none text-white uppercase w-fit"
                onClick={
                    () => {
                        const todos = [];
                        if (todos.length === 0) {
                            for (let i = 0; i < 10; i++) {
                                todos.unshift({ id: nanoid(), name: generateRandom(), isDone: i > 4 ? true : false });
                            }
                        }
                        dispatch(populateTask(todos));
                    }}
            >generate random</button>
        </div >
    );
}