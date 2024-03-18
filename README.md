# To - Do List App Using React JS
This is a simple ToDo list application built with React.js and Tailwind CSS.
This one is the redux implementation of state management instead of useContext used in main branch

## Features
- Add new tasks
- Edit existing tasks
- Mark tasks as done/not done
- Delete tasks
- Show/hide completed tasks
- Data persistence using localStorage

## You can try it live
- link to visit: https://mini-project-todo-list.vercel.app/

## Installation

1. Clone the repository:
    ```bash
    git clone "https://github.com/Varun-Chakraborty/To-Do-List-React"
    ```

2. Navigate to the project directory:
    ```bash
    cd todo-list-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
### Usage
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and visit http://localhost:5173 to view the app.

## How to Use
- ### Adding a Task:
    Enter a task in the input field and press "Enter" or click the "Save" button.
- ### Editing a Task:
    Click the edit icon next to the task, make changes, and press "Enter" or click the "Update" button.
- ### Marking a Task as Done:
    Click the checkbox next to the task.
- ### Deleting a Task:
    Click the delete icon next to the task.
- ### Showing Completed Tasks:
    Click the "Show Finished" button to toggle visibility of completed tasks.
- ### Deleting multiple tasks:
    Click the "Delete All" button to delete the tasks according to state of "Show Finished", if its checked, all tasks will be deleted, if not, only undone tasks will be deleted.
- ### Mark multiple tasks done or undone:
    You will get a button to mark all given tasks done, if show finished is checked and all the tasks are marked done, then you will get a button to mark all of them not done
# Technologies Used
- React.js
- Tailwind CSS
# Contributing
Contributions are welcome! Please feel free to open a pull request or submit an issue if you find any bugs or want to suggest improvements.