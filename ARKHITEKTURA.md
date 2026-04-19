# Todo App - Arxitektura Hujjatlari

## 🏗️ Umumiy Arxitektura

Todo App **MVC (Model-View-Controller)** dizayn patterni asosida qurilgan. Bu pattern kodni uchta asosiy qismga bo'lib, har bir qism o'z vazifasini bajaradi.

---

## 📐 MVC Pattern Diagramma

```
┌─────────────────────────────────────────────────────────────┐
│                        USER (Foydalanuvchi)                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        VIEW (UI Layer)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   HTML DOM   │  │    CSS       │  │   Events     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTROLLER (Logic Layer)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Event Handler│  │  Validation  │  │  Business    │      │
│  │              │  │              │  │    Logic     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     MODEL (Data Layer)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Data Store  │  │  CRUD Ops    │  │  Observer    │      │
│  │ (LocalStorage)│               │  │  Pattern     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagramma

### 1. Vazifa Qo'shish (Add Todo)

```
User Input
    │
    ▼
┌─────────────┐
│   View      │
│ (Form Submit)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller │
│ (Validate)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Model     │
│ (Add Data)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ LocalStorage│
│ (Save)      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Model     │
│ (Notify)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller │
│ (Render)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   View      │
│ (Update UI) │
└──────┬──────┘
       │
       ▼
    User
```

### 2. Vazifani O'chirish (Delete Todo)

```
User Click
    │
    ▼
┌─────────────┐
│   View      │
│ (Delete Btn)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller │
│ (Confirm)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Model     │
│ (Delete)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ LocalStorage│
│ (Update)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Model     │
│ (Notify)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller │
│ (Render)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   View      │
│ (Remove)    │
└──────┬──────┘
       │
       ▼
    User
```

---

## 📊 Class Diagramma (UML)

```
┌─────────────────────────────────────────────────────────────┐
│                      TodoApp (Main)                          │
├─────────────────────────────────────────────────────────────┤
│ - model: TodoModel                                          │
│ - view: TodoView                                            │
│ - controller: TodoController                                │
├─────────────────────────────────────────────────────────────┤
│ + init(): void                                              │
│ + destroy(): void                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ creates
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    TodoModel (Data)                          │
├─────────────────────────────────────────────────────────────┤
│ - todos: Array<Todo>                                        │
│ - filter: string                                            │
│ - listeners: Array<Function>                                │
├─────────────────────────────────────────────────────────────┤
│ + add(text): Todo                                           │
│ + update(id, text): Todo                                    │
│ + toggle(id): Todo                                          │
│ + delete(id): boolean                                       │
│ + clearCompleted(): number                                  │
│ + clearAll(): number                                        │
│ + getFiltered(filter): Array<Todo>                          │
│ + getStats(): Stats                                         │
│ + subscribe(listener): void                                 │
│ + unsubscribe(listener): void                               │
│ + notify(): void                                            │
│ - loadFromStorage(): void                                   │
│ - saveToStorage(): void                                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ observes
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  TodoController (Logic)                      │
├─────────────────────────────────────────────────────────────┤
│ - model: TodoModel                                           │
│ - view: TodoView                                             │
├─────────────────────────────────────────────────────────────┤
│ + constructor(model, view)                                  │
│ + bindEvents(): void                                        │
│ + handleSubmit(e): void                                     │
│ + handleFilter(filter): void                                │
│ + handleClearCompleted(): void                              │
│ + handleClearAll(): void                                    │
│ + handleToggle(id): void                                    │
│ + handleEdit(id): void                                      │
│ + handleDelete(id): void                                    │
│ + addTodo(text): void                                       │
│ + updateTodo(id, text): void                                │
│ + cancelEdit(): void                                        │
│ + onModelChange(model): void                                │
│ + render(): void                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ updates
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    TodoView (UI)                             │
├─────────────────────────────────────────────────────────────┤
│ - elements: Object (DOM references)                         │
│ - editingId: string | null                                   │
├─────────────────────────────────────────────────────────────┤
│ + constructor()                                             │
│ + renderTodos(todos, filter): void                          │
│ + renderStats(stats): void                                  │
│ + renderFilter(activeFilter): void                           │
│ + updateEmptyState(filter): void                            │
│ + showNotification(message, type): void                     │
│ + getInputValue(): string                                   │
│ + setInputValue(value): void                                │
│ + clearInput(): void                                        │
│ + focusInput(): void                                        │
│ + selectInput(): void                                       │
│ + updateAddButton(isEditing): void                           │
│ + setEditingId(id): void                                    │
│ + getEditingId(): string                                    │
│ + on(event, handler): void                                  │
│ - createTodoHTML(todo): string                              │
│ - escapeHtml(text): string                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      TodoApp                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Header                             │  │
│  │  ┌─────────────┐  ┌──────────────────────────────┐   │  │
│  │  │  Logo/Icon   │  │  Title & Subtitle            │   │  │
│  │  └─────────────┘  └──────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Input Section                        │  │
│  │  ┌─────────────────────┐  ┌──────────────────────┐   │  │
│  │  │  Text Input         │  │  Add Button         │   │  │
│  │  └─────────────────────┘  └──────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Stats Section                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  Total   │  │Completed │  │ Pending  │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Filter Section                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │   All    │  │Pending   │  │Completed │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Todo List Section                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  ┌────┐ ┌──────────┐ ┌──────────────────┐    │   │  │
│  │  │  │ ☑  │ │  Text    │ │  Edit  │ Delete  │    │   │  │
│  │  │  └────┘ └──────────┘ └──────────────────┘    │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Actions Section                         │  │
│  │  ┌──────────────────────┐  ┌──────────────────────┐  │  │
│  │  │  Clear Completed     │  │  Clear All           │  │  │
│  │  └──────────────────────┘  └──────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management

### State Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      State Store                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  todos: Array<Todo>                                   │  │
│  │  filter: 'all' | 'pending' | 'completed'             │  │
│  │  editingId: string | null                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Observer Pattern
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Changes                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. User Action (click, type, submit)                 │  │
│  │  2. Controller processes action                       │  │
│  │  3. Model updates state                               │  │
│  │  4. Model notifies observers                          │  │
│  │  5. Controller re-renders                             │  │
│  │  6. View updates DOM                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Design Patterns

### 1. MVC (Model-View-Controller)

**Maqsad:** Separation of Concerns (Vazifalarni ajratish)

**Foydasi:**
- Kodni o'qish oson
- Testlash oson
- Qayta ishlatish mumkin
- Scalable

### 2. Observer Pattern

**Maqsad:** State o'zgarganda observerlarni bildirish

**Implementatsiya:**
```javascript
// Model
subscribe(listener) {
    this.listeners.push(listener);
}

notify() {
    this.listeners.forEach(listener => listener(this));
}

// Controller
model.subscribe(this.onModelChange.bind(this));
```

### 3. Event Delegation

**Maqsad:** Memory usage kamaytirish

**Implementatsiya:**
```javascript
// Bad: Har bir item uchun listener
items.forEach(item => {
    item.addEventListener('click', handler);
});

// Good: Parent elementda delegation
list.addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
        handler();
    }
});
```

### 4. Singleton Pattern

**Maqsad:** Bitta instance保证

**Implementatsiya:**
```javascript
window.todoApp = new TodoApp();
```

---

## 📦 Module Dependencies

```
index.html
    │
    ├── styles.css (independent)
    │
    └── js/
        │
        ├── model.js (independent)
        │
        ├── view.js (independent)
        │
        ├── controller.js
        │   ├── depends on → model.js
        │   └── depends on → view.js
        │
        └── app.js
            ├── depends on → model.js
            ├── depends on → view.js
            └── depends on → controller.js
```

---

## 🔒 Security Architecture

### XSS Protection

```
User Input
    │
    ▼
┌─────────────┐
│ Validation  │
│ (Empty check)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ HTML Escape │
│ (escapeHtml) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Safe Render │
│ (textContent)│
└──────┬──────┘
       │
       ▼
    DOM
```

### Data Validation

```
┌─────────────────────────────────────────────────────────────┐
│                  Validation Layers                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Client-side Validation (View)                    │  │
│  │     - Empty check                                     │  │
│  │     - Type check                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  2. Business Logic Validation (Controller)           │  │
│  │     - Business rules                                  │  │
│  │     - State validation                                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  3. Data Validation (Model)                          │  │
│  │     - Data integrity                                  │  │
│  │     - Storage validation                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Performance Architecture

### Rendering Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                  Render Cycle                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. State Change                                       │  │
│  │  2. Model.notify()                                    │  │
│  │  3. Controller.onModelChange()                         │  │
│  │  4. Controller.render()                               │  │
│  │  5. View.renderTodos()                                │  │
│  │  6. DOM Update (innerHTML)                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Optimization:                                             │
│  - Event delegation (less listeners)                       │
│  - Batch updates (future: Virtual DOM)                    │
│  - Lazy rendering (future: Virtual scrolling)             │
└─────────────────────────────────────────────────────────────┘
```

### Storage Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                  Storage Layer                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  LocalStorage (Persistent)                            │  │
│  │  - Key: 'todos' (JSON string)                         │  │
│  │  - Key: 'filter' (string)                             │  │
│  │  - Size limit: ~5MB                                    │  │
│  │  - Sync: Synchronous                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Future Enhancement:                                       │
│  - IndexedDB (larger storage, async)                      │  │
│  - Cloud sync (Firebase, Supabase)                        │  │
│  - Offline-first (Service Worker)                         │  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Architecture

### Breakpoints

```
┌─────────────────────────────────────────────────────────────┐
│                  Responsive Strategy                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Mobile (< 480px)                                      │  │
│  │  - Single column layout                                │  │
│  │  - Touch-friendly buttons                              │  │
│  │  - Reduced animations                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Tablet (480px - 768px)                              │  │
│  │  - Two column layout (stats)                          │  │
│  │  - Medium animations                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Desktop (> 768px)                                   │  │
│  │  - Multi-column layout                                │  │
│  │  - Full animations                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Lifecycle Diagramma

```
┌─────────────────────────────────────────────────────────────┐
│                  Application Lifecycle                       │
│                                                             │
│  1. Initialization                                          │
│     ├── DOMContentLoaded                                    │
│     ├── TodoApp.init()                                      │
│     ├── Model creation                                      │
│     ├── View creation                                       │
│     ├── Controller creation                                 │
│     └── Initial render                                      │
│                                                             │
│  2. Runtime                                                 │
│     ├── User interactions                                   │
│     ├── Event handling                                      │
│     ├── State updates                                       │
│     ├── Re-rendering                                         │
│     └── Storage operations                                  │
│                                                             │
│ 3. Cleanup (Page unload)                                   │
│     ├── Controller.destroy()                               │
│     ├── View.destroy()                                      │
│     └── Model.destroy()                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Architecture Principles

### 1. Separation of Concerns
- Har bir class o'z vazifasini bajaradi
- Model: ma'lumotlar
- View: UI
- Controller: logic

### 2. Single Responsibility
- Har bir class bitta vazifa bajaradi
- Har bir method bitta narsa qiladi

### 3. Open/Closed Principle
- Classlar ochiq kengayish uchun, yopiq o'zgartirish uchun
- Yangi funksiyalarni qo'shish oson

### 4. Dependency Injection
- Controller Model va View ga bog'langan
- Testlash oson

### 5. Observer Pattern
- Model o'zgarganda observerlarni bildiradi
- Loose coupling

---

## 📊 Metrics va Monitoring

### Performance Metrics

```
┌─────────────────────────────────────────────────────────────┐
│                  Performance Metrics                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Load Time                                            │  │
│  │  - First Contentful Paint: < 1.5s                     │  │
│  │  - Time to Interactive: < 3s                          │  │
│  │  - Total Load Time: < 5s                              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Bundle Size                                          │  │
│  │  - JavaScript: < 50KB (minified)                     │  │
│  │  - CSS: < 30KB (minified)                            │  │
│  │  - HTML: < 10KB                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Runtime Performance                                  │  │
│  │  - FPS: > 60                                         │  │
│  │  - Memory: < 50MB                                    │  │
│  │  - CPU: < 10%                                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔮 Future Architecture Enhancements

### Phase 1: Virtual DOM
- React-like virtual DOM
- Efficient updates
- Better performance

### Phase 2: State Management
- Redux-like state management
- Time-travel debugging
- Predictable state updates

### Phase 3: Component Library
- Reusable components
- Props-based configuration
- Composition pattern

### Phase 4: Testing Framework
- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)

---

**Arxitektura versiyasi:** 2.0  
**Oxgi yangilanish:** 2024-yil
