/**
 * Controller - Model va View o'rtasidagi bog'lovchi
 * Foydalanuvchi kiritishlarini boshqarish va biznes mantiqni ishga tushirish
 */
class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.bindEvents();
        this.model.subscribe(this.onModelChange.bind(this));
        this.render();
    }

    /**
     * Eventlarni bog'lash
     */
    bindEvents() {
        // Form submit
        this.view.on('submit', this.handleSubmit.bind(this));
        
        // Filter buttons
        this.view.on('filter', this.handleFilter.bind(this));
        
        // Clear completed
        this.view.on('clearCompleted', this.handleClearCompleted.bind(this));
        
        // Clear all
        this.view.on('clearAll', this.handleClearAll.bind(this));
        
        // Toggle todo
        this.view.on('toggle', this.handleToggle.bind(this));
        
        // Edit todo
        this.view.on('edit', this.handleEdit.bind(this));
        
        // Delete todo
        this.view.on('delete', this.handleDelete.bind(this));
        
        // Input change
        this.view.on('input', this.handleInput.bind(this));
    }

    /**
     * Form submit handler
     * @param {Event} e - Event obyekti
     */
    handleSubmit(e) {
        e.preventDefault();
        
        const text = this.view.getInputValue();
        
        if (text === '') {
            this.view.showNotification('Iltimos, vazifa matnini kiriting!', 'warning');
            return;
        }

        const editingId = this.view.getEditingId();
        
        if (editingId) {
            this.updateTodo(editingId, text);
        } else {
            this.addTodo(text);
        }

        this.view.clearInput();
        this.view.setEditingId(null);
        this.view.updateAddButton(false);
    }

    /**
     * Input change handler
     */
    handleInput() {
        const editingId = this.view.getEditingId();
        const inputValue = this.view.getInputValue();
        
        if (editingId && inputValue === '') {
            this.cancelEdit();
        }
    }

    /**
     * Filter handler
     * @param {string} filter - Filter turi
     */
    handleFilter(filter) {
        this.model.setFilter(filter);
        this.render();
    }

    /**
     * Clear completed handler
     */
    handleClearCompleted() {
        const stats = this.model.getStats();
        
        if (stats.completed === 0) {
            this.view.showNotification('Bajarilgan vazifalar yo\'q!', 'info');
            return;
        }

        const confirmed = this.view.confirm(
            `Haqiqatan ham ${stats.completed} ta bajarilgan vazifani o'chirmoqchimisiz?`
        );

        if (confirmed) {
            const deletedCount = this.model.clearCompleted();
            this.view.showNotification(`${deletedCount} ta bajarilgan vazifa tozalandi!`, 'success');
        }
    }

    /**
     * Clear all handler
     */
    handleClearAll() {
        const stats = this.model.getStats();
        
        if (stats.total === 0) {
            this.view.showNotification('O\'chirish uchun vazifalar yo\'q!', 'info');
            return;
        }

        const confirmed = this.view.confirm(
            `Haqiqatan ham barcha ${stats.total} ta vazifani o'chirmoqchimisiz?`
        );

        if (confirmed) {
            const deletedCount = this.model.clearAll();
            this.view.showNotification(`${deletedCount} ta vazifa o\'chirildi!`, 'success');
        }
    }

    /**
     * Toggle todo handler
     * @param {string} id - Vazifa ID
     */
    handleToggle(id) {
        const todo = this.model.toggle(id);
        
        if (todo && todo.completed) {
            this.view.showNotification('Vazifa bajarilgan deb belgilandi!', 'success');
        }
    }

    /**
     * Edit todo handler
     * @param {string} id - Vazifa ID
     */
    handleEdit(id) {
        const todo = this.model.findById(id);
        
        if (todo) {
            this.view.setInputValue(todo.text);
            this.view.focusInput();
            this.view.selectInput();
            this.view.setEditingId(id);
            this.view.updateAddButton(true);
        }
    }

    /**
     * Delete todo handler
     * @param {string} id - Vazifa ID
     */
    handleDelete(id) {
        const confirmed = this.view.confirm('Bu vazifani o\'chirmoqchimisiz?');
        
        if (confirmed) {
            const deleted = this.model.delete(id);
            
            if (deleted) {
                this.view.showNotification('Vazifa o\'chirildi!', 'success');
                
                // Agar tahrir qilinayotgan vazifa o'chirilsa
                if (this.view.getEditingId() === id) {
                    this.cancelEdit();
                }
            }
        }
    }

    /**
     * Yangi vazifa qo'shish
     * @param {string} text - Vazifa matni
     */
    addTodo(text) {
        this.model.add(text);
        this.view.showNotification('Vazifa muvaffaqiyatli qo\'shildi!', 'success');
    }

    /**
     * Vazifani o'zgartirish
     * @param {string} id - Vazifa ID
     * @param {string} newText - Yangi matn
     */
    updateTodo(id, newText) {
        this.model.update(id, newText);
        this.view.showNotification('Vazifa muvaffaqiyatli tahrirlandi!', 'success');
    }

    /**
     * Tahrirni bekor qilish
     */
    cancelEdit() {
        this.view.clearInput();
        this.view.setEditingId(null);
        this.view.updateAddButton(false);
    }

    /**
     * Model o'zgarganda chaqiriladi
     * @param {TodoModel} model - Model obyekti
     */
    onModelChange(model) {
        this.render();
    }

    /**
     * Render qilish
     */
    render() {
        const filter = this.model.getFilter();
        const todos = this.model.getFiltered(filter);
        const stats = this.model.getStats();
        
        this.view.renderTodos(todos, filter);
        this.view.renderStats(stats);
        this.view.renderFilter(filter);
    }

    /**
     * Controllerni tozalish
     */
    destroy() {
        this.model.unsubscribe(this.onModelChange.bind(this));
        this.view.destroy();
        this.model.destroy();
    }
}
