const express = require('express');
const app = express();
const path = require('path');
const PORT = 4444;

// JSON body parse middleware
app.use(express.json());

// View engine ayarları: EJS kullanıyoruz
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statik dosyaları servis et (CSS, JS vs.)
app.use(express.static(path.join(__dirname, 'public')));

// API route’ları: /todos altındaki tüm istekler
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

// Ana sayfa: index.ejs render ediliyor
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
