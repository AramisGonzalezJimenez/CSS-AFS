(function() {
    // 1. Evitamos duplicar los estilos si la página se recarga por detrás
    if (document.getElementById('synergy-modern-styles')) return;

    // 2. Creamos la etiqueta de estilo dinámicamente
    var estilo = document.createElement('style');
    estilo.id = 'synergy-modern-styles';
    estilo.type = 'text/css';

    // 3. Metemos todo el diseño moderno adaptado a tu HTML de Synergy
    estilo.innerHTML = `
        /* Fuente global y contenedor */
        #nano-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            background-color: #f8fafc !important;
            padding: 20px !important;
        }

        /* Modernizar la barra de Workflow (Crear / Realizar) */
        .WorkflowBlock {
            width: 100% !important;
            border-collapse: separate !important;
            border-spacing: 6px !important;
            margin-bottom: 20px !important;
        }
        .WorkflowBlock td {
            padding: 10px 14px !important;
            border-radius: 6px !important;
            font-weight: 600 !important;
            font-size: 13px !important;
            text-align: center !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
        }
        .WorkflowBlock .stepDone {
            background-color: #f0fdf4 !important;
            color: #166534 !important;
            border: 1px solid #bbf7d0 !important;
        }
        .WorkflowBlock .stepCurrent {
            background-color: #eff6ff !important;
            color: #1e40af !important;
            border: 1px solid #bfdbfe !important;
        }
        .svgStepCurrent {
            width: 10px !important;
            height: 10px !important;
            margin-right: 6px !important;
            fill: #1e40af !important;
        }

        /* Tabla principal del formulario */
        #rcMainTable {
            background: #ffffff !important;
            border-collapse: collapse !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
            overflow: hidden !important;
            border: 1px solid #e2e8f0 !important;
        }
        #rcMainTable td {
            padding: 12px 14px !important;
            border-bottom: 1px solid #f1f5f9 !important;
        }

        /* Cabeceras de sección (Security, Planning, etc.) */
        #rcMainTable span > div {
            background-color: #f1f5f9 !important;
            color: #334155 !important;
            padding: 8px 12px !important;
            border-radius: 6px !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            border-left: 4px solid #64748b !important;
        }

        /* Etiquetas izquierdas */
        .Label {
            font-weight: 500 !important;
            color: #475569 !important;
            font-size: 13px !important;
            background-color: #f8fafc !important;
            width: 15% !important;
        }

        /* Inputs de texto y Selects estilizados tipo Ant Design */
        .Field input[type="text"], 
        .Field select {
            height: 32px !important;
            padding: 4px 11px !important;
            color: #334155 !important;
            font-size: 14px !important;
            background-color: #fff !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 6px !important;
            transition: all 0.2s !important;
            box-sizing: border-box !important;
        }
        .Field input[type="text"]:focus, 
        .Field select:focus {
            border-color: #1677ff !important;
            box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1) !important;
            outline: 0 !important;
        }

        /* Ajuste específico para el campo descripción */
        #Description {
            max-width: 100% !important;
            width: 100% !important;
        }

        /* Checkbox moderno */
        .Field input[type="checkbox"] {
            width: 16px !important;
            height: 16px !important;
            accent-color: #1677ff !important;
            cursor: pointer !important;
        }

        /* Botones de lupa y calendario (SVG) */
        .Field button {
            background: #f5f5f5 !important;
            border: 1px solid #d9d9d9 !important;
            border-radius: 6px !important;
            padding: 4px 8px !important;
            cursor: pointer !important;
            height: 32px !important;
            transition: all 0.2s !important;
        }
        .Field button:hover {
            background: #e6e6e6 !important;
            border-color: #4096ff !important;
        }
        .Field button svg {
            fill: #555555 !important;
            width: 14px !important;
            height: 14px !important;
        }

        /* Enlaces de referencia internos (Aramis, etc.) */
        .Field a, .content a {
            color: #1677ff !important;
            text-decoration: none !important;
            font-size: 13px !important;
            margin-left: 6px !important;
        }
        .Field a:hover, .content a:hover {
            color: #0050b3 !important;
            text-decoration: underline !important;
        }
    `;

    // 4. Insertamos las reglas en el head del CRM de forma inmediata
    document.head.appendChild(estilo);
    console.log("¡Formulario de Synergy modernizado con éxito!");
})();