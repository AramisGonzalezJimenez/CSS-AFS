(function() {
    // 1. Configurar Tailwind para que aplaste el CSS del CRM
    const twConfig = document.createElement('script');
    twConfig.innerHTML = `
        tailwind.config = {
            // Esto es magia: obliga a Tailwind a ganar cualquier conflicto de CSS
            // solo dentro de tu contenedor, sin romper el menú de Synergy.
            important: '#nano-container', 
            corePlugins: {
                preflight: false, // Mantenemos el reset global apagado por seguridad
            }
        }
    `;
    document.head.appendChild(twConfig);

    // 2. Inyectar el motor de Tailwind JS
    const twScript = document.createElement('script');
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);

    // 3. Aplicar clases cuando Tailwind cargue
    twScript.onload = function() {
        console.log("Tailwind configurado en modo agresivo.");

        // -- CONTENEDOR Y TABLA PRINCIPAL --
        const mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.className = 'w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-sm';
        }

        // Títulos de sección (Security, Planning...)
        const sectionTitles = document.querySelectorAll('#rcMainTable span > div');
        sectionTitles.forEach(title => {
            title.className = 'bg-slate-50 text-slate-600 px-4 py-2 font-bold uppercase tracking-wider text-xs border-l-4 border-blue-500';
        });

        // -- INPUTS Y SELECTS (Estilo DaisyUI input-bordered) --
        const inputs = document.querySelectorAll('.Field input[type="text"], .Field select');
        inputs.forEach(input => {
            input.className = 'h-10 w-full max-w-sm px-4 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-700';
        });

        // -- CHECKBOXES --
        const checkboxes = document.querySelectorAll('.Field input[type="checkbox"]');
        checkboxes.forEach(chk => {
            chk.className = 'h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer';
        });

        // -- BOTONES LATERALES (Lupa / Calendario) (Estilo btn-ghost cuadrado) --
        const buttons = document.querySelectorAll('.Field button');
        buttons.forEach(btn => {
            btn.className = 'h-10 w-10 ml-2 inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors border border-transparent cursor-pointer';
        });

        // -- ENLACES DE REFERENCIA --
        const links = document.querySelectorAll('.Field a, .content a');
        links.forEach(link => {
            link.className = 'text-blue-600 hover:text-blue-800 font-medium ml-2 underline decoration-blue-300 hover:decoration-blue-800 transition-colors';
        });

        // -- WORKFLOW (Botones superiores) --
        const workflowBlock = document.querySelector('.WorkflowBlock');
        if (workflowBlock) {
            workflowBlock.style.borderSpacing = '8px'; // El border-spacing a veces necesita JS puro en tablas antiguas
            
            const stepCurrent = workflowBlock.querySelector('.stepCurrent');
            if (stepCurrent) {
                stepCurrent.className = 'px-6 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border-2 border-blue-200 shadow-sm text-center';
            }
            
            const stepsDone = workflowBlock.querySelectorAll('.stepDone');
            stepsDone.forEach(step => {
                step.className = 'px-6 py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl border border-emerald-200 cursor-pointer hover:bg-emerald-100 hover:border-emerald-300 transition-all text-center';
            });
        }
    };
})();