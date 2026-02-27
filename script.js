document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    displayTask(task);
    input.value = "";
}

function displayTask(task) {
    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span onclick="toggleTask(this)">${task.text}</span>
        <div class="actions">
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector("span").innerText;

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
}

function toggleTask(span) {
    const li = span.parentElement;
    li.classList.toggle("completed");

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.map(task => {
        if (task.text === span.innerText) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
