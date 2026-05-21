(function() {
    console.log("🚀 [SynergyStyler] Versión V-Final cargada.");

    if (window.hasSynergyStylerInjected) return;
    window.hasSynergyStylerInjected = true;

    // 1. Inyectamos Bootstrap
    var linkBs = document.createElement('link');
    linkBs.id = 'bootstrap-css-active';
    linkBs.rel = 'stylesheet';
    linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
    linkBs.crossOrigin = 'anonymous';
    document.head.appendChild(linkBs);

    // 2. Inyectamos Iconos
    var linkIcons = document.createElement('link');
    linkIcons.rel = 'stylesheet';
    linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(linkIcons);

    // 3. Función maestra de diseño
    function aplicarMagia() {
        console.log("⚡ [SynergyStyler] Ejecutando diseño sobre el DOM maduro...");

        // -- TABLAS --
        document.querySelectorAll('table:has(.Field), table:has(.Label)').forEach(function(t) {
            if (!t.classList.contains('WorkflowBlock')) {
                t.className = 'table table-sm align-middle bg-white shadow-sm rounded-3 overflow-hidden border mb-4';
                t.style.maxWidth = '1200px';
            }
        });

        // -- TÍTULOS DE SECCIÓN --
        document.querySelectorAll('.LabelLeft div').forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
            title.style.backgroundColor = '#f8f9fa';
        });

        // -- INPUTS Y SELECTS (Ahora sí los encontrará) --
        var formElements = document.querySelectorAll('.Field input:not([type="hidden"]), .Field select');
        console.log(`✏️ Elementos de formulario reales encontrados: ${formElements.length}`);
        
        formElements.forEach(function(el) {
            var isSelect = el.tagName.toLowerCase() === 'select';
            el.className = isSelect ? 'form-select form-select-sm d-inline-block align-middle' : 'form-control form-control-sm d-inline-block align-middle';
            el.style.width = '100%';
            el.style.maxWidth = '280px';
        });

        // -- BOTONES DE ACCIÓN NATIVOS (Lupas/Calendarios) --
        document.querySelectorAll('.Field button').forEach(function(btn) {
            btn.className = 'btn btn-light btn-sm border ms-1 d-inline-flex align-items-center justify-content-center';
            var clickAction = btn.getAttribute('onclick') || '';
            if (clickAction.includes('Calendar') || clickAction.includes('Date')) {
                btn.innerHTML = '<i class="bi bi-calendar3 text-secondary"></i>';
            } else {
                btn.innerHTML = '<i class="bi bi-search text-secondary"></i>';
            }
        });

        // -- EL BOTÓN DEL WORKFLOW (Arrancando la fealdad de raíz) --
        var workflowTable = document.querySelector('.WorkflowBlock');
        if (workflowTable) {
            workflowTable.removeAttribute('width');
            workflowTable.className = 'mb-4 mt-2'; 
            workflowTable.style.borderCollapse = 'separate';
            workflowTable.style.borderSpacing = '16px 0'; // Da aire entre los botones

            var buttonCells = workflowTable.querySelectorAll('tr:first-child td');
            buttonCells.forEach(function(td) {
                var isCurrent = td.classList.contains('stepCurrent') || td.innerHTML.includes('Realizar');
                var spanText = td.querySelector('span');
                var text = spanText ? spanText.innerText.trim() : td.innerText.trim();

                // ¡LA CLAVE! Le quitamos todas las clases asquerosas de Synergy a la celda
                td.className = ''; 
                td.style.background = 'transparent';
                td.style.border = 'none';
                td.style.padding = '0';
                td.style.width = '160px'; // Ancho fijo del botón

                // Inyectamos el componente Flexbox puro de Bootstrap
                if (isCurrent) {
                    td.innerHTML = `
                        <div class="btn btn-primary fw-bold d-flex align-items-center justify-content-center shadow" style="border-radius:8px; pointer-events:none; height:45px;">
                            <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                            <span class="fs-6">${text}</span>
                        </div>`;
                } else {
                    td.innerHTML = `
                        <div class="btn btn-outline-success fw-bold d-flex align-items-center justify-content-center" style="border-radius:8px; pointer-events:none; height:45px; background-color:#fff;">
                            <i class="bi bi-play-circle me-2 fs-5"></i>
                            <span class="fs-6">${text}</span>
                        </div>`;
                }
            });

            // Ocultamos la segunda fila de firmas antiguas si molesta visualmente
            var metaCells = workflowTable.querySelectorAll('tr:nth-child(2) td');
            metaCells.forEach(function(td) {
                td.className = 'text-muted small text-center pt-2';
            });
        }
    }

    // 4. Esperar de forma inteligente a que el HTML esté completo
    linkBs.onload = function() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', aplicarMagia);
        } else {
            // Un pequeño respiro de 100ms para asegurar que Synergy haya renderizado sus tablas
            setTimeout(aplicarMagia, 100);
        }
    };

    // 5. Bonus: Si Synergy hace recargas raras por AJAX, reaplicamos
    if (typeof Sys !== 'undefined' && Sys.WebForms && Sys.WebForms.PageRequestManager) {
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
            setTimeout(aplicarMagia, 50);
        });
    }

})();