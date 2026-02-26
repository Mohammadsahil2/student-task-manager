window.onload = function () {
    loadTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        completed: false
    };

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

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = function () {
        task.completed = checkbox.checked;
        updateTasks();
        if (task.completed) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
    };

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        li.style.textDecoration = "line-through";
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
        deleteTask(task);
        li.remove();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskToDelete.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
    let listItems = document.querySelectorAll("#taskList li");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    listItems.forEach((li, index) => {
        let checkbox = li.querySelector("input");
        tasks[index].completed = checkbox.checked;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
