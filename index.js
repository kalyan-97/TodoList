let TodoContainerElement = document.getElementById("TodoContainer");
let UserInputValue = document.getElementById("UserInput");
let AddBtnElement = document.getElementById("AddBtn");
let SaveBtnElement = document.getElementById("SaveBtn");

function getTodoFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoFromLocalStorage();

SaveBtnElement.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

let todoCount = todoList.length;

function OnDeleteTodo(TodoId) {
    let TodoElement = document.getElementById(TodoId);
    TodoContainerElement.removeChild(TodoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        
        if (eachTodoId === TodoId) {
          return true;
        } else {
          return false;
        }
      });
    
      
     todoList.splice(deleteElementIndex, 1);
}

function OnTodoStatusChange(CheckBoxId, LableId) {
  let lableElement = document.getElementById(LableId);
  lableElement.classList.toggle("checked");
}

function createAndAppendTodo(todo) {
  let CheckBoxId = "checkbox" + todo.UniqueNo;
  let LableId = "lable" + todo.UniqueNo;
  let TodoId = "todo" + todo.UniqueNo;

  let TodoElement = document.createElement("li");
  TodoElement.classList.add("todo-item-container");
  TodoElement.id = TodoId;
  TodoContainerElement.appendChild(TodoElement);

  let InputElement = document.createElement("input");
  InputElement.type = "checkbox";
  InputElement.id = CheckBoxId;
  InputElement.classList.add("checkbox-input");
  InputElement.onclick = function () {
    OnTodoStatusChange(CheckBoxId, LableId);
  };
  TodoElement.appendChild(InputElement);

  let lableContainerElement = document.createElement("div");
  lableContainerElement.classList.add("label-container");
  TodoElement.appendChild(lableContainerElement);

  let lableElement = document.createElement("lable");
  lableElement.setAttribute("for", CheckBoxId);
  lableElement.classList.add("checkbox-label");
  lableElement.textContent = todo.text;
  lableElement.id = LableId;
  lableContainerElement.appendChild(lableElement);

  let deleteContainerElement = document.createElement("div");
  deleteContainerElement.classList.add("delete-icon-container");
  lableContainerElement.appendChild(deleteContainerElement);

  let deleteIcon = document.createElement("button");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.textContent = "Delete";
  deleteIcon.onclick = function () {
    OnDeleteTodo(TodoId);
  };
  deleteContainerElement.appendChild(deleteIcon);
}

function OnAddTodo() {
  let userValue = UserInputValue.value;

  if (UserInputValue.value === "") {
    alert("Enter sometext");
    return;
  }

  todoCount = todoCount + 1;
  let newTodo = {
    text: userValue,
    UniqueNo: todoCount,
  };
 
  todoList.push(newTodo)
  createAndAppendTodo(newTodo);
  UserInputValue.value = "";
}

AddBtnElement.onclick = function () {
  OnAddTodo();
};

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
