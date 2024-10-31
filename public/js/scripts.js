// URL base da API
const apiUrl = 'http://localhost:3000/tasks';

// Função para carregar as tarefas da API e exibir na tela
async function loadTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Limpa a lista

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            // Adiciona destaque se o custo for maior ou igual a 1000
            if (task.cost >= 1000) {
                taskItem.classList.add('highlight');
            }

            taskItem.innerHTML = `
                <span>${task.name} - R$${task.cost}</span>
                <div>
                    <button onclick="editTask(${task.id})">Editar</button>
                    <button onclick="deleteTask(${task.id})">Excluir</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

// Função para adicionar uma nova tarefa
async function addTask() {
    const taskName = prompt('Digite o nome da tarefa:');
    const taskCost = prompt('Digite o custo da tarefa:');

    if (taskName && taskCost) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: taskName, cost: parseFloat(taskCost) })
            });

            if (response.ok) {
                loadTasks(); // Recarrega a lista de tarefas
            }
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    }
}

// Função para editar uma tarefa
async function editTask(id) {
    const taskName = prompt('Digite o novo nome da tarefa:');
    const taskCost = prompt('Digite o novo custo da tarefa:');

    if (taskName && taskCost) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: taskName, cost: parseFloat(taskCost) })
            });

            if (response.ok) {
                loadTasks(); // Recarrega a lista de tarefas
            }
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    }
}

// Função para excluir uma tarefa
async function deleteTask(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTasks(); // Recarrega a lista de tarefas
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    }
}

// Carrega as tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

async function fetchTasks() {
    try {
        const response = await fetch('/api/tarefas');
        if (!response.ok) throw new Error('Erro ao buscar as tarefas');
        
        const data = await response.json();
        renderTasks(data.tarefas);
    } catch (error) {
        console.error(error);
        document.getElementById('task-list').innerHTML = 'Erro ao carregar tarefas';
    }
}

function renderTasks(tarefas) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar

    tarefas.forEach(tarefa => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        if (tarefa.custo >= 1000) {
            taskItem.style.backgroundColor = 'yellow'; // Destaque para custo ≥ 1000
        }
        taskItem.innerHTML = `
            <p>Nome: ${tarefa.nome}</p>
            <p>Custo: R$ ${tarefa.custo}</p>
            <p>Data Limite: ${tarefa.data_limite}</p>
            <button onclick="editTask(${tarefa.id})">Editar</button>
            <button onclick="deleteTask(${tarefa.id})">Excluir</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Função para adicionar a tarefa na inicialização da página
document.addEventListener('DOMContentLoaded', fetchTasks);

