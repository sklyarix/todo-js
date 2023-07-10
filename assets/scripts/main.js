const todos = document.querySelector('.todos');
const todoListPosition = document.querySelector('.todo-list');
const todosList = new Map();
const btnAdd = document.querySelector('.todos-btn');
const categories = document.querySelectorAll('.category');

for (let category of categories){
    category.addEventListener('click', () => {
        document.querySelector('.category-active').classList.remove('category-active');
        category.classList.add('category-active');
        updateList();
    })
}


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
            compleate: false,
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
        let todoCreate = createTodo(todo);

        let categoryActive = document.querySelector('.category-active');
        console.log('categoryActive.dataset.category = ',categoryActive.dataset.category);
        switch(categoryActive.dataset.category){
            case 'all':
                todoListPosition.append(todoCreate);
                break;
            case 'important':
                    todoCreate.childNodes.forEach(child => {
                        if(child.className == 'star star-active'){
                            todoListPosition.append(todoCreate);
                        }
                    });
                
                break;
            case 'incomplete':
                if( !( todoCreate.classList.contains('todo--compleate') )){
                    todoListPosition.append(todoCreate);
                }
                break;
            case 'complete':
                if( todoCreate.classList.contains('todo--compleate') ){
                    todoListPosition.append(todoCreate);
                }
                break;
        }
        //todoListPosition.append(createTodo(todo)); 
    }
}

function createTodo(todo) {
    let value = todo.value;
    
    const todoBlock = document.createElement('li');
    todoBlock.className = "todo"
    
    const textTodo = document.createElement('div');
    textTodo.className = "todo-text";
    textTodo.innerHTML= value;

    compleate(todoBlock,todo);

    //todoBlock.append(check);
    todoBlock.append(textTodo);
    important(todoBlock,todo);
    edit(todoBlock,todo);
    deleteTodo(todoBlock,todo);
    
    

    return todoBlock;
}

function deleteTodo(el,todo) {
    const todoButtonTrash = document.createElement('div');
    todoButtonTrash.className = "delete";
    el.append(todoButtonTrash);

    el.querySelector('.delete').addEventListener('click', () => {
        todosList.delete(todo.id);
        updateList();
    })
}

function edit(el,todo){
    const todoButtonGear = document.createElement('div');
    todoButtonGear.className = "edit";
    el.append(todoButtonGear);

    el.querySelector('.edit').addEventListener('click', () => {
        (todosList.get(todo.id)).value = prompt(`${el.textContent}`);
        updateList();
    })
}

function important(el,todo){
    const todoButtonImportant = document.createElement('div');
   
    
    if((todosList.get(todo.id)).important){
        todoButtonImportant.className = 'star star-active';
    }
    else{
        todoButtonImportant.className = "star";
    }
        

    el.append(todoButtonImportant);

    el.querySelector('.star').addEventListener('click', () => {
       if( (todosList.get(todo.id)).important ) {
        (todosList.get(todo.id)).important = false;
       }
       else {
        (todosList.get(todo.id)).important = true;
       }
    
        updateList();
    }) 
}

function compleate(el,todo){
    const check =  document.createElement('div');
    check.className = "check";

    if((todosList.get(todo.id)).compleate){
        el.className = "todo todo--compleate"
    }
    el.append(check);

    el.querySelector('.check').addEventListener('click', () => {
        if( (todosList.get(todo.id)).compleate ) {
            (todosList.get(todo.id)).compleate = false;
        }
        else {
            (todosList.get(todo.id)).compleate = true;
        }
        updateList();
    })

}

