// Retrieve tasks from local storage and display them
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
for(let i=0; i<tasks.length; i++){
    let task = tasks[i];
    document.querySelector('#tasks').innerHTML += `
        <div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span id="taskname">${task.name}</span>
            <button class="delete">X</button>
        </div>
    `;
}

// Add a new task
document.querySelector('#push').onclick = function(){
    let input = document.querySelector('#newtask input');
    if(input.value.length == 0){
        alert("Please Enter a Task");
    }
    else{
        let task = {
            name: input.value,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <input type="checkbox" class="task-checkbox">
                <span id="taskname">${task.name}</span>
                <button class="delete">X</button>
            </div>
        `;
        input.value = "";

        // Delete a task
        let current_tasks = document.querySelectorAll(".delete");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                let taskElem = this.parentNode;
                let index = Array.prototype.indexOf.call(taskElem.parentNode.children, taskElem);
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskElem.remove();
            }
        }

        // Mark a task as completed
        let checkboxes = document.querySelectorAll(".task-checkbox");
        for(let i=0; i<checkboxes.length; i++){
            checkboxes[i].onchange = function(){
                let taskElem = this.parentNode;
                let index = Array.prototype.indexOf.call(taskElem.parentNode.children, taskElem);
                tasks[index].completed = this.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskElem.classList.toggle('completed', this.checked);
            }
        }
        
    }
}
document.querySelector('#clear-all').onclick = function(){
    let tasks = document.querySelectorAll('.task');
    for(let i=0; i<tasks.length; i++){
      tasks[i].remove();
    }
  }
  
