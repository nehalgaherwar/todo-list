document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    loadTodos();

    // Add todo on button click
    addBtn.addEventListener('click', addTodo);

    // Add todo on Enter key press
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        li.textContent = todoText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(li);
            saveTodos();
        });

        li.appendChild(deleteBtn);

        // Toggle completed on click
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTodos();
        });

        todoList.appendChild(li);
        todoInput.value = '';
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            todos.push({
                text: item.textContent.replace('Delete', '').trim(),
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;

            if (todo.completed) {
                li.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                todoList.removeChild(li);
                saveTodos();
            });

            li.appendChild(deleteBtn);

            li.addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTodos();
            });

            todoList.appendChild(li);
        });
    }
});
