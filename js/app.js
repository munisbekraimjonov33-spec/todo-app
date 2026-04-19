/**
 * Todo App - Asosiy kirish nuqtasi
 * MVC arxitekturasi asosida yaratilgan
 */
class TodoApp {
    constructor() {
        this.init();
    }

    /**
     * Ilovani ishga tushirish
     */
    init() {
        // Model yaratish
        this.model = new TodoModel();
        
        // View yaratish
        this.view = new TodoView();
        
        // Controller yaratish
        this.controller = new TodoController(this.model, this.view);
        
        console.log('Todo App muvaffaqiyatli ishga tushirildi!');
        console.log('Arxitektura: MVC (Model-View-Controller)');
    }

    /**
     * Ilovani to'xtatish
     */
    destroy() {
        this.controller.destroy();
    }
}

// Ilovani DOM yuklangandan keyin ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('todoForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }

    // Escape to cancel editing
    if (e.key === 'Escape') {
        const input = document.getElementById('todoInput');
        if (input && input.value === '' && window.todoApp) {
            window.todoApp.controller.cancelEdit();
        }
    }
});
