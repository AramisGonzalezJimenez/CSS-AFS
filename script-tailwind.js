(function() {
    console.log("🚀 [SynergyStyler] ¡Script cargado e iniciando diagnóstico!");
    console.log("📍 URL en la que me estoy ejecutando:", window.location.href);
    console.log("🏠 ¿Es esta la ventana principal superior (Top)?:", window.top === window.self);
    console.log("🛸 ¿Estoy corriendo dentro de un iframe?:", window.top !== window.self);

    // Evitamos duplicar ejecuciones en el mismo entorno
    if (window.hasSynergyStylerInjected) {
        console.log("⚠️ [SynergyStyler] Este entorno ya tiene el script inyectado. Abortando duplicado.");
        return;
    }
    window.hasSynergyStylerInjected = true;

    // --- FUNCIÓN NÚCLEO DE MAQUETACIÓN ---
    function aplicarEstilosBootstrap(targetDoc) {
        if (!targetDoc || !targetDoc.body) {
            console.error("❌ [SynergyStyler] El documento de destino no es válido o no tiene body.");
            return;
        }

        if (targetDoc.getElementById('bootstrap-css-active')) {
            console.log("♻️ [SynergyStyler] Bootstrap ya estaba activo en este documento. Saltando inyección.");
            return;
        }

        console.log("🎨 [SynergyStyler] ¡Inyectando Bootstrap 5.3.8 e Iconos en el documento destino!");

        // Inyectar CSS
        var linkBs = targetDoc.createElement('link');
        linkBs.id = 'bootstrap-css-active';
        linkBs.rel = 'stylesheet';
        linkBs.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css';
        linkBs.crossOrigin = 'anonymous';
        targetDoc.head.appendChild(linkBs);

        // Inyectar Iconos
        var linkIcons = targetDoc.createElement('link');
        linkIcons.id = 'bootstrap-icons-active';
        linkIcons.rel = 'stylesheet';
        linkIcons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        targetDoc.head.appendChild(linkIcons);

        linkBs.onload = function() {
            console.log("⚡ [SynergyStyler] Hojas de estilo cargadas. Aplicando clases a los elementos...");

            // 1. Tablas principales
            var fieldTables = targetDoc.querySelectorAll('table:has(.Field), table:has(.Label)');
            console.log("📊 Tablas de datos encontradas:", fieldTables.length);
            fieldTables.forEach(function(table) {
                if (!table.classList.contains('WorkflowBlock')) {
                    table.className = 'table table-sm align-middle bg-white shadow-sm rounded-3 overflow-hidden border mb-4';
                    table.style.width = '100%';
                    table.style.maxWidth = '1200px';
                }
            });

            // 2. Inputs y Selects
            var inputs = targetDoc.querySelectorAll('.Field input[type="text"]');
            var selects = targetDoc.querySelectorAll('.Field select');
            console.log(`✏️ Inputs encontrados: ${inputs.length} | Desplegables encontrados: ${selects.length}`);
            
            inputs.forEach(function(input) {
                input.className = 'form-control form-control-sm d-inline-block align-middle';
                input.style.width = '100%';
                input.style.maxWidth = '280px';
            });
            selects.forEach(function(select) {
                select.className = 'form-select form-select-sm d-inline-block align-middle';
                select.style.width = '100%';
                select.style.maxWidth = '280px';
            });

            // 3. El botón del Workflow (Crear / Realizar)
            var workflowTable = targetDoc.querySelector('.WorkflowBlock') || targetDoc.querySelector('table[cellspacing="2"]:has(.stepCurrent)');
            if (workflowTable) {
                console.log("🎯 [SynergyStyler] ¡Bloque de Workflow localizado!");
                workflowTable.removeAttribute('width');
                workflowTable.className = 'table table-borderless w-auto mb-4';
                workflowTable.style.borderCollapse = 'separate';
                workflowTable.style.borderSpacing = '12px 4px';

                var buttonCells = workflowTable.querySelectorAll('tr:first-child td');
                buttonCells.forEach(function(td) {
                    td.removeAttribute('nowrap');
                    td.style.width = '180px';
                    td.style.padding = '0';
                    td.style.cursor = 'pointer';

                    var isCurrent = td.classList.contains('stepCurrent') || td.innerHTML.includes('Realizar');
                    var spanText = td.querySelector('span');
                    var text = spanText ? spanText.innerText.trim() : td.innerText.trim();

                    if (isCurrent) {
                        td.innerHTML = `
                            <div class="btn btn-primary fw-bold d-flex align-items-center justify-content-center shadow-sm w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                                <i class="bi bi-check-circle-fill me-2"></i><span>${text}</span>
                            </div>`;
                    } else {
                        td.innerHTML = `
                            <div class="btn btn-outline-success fw-semibold d-flex align-items-center justify-content-center w-100 py-2" style="border-radius: 8px; pointer-events: none;">
                                <i class="bi bi-plus-circle me-2"></i><span>${text}</span>
                            </div>`;
                    }
                });
            } else {
                console.log("❓ [SynergyStyler] No se encontró ninguna tabla de Workflow en este documento.");
            }
        };
    }

    // --- ESTRATEGIA DE DETECCIÓN INTELIGENTE ---
    
    // CASO 1: El script está corriendo directamente DENTRO del iframe objetivo (WflRequests)
    if (window.location.href.includes("WflRequests.aspx") || document.querySelector('.WorkflowBlock') || document.getElementById('rcMainTable')) {
        console.log("✅ [Diagnóstico] El script se está ejecutando DIRECTAMENTE dentro de la página del CRM. Aplicando estilos al documento local...");
        aplicarEstilosBootstrap(document);
    } 
    // CASO 2: El script está fuera e intenta buscar el iframe '#MainWindow'
    else {
        console.log("🔍 [Diagnóstico] Buscando el iframe '#MainWindow' desde el exterior...");
        
        // Buscar en el documento actual o subiendo al padre superior
        var mainWindow = document.getElementById('MainWindow') || (window.top ? window.top.document.getElementById('MainWindow') : null);
        
        if (mainWindow) {
            console.log("🎯 [Diagnóstico] ¡Iframe #MainWindow encontrado con éxito!");
            
            // Intentar inyectar inmediatamente por si ya cargó
            try {
                var iframeDoc = mainWindow.contentDocument || mainWindow.contentWindow.document;
                console.log("🔑 [Diagnóstico] Acceso concedido al contenido del iframe.");
                aplicarEstilosBootstrap(iframeDoc);
            } catch(e) {
                console.error("❌ [Diagnóstico] Error de seguridad CORS al leer el iframe activo:", e.message);
            }

            // Escuchar futuras recargas de navegación del iframe
            mainWindow.addEventListener('load', function() {
                console.log("🔄 [Diagnóstico] El iframe #MainWindow ha navegado o se ha recargado. Re-aplicando estilos...");
                try {
                    var currentDoc = mainWindow.contentDocument || mainWindow.contentWindow.document;
                    aplicarEstilosBootstrap(currentDoc);
                } catch(err) {
                    console.error("❌ [Diagnóstico] Error CORS en evento load:", err.message);
                }
            });
        } else {
            console.error("❌ [Diagnóstico] ERROR CRÍTICO: No se encuentra el elemento '#MainWindow' en ninguna parte.");
            // Chivato de iframes alternativos
            var todosLosIframes = document.querySelectorAll('iframe');
            console.log(`Total de iframes alternativos en este documento: ${todosLosIframes.length}`);
            todosLosIframes.forEach(function(f, idx) {
                console.log(`  -> [Iframe ${idx}] id="${f.id}" | name="${f.name}" | src="${f.src}"`);
            });
        }
    }
})();