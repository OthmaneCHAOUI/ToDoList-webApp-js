document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task-holder input");
    const addButton = document.querySelector(".task-holder button");

    function addTask(input) {
        const value = input.value.trim();
        if (!value) {
            alert("Error! Can't add empty task.");
            return;
        }

        const tasksList = document.querySelector('.tasks-list');
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
    }

    function removeTask(btn) {
        btn.closest('.task').remove();
    }

    function taskCompleted(checkbox) {
        const taskDiv = checkbox.closest('.task');
        taskDiv.classList.toggle('completed');
    }

    taskInput.addEventListener("keydown", e => {
        if (e.key === "Enter") addTask(taskInput);
    });
    addButton.addEventListener("click", () => addTask(taskInput));

    document.querySelector('.tasks-list').addEventListener('click', function (e) {
        if (e.target.closest('button') && e.target.closest('button').querySelector('img')) {
            removeTask(e.target.closest('button'));
        }
    });

    document.querySelector('.tasks-list').addEventListener('change', function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            taskCompleted(e.target);
        }
    });
});