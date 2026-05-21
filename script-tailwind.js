(function() {
    // CAMBIA ESTO A 21, 22... CADA VEZ QUE SUBAS CAMBIOS A GITHUB
    var VERSION = "20"; 
    console.log("🚀 [SynergyStyler] Ejecutando versión " + VERSION + " - Modo Blindado Activado.");

    if (window.hasSynergyStylerInjected) return;
    window.hasSynergyStylerInjected = true;

    // 1. Inyectamos Bootstrap e Iconos
    if (!document.getElementById('bootstrap-css-active')) {
        var linkBs = document.createElement('link');
        linkBs.id = 'bootstrap-css-active';
        linkBs.rel = 'stylesheet';
        linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
        document.head.appendChild(linkBs);
    }

    // 2. CSS Global "Indestructible" (Sobrescribe cualquier estilo legacy de Synergy)
    var style = document.createElement('style');
    style.innerHTML = `
        .btn-bs-custom { opacity: 1 !important; transition: 0.2s; }
        .btn-bs-custom:hover { opacity: 0.85 !important; transform: translateY(-1px); }
        .btn-bs-custom:active { transform: translateY(0); }
        .WorkflowBlock td { background: transparent !important; border: none !important; }
    `;
    document.head.appendChild(style);

    // 3. Función maestra de diseño
    function aplicarMagia() {
        console.log("⚡ [SynergyStyler] Aplicando magia...");

        // -- TABLAS --
        document.querySelectorAll('table:has(.Field), table:has(.Label)').forEach(function(t) {
            if (!t.classList.contains('WorkflowBlock')) {
                t.className = 'table table-sm align-middle bg-white shadow-sm rounded-3 overflow-hidden border mb-4';
                t.style.maxWidth = '1200px';
            }
        });

        // -- INPUTS Y SELECTS --
        document.querySelectorAll('.Field input:not([type="hidden"]), .Field select').forEach(function(el) {
            el.className = el.tagName.toLowerCase() === 'select' ? 'form-select form-select-sm' : 'form-control form-control-sm';
        });

        // -- BOTONES DE ACCIÓN (Lupas) --
        document.querySelectorAll('.Field button').forEach(function(btn) {
            btn.className = 'btn btn-light btn-sm border';
        });

        // -- EL BOTÓN DEL WORKFLOW --
        var workflowTable = document.querySelector('.WorkflowBlock');
        if (workflowTable) {
            workflowTable.querySelectorAll('tr:first-child td').forEach(function(td) {
                var isCurrent = td.classList.contains('stepCurrent') || td.innerHTML.includes('Realizar');
                var text = td.innerText.trim();
                td.innerHTML = `
                    <div class="btn ${isCurrent ? 'btn-primary' : 'btn-outline-success'} shadow-sm" style="height:40px; padding: 8px 20px; font-weight:600; border-radius:8px;">
                        ${text}
                    </div>`;
            });
        }

        estilizarToolbar();
    }

    // --- FUNCIÓN BLINDADA PARA LA BARRA DE COMANDOS ---
    function estilizarToolbar() {
        var targetSelectors = 'button.exButton, button.exButtonSave, button.exButtonDelete, input[type="button"].exButton';
        document.querySelectorAll(targetSelectors).forEach(function(btn) {
            // Si ya tiene nuestra clase, no hacemos nada
            if (btn.classList.contains('btn-bs-custom')) return;

            // CLONACIÓN (La clave): Quitamos todos los eventos basura de Synergy
            var newBtn = btn.cloneNode(true);
            newBtn.classList.add('btn', 'btn-sm', 'btn-bs-custom', 'px-3', 'me-2');
            
            // Asignación de colores
            if (newBtn.id.includes('Save') || newBtn.className.includes('Save')) newBtn.classList.add('btn-success', 'text-white');
            else if (newBtn.id.includes('Delete') || newBtn.className.includes('Delete')) newBtn.classList.add('btn-danger', 'text-white');
            else newBtn.classList.add('btn-outline-secondary');

            // Reemplazamos el viejo por el nuevo clonado
            btn.parentNode.replaceChild(newBtn, btn);
        });
    }

    // Ejecución inicial y recargas AJAX
    setTimeout(aplicarMagia, 100);
    if (typeof Sys !== 'undefined' && Sys.WebForms && Sys.WebForms.PageRequestManager) {
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(aplicarMagia);
    }
})();