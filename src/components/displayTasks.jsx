import { useShowDoneTaskContext } from "../context/showDoneTaskContext";
import { useTaskContext } from "../context/tasksContext";
import NoItemComponent from "./NoItemComponent";
import EachTaskElement from "./eachTaskElement";

export default function DisplayTasks() {
    const { showDone } = useShowDoneTaskContext();
    const { undoneTasks, doneTasks, setTasks } = useTaskContext();
    let allTasks = undoneTasks.concat(showDone ? doneTasks : []);
    return (
        <div className="bg-violet-100 p-2 rounded-xl h-3/5 flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="font-bold uppercase font-serif">your tasks</h2>
                <div className="flex gap-2">
                    {
                        undoneTasks.length > 0 &&
                        <button
                            type="submit"
                            onClick={
                                evnt => {
                                    evnt.preventDefault();
                                    setTasks(prevValue => {
                                        let [tasks, doneTasks] = prevValue
                                        return [
                                            [],
                                            doneTasks.concat(
                                                undoneTasks.length > 0 ?
                                                    tasks.map(
                                                        task => {
                                                            return { ...task, isDone: true }
                                                        }) : []

                                            )
                                        ]
                                    });
                                }}
                            className={
                                (
                                    doneTasks.length > 0 ?
                                        (undoneTasks.length > 0 || doneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                        (undoneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500")
                                )
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            MARK ALL AS DONE
                        </button>
                    }{
                        showDone && undoneTasks.length === 0 && doneTasks.length > 0 &&
                        <button
                            type="submit"
                            onClick={
                                evnt => {
                                    evnt.preventDefault();
                                    setTasks(prevValue => {
                                        let [tasks, doneTasks] = prevValue;
                                        return [
                                            tasks.concat(
                                                doneTasks.length > 0 ? doneTasks.map(
                                                    task => {
                                                        return { ...task, isDone: false }
                                                    }) : []

                                            ),
                                            []
                                        ]
                                    });
                                }}
                            className={
                                (
                                    doneTasks.length > 0 ?
                                        (undoneTasks.length > 0 || doneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                        (undoneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500")
                                )
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            MARK ALL AS NOT DONE
                        </button>
                    }{
                        <button
                            type="submit"
                            onClick={
                                evnt => {
                                    evnt.preventDefault();
                                    setTasks(prevValue => {
                                        let [tasks, doneTasks] = prevValue;
                                        return [[], showDone ? [] : doneTasks]
                                    });
                                }
                            }
                            className={
                                (
                                    showDone ?
                                        (undoneTasks.length > 0 || doneTasks.length > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500") :
                                        (undoneTasks.length > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500")
                                )
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            DELETE ALL
                        </button>
                    }
                </div>
            </div>
            <div className="bg-violet-50 rounded-lg h-full space-y-2 p-2 m-2 overflow-x-hidden overflow-y-auto">
                {
                    allTasks.length > 0 ?
                        allTasks.map((task, index) => {
                            return (
                                <EachTaskElement
                                    key={index}
                                    currentTask={task}
                                    setTasks={setTasks}
                                />
                            )
                        }) :
                        <NoItemComponent />
                }
            </div>
        </div>
    );
}
