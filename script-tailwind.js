(function() {
    // 1. Forzar un tema claro/corporativo para que no choque con el CRM
    document.documentElement.setAttribute('data-theme', 'light');

    // 2. Inyectar CSS de DaisyUI vía CDN
    const daisyCSS = document.createElement('link');
    daisyCSS.href = "https://cdn.jsdelivr.net/npm/daisyui@latest/dist/full.min.css";
    daisyCSS.rel = "stylesheet";
    daisyCSS.type = "text/css";
    document.head.appendChild(daisyCSS);

    // 3. Configurar Tailwind ANTES de cargarlo para proteger Synergy
    const twConfig = document.createElement('script');
    twConfig.innerHTML = `
        tailwind.config = {
            corePlugins: {
                preflight: false, // Mantenemos desactivado el reset global para no romper el CRM
            }
        }
    `;
    document.head.appendChild(twConfig);

    // 4. Inyectar el motor de Tailwind JS
    const twScript = document.createElement('script');
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);

    // 5. Aplicar clases de DaisyUI cuando Tailwind termine de cargar
    twScript.onload = function() {
        console.log("Tailwind y DaisyUI cargados y listos.");

        // -- ESTILIZAR CONTENEDORES PRINCIPALES --
        // Convertimos el contenedor principal en una tarjeta de DaisyUI
        const container = document.getElementById('nano-container');
        if (container) {
            container.classList.add('bg-base-200', 'p-6', 'rounded-xl');
        }

        const mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.classList.add('bg-base-100', 'shadow-xl', 'rounded-box', 'border', 'border-base-300', 'w-full', 'overflow-hidden');
        }

        // -- ESTILIZAR INPUTS DE TEXTO --
        const inputs = document.querySelectorAll('.Field input[type="text"]');
        inputs.forEach(input => {
            // "input input-bordered input-sm" son clases nativas de DaisyUI
            input.className = "input input-bordered input-sm w-full max-w-xs shadow-sm"; 
        });

        // -- ESTILIZAR DESPLEGABLES (SELECT) --
        const selects = document.querySelectorAll('.Field select');
        selects.forEach(select => {
            select.className = "select select-bordered select-sm w-full max-w-xs shadow-sm";
        });

        // -- ESTILIZAR CAJAS DE VERIFICACIÓN (CHECKBOX) --
        const checkboxes = document.querySelectorAll('.Field input[type="checkbox"]');
        checkboxes.forEach(chk => {
            chk.className = "checkbox checkbox-primary checkbox-sm";
        });

        // -- ESTILIZAR BOTONES PEQUEÑOS (Lupas, calendarios) --
        const buttons = document.querySelectorAll('.Field button');
        buttons.forEach(btn => {
            // Los hacemos botones cuadrados, pequeños y sutiles (ghost)
            btn.className = "btn btn-sm btn-square btn-ghost text-base-content";
        });
        
        // -- ESTILIZAR EL WORKFLOW (Barra superior) --
        const workflowBlock = document.querySelector('.WorkflowBlock');
        if (workflowBlock) {
            workflowBlock.classList.add('w-full', 'mb-6');
            
            const stepCurrent = workflowBlock.querySelector('.stepCurrent');
            if (stepCurrent) stepCurrent.className = "badge badge-primary badge-lg p-4 font-bold shadow-md";
            
            const stepsDone = workflowBlock.querySelectorAll('.stepDone');
            stepsDone.forEach(step => {
                step.className = "badge badge-success badge-outline badge-lg p-4 cursor-pointer hover:bg-success hover:text-white transition-colors";
            });
        }
    };
})();