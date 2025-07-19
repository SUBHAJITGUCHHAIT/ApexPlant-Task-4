document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage (if any)
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = ''; // Clear current list
        if (todos.length === 0) {
            const noTaskMessage = document.createElement('p');
            noTaskMessage.textContent = "No tasks yet! Add one above.";
            noTaskMessage.style.textAlign = 'center';
            noTaskMessage.style.color = '#777';
            todoList.appendChild(noTaskMessage);
            return;
        }

        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => toggleTodo(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌'; // Unicode cross for delete
            deleteBtn.setAttribute('aria-label', `Delete task: ${todo.text}`);
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent toggling when deleting
                deleteTodo(index);
            });

            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
        saveTodos();
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push({ text: todoText, completed: false });
            todoInput.value = '';
            renderTodos();
        } else {
            alert('Please enter a task!');
        }
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    function deleteTodo(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            todos.splice(index, 1);
            renderTodos();
        }
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    renderTodos(); // Initial render when page loads
});