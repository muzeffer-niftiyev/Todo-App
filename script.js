"use strict";

const sortBtn = document.querySelector(".sort button");
const sortImg = sortBtn.querySelector("img");
const addNewInput = document.querySelector(".input input");
const delBtn = document.querySelector(".input button");
const addBtn = document.querySelector(".add");
const todosContainer = document.querySelector(".todos");

let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
let isAtoZ = true;
const curDate = new Date();
//prettier-ignore
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

const formatDate = (time) => {
  const date = new Date(time);
  const now = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayDifference = Math.floor((now - date) / (1000 * 3600 * 24));

  if (dayDifference === 0) return `Today`;
  if (dayDifference === 1) return `Yesterday`;
  if (dayDifference === 2) return `2 days ago`;
  return `${day} ${month} ${year}`;
};

const createTodo = (todoName, todoDate) => {
  const todoEl = document.createElement("div");
  todoEl.classList.add("todo");

  const p = document.createElement("p");
  p.textContent = todoName;

  const span = document.createElement("span");
  span.textContent = formatDate(todoDate);

  const button = document.createElement("button");
  button.innerHTML = "&times;";

  button.addEventListener("click", () => {
    todoEl.remove();
    const index = allTodos.findIndex((todo) => todo.todoName === todoName);
    if (index !== -1) {
      allTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(allTodos));
    }
    if (!allTodos.length) {
      todosContainer.style.display = "none";
    } else {
      todosContainer.style.display = "flex";
    }
  });

  todoEl.appendChild(p);
  todoEl.appendChild(span);
  todoEl.appendChild(button);
  todosContainer.appendChild(todoEl);
};

const addTodo = () => {
  const newTodo = addNewInput.value.trim();
  if (!newTodo) return;
  const addDate = Date.now();
  allTodos.push({
    todoName: newTodo,
    todoDate: addDate,
  });
  createTodo(newTodo, addDate);
  localStorage.setItem("todos", JSON.stringify(allTodos));
  if (!allTodos.length) {
    todosContainer.style.display = "none";
  } else {
    todosContainer.style.display = "flex";
  }
  addNewInput.value = "";
  addNewInput.style.display = "none";
};

const sortTodos = () => {
  if (!allTodos.length) return;
  sortImg.src = isAtoZ ? "./img/sort-2.svg" : "./img/sort-1.svg";
  isAtoZ = !isAtoZ;

  allTodos = allTodos.sort((a, b) => {
    if (isAtoZ) {
      return b.todoName.localeCompare(a.todoName);
    } else {
      return a.todoName.localeCompare(b.todoName);
    }
  });

  todosContainer.innerHTML = "";
  allTodos.forEach((todo) => createTodo(todo.todoName, todo.todoDate));
};

const renderTodos = () => {
  if (allTodos.length) {
    todosContainer.style.display = "flex";
    allTodos.forEach((todo) => createTodo(todo.todoName, todo.todoDate));
  } else {
    todosContainer.style.display = "none";
  }
};

window.addEventListener("load", renderTodos);
addBtn.addEventListener("click", () => {
  if (addNewInput.style.display === "none") {
    addNewInput.style.display = "block";
    addNewInput.focus();
  } else {
    addNewInput.style.display = "none";
  }
  addTodo();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
sortBtn.addEventListener("click", sortTodos);
