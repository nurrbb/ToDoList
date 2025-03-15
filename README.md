# Todo List Uygulaması

Bu, kullanıcıların görevlerini yönetmelerine olanak tanıyan basit bir To do List uygulamasıdır. Kullanıcılar görevlerini ekleyebilir, düzenleyebilir, tamamlayabilir, silebilir ve geri alabilirler. Ayrıca, filtreleme özelliği ile görevlerin durumu (tamamlanmış, tamamlanmamış, silinmiş) kolayca yönetilebilir.

## Özellikler

- **Yeni Görev Ekleme**: Kullanıcılar yeni görevler ekleyebilir.
- **Görev Düzenleme**: Mevcut görevler düzenlenebilir.
- **Görev Tamamlama**: Görevler tamamlandığında, yeşil renkle işaretlenir ve üzerinde çizgi çıkar.
- **Görev Silme**: Silinen görevler kırmızı renkle işaretlenir.
- **Geri Alma**: Silinen görevler geri alınabilir.
- **Filtreleme**: Görevler tamamlanmış, tamamlanmamış ve silinmiş olarak filtrelenebilir.
- **Responsive Tasarım**: Uygulama, mobil cihazlarda düzgün çalışacak şekilde tasarlanmıştır.

## Kullanım

1. **Proje Başlatma**:
   - Bu projeyi yerel bilgisayarınıza klonlayın:
    ```bash
    git clone https://github.com/kullanici_adi/todo-list-app.git
    ```

2. **Bağımlılıkları Yükleme**:
   - Proje dizininde `npm install` komutunu çalıştırarak gerekli bağımlılıkları yükleyin.
    ```bash
    npm install
    ```

3. **Uygulamayı Çalıştırma**:
   - Uygulamayı başlatmak için şu komutu kullanın:
    ```bash
    npm start
    ```
   Bu, uygulamanızı [http://localhost:3000](http://localhost:3000) adresinde çalıştıracaktır.


## Teknolojiler

- **Node.js**: Sunucu tarafı çalıştırma
- **Express.js**: Web sunucusu
- **EJS**: HTML şablonları
- **Bootstrap**: UI/UX tasarımı
- **jQuery**: JavaScript ile dinamik işlevler

## Uygulama Özelliklerinin Açıklaması

1. **Yeni Görev Ekleme**: Kullanıcı, başlık ve açıklama girerek yeni bir görev ekleyebilir.
2. **Görev Düzenleme**: Kullanıcı, mevcut görevleri düzenlemek için "Düzenle" butonuna tıklayarak görevlerin başlık ve açıklamasını güncelleyebilir.
3. **Görev Tamamlama**: Kullanıcı, tamamladığı görevleri işaretleyebilir. Tamamlanan görevler, pastel yeşil renge dönüşür ve başlıklarının yanında 3 tane "✅" simgesi gösterilir.
4. **Görev Silme**: Kullanıcı, görevleri silebilir. Silinen görevler kırmızı renkle gösterilir ve başlıklarının üstü çizilir.
5. **Geri Alma**: Silinen görevler, kullanıcı tarafından geri alınabilir.
6. **Filtreleme**: Görevler, kullanıcı tarafından "tamamlanmış", "tamamlanmamış" veya "silinmiş" olarak filtrelenebilir. Sayfa açıldığında varsayılan olarak "tamamlanmamış" görevler görünür.

## Çalıştırma

1. **Uygulama Açılışı**: Sayfa yüklendiğinde, sadece tamamlanmamış görevler gösterilir. Kullanıcı, filtre menüsünden farklı seçenekler ile görevleri sıralayabilir.
2. **Yeni Görev Ekleme**: Kullanıcı, sağ üst köşedeki "Yeni Ekle" butonuna tıklayarak görev ekleyebilir.
3. **Tamamla, Düzenle ve Silme**: Görevlerin yanında tamamla, düzenle ve silme butonları bulunmaktadır.

## Kurulum

1. **Bağımlılıkların Kurulması**:
   - Proje bağımlılıklarını yüklemek için:
    ```bash
    npm install
    ```

2. **Çalıştırma**:
   - Sunucuyu başlatmak için:
    ```bash
    npm start
    ```

3. **Çalıştığını Kontrol Etme**:
   - Tarayıcınızı açın ve [http://localhost:3000](http://localhost:3000) adresini ziyaret edin.
