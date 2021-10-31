const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const filter = document.getElementById("filter");
const todoList = document.querySelector(".list-group");
const clearButton = document.getElementById('clear-todos');


addEventListeners();

function addEventListeners()
{
    form.addEventListener('submit',addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodos);
    secondCardBody.addEventListener('click',deleteTodo);
    filter.addEventListener('keyup',filterTodos);
    clearButton.addEventListener('click',clearAllTodos);
}

function clearAllTodos()
{
    if(confirm("Silmek istediğinz den emis misiniz ? "))
    {
        while(todoList.firstElementChild != null)
        {
            todoList.removeChild(todoList.firstElementChild);
            localStorage.removeItem("todos");
        }
    }

}



function filterTodos(e)
{
    const filterValue = e.target.value.toLocaleLowerCase('TR');
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach((item,index) => {
        const text = item.textContent.toLocaleLowerCase('TR');
        text.indexOf(filterValue) === -1 ? item.setAttribute('style','display: none !important') : item.setAttribute('style','display: block');
    });

}


function deleteTodoFromStorage(deleteTodo)
{
    let todos = getTodosFromStroge();
    todos.forEach((todo,i) => {
        if(todo === deleteTodo)
        {
            todos.splice(i,1);
        }
    localStorage.setItem('todos',JSON.stringify(todos));
    });
}


function deleteTodo(e)
{
    if(e.target.className === 'fa fa-remove')
    {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
    }

}


function loadAllTodos(e)
{
    let todos = getTodosFromStroge();
    todos.forEach((too) => {
        addTodoToUI(too);
    });
}



function addTodoToStorage(newTodo)
{
    let todos = getTodosFromStroge();

    todos.push(newTodo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodosFromStroge()
{
    let todos;
    localStorage.getItem('todos') === null ? todos = [] : todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
}


function addTodo(e) 
{
    const newTodo = todoInput.value.trim();

    if(newTodo === "")
    {
        showAlert('danger','Boş değer girdiniz.');
    }
    else 
    {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert('success','Başarıyla eklendi !');
    }

    todoInput.value = "";
    e.preventDefault();
}



function addTodoToUI(newTodo)
{
    const li = document.createElement('li');
    const a = document.createElement('a');

    li.className = `list-group-item d-flex justify-content-between`;
    li.appendChild(document.createTextNode(newTodo));
    a.id = '#';
    a.className = 'delete-item';
    a.innerHTML = `<i class = "fa fa-remove"></i>`;
    li.appendChild(a);

    todoList.appendChild(li);

}


function showAlert(type,message)
{
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    },1000);
}