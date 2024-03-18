import { useDispatch, useSelector } from "react-redux";
import { Navbar, MainWindow } from "./components";
import { useEffect, useState } from "react";
import { actions } from './redux/todoSlice';


export default function App() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const { populateTask } = actions;
    const [loading, setIfLoading] = useState(true);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        dispatch(populateTask(todos ? todos : []));
        loading && setIfLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);



    return (
        <div className="bg-violet-100 h-screen w-screen flex justify-center items-center">
            <Navbar />
            <section className="bg-violet-200 rounded-2xl p-4 flex flex-col justify-between h-5/6">
                <MainWindow />
            </section>
        </div>
    );
}