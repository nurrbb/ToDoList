$(document).ready(function() {
    let currentFilter = 'all';

    function loadTodos() {
        $.ajax({
            url: '/todos',
            method: 'GET',
            success: function(data) {
                renderTodos(data);
            }
        });
    }

    function renderTodos(todos) {
        const container = $('#todosContainer');
        container.empty();

        const filtered = todos.filter(todo => {
            if (currentFilter === 'completed') return todo.completed;
            else if (currentFilter === 'pending') return !todo.completed;
            return true;
        });

        if (filtered.length === 0) {
            container.html('<p class="text-muted">Hiç todo bulunamadı.</p>');
            return;
        }

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
                            <button class="btn btn-sm btn-primary editBtn" data-id="${todo.id}" data-title="${todo.title}" data-description="${todo.description}">Düzenle</button>
                            <button class="btn btn-sm btn-danger deleteBtn" data-id="${todo.id}">Sil</button>
                        </div>
                    </div>
                </div>
            `;
            container.append(cardHtml);
        });
    }

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
                $('#addTodoModal').modal('hide');
                loadTodos();
            }
        });
    });

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

    $(document).on('click', '.editBtn', function() {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const description = $(this).data('description');

        $('#editTodoId').val(id);
        $('#editTodoTitle').val(title);
        $('#editTodoDescription').val(description);
        $('#editTodoModal').modal('show');
    });

    $('#editTodoForm').submit(function(e) {
        e.preventDefault();
        const id = $('#editTodoId').val();
        const title = $('#editTodoTitle').val();
        const description = $('#editTodoDescription').val();

        $.ajax({
            url: '/todos/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title, description }),
            success: function() {
                $('#editTodoModal').modal('hide');
                loadTodos();
            }
        });
    });

    $('#filterStatus').change(function() {
        currentFilter = $(this).val();
        loadTodos();
    });

    loadTodos();
});
