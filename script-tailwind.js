(function() {
    // 1. Evitamos duplicar este controlador en la página principal
    if (window.hasSynergyStyler) return;
    window.hasSynergyStyler = true;

    console.log("Estilizador maestro de Synergy activado en la ventana principal.");

    // Función que inyecta Bootstrap y maqueta las tablas DENTRO del iframe
    function aplicarEstilosAlIframe(iframe) {
        try {
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (!iframeDoc || !iframeDoc.body) return;

            // Si ya inyectamos Bootstrap en este documento interno, no lo repetimos
            if (iframeDoc.getElementById('bootstrap-css-inner')) return;

            console.log("Inyectando diseño Bootstrap 5.3.8 dentro del iframe MainWindow...");

            // A) Inyectamos el CSS de Bootstrap al documento del iframe
            var linkBs = iframeDoc.createElement('link');
            linkBs.id = 'bootstrap-css-inner';
            linkBs.rel = 'stylesheet';
            linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
            linkBs.crossOrigin = 'anonymous';
            iframeDoc.head.appendChild(linkBs);

            // B) Inyectamos Bootstrap Icons al documento del iframe
            var linkIcons = iframeDoc.createElement('link');
            linkIcons.id = 'bootstrap-icons-inner';
            linkIcons.rel = 'stylesheet';
            linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
            iframeDoc.head.appendChild(linkIcons);

            // C) Aplicamos los cambios estéticos cuando el CSS interno cargue
            linkBs.onload = function() {
                
                // --- 1. TABLAS DE FORMULARIOS (.Label y .Field) ---
                var fieldTables = iframeDoc.querySelectorAll('table:has(.Field), table:has(.Label)');
                fieldTables.forEach(function(table) {
                    if (!table.classList.contains('WorkflowBlock')) {
                        table.className = 'table table-sm align-middle bg-white shadow-sm rounded-3 overflow-hidden border mb-4';
                        table.style.width = '100%';
                        table.style.maxWidth = '1200px';
                    }
                });

                // Títulos de las secciones
                var sectionTitles = iframeDoc.querySelectorAll('.LabelLeft div, #rcMainTable span > div');
                sectionTitles.forEach(function(title) {
                    title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
                });

                // --- 2. ENTRADAS DE DATOS (INPUTS Y SELECTS) ---
                var inputs = iframeDoc.querySelectorAll('.Field input[type="text"]');
                inputs.forEach(function(input) {
                    input.className = 'form-control form-control-sm d-inline-block align-middle';
                    input.style.width = '100%';
                    input.style.maxWidth = '280px';
                });

                var selects = iframeDoc.querySelectorAll('.Field select');
                selects.forEach(function(select) {
                    select.className = 'form-select form-select-sm d-inline-block align-middle';
                    select.style.width = '100%';
                    select.style.maxWidth = '280px';
                });

                // --- 3. RECONSTRUCCIÓN SANTA DEL WORKFLOW (Botón gigante dominado) ---
                var workflowTable = iframeDoc.querySelector('.WorkflowBlock');
                if (workflowTable) {
                    workflowTable.removeAttribute('width');
                    workflowTable.className = 'table table-borderless w-auto mb-4';
                    workflowTable.style.borderCollapse = 'separate';
                    workflowTable.style.borderSpacing = '12px 4px';

                    // Fila de los botones reales (Crear / Realizar)
                    var buttonCells = workflowTable.querySelectorAll('tr:first-child td');
                    buttonCells.forEach(function(td) {
                        td.removeAttribute('nowrap');
                        td.style.width = '180px'; // Botón con ancho fijo estándar y elegante
                        td.style.padding = '0';
                        td.style.cursor = 'pointer';

                        var isCurrent = td.classList.contains('stepCurrent') || td.innerHTML.includes('Realizar');
                        var spanText = td.querySelector('span');
                        var text = spanText ? spanText.innerText.trim() : td.innerText.trim();

                        if (isCurrent) {
                            td.innerHTML = `
                                <div class="btn btn-primary fw-bold d-flex align-items-center justify-content-center shadow-sm w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                                    <i class="bi bi-check-circle-fill me-2"></i>
                                    <span>${text}</span>
                                </div>`;
                        } else {
                            td.innerHTML = `
                                <div class="btn btn-outline-success fw-semibold d-flex align-items-center justify-content-center w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                                    <i class="bi bi-plus-circle me-2"></i>
                                    <span>${text}</span>
                                </div>`;
                        }
                    });

                    // Fila de metadatos (Quién y Cuándo)
                    var metaCells = workflowTable.querySelectorAll('tr:nth-child(2) td');
                    metaCells.forEach(function(td) {
                        td.className = 'text-muted small text-center pt-1';
                        td.style.width = '180px';
                        var links = td.querySelectorAll('a');
                        links.forEach(function(a) {
                            a.className = 'text-decoration-none fw-semibold text-secondary';
                        });
                    });
                }

                // --- 4. ICONOS EN BOTONES NATIVOS (Lupas y Calendarios) ---
                var nativeButtons = iframeDoc.querySelectorAll('.Field button');
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
            };

        } catch (e) {
            console.warn("No se pudo acceder al contenido del iframe debido a políticas de origen (CORS):", e);
        }
    }

    // Ojo avizor: Detectamos el iframe MainWindow en la estructura principal
    var mainWindow = document.getElementById('MainWindow');
    
    if (mainWindow) {
        // Ejecutamos la primera vez por si ya estaba cargado
        aplicarEstilosAlIframe(mainWindow);

        // Magia pura: Cada vez que el usuario navegue en el CRM, cambie de flujo o pinche un link,
        // el iframe disparará el evento 'load' y nosotros volveremos a aplicar el diseño automáticamente.
        mainWindow.addEventListener('load', function() {
            aplicarEstilosAlIframe(mainWindow);
        });
    }
})();