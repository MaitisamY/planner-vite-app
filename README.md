<!-- Keywords: 
to do, 
to-do, 
list, 
to-do-list, 
to do list, 
next.js, 
react, 
node.js, 
node, 
next, 
planner, 
next.js framework, 
CRUD, 
tasks, task, 
toDo, 
todolist, 
task-list, 
task list, 
task item, 
item, 
To-do list, 
Task manager, 
Task management, 
Productivity tool, 
Task organizer, 
Task tracker, 
Daily planner, 
Task scheduler, 
Time management
To-do app  -->
# 1 - PLANNER - To-do-list Application

## Introduction

Planner is a simple daily tasks maintainer app built on Next.js framework, designed to assist users in managing their tasks efficiently. It provides essential features such as task creation, editing, marking as completed or pending, and deletion. The app utilizes local storage to persist tasks and related functionalities.

## Features
- **Task Management**: Users can create, edit, mark as completed or pending, and delete tasks.
- **Local Storage**: Utilizes browser local storage to persist tasks and their statuses.
- **Date Restrictions**: Users cannot select previous dates for task creation. In the task edit view, users can choose previous dates but not less than the current date.
- **Two Views**: Offers two types of views - grid and list view, with the default being grid.
- **Home View**: Displays tasks for the current date and dates ahead of today.
- **Trash View**: Tasks are moved to the trash view when their due date has passed.

## Usage
1. **Creating a Task**: Click on the "Create Task" button to open the custom modal. Write the task details and select a due date. Only future dates can be selected.
2. **Editing a Task**: Double-click on a task to open the edit modal. Modify the task details or due date. Previous dates can be selected, but not less than the current date.
3. **Marking Task Status**: Click on the checkbox next to a task to mark it as completed or pending.
4. **Deleting a Task**: Click on the delete icon to remove a task from the list.
5. **View Options**: Toggle between grid and list view using the provided options.
6. **Trash View**: Tasks with past due dates are automatically moved to the trash view.

## Installation
1. Clone or download the Planner repository from [GitHub](https://github.com/MaitisamY/planner).
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open the provided URL in a web browser to access the application.

## Live Demo
Check out the live version of the project [here](https://next-to-do-app-nu.vercel.app)

## Some Screenshots

### Home View on landing
![34567](https://github.com/MaitisamY/planner/assets/145204832/9600fdf5-526d-49d9-bf79-1bd24bf1b128 "Home View on landing")

### Home Grid View
![12345](https://github.com/MaitisamY/planner/assets/145204832/66567d75-3aa5-489b-b9dc-bffaef310d21 "Home Grid View")

### Home List View
![23456](https://github.com/MaitisamY/planner/assets/145204832/7abf57c2-6f49-494e-9f6f-8cfb90767075 "Home List View")

### Mobile designs
![45678](https://github.com/MaitisamY/planner/assets/145204832/51562480-980b-4c07-9ece-c97f7b475f9f "Mobile designs 1")
![56789](https://github.com/MaitisamY/planner/assets/145204832/a661788d-16d2-4923-9e44-be4afe40d3fc "Mobile designs 2")
![67890](https://github.com/MaitisamY/planner/assets/145204832/3b3bee41-4d4e-4bbe-8ecc-b40f70108eac "Mobile designs 3")
![78901](https://github.com/MaitisamY/planner/assets/145204832/69bcc856-ac01-4aaa-bdb7-2a700358b290 "Mobile designs 4")

## Support
For any inquiries or support requests, please reach out to the development team through our GitHub repository.

## Note
This project is open-source and does not include a license. Users are free to use and modify the code according to their requirements.

