(function() {
    // 1. Evitamos duplicar la carga si se refresca la solución
    if (document.getElementById('bootstrap-css')) return;

    // 2. Inyectamos el CSS de Bootstrap 5.3.8
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

    // 4. Se ejecuta la maquetación cuando todo esté cargado
    linkBs.onload = function() {
        console.log("Bootstrap corregido y adaptado a Synergy.");

        // -- TABLA PRINCIPAL --
        var mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.className = 'table align-middle shadow-sm rounded-3 overflow-hidden border bg-white';
        }

        // Títulos de secciones internos
        var sectionTitles = document.querySelectorAll('#rcMainTable span > div');
        sectionTitles.forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
        });

        // -- INPUTS Y SELECTS (Ancho controlado para que no se encojan) --
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            input.className = 'form-control form-control-sm d-inline-block align-middle';
            input.style.width = '100%';
            input.style.maxWidth = '320px'; // Tamaño perfecto para rellenar
        });

        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block align-middle';
            select.style.width = '100%';
            select.style.maxWidth = '320px';
        });

        // -- WORKFLOW (Arreglado: sin 'btn' para mantener la celdas alineadas) --
        var workflowBlock = document.querySelector('.WorkflowBlock');
        if (workflowBlock) {
            workflowBlock.className = 'mb-4 w-100 border-separate';
            
            var stepCurrent = workflowBlock.querySelector('.stepCurrent');
            if (stepCurrent) {
                // Usamos colores de fondo puros manteniendo el diseño de celda
                stepCurrent.className = 'bg-primary text-white fw-bold p-3 text-center rounded-3 shadow-sm align-middle';
                if (!stepCurrent.querySelector('.bi')) {
                    stepCurrent.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>' + stepCurrent.innerHTML;
                }
            }
            
            var stepsDone = workflowBlock.querySelectorAll('.stepDone');
            stepsDone.forEach(function(step) {
                step.className = 'bg-success-subtle text-success border border-success-subtle fw-semibold p-3 text-center rounded-3 align-middle';
            });
        }

        // -- BOTONES DE ACCIÓN (Lupa y Calendario perfectamente alineados) --
        var buttons = document.querySelectorAll('.Field button');
        buttons.forEach(function(btn) {
            // Ajustamos padding y alturas fijas para que casen con el input-sm
            btn.className = 'btn btn-light btn-sm border ms-1 d-inline-flex align-items-center justify-content-center align-middle';
            btn.style.height = '31px'; 
            btn.style.width = '34px';

            var clickAction = btn.getAttribute('onclick') || '';
            
            // Reemplazamos los iconos feos de Synergy por los de Bootstrap
            if (btn.querySelector('img') || btn.innerText.trim() === '') {
                if (clickAction.includes('Calendar') || clickAction.includes('Date')) {
                    btn.innerHTML = '<i class="bi bi-calendar3 text-body-secondary"></i>';
                } else {
                    btn.innerHTML = '<i class="bi bi-search text-body-secondary"></i>';
                }
            }
        });
    };
})();