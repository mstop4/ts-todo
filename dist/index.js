import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
const tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  saveTasks();
}
function loadTasks() {
  const tasksJSON = localStorage.getItem("TASKS") ?? "[]";
  return JSON.parse(tasksJSON);
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
