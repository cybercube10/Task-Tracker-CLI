# Project Name

Task tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on.

## Installation

To clone the repository, run the following command in your terminal:

```bash
git clone https://github.com/cybercube10/Task-Tracker-CLI.git


## Usage

This is a simple command-line task management application. You can perform the following operations:

### Commands

1. **Add a Task**
   ```bash
   node app.js add "Task Name"

2. **Update a Task**
    ```bash
    node app.js update <task_id> "New Task Name"
3. **Delete a Task** 
    ```bash
    node app.js delete <task_id>
4. **Update Status**
     ```bash 
     node app.js mark-done <task_id>
     
    node app.js mark-in-progress <task_id>

5. **List Tasks to get specific tasks(done/todo/in-progress)**

   ```bash
    node app.js list [all|todo|done|in-progress]


