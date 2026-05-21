(function() {
    // Evitamos duplicar los estilos si se recarga la página
    if (document.getElementById('synergy-pure-css')) return;

    var estilo = document.createElement('style');
    estilo.id = 'synergy-pure-css';
    estilo.type = 'text/css';

    // CSS Puro diseñado específicamente para domar las tablas de Synergy
    estilo.innerHTML = `
        /* =========================================
           Contenedor Principal
        ========================================= */
        #nano-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            background-color: #f8fafc !important;
            padding: 24px !important;
        }

        /* =========================================
           Bloque de Workflow (Crear / Realizar)
        ========================================= */
        .WorkflowBlock {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 12px !important; 
            margin-bottom: 24px !important;
        }
        .WorkflowBlock td {
            padding: 14px 16px !important;
            border-radius: 8px !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            text-align: center !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
        }
        .WorkflowBlock .stepDone {
            background-color: #f0fdf4 !important;
            color: #166534 !important;
            border: 1px solid #bbf7d0 !important;
        }
        .WorkflowBlock .stepDone:hover {
            background-color: #dcfce7 !important;
            transform: translateY(-1px) !important;
        }
        .WorkflowBlock .stepCurrent {
            background-color: #eff6ff !important;
            color: #1e40af !important;
            border: 1px solid #bfdbfe !important;
            box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15) !important;
        }

        /* =========================================
           Tabla Principal del Formulario
        ========================================= */
        #rcMainTable {
            background: #ffffff !important;
            border-collapse: collapse !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            width: 100% !important;
            border: 1px solid #e2e8f0 !important;
        }
        #rcMainTable td {
            padding: 16px 20px !important;
            border-bottom: 1px solid #f1f5f9 !important;
        }
        #rcMainTable span > div {
            background-color: #f8fafc !important;
            color: #334155 !important;
            padding: 10px 16px !important;
            border-radius: 6px !important;
            font-size: 12px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.8px !important;
            border-left: 4px solid #64748b !important;
            font-weight: bold !important;
        }
        .Label, .LabelLeft {
            font-weight: 600 !important;
            color: #475569 !important;
            font-size: 13px !important;
            background-color: #f8fafc !important;
            white-space: nowrap !important;
            width: 15% !important;
        }

        /* =========================================
           Campos de Entrada (Inputs y Selects)
        ========================================= */
        .Field input[type="text"],
        .Field select {
            width: calc(100% - 50px) !important;
            max-width: 400px !important;
            padding: 10px 14px !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            color: #334155 !important;
            transition: all 0.3s !important;
            box-sizing: border-box !important;
            background-color: #ffffff !important;
        }
        .Field input[type="text"]:focus,
        .Field select:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
            outline: none !important;
        }
        .Field input[type="checkbox"] {
            width: 18px !important;
            height: 18px !important;
            cursor: pointer !important;
            accent-color: #3b82f6 !important;
        }

        /* =========================================
           Botones e Iconos SVG
        ========================================= */
        .Field button {
            background-color: #f1f5f9 !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            padding: 8px 12px !important;
            margin-left: 8px !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            height: 40px !important; /* Igualar altura de inputs */
        }
        .Field button:hover {
            background-color: #e2e8f0 !important;
            border-color: #94a3b8 !important;
        }
        .Field a, td.content a {
            color: #2563eb !important;
            text-decoration: none !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            margin-left: 8px !important;
        }
        .Field a:hover, td.content a:hover {
            color: #1d4ed8 !important;
            text-decoration: underline !important;
        }
    `;
    
    document.head.appendChild(estilo);
    console.log("¡Diseño de Synergy inyectado de forma nativa!");
})();