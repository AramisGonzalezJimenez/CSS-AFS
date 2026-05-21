(function() {
    if (document.getElementById('bootstrap-css')) return;

    // 1. Importamos todo el CSS profesional de Bootstrap 5 desde una CDN fiable
    var link = document.createElement('link');
    link.id = 'bootstrap-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/box.css'; // Versión sin reset agresivo si es posible, o la estándar:
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    document.head.appendChild(link);

    // 2. Esperamos un instante a que cargue el CSS y aplicamos las clases ya diseñadas
    setTimeout(function() {
        
        // La tabla principal del CRM la convertimos en una tabla moderna de Bootstrap
        var mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            // "table table-hover table-striped shadow-sm" son clases oficiales de Bootstrap
            mainTable.className = 'table table-hover table-striped align-middle bg-white shadow-sm rounded-3';
        }

        // Todos los inputs de texto adoptan el diseño "Form Control" de Bootstrap (bordes suaves, enfoque azul)
        var inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(function(input) {
            input.className = 'form-control form-control-sm d-inline-block w-auto';
        });

        // Todos los select (desplegables)
        var selects = document.querySelectorAll('.Field select');
        selects.forEach(function(select) {
            select.className = 'form-select form-select-sm d-inline-block w-auto';
        });

        // Convertimos las celdas del Workflow superior en botones elegantes de Bootstrap
        var stepCurrent = document.querySelector('.WorkflowBlock .stepCurrent');
        if (stepCurrent) {
            stepCurrent.className = 'btn btn-primary btn-sm fw-bold px-4 py-2 text-center d-block';
        }
        
        var stepsDone = document.querySelectorAll('.WorkflowBlock .stepDone');
        stepsDone.forEach(function(step) {
            step.className = 'btn btn-outline-success btn-sm px-4 py-2 text-center d-block';
        });

    }, 300);
})();