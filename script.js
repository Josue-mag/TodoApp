class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }
    
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.clearCompleted = document.getElementById('clearCompleted');
    }
    
    bindEvents() {
        
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTasks());
    }
    
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showInputError();
            return;
        }
        
        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.taskInput.value = '';
        this.saveToStorage();
        this.render();
        
        
        this.taskInput.style.borderColor = '#28a745';
        setTimeout(() => {
            this.taskInput.style.borderColor = '#e1e8ed';
        }, 1000);
    }
    
    showInputError() {
        this.taskInput.style.borderColor = '#dc3545';
        this.taskInput.placeholder = 'Por favor, digite uma tarefa!';
        
        setTimeout(() => {
            this.taskInput.style.borderColor = '#e1e8ed';
            this.taskInput.placeholder = 'Adicione uma nova tarefa...';
        }, 2000);
        
        this.taskInput.focus();
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }
    
    deleteTask(id) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        }
    }
    
    editTask(id) {
        this.editingTaskId = id;
        this.render();
    }
    
    saveTask(id, newText) {
        const text = newText.trim();
        if (!text) {
            this.cancelEdit();
            return;
        }
        
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = text;
            this.editingTaskId = null;
            this.saveToStorage();
            this.render();
        }
    }
    
    cancelEdit() {
        this.editingTaskId = null;
        this.render();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }
    
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }
    
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        
        if (completedCount === 0) {
            return;
        }
        
        if (confirm(`Excluir ${completedCount} tarefa(s) concluída(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveToStorage();
            this.render();
        }
    }
    
    render() {
        const filteredTasks = this.getFilteredTasks();
        
        
        this.taskList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            this.renderEmptyState();
        } else {
            filteredTasks.forEach(task => {
                this.renderTask(task);
            });
        }
        
        this.updateStats();
        this.updateClearButton();
    }
    
    renderEmptyState() {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        
        let message, icon;
        switch (this.currentFilter) {
            case 'pending':
                icon = 'fas fa-check-circle';
                message = 'Nenhuma tarefa pendente!';
                break;
            case 'completed':
                icon = 'fas fa-tasks';
                message = 'Nenhuma tarefa concluída!';
                break;
            default:
                icon = 'fas fa-clipboard-list';
                message = 'Sua lista está vazia!';
        }
        
        emptyDiv.innerHTML = `
            <i class="${icon}"></i>
            <p>${message}</p>
            <small>Adicione uma nova tarefa para começar</small>
        `;
        
        this.taskList.appendChild(emptyDiv);
    }
    
    renderTask(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        if (this.editingTaskId === task.id) {
            li.innerHTML = this.getEditTaskHTML(task);
            
            
            const editInput = li.querySelector('.edit-input');
            const saveBtn = li.querySelector('.save-btn');
            const cancelBtn = li.querySelector('.cancel-btn');
            
            editInput.focus();
            editInput.select();
            
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveTask(task.id, editInput.value);
                } else if (e.key === 'Escape') {
                    this.cancelEdit();
                }
            });
            
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.saveTask(task.id, editInput.value);
            });

            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                this.cancelEdit();
            });
        } else {
            li.innerHTML = this.getTaskHTML(task);
            
            
            const checkbox = li.querySelector('.task-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            checkbox.addEventListener('click', () => this.toggleTask(task.id));
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.editTask(task.id);
            });
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        }
        
        this.taskList.appendChild(li);
    }
    
    getTaskHTML(task) {
        return `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                ${task.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="edit-btn" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
    
    getEditTaskHTML(task) {
        const escapedText = task.text.replace(/"/g, '&quot;');
        return `
            <input type="text" class="edit-input" value="${escapedText}" maxlength="100">
            <div class="task-actions">
                <button class="save-btn" title="Salvar">
                    <i class="fas fa-check"></i>
                </button>
                <button class="cancel-btn" title="Cancelar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        
        this.totalTasks.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`;
        this.completedTasks.textContent = `${completed} ${completed === 1 ? 'concluída' : 'concluídas'}`;
    }
    
    updateClearButton() {
        const hasCompleted = this.tasks.some(task => task.completed);
        this.clearCompleted.disabled = !hasCompleted;
    }
    
    saveToStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = TodoApp;
}

if (typeof window !== 'undefined') {
    window.TodoApp = TodoApp;
}


if (!localStorage.getItem('todoTasks')) {
    const exampleTasks = [
        {
            id: Date.now() - 3,
            text: 'Bem-vindo à sua lista de tarefas! 🎉',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() - 2,
            text: 'Clique no círculo para marcar como concluída',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() - 1,
            text: 'Use os botões para editar ou excluir tarefas',
            completed: true,
            createdAt: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('todoTasks', JSON.stringify(exampleTasks));
}