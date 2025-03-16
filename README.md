# 📌 To do List Uygulaması

Bu, kullanıcıların görevlerini yönetmelerine olanak tanıyan basit bir Todo List uygulamasıdır. Kullanıcılar görev ekleyebilir, düzenleyebilir, tamamlayabilir ve silebilirler. Uygulama, JSON tabanlı bir veritabanı (LowDB) kullanarak görevleri saklar.

## 🚀 Teknolojiler

- **Node.js** - Sunucu tarafı uygulama
- **Express.js** - API oluşturma
- **LowDB** - JSON tabanlı hafif veritabanı
- **UUID** - Benzersiz kimlikler üretmek için kullanılır

## 📌 Özellikler

- ✅ **Yeni Görev Ekleme** - Kullanıcılar başlık ve açıklama girerek yeni görevler oluşturabilir.
- 📝 **Görev Düzenleme** - Mevcut görevlerin başlık ve açıklaması güncellenebilir.
- ✔️ **Görev Tamamlama** - Kullanıcı, tamamladığı görevleri işaretleyebilir.
- 🗑️ **Görev Silme** - Kullanıcı, görevleri kalıcı olarak silebilir.
- 📂 **JSON Veritabanı (LowDB)** - Veriler `db.json` dosyasında saklanır.
- 🎯 **Filtreleme** - Görevler tamamlanmış, tamamlanmamış ve silinmiş olarak filtrelenebilir.

## 🔧 Kurulum ve Kullanım

### 1️⃣ Projeyi Klonlayın
```bash
git clone https://github.com/nurrbb/ToDoList
cd todo-list-app
```

### 2️⃣ Bağımlılıkları Yükleyin
```bash
npm install
```

### 3️⃣ Uygulamayı Başlatın
```bash
npm start
```
Bu komut uygulamanın [http://localhost:4444](http://localhost:4444) adresinde çalışmasını sağlar.


## 🎯 API Kullanımı

```

| Yöntem | Endpoint         | Açıklama                              |
|--------|------------------|---------------------------------------|
| GET    | /todos           | Tüm görevleri getirir                 |
| GET    | /todos/:id       | Belirtilen ID'ye sahip görevi getirir |
| POST   | /todos           | Yeni bir görev ekler                  |
| PUT    | /todos/:id       | Belirtilen görevi günceller           |
| DELETE | /todos/:id       | Belirtilen görevi siler               |

```

##  Uygulamadan Görseller

![01](https://github.com/user-attachments/assets/d7aef49f-7130-4b4c-9ce6-419d6f64b93c)




![02](https://github.com/user-attachments/assets/cd7b10f6-a417-49ea-baeb-3fa9cd241fdb)




![03](https://github.com/user-attachments/assets/aeb3185b-3328-4d35-83cc-13059d7ac77e)





