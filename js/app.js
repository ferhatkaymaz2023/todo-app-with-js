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
}




function addTodo(event)
{   
    const newTodo = todoInput.value.trim();

    if(newTodo === "")
    {
        showAlert('danger','Boş değer girdiniz.');
    }
    else 
    {
        showAlert('success','Başarıyla eklendi !');
    }

    event.preventDefault();
}


const showAlert = (type,message) => 
{
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    },1000);
}