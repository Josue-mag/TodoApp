

## 🎯 Sobre o Projeto

O **TodoApp** é uma aplicação web simples e eficiente para gerenciamento de tarefas pessoais. Desenvolvido com foco na usabilidade, privacidade e funcionamento offline, oferece uma solução completa para organização de atividades diárias.

### ✨ Características Principais

- 🎨 **Interface Limpa**: Design minimalista e intuitivo
- 🔒 **Privacidade Total**: Dados armazenados localmente
- 📱 **Responsivo**: Funciona em desktop e mobile
- ⚡ **Performance**: Resposta instantânea (< 50ms)
- 🌐 **Offline**: Funciona sem conexão com internet
- 🆓 **Gratuito**: Código aberto e sem custos

## 🎯 Problema e Necessidade

### Problema Identificado
O problema central que o TodoApp resolve é a **ausência de uma ferramenta simples, acessível e eficiente para gerenciamento de tarefas pessoais**.

### Contexto
No cotidiano moderno, pessoas enfrentam dificuldades para:
- Organizar e acompanhar suas tarefas diárias
- Manter controle sobre atividades pendentes e concluídas
- Ter uma visão clara do progresso de suas atividades
- Acessar suas listas de tarefas de forma rápida e prática
- Manter seus dados privados e seguros

### Limitações das Soluções Existentes
- **Aplicações comerciais**: Complexas demais, com recursos desnecessários
- **Soluções gratuitas**: Limitações funcionais ou dependência de internet
- **Ferramentas físicas**: Falta de portabilidade e facilidade de edição
- **Apps móveis**: Interface inadequada para uso em computadores

### Público-Alvo
- **Estudantes**: Organização de atividades acadêmicas e prazos
- **Profissionais**: Gestão de tarefas diárias e projetos
- **Pessoas em geral**: Organização pessoal e aumento de produtividade
- **Usuários que valorizam privacidade**: Controle total sobre dados pessoais

## 🚀 Funcionalidades

### Funcionalidades Principais

| Funcionalidade | Descrição | Status |
|---|---|---|
| ➕ **Adicionar Tarefa** | Criar novas tarefas rapidamente | ✅ |
| ✏️ **Editar Tarefa** | Modificar texto de tarefas existentes | ✅ |
| ✅ **Marcar Concluída** | Alternar status entre pendente/concluída | ✅ |
| 🗑️ **Excluir Tarefa** | Remover tarefas desnecessárias | ✅ |
| 🔍 **Filtrar Tarefas** | Visualizar todas, pendentes ou concluídas | ✅ |
| 🧹 **Limpar Concluídas** | Remover todas as tarefas concluídas | ✅ |
| 📊 **Estatísticas** | Contadores de progresso e produtividade | ✅ |
| 💾 **Persistência** | Salvar dados localmente no navegador | ✅ |


## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estruturação semântica do conteúdo
- **CSS3**: Estilização responsiva e moderna
- **JavaScript ES6+**: Lógica de aplicação e interatividade

### Armazenamento
- **localStorage**: Persistência local de dados
- **JSON**: Formato de serialização de dados

### Testes
- **Jest**: Framework de testes automatizados
- **JSDOM**: Simulação de ambiente DOM para testes

### Ferramentas de Desenvolvimento
- **npm**: Gerenciador de pacotes
- **Git**: Controle de versão

## 🏗️ Arquitetura

O sistema utiliza arquitetura **MVC (Model-View-Controller)** com separação clara de responsabilidades:

```
📁 TodoApp/
├── 📄 index.html      # View - Interface do usuário
├── 🎨 style.css       # View - Estilização
├── ⚙️ script.js       # Controller + Model - Lógica e dados
├── 🧪 todoapp.test.js # Testes automatizados
├── 📦 package.json    # Dependências e scripts
└── 📚 README.MD          # Documentação
```


## 📥 Instalação e Uso

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Node.js (para executar testes)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Josue-mag/TodoApp.git
cd todoapp
```

2. **Instale as dependências (para testes)**
```bash
npm install
```

3. **Abra o arquivo index.html**
```bash
# Opção 1: Abrir diretamente no navegador
open index.html

# Opção 2: Usar servidor local
npx serve .
```

### Como Usar

1. **Adicionar Tarefa**: Digite no campo de entrada e pressione Enter
2. **Marcar como Concluída**: Clique no checkbox ao lado da tarefa
3. **Editar Tarefa**: Clique duas vezes no texto da tarefa
4. **Excluir Tarefa**: Clique no botão "×" ao lado da tarefa
5. **Filtrar**: Use os botões "Todas", "Pendentes", "Concluídas"
6. **Limpar Concluídas**: Clique em "Limpar Concluídas"

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### Cobertura de Testes

- **33 casos de teste** implementados
- **95%+ de cobertura** de código
- **100% dos requisitos funcionais** testados
- **Tempo de execução**: ~2 segundos

### Tipos de Teste

- ✅ **Testes Unitários**: Cada funcionalidade individual
- ✅ **Testes de Integração**: Fluxos completos de uso
- ✅ **Testes de Performance**: Validação de requisitos não funcionais
- ✅ **Testes de Interface**: Interações do usuário


## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes

- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código existentes
- Atualize a documentação quando necessário

### Reportar Bugs

Para reportar bugs, abra uma issue incluindo:
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Informações do ambiente (navegador, OS)


**Desenvolvido com ❤️ por Josué para simplificar sua organização pessoal**

