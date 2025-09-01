
const TodoApp = require('./script.js');

describe('TodoApp - Testes de Requisitos', () => {
  let app;

  beforeEach(() => {
  
    jest.clearAllMocks();
    global.localStorage.getItem.mockReturnValue(null);
    document.getElementById('taskList').innerHTML = '';
    document.getElementById('taskInput').value = '';
    

    app = new TodoApp();
  });

  
  describe('RF001 - Adicionar nova tarefa', () => {
    test('Deve adicionar tarefa com texto válido', () => {
      const taskText = 'Nova tarefa de teste';
      document.getElementById('taskInput').value = taskText;
      
      app.addTask();
      
      expect(app.tasks).toHaveLength(1);
      expect(app.tasks[0].text).toBe(taskText);
      expect(app.tasks[0].completed).toBe(false);
      expect(app.tasks[0].id).toBeDefined();
      expect(app.tasks[0].createdAt).toBeDefined();
    });

    test('Não deve adicionar tarefa com texto vazio', () => {
      document.getElementById('taskInput').value = '';
      
      app.addTask();
      
      expect(app.tasks).toHaveLength(0);
    });

    test('Não deve adicionar tarefa com apenas espaços', () => {
      document.getElementById('taskInput').value = '   ';
      
      app.addTask();
      
      expect(app.tasks).toHaveLength(0);
    });

    test('Deve limpar campo de entrada após adicionar tarefa', () => {
      const input = document.getElementById('taskInput');
      input.value = 'Teste';
      
      app.addTask();
      
      expect(input.value).toBe('');
    });

    test('Deve salvar no localStorage após adicionar', () => {
      document.getElementById('taskInput').value = 'Teste';
      
      app.addTask();
      
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'todoTasks',
        expect.any(String)
      );
    });
  });

  
  describe('RF002 - Marcar tarefa como concluída', () => {
    beforeEach(() => {
      // Adicionar tarefa para teste
      app.tasks = [{
        id: 1,
        text: 'Tarefa teste',
        completed: false,
        createdAt: new Date().toISOString()
      }];
    });

    test('Deve marcar tarefa como concluída', () => {
      app.toggleTask(1);
      
      expect(app.tasks[0].completed).toBe(true);
    });

    test('Deve desmarcar tarefa concluída', () => {
      app.tasks[0].completed = true;
      
      app.toggleTask(1);
      
      expect(app.tasks[0].completed).toBe(false);
    });

    test('Deve salvar no localStorage após alternar status', () => {
      app.toggleTask(1);
      
      expect(global.localStorage.setItem).toHaveBeenCalled();
    });

    test('Não deve alterar tarefa inexistente', () => {
      const originalTask = { ...app.tasks[0] };
      
      app.toggleTask(999);
      
      expect(app.tasks[0]).toEqual(originalTask);
    });
  });

  
  describe('RF003 - Editar tarefa existente', () => {
    beforeEach(() => {
      app.tasks = [{
        id: 1,
        text: 'Tarefa original',
        completed: false,
        createdAt: new Date().toISOString()
      }];
    });

    test('Deve entrar em modo de edição', () => {
      app.editTask(1);
      
      expect(app.editingTaskId).toBe(1);
    });

    test('Deve salvar texto editado', () => {
      const newText = 'Texto editado';
      
      app.saveTask(1, newText);
      
      expect(app.tasks[0].text).toBe(newText);
      expect(app.editingTaskId).toBeNull();
    });

    test('Não deve salvar texto vazio', () => {
      const originalText = app.tasks[0].text;
      
      app.saveTask(1, '');
      
      expect(app.tasks[0].text).toBe(originalText);
    });

    test('Deve cancelar edição', () => {
      app.editingTaskId = 1;
      
      app.cancelEdit();
      
      expect(app.editingTaskId).toBeNull();
    });
  });

  
  describe('RF004 - Excluir tarefa', () => {
    beforeEach(() => {
      app.tasks = [
        { id: 1, text: 'Tarefa 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Tarefa 2', completed: true, createdAt: new Date().toISOString() }
      ];
      global.confirm = jest.fn(() => true);
    });

    test('Deve excluir tarefa quando confirmado', () => {
      app.deleteTask(1);
      
      expect(app.tasks).toHaveLength(1);
      expect(app.tasks[0].id).toBe(2);
    });

    test('Não deve excluir tarefa quando cancelado', () => {
      global.confirm = jest.fn(() => false);
      
      app.deleteTask(1);
      
      expect(app.tasks).toHaveLength(2);
    });

    test('Deve salvar no localStorage após excluir', () => {
      app.deleteTask(1);
      
      expect(global.localStorage.setItem).toHaveBeenCalled();
    });
  });

  
  describe('RF005 - Filtrar tarefas por status', () => {
    beforeEach(() => {
      app.tasks = [
        { id: 1, text: 'Pendente 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Concluída 1', completed: true, createdAt: new Date().toISOString() },
        { id: 3, text: 'Pendente 2', completed: false, createdAt: new Date().toISOString() }
      ];
    });

    test('Deve filtrar todas as tarefas', () => {
      app.setFilter('all');
      const filtered = app.getFilteredTasks();
      
      expect(filtered).toHaveLength(3);
      expect(app.currentFilter).toBe('all');
    });

    test('Deve filtrar apenas tarefas pendentes', () => {
      app.setFilter('pending');
      const filtered = app.getFilteredTasks();
      
      expect(filtered).toHaveLength(2);
      expect(filtered.every(task => !task.completed)).toBe(true);
    });

    test('Deve filtrar apenas tarefas concluídas', () => {
      app.setFilter('completed');
      const filtered = app.getFilteredTasks();
      
      expect(filtered).toHaveLength(1);
      expect(filtered.every(task => task.completed)).toBe(true);
    });
  });

 
  describe('RF006 - Limpar tarefas concluídas', () => {
    beforeEach(() => {
      app.tasks = [
        { id: 1, text: 'Pendente', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Concluída 1', completed: true, createdAt: new Date().toISOString() },
        { id: 3, text: 'Concluída 2', completed: true, createdAt: new Date().toISOString() }
      ];
    });

    test('Deve remover apenas tarefas concluídas', () => {
      app.clearCompletedTasks();
      
      expect(app.tasks).toHaveLength(1);
      expect(app.tasks[0].completed).toBe(false);
    });

    test('Não deve fazer nada se não há tarefas concluídas', () => {
      app.tasks = [{ id: 1, text: 'Pendente', completed: false, createdAt: new Date().toISOString() }];
      
      app.clearCompletedTasks();
      
      expect(app.tasks).toHaveLength(1);
    });
  });

  
  describe('RF007 - Exibir estatísticas', () => {
    test('Deve calcular estatísticas corretamente', () => {
      app.tasks = [
        { id: 1, text: 'Pendente 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Concluída 1', completed: true, createdAt: new Date().toISOString() },
        { id: 3, text: 'Concluída 2', completed: true, createdAt: new Date().toISOString() }
      ];
      
      app.updateStats();
      
      expect(document.getElementById('totalTasks').textContent).toBe('3 tarefas');
      expect(document.getElementById('completedTasks').textContent).toBe('2 concluídas');
    });

    test('Deve mostrar zero quando não há tarefas', () => {
      app.tasks = [];
      
      app.updateStats();
      
      expect(document.getElementById('totalTasks').textContent).toBe('0 tarefas');
      expect(document.getElementById('completedTasks').textContent).toBe('0 concluídas');
    });
  });

  
  describe('RF008 - Persistência de dados', () => {
    test('Deve carregar tarefas do localStorage', () => {
      const savedTasks = [
        { id: 1, text: 'Tarefa salva', completed: false, createdAt: new Date().toISOString() }
      ];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(savedTasks));
      
      const newApp = new TodoApp();
      
      expect(newApp.tasks).toEqual(savedTasks);
    });

    test('Deve salvar tarefas no localStorage', () => {
      app.tasks = [{ id: 1, text: 'Teste', completed: false, createdAt: new Date().toISOString() }];
      
      app.saveToStorage();
      
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'todoTasks',
        JSON.stringify(app.tasks)
      );
    });

    test('Deve inicializar com array vazio se localStorage vazio', () => {
      global.localStorage.getItem.mockReturnValue(null);
      
      const newApp = new TodoApp();
      
      expect(newApp.tasks).toEqual([]);
    });
  });

  
  describe('Requisitos Não Funcionais', () => {
    // RNF002 - Desempenho
    test('RNF002 - Deve responder rapidamente (< 100ms)', () => {
      const start = performance.now();
      
      document.getElementById('taskInput').value = 'Teste performance';
      app.addTask();
      
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });

    // RNF002 - Suporte a muitas tarefas
    test('RNF002 - Deve suportar até 1000 tarefas', () => {
      // Criar 1000 tarefas
      for (let i = 0; i < 1000; i++) {
        app.tasks.push({
          id: i,
          text: `Tarefa ${i}`,
          completed: i % 2 === 0,
          createdAt: new Date().toISOString()
        });
      }
      
      const start = performance.now();
      app.getFilteredTasks();
      const end = performance.now();
      
      expect(end - start).toBeLessThan(100);
      expect(app.tasks).toHaveLength(1000);
    });

    
    test('RNF007 - Deve funcionar offline (apenas localStorage)', () => {
      
      const originalFetch = global.fetch;
      global.fetch = jest.fn();
      
      document.getElementById('taskInput').value = 'Teste offline';
      app.addTask();
      
      expect(global.fetch).not.toHaveBeenCalled();
      expect(global.localStorage.setItem).toHaveBeenCalled();
      
      global.fetch = originalFetch;
    });
  });

  
  describe('Segurança e Validação', () => {
    test('Deve escapar HTML malicioso', () => {
      const maliciousText = '<script>alert("XSS")</script>';
      const escaped = app.escapeHtml(maliciousText);
      
      expect(escaped).not.toContain('<script>');
      expect(escaped).toContain('&lt;script&gt;');
    });

    test('Deve validar entrada antes de salvar', () => {
      document.getElementById('taskInput').value = '<img src=x onerror=alert(1)>';
      
      app.addTask();
      
      expect(app.tasks[0].text).toBe('<img src=x onerror=alert(1)>');
      
    });
  });

  
  describe('Testes de Integração', () => {
    test('Fluxo completo: adicionar, editar, marcar e excluir', () => {
      
      document.getElementById('taskInput').value = 'Tarefa integração';
      app.addTask();
      expect(app.tasks).toHaveLength(1);
      
      
      const taskId = app.tasks[0].id;
      app.saveTask(taskId, 'Tarefa editada');
      expect(app.tasks[0].text).toBe('Tarefa editada');
      
      
      app.toggleTask(taskId);
      expect(app.tasks[0].completed).toBe(true);
      
      
      app.deleteTask(taskId);
      expect(app.tasks).toHaveLength(0);
    });

    test('Filtros funcionam após operações CRUD', () => {
      
      app.tasks = [
        { id: 1, text: 'Pendente', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Concluída', completed: true, createdAt: new Date().toISOString() }
      ];
      
      
      app.setFilter('pending');
      expect(app.getFilteredTasks()).toHaveLength(1);
      
      app.setFilter('completed');
      expect(app.getFilteredTasks()).toHaveLength(1);
      
      app.setFilter('all');
      expect(app.getFilteredTasks()).toHaveLength(2);
    });
  });
});