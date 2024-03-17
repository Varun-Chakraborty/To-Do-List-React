import { useShowDoneTaskContext, useTaskContext } from "../contexts";

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
    const { setTodos } = useTaskContext();
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
                            for (let i = 0; i < 10; i++) todos.unshift({ id: 10 - i, name: generateRandom(), isDone: i > 4 ? true : false });
                        }
                        setTodos(todos);
                    }}
            >generate random</button>
        </div >
    );
}