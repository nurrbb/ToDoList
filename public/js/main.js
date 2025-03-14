$(document).ready(function() {
    let currentFilter = 'all';

    // Todo'ları yükleyen fonksiyon
    function loadTodos() {
        $.ajax({
            url: '/todos',
            method: 'GET',
            success: function(data) {
                renderTodos(data);
            }
        });
    }

    // Todo'ları ekrana kart (card) şeklinde basma
    function renderTodos(todos) {
        const container = $('#todosContainer');
        container.empty();

        // Filtre uygulama
        const filtered = todos.filter(todo => {
            if (currentFilter === 'completed') return todo.completed;
            else if (currentFilter === 'pending') return !todo.completed;
            return true; // all
        });

        if (filtered.length === 0) {
            container.html('<p class="text-muted">Hiç todo bulunamadı.</p>');
            return;
        }

        // Her bir todo için kart oluştur
        filtered.forEach(todo => {
            const isCompleted = todo.completed ? 'completed' : '';
            const titleClass = todo.completed ? 'text-decoration-line-through' : '';
            const descriptionClass = todo.completed ? 'text-decoration-line-through' : '';

            const cardHtml = `
        <div class="card mb-2 ${isCompleted}">
          <div class="card-body">
            <h5 class="card-title ${titleClass}">${todo.title || 'Başlık Yok'}</h5>
            <p class="card-text ${descriptionClass}">${todo.description || 'Açıklama Yok'}</p>
            <div class="d-flex justify-content-end gap-2">
              ${
                !todo.completed
                    ? `<button class="btn btn-sm btn-success completeBtn" data-id="${todo.id}">Tamamlandı</button>`
                    : ''
            }
              <button class="btn btn-sm btn-danger deleteBtn" data-id="${todo.id}">Sil</button>
            </div>
          </div>
        </div>
      `;
            container.append(cardHtml);
        });
    }

    // Yeni todo ekleme
    $('#addTodoForm').submit(function(e) {
        e.preventDefault();
        const title = $('#todoTitle').val();
        const description = $('#todoDescription').val();

        $.ajax({
            url: '/todos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title, description }),
            success: function() {
                $('#todoTitle').val('');
                $('#todoDescription').val('');
                // Modalı kapat
                $('#addTodoModal').modal('hide');
                loadTodos();
            }
        });
    });

    // Todo silme
    $(document).on('click', '.deleteBtn', function() {
        const id = $(this).data('id');
        $.ajax({
            url: '/todos/' + id,
            method: 'DELETE',
            success: function() {
                loadTodos();
            }
        });
    });

    // Todo tamamlandı
    $(document).on('click', '.completeBtn', function() {
        const id = $(this).data('id');
        $.ajax({
            url: '/todos/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ completed: true }),
            success: function() {
                loadTodos();
            }
        });
    });

    // Filtre seçeneği
    $('#filterStatus').change(function() {
        currentFilter = $(this).val();
        loadTodos();
    });

    // Sayfa yüklendiğinde todo'ları yükle
    loadTodos();
});
