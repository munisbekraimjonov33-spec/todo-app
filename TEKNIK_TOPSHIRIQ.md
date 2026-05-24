# Todo App - Texnik Topshiriq

## 📋 Loyiha Haqida

**Loyiha nomi:** Todo App - Chiroyli Vazifa Menejeri  
**Texnologiya:** HTML5, CSS3,JavaScript

**Maqsad:** Kundalik vazifalarni boshqarish uchun zamonaviy, chiroyli va foydalanish qulay bo'lgan web ilova yaratish.

---

## 🏗️ Arxitektura 

Loyiha **MVC** dizayn patterni asosida qurilgan:

### 1. Model (`js/model.js`)
**Vazifasi:** Ma'lumotlar va biznes mantiqni boshqarish

**Asosiy funksiyalar:**
- CRUD operatsiyalari (qo'shish, o'qish, o'zgartirish, o'chirish)
- LocalStorage bilan ishlash
- Observer pattern orqali o'zgarishlarni bildirish
- Statistika va filtrlash

**Asosiy metodlar:**
- `add(text)` - Yangi vazifa qo'shish
- `update(id, text)` - Vazifani o'zgartirish
- `toggle(id)` - Bajarilgan/bajarilmagan deb belgilash
- `delete(id)` - Vazifani o'chirish
- `clearCompleted()` - Bajarilganlarni o'chirish
- `clearAll()` - Barchasini o'chirish
- `getFiltered(filter)` - Filtrlangan vazifalarni olish
- `getStats()` - Statistikani olish
- `subscribe(listener)` - Listener qo'shish
- `notify()` - Listenerlarni chaqirish

### 2. View (`js/view.js`)
**Vazifasi:** Foydalanuvchi interfeysi va DOM manipulyatsiyasi

**Asosiy funksiyalar:**
- UI elementlarini render qilish
- DOM manipulyatsiyalari
- Event listenerlarni bog'lash
- Bildirishnomalarni ko'rsatish
- XSS himoyasi (HTML escape)

**Asosiy metodlar:**
- `renderTodos(todos, filter)` - Vazifalarni render qilish
- `renderStats(stats)` - Statistikani render qilish
- `showNotification(message, type)` - Bildirishnoma ko'rsatish
- `on(event, handler)` - Event listener qo'shish
- `getInputValue()` - Input qiymatini olish
- `escapeHtml(text)` - HTML escape (XSS himoyasi)

### 3. Controller (`js/controller.js`)
**Vazifasi:** Model va View o'rtasidagi bog'lovchi

**Asosiy funksiyalar:**
- Foydalanuvchi kiritishlarini qabul qilish
- Model va View o'rtasida ma'lumot almashinuvi
- Biznes mantiqni boshqarish
- Event handlerlar va validatsiya

**Asosiy metodlar:**
- `handleSubmit()` - Form submit handler
- `handleFilter()` - Filter handler
- `handleToggle()` - Toggle handler
- `handleEdit()` - Tahrir handler
- `handleDelete()` - O'chirish handler
- `addTodo()` - Vazifa qo'shish
- `render()` - Render qilish

### 4. App (`js/app.js`)
**Vazifasi:** Ilovani ishga tushirish va komponentlarni bog'lash

---

## 📊 Ma'lumotlar Strukturasi

### Todo Object
```javascript
{
    id: string,           // Unikal ID
    text: string,         // Vazifa matni
    completed: boolean,   // Bajarilganmi
    createdAt: string,    // ISO timestamp
    updatedAt: string,    // ISO timestamp (optional)
    completedAt: string   // ISO timestamp (optional)
}
```

### LocalStorage
- `todos` - Vazifalar ro'yxati (JSON array)
- `filter` - Hozirgi filter ('all', 'completed', 'pending')

---

## 🔄 Ishlash Mekanizmi

### Ilovani Ishga Tushirish
```
DOMContentLoaded → TodoApp.init() → Model/View/Controller yaratish → Initial render
```

### Yangi Vazifa Qo'shish
```
User input → Controller.handleSubmit() → Validatsiya → Model.add() → LocalStorage.save() → Model.notify() → Controller.render() → View.update()
```

---

## 🎨 Dizayn Patternlar

1. **MVC (Model-View-Controller)** - Separation of Concerns
2. **Observer Pattern** - Model o'zgarganda observerlarni bildirish
3. **Event Delegation** - Memory optimizatsiya
4. **Singleton Pattern** - Bitta instance

---

## 🔒 Xavfsizlik

- **XSS Himoyasi** - HTML escape funksiyasi
- **Validatsiya** - Input bo'sh emasligini tekshirish
- **Tasdiqlash** - O'chirishdan oldin confirm dialogs

---

## 📱 Responsivlik

- **Desktop:** > 768px
- **Tablet:** 768px - 480px
- **Mobile:** < 480px

**CSS:** Flexbox, Grid, Media queries, CSS Variables

---

## 📦 Fayl Strukturasi

```
todo app/
├── index.html                 # Asosiy HTML
├── styles.css                 # CSS stillari
├── js/
│   ├── model.js              # Model (ma'lumotlar)
│   ├── view.js               # View (UI)
│   ├── controller.js         # Controller (boshqaruv)
│   └── app.js                # Asosiy app
├── README.md                  # Loyiha hujjatlari
├── FOYDALANISH_QOLLANMASI.md # Foydalanish qo'llanmasi
├── TEKNIK_TOPSHIRIQ.md       # Texnik topshiriq (bu fayl)
└── ARKHITEKTURA.md           # Arxitektura hujjatlari
```

---

## 🎯 Funktsional Talablar

### Asosiy Funksiyalar
- ✅ Vazifa qo'shish, tahrirlash, o'chirish
- ✅ Bajarilgan deb belgilash
- ✅ Filtrlash (barchasi, bajarilgan, kutilmoqda)
- ✅ Statistika (jami, bajarilgan, kutilmoqda)
- ✅ Bajarilganlarni tozalash, barchasini o'chirish

### Qo'shimcha Funksiyalar
- ✅ LocalStorage bilan saqlash
- ✅ Bildirishnomalar
- ✅ Keyboard shortcuts (Ctrl+Enter, Esc)
- ✅ Responsive dizayn
- ✅ Animatsiyalar
- ✅ XSS himoyasi

---

## 🔧 Texnik Talablar

### Browser Talablari
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- JavaScript yoqilgan bo'lishi shart

### Performance
- JavaScript bundle < 50KB
- CSS bundle < 30KB
- Fast load time

---

## ✅ Qabul Qilish Mezonlari

### Must Have
- [x] MVC arxitekturasi qo'llanilgan
- [x] CRUD operatsiyalari to'liq ishlaydi
- [x] LocalStorage bilan ishlaydi
- [x] Responsive dizayn
- [x] XSS himoyasi
- [x] Kod standartlarga mos

### Should Have
- [x] Animatsiyalar smooth
- [x] Bildirishnomalar chiroyli
- [x] Keyboard shortcuts ishlaydi
- [x] Error handling mavjud
- [x] Kodda comments bor

---

**Topshiriq yakunlanganida:** Ilova ishga tushirilishi, barcha funksiyalar ishlashi, kod arxitekturasi bo'yicha baholanadi.

**Muvaffaqiyat!** 🎉
