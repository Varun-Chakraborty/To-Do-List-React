import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    showDone: false,
};
function populateTask(state, action) {
    const todos = action.payload;
    state.todos = todos ? todos : [];
}
function addTask(state, action) {
    const newTask = action.payload;
    newTask && state.todos.unshift({ id: nanoid(), name: newTask, isDone: false });
}
function deleteTask(state, action) {
    const id = action.payload;
    state.todos = state.todos.filter(todo => todo.id !== id);
}
function deleteAll(state, action) {
    state.todos = state.showDone ? [] : state.todos.filter(todo => todo.isDone);
}
function editTask(state, action) {
    const { id, task } = action.payload
    state.todos = state.todos.map(todo => todo.id === id ? { ...todo, name: task, isDone: false } : todo);
}
function toggleDone(state, action) {
    const { id, isDone } = action.payload
    state.todos = state.todos.map(todo => todo.id === id ? { ...todo, isDone } : todo);
}
function markAllDone(state, action) {
    state.todos = state.todos.map(todo => !todo.isDone ? { ...todo, isDone: true } : todo);
}
function markAllNotDone(state, action) {
    state.todos = state.todos.map(todo => todo.isDone ? { ...todo, isDone: false } : todo);
}
function toggleShowDone(state, action) {
    state.showDone = !state.showDone;
}
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: { populateTask, addTask, editTask, deleteTask, deleteAll, toggleDone, markAllDone, markAllNotDone, toggleShowDone }
});

export const actions = todoSlice.actions;
export default todoSlice.reducer;