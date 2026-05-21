(function() {
    // 1. Evitamos duplicar la carga
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

    // 4. Maquetación quirúrgica
    linkBs.onload = function() {
        console.log("Bootstrap cargado. Domando botones gigantes...");

        // -- TABLA PRINCIPAL DE DATOS --
        var mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.className = 'table align-middle shadow-sm rounded-3 overflow-hidden border bg-white';
        }

        var sectionTitles = document.querySelectorAll('#rcMainTable span > div');
        sectionTitles.forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
        });

        // -- INPUTS Y SELECTS --
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            input.className = 'form-control form-control-sm d-inline-block align-middle';
            input.style.width = '100%';
            input.style.maxWidth = '320px';
        });

        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block align-middle';
            select.style.width = '100%';
            select.style.maxWidth = '320px';
        });

        // -- WORKFLOW (¡Adiós al tamaño gigante!) --
        var workflowBlock = document.querySelector('.WorkflowBlock') || document.querySelector('table.mb-4');
        if (workflowBlock) {
            // Quitamos el w-100 de la tabla y le ponemos un ancho máximo normal de oficina
            workflowBlock.className = 'mb-4';
            workflowBlock.style.width = 'auto';
            workflowBlock.style.maxWidth = '400px'; 
            workflowBlock.style.borderCollapse = 'separate';
            workflowBlock.style.borderSpacing = '8px';

            // Estilizamos el botón activo (Realizar)
            var stepCurrent = workflowBlock.querySelector('.stepCurrent') || workflowBlock.querySelector('.btn-primary');
            if (stepCurrent) {
                stepCurrent.className = 'bg-primary text-white fw-bold p-2 text-center rounded-3 shadow-sm align-middle';
                stepCurrent.style.width = '160px'; // Ancho fijo y controlado
                stepCurrent.style.cursor = 'pointer';
                
                // Ocultamos el SVG viejo pixelado de Synergy para que no estorbe
                var oldSvg = stepCurrent.querySelector('img') || stepCurrent.querySelector('.svgStepCurrent');
                if (oldSvg) oldSvg.style.display = 'none';

                // Inyectamos el icono limpio de Bootstrap si no existe ya
                if (!stepCurrent.querySelector('.bi')) {
                    var texto = stepCurrent.querySelector('span') ? stepCurrent.querySelector('span').innerText : 'Realizar';
                    stepCurrent.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><span style="vertical-align:middle;">' + texto + '</span>';
                }
            }
            
            // Estilizamos el botón secundario (Crear / Rechazar)
            var stepsDone = workflowBlock.querySelectorAll('.stepDone') || workflowBlock.querySelectorAll('.btn-outline-success');
            stepsDone.forEach(function(step) {
                step.className = 'bg-success-subtle text-success border border-success-subtle fw-semibold p-2 text-center rounded-3 align-middle';
                step.style.width = '160px'; // Mismo ancho para mantener simetría
                step.style.cursor = 'pointer';
                
                var textoBtn = step.querySelector('span') ? step.querySelector('span').innerText : 'Crear';
                step.innerHTML = '<span style="vertical-align:middle;">' + textoBtn + '</span>';
            });
        }

        // -- BOTONES DE ACCIÓN (Lupas y Calendarios) --
        var buttons = document.querySelectorAll('.Field button');
        buttons.forEach(function(btn) {
            btn.className = 'btn btn-light btn-sm border ms-1 d-inline-flex align-items-center justify-content-center align-middle';
            btn.style.height = '31px'; 
            btn.style.width = '34px';

            var clickAction = btn.getAttribute('onclick') || '';
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