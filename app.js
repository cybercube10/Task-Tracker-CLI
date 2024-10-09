#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const taskFile = path.join(__dirname,'tasks.json')


function getAllTasks(){
  if (!fs.existsSync(taskFile)) {
    fs.writeFileSync(taskFile, JSON.stringify([], null, 2), 'utf-8');
    return [];
}
  const tasks = fs.readFileSync(taskFile,'utf-8')
  return JSON.parse(tasks)
}

function listTasks(query='all') {
  const tasks = getAllTasks();
  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
 
if(query != 'all'){
  taskArr = tasks.filter(task=>task.status === query)
  taskArr.forEach(task => {
    console.log(`ID: ${task.Id}, Name: ${task.name}, Status: ${task.status}`);
  });
}
else{
  tasks.forEach(task=>
  console.log(`ID: ${task.Id}, Name: ${task.name}, Status: ${task.status}`)
    
  )
}
}

function saveTasks(taskList){
  const data = fs.writeFileSync(taskFile,JSON.stringify(taskList, null, 2), 'utf-8')
}

function addTask(taskName){
  const taskList = getAllTasks()
  const task = {
    Id: taskList.length + 1,
    name: taskName,
    status: 'todo'
  }
  taskList.push(task)
  saveTasks(taskList)
  console.log(`Task added successfully (ID: ${task.Id})`);
}

function updateTask(taskId,Newname){
  const taskList = getAllTasks()
  const taskIndex = taskList.findIndex(task=>task.Id === parseInt(taskId))
  if(taskIndex === -1){
    console.log(`task ${taskId} does not exist`);
    return
  }
  taskList[taskIndex].name = Newname
  saveTasks(taskList)
}

function deleteTask(taskId){
  const taskList = getAllTasks()
  const taskIndex = taskList.findIndex(task=>task.Id === parseInt(taskId))
  if(taskIndex === -1){
    console.log(`task ${taskId} does not exist`);
    return
  }
  taskList.splice(taskIndex,1)
  saveTasks(taskList)
}


function updateStatus(taskId,newStatus){
const taskList = getAllTasks()
const taskIndex  =  taskList.findIndex(task=>task.Id === parseInt(taskId))
if(taskIndex !== -1){
  taskList[taskIndex].status = newStatus
  saveTasks(taskList)
  console.log('done');
  
}
else{
  console.log(`{taskId} is not found`);
  return
}
}



// cli work 

const [,,command, ...args] = process.argv;

switch(command){
  case 'add':
    const task = args.join(' ');
    addTask(task)
    break;
  case 'update':
    const [taskIdToUpdate , ...newDesc] = args
    const updatedDesc = newDesc.join('')
    updateTask(taskIdToUpdate,updatedDesc) 
    break;

  case 'delete':
    const [taskIdToDelete] = args
    deleteTask(taskIdToDelete)
    break;
  case 'list':
    const [query] = args
    listTasks(query)
    break;
  
  case 'mark-done':
    const[idForStatus]= args
    updateStatus(idForStatus,'done')
    break;
  
  case 'mark-in-progress':
    const[idForProg]= args
    updateStatus(idForProg,'in-progress')
    break;

  default:
    console.log('Invalid command Available commands: add, update, mark-in-progress, mark-done, delete, list');
    break;

}