const todos = document.querySelector('.todos');
const todoListPosition = document.querySelector('.todo-list');
const todosList = new Map();
const btnAdd = document.querySelector('.btn-add');

let counter = 0;

btnAdd.addEventListener('click', addTodo);

todos.addEventListener('keypress', (event) => {
    if(event.keyCode === 13){
        addTodo();
    }
});

function addTodo(){
    if(todos.value !== ''){
        counter++;
        todosList.set(`${todos.value}${counter}`, {
            id: `${todos.value}${counter}`,
            value: todos.value,
            important: false,
        });
        
        todos.value = '';  

        updateList();
    }
}

function updateList(){
    while(todoListPosition.firstChild){
        todoListPosition.firstChild.remove();
    }
    for (let todo of todosList.values()) {
        todoListPosition.append(createTodo(todo)); 
    }
}

function createTodo(todo) {
    let value = todo.value;
    
    const todoBlock = document.createElement('li');
    const textTodo = document.createElement('span');
    textTodo.className = "todo-text";
    textTodo.innerHTML= value;

    todoBlock.append(textTodo);

    edit(todoBlock,todo);
    deleteTodo(todoBlock,todo);
    important(todoBlock,todo);
    
    //deleteTodo(todoBlock,todo);
    //edit(todoBlock,todo);

    return todoBlock;
}

function deleteTodo(el,todo) {
    const todoButtonTrash = document.createElement('i');
    todoButtonTrash.className = "fa-solid fa-trash";
    el.append(todoButtonTrash);

    el.querySelector('.fa-trash').addEventListener('click', () => {
        todosList.delete(todo.id);
        updateList();
    })
}

function edit(el,todo){
    const todoButtonGear = document.createElement('i');
    todoButtonGear.className = "fa-solid fa-gear";
    el.append(todoButtonGear);

    el.querySelector('.fa-gear').addEventListener('click', () => {
        (todosList.get(todo.id)).value = prompt(`${el.textContent}`);
        updateList();
    })
}

function important(el,todo){
    const todoButtonImportant = document.createElement('i');
    todoButtonImportant.className = "fa-regular fa-star";

    el.append(todoButtonImportant);

    el.querySelector('.fa-star').addEventListener('click', () => {
        //let important = (todosList.get(todo.id)).important;
        (todosList.get(todo.id)).important ? (todosList.get(todo.id)).important = false : (todosList.get(todo.id)).important = true;
        updateList();
    }) 
}

