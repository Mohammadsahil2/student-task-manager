const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const sortPriority = document.getElementById("sortPriority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);
themeToggle.addEventListener("click", toggleTheme);
searchInput.addEventListener("input", renderTasks);
filterStatus.addEventListener("change", renderTasks);
sortPriority.addEventListener("change", renderTasks);

function addTask() {
    if (!taskInput.value.trim()) return;

    const task = {
        id: Date.now(),
        title: taskInput.value,
        priority: prioritySelect.value,
        dueDate: dueDateInput.value,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    let filtered = [...tasks];

    if (filterStatus.value === "Completed")
        filtered = filtered.filter(t => t.completed);
    if (filterStatus.value === "Pending")
        filtered = filtered.filter(t => !t.completed);

    if (searchInput.value)
        filtered = filtered.filter(t =>
            t.title.toLowerCase().includes(searchInput.value.toLowerCase())
        );

    if (sortPriority.value === "High")
        filtered.sort((a,b) => priorityValue(b.priority) - priorityValue(a.priority));
    if (sortPriority.value === "Low")
        filtered.sort((a,b) => priorityValue(a.priority) - priorityValue(b.priority));

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.classList.add(`priority-${task.priority}`);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.title} (${task.priority}) - ${task.dueDate || "No Date"}</span>
            <div>
                <button onclick="toggleTask(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(t =>
        t.id === id ? {...t, completed: !t.completed} : t
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function priorityValue(priority) {
    return priority === "High" ? 3 :
           priority === "Medium" ? 2 : 1;
}

function updateStats() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText =
        tasks.filter(t => t.completed).length;
    document.getElementById("pending").innerText =
        tasks.filter(t => !t.completed).length;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

renderTasks();
