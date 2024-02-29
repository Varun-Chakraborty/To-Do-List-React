import { useShowDoneTaskContext } from "../context/showDoneTaskContext";
import { useTaskContext } from "../context/tasksContext";

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
    const { showDone } = useShowDoneTaskContext();
    const { setTasks } = useTaskContext();
    return (
        <div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center px-4 py-2">
            <div>
                <p>None to display yet</p>
                <p>
                    {showDone ? '' : '\nThere might be some in finished tasks'}
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
                                    tasks.push({ name: generateRandom(), isDone: false });
                                }
                            } if (doneTasks.length === 0) {
                                for (let i = 0; i < 5; i++) {
                                    doneTasks.push({ name: generateRandom(), isDone: true });
                                }
                            }
                            return [[...tasks], [...doneTasks]]
                        });
                    }}
            >generate random</button>
        </div>
    );
}