(function() {
    // 1. Evitamos duplicar la carga si recargas la página
    if (document.getElementById('bootstrap-css')) return;

    // 2. Inyectamos el CSS principal de Bootstrap 5
    var linkBs = document.createElement('link');
    linkBs.id = 'bootstrap-css';
    linkBs.rel = 'stylesheet';
    linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
    linkBs.crossOrigin = 'anonymous';
    document.head.appendChild(linkBs);

    // 3. Inyectamos la librería de Bootstrap Icons
    var linkIcons = document.createElement('link');
    linkIcons.id = 'bootstrap-icons';
    linkIcons.rel = 'stylesheet';
    linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css';
    document.head.appendChild(linkIcons);

    // 4. Esperamos a que Bootstrap cargue para aplicar todo
    linkBs.onload = function() {
        console.log("Bootstrap y Bootstrap Icons cargados con éxito.");

        // -- TABLA PRINCIPAL --
        var mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.className = 'table table-hover shadow-sm rounded-3 overflow-hidden border bg-white';
        }

        var sectionTitles = document.querySelectorAll('#rcMainTable span > div');
        sectionTitles.forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
        });

        // -- INPUTS Y SELECTS --
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            input.className = 'form-control form-control-sm d-inline-block';
            input.style.width = 'auto';
        });

        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block';
            select.style.width = 'auto';
        });

        // -- WORKFLOW (Botones superiores Crear/Realizar) --
        var workflowBlock = document.querySelector('.WorkflowBlock');
        if (workflowBlock) {
            workflowBlock.className = 'mb-4 w-100';
            
            var stepCurrent = workflowBlock.querySelector('.stepCurrent');
            if (stepCurrent) {
                // Le añadimos un icono de "check" al botón activo
                stepCurrent.className = 'btn btn-primary fw-bold px-4 py-2 w-100 shadow-sm';
                stepCurrent.innerHTML = '<i class="bi bi-check-circle me-2"></i>' + stepCurrent.innerHTML;
            }
            
            var stepsDone = workflowBlock.querySelectorAll('.stepDone');
            stepsDone.forEach(function(step) {
                step.className = 'btn btn-outline-success fw-semibold px-4 py-2 w-100';
            });
        }

        // -- SUSTITUCIÓN INTELIGENTE DE ICONOS EN BOTONES --
        var buttons = document.querySelectorAll('.Field button');
        buttons.forEach(function(btn) {
            // Estilo base del botón cuadrado de Bootstrap
            btn.className = 'btn btn-light btn-sm border ms-2 d-inline-flex align-items-center justify-content-center';
            
            // Leemos qué acción hace el botón en el CRM
            var clickAction = btn.getAttribute('onclick') || '';
            
            // Si el botón abre un calendario (Synergy suele usar funciones con "Calendar")
            if (clickAction.includes('Calendar') || clickAction.includes('Date')) {
                btn.innerHTML = '<i class="bi bi-calendar3 text-primary" style="font-size: 1.1rem;"></i>';
            } 
            // Para el resto de botones (generalmente lupas de búsqueda o "Browsers")
            else {
                btn.innerHTML = '<i class="bi bi-search text-primary" style="font-size: 1.1rem;"></i>';
            }
        });
    };
})();