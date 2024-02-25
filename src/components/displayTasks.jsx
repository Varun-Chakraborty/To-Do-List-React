import EachTaskElement from "./eachTaskElement";

function generateRandomWords() {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let word = '';
    for (let i = 0; i < 11; i++) {
        let index = Math.round(Math.random() * (charSet.length - 1));
        word += i === 4 ?
            ' ' : charSet[index];
    }
    return word;
}

function ComponentToDisplayWhenNoItemInList({ showDoneTasks, setTasks }) {
    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center px-4 py-2">
            <div>
                <p>None to display yet</p>
                <p>
                    {showDoneTasks ? '' : '\nThere might be some in finished tasks'}
                </p>
            </div>
            <button
                type="submit"
                className="p-2 select-none bg-violet-700 hover:bg-violet-600 border-2 border-violet-600 rounded-xl outline-none text-white uppercase w-fit"
                onClick={
                    evnt => {
                        evnt.preventDefault();
                        setTasks(prevValue => {
                            let [tasks, doneTasks] = prevValue;
                            if (tasks.length === 0) {
                                for (let i = 0; i < 5; i++) {
                                    tasks.push({ name: generateRandomWords(), isDone: false });
                                }
                            } if (doneTasks.length === 0) {
                                for (let i = 0; i < 5; i++) {
                                    doneTasks.push({ name: generateRandomWords(), isDone: true });
                                }
                            }
                            return [[...tasks], [...doneTasks]]
                        });
                    }}
            >generate random</button>
        </div>
    );
}

export default function DisplayTasks({ tasks, setTasks, doneTasks, showDoneTasks }) {
    let allTasks = tasks.concat(showDoneTasks ? doneTasks : []);
    return (
        <div className="bg-violet-100 p-2 rounded-xl h-3/5 flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="font-bold uppercase font-serif">your tasks</h2>
                <div className="flex gap-2">
                    {
                        tasks.length > 0 &&
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
                                                tasks.length > 0 ?
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
                                        (tasks.length > 0 || doneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                        (tasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500")
                                )
                                + " select-none text-white outline-none p-2 rounded-lg"}>
                            MARK ALL AS DONE
                        </button>
                    }{
                        showDoneTasks && tasks.length === 0 && doneTasks.length > 0 &&
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
                                        (tasks.length > 0 || doneTasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500") :
                                        (tasks.length > 0 ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500")
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
                                        return [[], showDoneTasks ? [] : doneTasks]
                                    });
                                }
                            }
                            className={
                                (
                                    showDoneTasks ?
                                        (tasks.length > 0 || doneTasks.length > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500") :
                                        (tasks.length > 0 ? "bg-red-600 hover:bg-red-500" : "bg-gray-500")
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
                        <ComponentToDisplayWhenNoItemInList
                            showDoneTasks={showDoneTasks} setTasks={setTasks} tasks={tasks} doneTasks={doneTasks} />
                }
            </div>
        </div>
    );
}
