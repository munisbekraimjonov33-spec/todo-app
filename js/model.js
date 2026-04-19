/**
 * Model - Ma'lumotlar va biznes mantiq
 * Todo CRUD operatsiyalari va ma'lumotlarni boshqarish
 */
class TodoModel {
    constructor() {
        this.todos = [];
        this.filter = 'all';
        this.listeners = [];
        this.loadFromStorage();
    }

    /**
     * Yangi vazifa qo'shish
     * @param {string} text - Vazifa matni
     * @returns {Object} Yaratilgan vazifa
     */
    add(text) {
        const todo = {
            id: this.generateId(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            completedAt: null
        };
        
        this.todos.unshift(todo);
        this.saveToStorage();
        this.notify();
        return todo;
    }

    /**
     * Vazifani o'zgartirish
     * @param {string} id - Vazifa ID
     * @param {string} newText - Yangi matn
     * @returns {Object|null} O'zgartirilgan vazifa yoki null
     */
    update(id, newText) {
        const todo = this.findById(id);
        if (todo) {
            todo.text = newText;
            todo.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.notify();
            return todo;
        }
        return null;
    }

    /**
     * Vazifani bajarilgan/bajarilmagan deb belgilash
     * @param {string} id - Vazifa ID
     * @returns {Object|null} O'zgartirilgan vazifa yoki null
     */
    toggle(id) {
        const todo = this.findById(id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.completedAt = todo.completed ? new Date().toISOString() : null;
            this.saveToStorage();
            this.notify();
            return todo;
        }
        return null;
    }

    /**
     * Vazifani o'chirish
     * @param {string} id - Vazifa ID
     * @returns {boolean} O'chirildi yoki yo'q
     */
    delete(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.saveToStorage();
            this.notify();
            return true;
        }
        return false;
    }

    /**
     * Bajarilgan vazifalarni o'chirish
     * @returns {number} O'chirilgan vazifalar soni
     */
    clearCompleted() {
        const beforeCount = this.todos.length;
        this.todos = this.todos.filter(todo => !todo.completed);
        const deletedCount = beforeCount - this.todos.length;
        
        if (deletedCount > 0) {
            this.saveToStorage();
            this.notify();
        }
        return deletedCount;
    }

    /**
     * Barcha vazifalarni o'chirish
     * @returns {number} O'chirilgan vazifalar soni
     */
    clearAll() {
        const count = this.todos.length;
        this.todos = [];
        this.saveToStorage();
        this.notify();
        return count;
    }

    /**
     * Vazifani ID bo'yicha topish
     * @param {string} id - Vazifa ID
     * @returns {Object|null} Vazifa yoki null
     */
    findById(id) {
        return this.todos.find(t => t.id === id) || null;
    }

    /**
     * Barcha vazifalarni olish
     * @returns {Array} Vazifalar ro'yxati
     */
    getAll() {
        return [...this.todos];
    }

    /**
     * Filtrlangan vazifalarni olish
     * @param {string} filter - Filter turi ('all', 'completed', 'pending')
     * @returns {Array} Filtrlangan vazifalar
     */
    getFiltered(filter = this.filter) {
        switch (filter) {
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            case 'pending':
                return this.todos.filter(todo => !todo.completed);
            default:
                return [...this.todos];
        }
    }

    /**
     * Filterni o'rnatish
     * @param {string} filter - Filter turi
     */
    setFilter(filter) {
        this.filter = filter;
        this.saveToStorage();
        this.notify();
    }

    /**
     * Filterni olish
     * @returns {string} Hozirgi filter
     */
    getFilter() {
        return this.filter;
    }

    /**
     * Statistikani olish
     * @returns {Object} Statistika ma'lumotlari
     */
    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;
        
        return {
            total,
            completed,
            pending,
            completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
        };
    }

    /**
     * Listener qo'shish (Observer pattern)
     * @param {Function} listener - Callback funksiya
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * Listenerni olib tashlash
     * @param {Function} listener - Callback funksiya
     */
    unsubscribe(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Barcha listenerlarni chaqirish
     */
    notify() {
        this.listeners.forEach(listener => listener(this));
    }

    /**
     * Unikal ID generatsiya qilish
     * @returns {string} Unikal ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * LocalStorage'dan yuklash
     */
    loadFromStorage() {
        try {
            const savedTodos = localStorage.getItem('todos');
            const savedFilter = localStorage.getItem('filter');
            
            if (savedTodos) {
                this.todos = JSON.parse(savedTodos);
            }
            
            if (savedFilter) {
                this.filter = savedFilter;
            }
        } catch (error) {
            console.error('LocalStorage yuklashda xatolik:', error);
            this.todos = [];
            this.filter = 'all';
        }
    }

    /**
     * LocalStorage'ga saqlash
     */
    saveToStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
            localStorage.setItem('filter', this.filter);
        } catch (error) {
            console.error('LocalStorage saqlashda xatolik:', error);
        }
    }

    /**
     * Modelni tozalash
     */
    destroy() {
        this.listeners = [];
        this.todos = [];
    }
}
