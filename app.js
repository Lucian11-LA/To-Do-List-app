const taskInput =  document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

//get task from localstorage
function getTasks(){
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

//save tasks to localstorage
function saveTasks(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//render tasks 
function renderTasks(){
    const tasks = getTasks();
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;

        //remove btn
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.onclick = ()=> removeTask(index);

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}
//add task 
function addTask(){
    const taskName = taskInput.value.trim();

    if(taskName == '') return;

    const tasks = getTasks();
    tasks.push({name: taskName});

    saveTasks(tasks);
    taskInput.value = '';

    renderTasks();
}


//remove task
function removeTask(index){

    const tasks = getTasks();
    tasks.splice(index, 1);

    saveTasks(tasks);
    renderTasks();
}

//Event for add task onclick
addTaskBtn.addEventListener('click', addTask);

//render on page laoding

document.addEventListener('DOMContentLoaded', renderTasks);
