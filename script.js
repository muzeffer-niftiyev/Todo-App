"use strict";

// selecting elements
const header = document.querySelector(".header");
const addTodoInput = document.querySelector(".add_todo_text");
const addTodoSubmitBtn = document.querySelector(".add_todo_submit");
const todos = document.querySelector(".todos");
const doneTodos = document.querySelector(".done_todos");
const centerTodo = document.querySelector(".center");

const todosContainer = document.querySelector(".center");
const doneTodosContainer = document.querySelector(".done_todos_container");

const form = document.querySelector(".add_todo");
// date when user enters app
const curDate = new Date();

//prettier-ignore
const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

const setDate = function () {
  // date when todo is created
  const date = new Date();
  const day = date.getDate();
  const month = months[date.getDay() - 1];

  // finding time margin between todo creation and entering the app
  if (curDate.getDate() - date.getDate() === 0) return `Today`;
  if (curDate.getDate() - date.getDate() === 1) return `Yesterday`;
  if (curDate.getDate() - date.getDate() === 2) return `2 days ago`;
  return `${month} ${day}`; // April 13
};

let todoCount = 0;
let doneCount = 0;

const checkTodoCount = function () {
  //if there is a todo we display header, otherwise we hide it
  todoCount === 0
    ? header.classList.add("hidden")
    : header.classList.remove("hidden");
  todoCount > 0
    ? centerTodo.classList.remove("hidden")
    : centerTodo.classList.add("hidden");
};

const checkDoneCount = function () {
  doneCount > 0
    ? doneTodos.classList.remove("hidden")
    : doneTodos.classList.add("hidden");
};

const anyItemsCheck = function () {
  todoCount === 0 && doneCount === 0
    ? todos.classList.add("hidden")
    : todos.classList.remove("hidden");
  todoCount > 0 || doneCount > 0
    ? todos.classList.add("todos_active")
    : todos.classList.remove("todos_active");
};

const addTodo = function () {
  const todo = addTodoInput.value.trim();
  // return if there is no todo data at input
  if (!todo) return;

  // creating todo

  const todos_container = document.createElement("div");
  todos_container.classList.add("todos_container");

  todosContainer.appendChild(todos_container);

  const todo_content = document.createElement("div");
  todo_content.classList.add("todo");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  todos_container.appendChild(todo_content);
  todos_container.appendChild(actions);

  const dot = document.createElement("div");
  dot.classList.add("dot");

  dot.addEventListener("click", function () {
    dotClick(dot, todos_container, todo_text);
  });

  const todo_texts = document.createElement("div");
  todo_texts.classList.add("todo_text");

  todo_content.appendChild(dot);
  todo_content.appendChild(todo_texts);

  const todo_text = document.createElement("input");
  todo_text.setAttribute("readonly", true);
  todo_text.setAttribute("spellcheck", false);
  todo_text.type = "text";
  todo_text.value = todo;

  const date_data = document.createElement("p");
  date_data.classList.add("date");
  // displaying date data coming from function
  date_data.textContent = setDate();

  todo_texts.appendChild(todo_text);
  todo_texts.appendChild(date_data);

  const edit_btn = document.createElement("button");
  edit_btn.classList.add("edit");
  edit_btn.textContent = "Edit";

  edit_btn.addEventListener("click", function () {
    editTodo(todo_text, edit_btn);
  });

  const delete_btn = document.createElement("button");
  delete_btn.classList.add("delete");
  delete_btn.textContent = "Delete";

  delete_btn.addEventListener("click", function () {
    deleteTodo(todos_container, dot);
  });

  actions.appendChild(edit_btn);
  actions.appendChild(delete_btn);

  addTodoInput.value = null;
  addTodoInput.blur();
  todos_container.style.padding = "15px";

  todoCount++;
  checkTodoCount();

  anyItemsCheck();
};

// when page loads we check how many todos are there
document.addEventListener("DOMContentLoaded", checkTodoCount);

// we add todo when user submits or clicks the button
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
addTodoSubmitBtn.addEventListener("click", addTodo);

const editTodo = function (text, editBtn) {
  // as default it has readonly attribute

  if (text.hasAttribute("readonly")) {
    // when user clicks edit button first time we remove that attribute,
    text.removeAttribute("readonly");
    // we change text color to notify user that he can start editing
    text.style.color = "#f15761";
    text.focus();
    editBtn.textContent = "Save";
  } else {
    // if user clicked button second time we add readonly attribute again
    text.setAttribute("readonly", true);
    // we switch to default color and textContent
    text.style.color = "#eee";
    editBtn.textContent = "Edit";
  }
};

const deleteTodo = function (item, dot) {
  if (dot.classList.contains("active")) {
    item.remove();

    doneCount--;
    checkDoneCount();
  } else {
    item.remove();

    todoCount--;
    checkTodoCount();
  }

  anyItemsCheck();
};

// when user clicks the dot
const dotClick = function (dot, item, text) {
  //we check if that element is already active
  if (dot.classList.contains("active")) {
    //we remove that element from done todos container and add it to new todos container
    item.remove();
    doneCount--;
    checkDoneCount();

    //we make todo non-active
    dot.classList.remove("active");
    text.classList.remove("line");

    todosContainer.appendChild(item);
    todoCount++;
    checkTodoCount();
  } else {
    // if todo isn't active we remove it from new todos container and add it to done todos container
    item.remove();
    todoCount--;
    checkTodoCount();

    //we make todo active
    dot.classList.add("active");
    text.classList.add("line");

    doneTodosContainer.appendChild(item);
    doneCount++;
    checkDoneCount();
  }
  anyItemsCheck();
};
