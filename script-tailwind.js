(function() {
    // 1. Evitamos duplicar la carga si recargas la página
    if (document.getElementById('bootstrap-css')) return;

    // 2. Inyectamos el CSS de la CDN oficial de Bootstrap 5.3.8 que encontraste
    var link = document.createElement('link');
    link.id = 'bootstrap-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
    
    // Añadimos los atributos de seguridad recomendados por la documentación
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // 3. Esperamos a que el CSS se descargue para aplicar las clases
    link.onload = function() {
        console.log("Bootstrap 5.3.8 cargado con éxito.");

        // -- TABLA PRINCIPAL --
        var mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            // Clases de Bootstrap: tabla, efecto hover, sombra suave y bordes redondeados
            mainTable.className = 'table table-hover shadow-sm rounded-3 overflow-hidden border bg-white';
        }

        // Títulos de las secciones de la tabla
        var sectionTitles = document.querySelectorAll('#rcMainTable span > div');
        sectionTitles.forEach(function(title) {
            title.className = 'bg-light text-secondary px-3 py-2 fw-bold text-uppercase small border-start border-primary border-4 rounded-end';
        });

        // -- INPUTS DE TEXTO --
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            // Clases de Bootstrap para inputs (bordes azules al hacer clic)
            input.className = 'form-control form-control-sm d-inline-block';
            input.style.width = 'auto'; // Evita que ocupen el 100% de la pantalla
        });

        // -- SELECTS (Desplegables) --
        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block';
            select.style.width = 'auto';
        });

        // -- BOTONES DE BÚSQUEDA (Lupas y calendarios) --
        var buttons = document.querySelectorAll('.Field button');
        buttons.forEach(function(btn) {
            btn.className = 'btn btn-light btn-sm border ms-2 d-inline-flex align-items-center justify-content-center';
        });

        // -- WORKFLOW (Botones de Crear/Realizar) --
        var workflowBlock = document.querySelector('.WorkflowBlock');
        if (workflowBlock) {
            workflowBlock.className = 'mb-4 w-100'; // Margen inferior
            
            var stepCurrent = workflowBlock.querySelector('.stepCurrent');
            if (stepCurrent) {
                stepCurrent.className = 'btn btn-primary fw-bold px-4 py-2 w-100 shadow-sm';
            }
            
            var stepsDone = workflowBlock.querySelectorAll('.stepDone');
            stepsDone.forEach(function(step) {
                step.className = 'btn btn-outline-success fw-semibold px-4 py-2 w-100';
            });
        }
    };
})();