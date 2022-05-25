var addTodoInputElement = document.querySelector("input.todoInput");
var addTodoButtonElement = document.querySelector("button.addTodo");
var searchTodoInputElement = document.querySelector("input.todoSearch");
var todoListElement = document.querySelector("ul.todoList");
var isCompletedCheckBoxs = document.querySelectorAll(
  "input[type='checkbox'].is-completed"
);
var deleteBtns = document.querySelectorAll("button.delete");

//
var todoList = JSON.parse(window.localStorage.getItem("todoList")) || [];
renderTodoItems(todoList);
// todo listga tegishli
function addTodo(todoItem) {
  var isItemExists = todoList.includes(todoItem.toLowerCase());

  if (!isItemExists) {
    todoList.unshift({
      id: todoList.length + 1,
      text: todoItem.toLowerCase(),
      isCompleted: false,
      createdAt: Date.now(),
    });
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
    return todoList;
  } else {
    return false;
  }
}
// yangi "li" elementini ochish uchun kerak
function renderTodoItems(todoItems) {
  todoListElement.innerHTML = "";
  for (var i = 0; i < todoItems.length; i++) {
    var todoItem = todoItems[i];
    var dateNow = new Date(todoItem.createdAt);
    var day =
      dateNow.getDate() > 9 ? dateNow.getDate() : `0${dateNow.getDate()}`;
    var month =
      dateNow.getMonth() > 9 ? dateNow.getMonth() : `0${dateNow.getMonth()}`;
    var year =
      dateNow.getFullYear() > 9
        ? dateNow.getFullYear()
        : `0${dateNow.getFullYear()}`;
    var hours =
      dateNow.getHours() > 9 ? dateNow.getHours() : `0${dateNow.getHours()}`;
    var minutes =
      dateNow.getMinutes() > 9
        ? dateNow.getMinutes()
        : `0${dateNow.getMinutes()}`;
    var seconds =
      dateNow.getSeconds() > 9
        ? dateNow.getSeconds()
        : `0${dateNow.getSeconds()}`;
    var todoCreatedAt = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    var newTodoHTML = `<li id="${todoItem.id}">
                            <b>${todoItem.id}</b>
                            <span>${todoItem.text}</span>
                            <span>${todoCreatedAt}</span>
                            <input type="checkbox" ${
                              todoItem.isCompleted ? "checked" : ""
                            } name="" class="is-completed" />
                            <button class="delete">Delete</button>
                        </li>`;
    todoListElement.innerHTML += newTodoHTML;
    isCompletedCheckBoxs = document.querySelectorAll(
      "input[type='checkbox'] .is-completed"
    );
    deleteBtns = document.querySelectorAll("button.delete");
    changeState();
    deleteTodo();

    // var newTodoLiElement = document.createElement("li");
    // newTodoLiElement.textContent = `${todoItems[i].id}. ${todoItems[i].text} - ${todoItems[i].createdAt}`;
    // todoListElement.appendChild(newTodoLiElement);
  }
}
// filter uchun
function filterTodoList(key) {
  return todoList.filter(function (todoItem) {
    return todoItem.text.includes(key.toLowerCase());
  });
}
// yozuvlarni qo'shish uchun
addTodoButtonElement.addEventListener("click", function (event) {
  var newTodoItem = addTodoInputElement.value;
  if (newTodoItem) {
    addTodo(newTodoItem);
    renderTodoItems(todoList);
  }
  addTodoInputElement.value = "";
  addTodoInputElement.focus();
});

searchTodoInputElement.addEventListener("keyup", function (event) {
  var filterKey = event.target.value;

  var filteredList = filterTodoList(filterKey);
  renderTodoItems(filteredList);
  // var lists = todoListElement.children;

  // for (var i = 0; i < lists.length; i++) {
  //     var liEl = lists[i];

  //     if (!liEl.textContent.includes(event.target.value.toLowerCase())) {
  //         liEl.className = "hidden-item";
  //     } else {
  //         liEl.className = "";
  //     }
  // }
});

function deleteTodo() {
  deleteBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var todoId = btn.parentElement.id;
      todoId = Number(todoId);
      var todoIndex = todoList.findIndex(function (element) {
        return element.id === todoId;
      });
      delete todoList[todoIndex];
      window.localStorage.removeItem("todoList");
      renderTodoItems(todoList);
    });
  });
}

function changeState() {
  isCompletedCheckBoxs.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      var todoId = checkbox.parentElement.id;
      todoId = Number(todoId);

      todoList = todoList.map(function (todo) {
        todo.id === todoId ? (todo.isCompleted = !todo.isCompleted) : todo;
        return todo;
      });
      renderTodoItems(todoList);
    });
  });
}
