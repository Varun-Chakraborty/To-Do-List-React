import { useEffect, useState } from "react";
import { NoItemComponent, EachTaskElement } from "./";
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/todoSlice';

export default function DisplayTasks() {
    const [todoCount, setTodoCount] = useState(0);
    const [doneTodoCount, setDoneTodoCount] = useState(0);
    const todos = useSelector(state => state.todos);
    const showDone = useSelector(state => state.showDone);
    const { markAllDone, markAllNotDone, deleteAll } = actions;
    const dispatch = useDispatch();

    useEffect(() => {
        setTodoCount(0);
        setDoneTodoCount(0);
        todos.forEach(todo => todo.isDone ? setDoneTodoCount(prevCount => prevCount + 1) : setTodoCount(prevCount => prevCount + 1));
    }, [todos]);

    return (
        <div className="bg-violet-100 p-2 rounded-xl h-3/5 flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="font-bold uppercase font-serif">your tasks</h2>
                <div className="flex gap-2">

                    {todoCount > 0 &&
                        <button type="button"
                            onClick={() => dispatch(markAllDone())}
                            className={(doneTodoCount > 0 ?
                                (todoCount > 0 || doneTodoCount > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                (todoCount > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500"))
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            MARK ALL AS DONE
                        </button>}

                    {showDone && todoCount === 0 && doneTodoCount > 0 &&
                        <button type="button" onClick={() => dispatch(markAllNotDone())}
                            className={(doneTodoCount > 0 ?
                                (todoCount > 0 || doneTodoCount > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                (todoCount > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500"))
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            MARK ALL AS NOT DONE
                        </button>}

                    <button type="button"
                        onClick={() => dispatch(deleteAll())}
                        className={(showDone ?
                            (todoCount > 0 || doneTodoCount > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500") :
                            (todoCount > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500"))
                            + " select-none text-white outline-none p-2 rounded-lg"}>
                        DELETE ALL
                    </button>

                </div>
            </div>
            <div className="bg-violet-50 rounded-lg h-full space-y-2 p-2 m-2 overflow-x-hidden overflow-y-auto">
                {(showDone ? todoCount + doneTodoCount : todoCount) > 0 ?
                    (showDone ? todos :
                        todos.filter(todo => !todo.isDone)).map((task) => {
                            return <EachTaskElement
                                key={task.id}
                                currentTask={task} />
                        }) : <NoItemComponent />}
            </div>
        </div>
    );
}