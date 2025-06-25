document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task-holder input");
    const addButton = document.querySelector(".task-holder button");
    const tasksList = document.querySelector('.tasks-list');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasksList.innerHTML = '';
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task' + (task.completed ? ' completed' : '');
            taskDiv.innerHTML = `
                <div>
                    <input type="checkbox" name="tasks[]" ${task.completed ? 'checked' : ''}>
                    <span>${task.text}</span>
                </div>
                <button><img src="icons/2867957_circle_x_icon.png" alt="remove task"></button>
            `;
            tasksList.appendChild(taskDiv);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        tasksList.querySelectorAll('.task').forEach(taskDiv => {
            const text = taskDiv.querySelector('span').textContent;
            const completed = taskDiv.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(input) {
        const value = input.value.trim();
        if (!value) {
            alert("Error! Can't add empty task.");
            return;
        }
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <div>
                <input type="checkbox" name="tasks[]">
                <span>${value}</span>
            </div>
            <button><img src="icons/2867957_circle_x_icon.png" alt="remove task"></button>
        `;
        tasksList.appendChild(taskDiv);
        input.value = '';
        saveTasks();
    }

    function removeTask(btn) {
        btn.closest('.task').remove();
        saveTasks();
    }

    function taskCompleted(checkbox) {
        const taskDiv = checkbox.closest('.task');
        taskDiv.classList.toggle('completed');
        saveTasks();
    }

    taskInput.addEventListener("keydown", e => {
        if (e.key === "Enter") addTask(taskInput);
    });
    addButton.addEventListener("click", () => addTask(taskInput));

    tasksList.addEventListener('click', function (e) {
        if (e.target.closest('button') && e.target.closest('button').querySelector('img')) {
            removeTask(e.target.closest('button'));
        }
    });

    tasksList.addEventListener('change', function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            taskCompleted(e.target);
        }
    });

    // Initial load
    loadTasks();
});