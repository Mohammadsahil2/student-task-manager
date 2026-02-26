// Load tasks when page loads
window.onload = function() {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    saveTask(task);
    displayTask(task);

    input.value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(displayTask);
}

function displayTask(task) {
    let li = document.createElement("li");
    li.textContent = task;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function() {
        deleteTask(task);
        li.remove();
    };

    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}  
