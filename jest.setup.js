const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});


global.confirm = jest.fn(() => true);


global.alert = jest.fn();


document.body.innerHTML = `
  <div class="container">
    <div class="todo-header">
      <h1>📝 Lista de Tarefas</h1>
      <div class="input-container">
        <input type="text" id="taskInput" placeholder="Adicione uma nova tarefa...">
        <button id="addBtn">+</button>
      </div>
    </div>
    
    <div class="filters">
      <button class="filter-btn active" data-filter="all">Todas</button>
      <button class="filter-btn" data-filter="pending">Pendentes</button>
      <button class="filter-btn" data-filter="completed">Concluídas</button>
    </div>
    
    <div class="stats">
      <span>Total: <span id="totalTasks">0</span></span>
      <span>Concluídas: <span id="completedTasks">0</span></span>
      <button id="clearCompleted">Limpar Concluídas</button>
    </div>
    
    <ul id="taskList"></ul>
  </div>
`;


beforeEach(() => {
  jest.clearAllMocks();
  localStorage.getItem.mockReturnValue(null);
  document.getElementById('taskList').innerHTML = '';
  document.getElementById('taskInput').value = '';
});