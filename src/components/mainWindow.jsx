import { TiTick } from "react-icons/ti";
import { NewTask, DisplayTasks } from "./";
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../redux/todoSlice';

export default function MainWindow() {
    const showDone = useSelector(state => state.showDone);
    const dispatch = useDispatch();
    const { toggleShowDone} = actions;
    return (
        <>
            <div className="flex flex-col gap-3">
                <h1 className="uppercase font-bold font-serif text-xl sm:text-2xl text-center">to-do list - your personal daily task manager</h1>
                <NewTask />
                <hr className="border-black w-full" />
                <button className={"outline-none px-3 py-2 rounded-lg text-white cursor-pointer flex items-center gap-2 select-none w-fit "
                    + (showDone ? 'bg-green-600 hover:bg-green-500' : 'bg-violet-600 hover:bg-violet-500')}
                    onClick={
                        evnt => {
                            evnt.preventDefault();
                            dispatch(toggleShowDone());
                        }
                    }
                    type="submit">
                    <div className={"bg-white text-black rounded-sm text-lg"}>
                        <div className={(showDone ? 'opacity-100' : 'opacity-0') + ' transition-all'}>
                            <TiTick />
                        </div>
                    </div>
                    <div className="">Show finished</div>
                </button>
            </div>
            <DisplayTasks />
        </>
    );
}