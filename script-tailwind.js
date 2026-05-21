(function() {
    // 1. Evitamos duplicar la carga de librerías
    if (document.getElementById('bootstrap-css')) return;

    // 2. Inyectamos CSS de Bootstrap 5.3.8
    var linkBs = document.createElement('link');
    linkBs.id = 'bootstrap-css';
    linkBs.rel = 'stylesheet';
    linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
    linkBs.crossOrigin = 'anonymous';
    document.head.appendChild(linkBs);

    // 3. Inyectamos Bootstrap Icons
    var linkIcons = document.createElement('link');
    linkIcons.id = 'bootstrap-icons';
    linkIcons.rel = 'stylesheet';
    linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(linkIcons);

    // 4. Transformación cosmética una vez cargadas las dependencias
    linkBs.onload = function() {
        console.log("Bootstrap integrado con éxito. Domando la interfaz...");

        // -- FORMULARIO Y TABLAS PRINCIPALES (.Label y .Field) --
        var fieldTables = document.querySelectorAll('table:has(.Field), table:has(.Label)');
        fieldTables.forEach(function(table) {
            if (!table.classList.contains('WorkflowBlock')) {
                table.className = 'table table-sm align-middle bg-white shadow-sm rounded-3 overflow-hidden border mb-4';
                table.style.width = '100%';
                table.style.maxWidth = '1200px';
            }
        });

        // Estilización de títulos de secciones en gris/azul moderno
        var sectionTitles = document.querySelectorAll('.LabelLeft div');
        sectionTitles.forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
            title.style.backgroundColor = '#f8f9fa';
        });

        // -- ENTRADAS DE DATOS (INPUTS Y SELECTS) --
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            input.className = 'form-control form-control-sm d-inline-block align-middle';
            input.style.width = '100%';
            input.style.maxWidth = '280px';
        });

        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block align-middle';
            select.style.width = '100%';
            select.style.maxWidth = '280px';
        });

        // Lupas y Calendarios nativos: los estilizamos como botones link discretos
        var nativeButtons = document.querySelectorAll('.Field button');
        nativeButtons.forEach(function(btn) {
            btn.className = 'btn btn-link p-1 text-secondary align-middle ms-1';
            btn.style.width = 'auto';
            btn.style.height = 'auto';
            var svg = btn.querySelector('svg');
            if (svg) {
                svg.style.width = '18px';
                svg.style.height = '18px';
                svg.style.fill = '#6c757d';
            }
        });


        // -- RECONSTRUCCIÓN DEL WORKFLOWBLOCK (El botón gigante) --
        var workflowTable = document.querySelector('.WorkflowBlock');
        if (workflowTable) {
            // Curamos la tabla: eliminamos el ancho del 50%/100% y la hacemos compacta
            workflowTable.removeAttribute('width');
            workflowTable.className = 'table table-borderless w-auto mb-4';
            workflowTable.style.borderCollapse = 'separate';
            workflowTable.style.borderSpacing = '12px 4px';

            // Procesamos la fila de botones (Fila 1)
            var buttonCells = workflowTable.querySelectorAll('tr:first-child td');
            buttonCells.forEach(function(td) {
                td.removeAttribute('nowrap');
                td.style.width = '180px'; // Ancho de botón humano y estándar de oficina
                td.style.padding = '0';
                td.style.cursor = 'pointer';

                // Detectamos el tipo de botón basándonos en sus clases o contenido
                var isCurrent = td.classList.contains('stepCurrent') || td.innerHTML.includes('Realizar');
                
                // Extraemos el texto crudo ('Crear' o 'Realizar')
                var spanText = td.querySelector('span');
                var text = spanText ? spanText.innerText.trim() : td.innerText.trim();

                // Generamos la estructura del botón interna limpia e inmune a deformaciones
                if (isCurrent) {
                    td.innerHTML = `
                        <div class="btn btn-primary fw-bold d-flex align-items-center justify-content-center shadow-sm w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                            <i class="bi bi-check-circle-fill me-2 fs-6"></i>
                            <span>${text}</span>
                        </div>
                    `;
                } else {
                    td.innerHTML = `
                        <div class="btn btn-outline-success fw-semibold d-flex align-items-center justify-content-center w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                            <i class="bi bi-plus-circle me-2 fs-6"></i>
                            <span>${text}</span>
                        </div>
                    `;
                }
            });

            // Procesamos la fila de metadatos (Quién y Cuándo - Fila 2)
            var metaCells = workflowTable.querySelectorAll('tr:nth-child(2) td');
            metaCells.forEach(function(td) {
                td.className = 'text-muted small text-center pt-1';
                td.style.width = '180px';
                
                // Limpiamos los links de los nombres de usuario
                var links = td.querySelectorAll('a');
                links.forEach(function(a) {
                    a.className = 'text-decoration-none fw-semibold text-secondary';
                });
            });
        }
    };
})();