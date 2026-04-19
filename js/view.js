/**
 * View - UI va DOM manipulyatsiyasi
 * Foydalanuvchi interfeysini boshqarish
 */
class TodoView {
    constructor() {
        this.elements = {
            todoForm: document.getElementById('todoForm'),
            todoInput: document.getElementById('todoInput'),
            addBtn: document.getElementById('addBtn'),
            todoList: document.getElementById('todoList'),
            emptyState: document.getElementById('emptyState'),
            filterButtons: document.querySelectorAll('.filter-btn'),
            clearCompleted: document.getElementById('clearCompleted'),
            clearAll: document.getElementById('clearAll'),
            totalCount: document.getElementById('totalCount'),
            completedCount: document.getElementById('completedCount'),
            pendingCount: document.getElementById('pendingCount')
        };
        
        this.editingId = null;
    }

    /**
     * Vazifalar ro'yxatini render qilish
     * @param {Array} todos - Vazifalar ro'yxati
     * @param {string} filter - Hozirgi filter
     */
    renderTodos(todos, filter) {
        const { todoList, emptyState } = this.elements;
        
        if (todos.length === 0) {
            todoList.style.display = 'none';
            emptyState.style.display = 'block';
            this.updateEmptyState(filter);
        } else {
            todoList.style.display = 'block';
            emptyState.style.display = 'none';
            todoList.innerHTML = todos.map(todo => this.createTodoHTML(todo)).join('');
        }
    }

    /**
     * Bo'sh holatni yangilash
     * @param {string} filter - Filter turi
     */
    updateEmptyState(filter) {
        const emptyTitle = this.elements.emptyState.querySelector('h3');
        const emptyText = this.elements.emptyState.querySelector('p');
        
        const messages = {
            completed: {
                title: 'Bajarilgan vazifalar yo\'q',
                text: 'Hali hech qanday vazifa bajarmagansiz.'
            },
            pending: {
                title: 'Barcha vazifalar bajarilgan',
                text: 'Ajoyib! Barcha vazifalaringizni bajargansiz.'
            },
            default: {
                title: 'Hozircha vazifalar yo\'q',
                text: 'Birinchi vazifangizni qo\'shing va boshlang!'
            }
        };
        
        const message = messages[filter] || messages.default;
        emptyTitle.textContent = message.title;
        emptyText.textContent = message.text;
    }

    /**
     * Vazifa HTML yaratish
     * @param {Object} todo - Vazifa obyekti
     * @returns {string} HTML string
     */
    createTodoHTML(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" data-id="${todo.id}">
                    ${todo.completed ? 'i' : ''}
                </div>
                <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" data-id="${todo.id}">
                        <i class="fas fa-edit"></i>
                        Tahrir
                    </button>
                    <button class="todo-btn delete-btn" data-id="${todo.id}">
                        <i class="fas fa-trash"></i>
                        O'chir
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Statistikani yangilash
     * @param {Object} stats - Statistika obyekti
     */
    renderStats(stats) {
        this.elements.totalCount.textContent = stats.total;
        this.elements.completedCount.textContent = stats.completed;
        this.elements.pendingCount.textContent = stats.pending;
        
        // Animatsiya qo'shish
        document.querySelectorAll('.stat-card').forEach(card => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.3s ease-out';
            }, 10);
        });
    }

    /**
     * Filter tugmalarini yangilash
     * @param {string} activeFilter - Aktiv filter
     */
    renderFilter(activeFilter) {
        this.elements.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === activeFilter) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Input qiymatini olish
     * @returns {string} Input qiymati
     */
    getInputValue() {
        return this.elements.todoInput.value.trim();
    }

    /**
     * Input qiymatini o'rnatish
     * @param {string} value - Yangi qiymat
     */
    setInputValue(value) {
        this.elements.todoInput.value = value;
    }

    /**
     * Inputni tozalash
     */
    clearInput() {
        this.elements.todoInput.value = '';
    }

    /**
     * Inputga fokus qilish
     */
    focusInput() {
        this.elements.todoInput.focus();
    }

    /**
     * Inputni tanlash
     */
    selectInput() {
        this.elements.todoInput.select();
    }

    /**
     * Qo'shish tugmasi matnini o'zgartirish
     * @param {boolean} isEditing - Tahrir rejimimi
     */
    updateAddButton(isEditing) {
        if (isEditing) {
            this.elements.addBtn.innerHTML = '<i class="fas fa-save"></i> Saqlash';
        } else {
            this.elements.addBtn.innerHTML = '<i class="fas fa-plus"></i> Qo\'shish';
        }
    }

    /**
     * Tahrir rejimini o'rnatish
     * @param {string|null} id - Vazifa ID yoki null
     */
    setEditingId(id) {
        this.editingId = id;
    }

    /**
     * Tahrir ID ni olish
     * @returns {string|null} Tahrir ID
     */
    getEditingId() {
        return this.editingId;
    }

    /**
     * Bildirishnoma ko'rsatish
     * @param {string} message - Xabar matni
     * @param {string} type - Bildirishnoma turi ('success', 'warning', 'error', 'info')
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;

        const colors = {
            success: '#48bb78',
            warning: '#ed8936',
            error: '#f56565',
            info: '#667eea'
        };

        notification.style.borderLeft = `4px solid ${colors[type]}`;
        notification.querySelector('i').style.color = colors[type];

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Bildirishnoma ikonini olish
     * @param {string} type - Bildirishnoma turi
     * @returns {string} Ikon nomi
     */
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * HTML escape qilish (XSS himoyasi)
     * @param {string} text - Escap qilinadigan matn
     * @returns {string} Escap qilingan matn
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Tasdiqlash oynasi ko'rsatish
     * @param {string} message - Xabar
     * @returns {boolean} Tasdiqlanganmi
     */
    confirm(message) {
        return window.confirm(message);
    }

    /**
     * Event listener qo'shish
     * @param {string} event - Event nomi
     * @param {Function} handler - Handler funksiya
     */
    on(event, handler) {
        switch (event) {
            case 'submit':
                this.elements.todoForm.addEventListener('submit', handler);
                break;
            case 'filter':
                this.elements.filterButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        handler(e.target.closest('.filter-btn').dataset.filter);
                    });
                });
                break;
            case 'clearCompleted':
                this.elements.clearCompleted.addEventListener('click', handler);
                break;
            case 'clearAll':
                this.elements.clearAll.addEventListener('click', handler);
                break;
            case 'toggle':
                this.elements.todoList.addEventListener('click', (e) => {
                    if (e.target.classList.contains('todo-checkbox')) {
                        handler(e.target.dataset.id);
                    }
                });
                break;
            case 'edit':
                this.elements.todoList.addEventListener('click', (e) => {
                    const editBtn = e.target.closest('.edit-btn');
                    if (editBtn) {
                        handler(editBtn.dataset.id);
                    }
                });
                break;
            case 'delete':
                this.elements.todoList.addEventListener('click', (e) => {
                    const deleteBtn = e.target.closest('.delete-btn');
                    if (deleteBtn) {
                        handler(deleteBtn.dataset.id);
                    }
                });
                break;
            case 'input':
                this.elements.todoInput.addEventListener('input', handler);
                break;
        }
    }

    /**
     * Viewni tozalash
     */
    destroy() {
        // Event listenerlarni olib tashlash
        const newForm = this.elements.todoForm.cloneNode(true);
        this.elements.todoForm.parentNode.replaceChild(newForm, this.elements.todoForm);
        
        // Elementlarni tozalash
        this.elements = {};
    }
}
