(function() {
    // 1. Configurar Tailwind ANTES de cargarlo para proteger Synergy
    const twConfig = document.createElement('script');
    twConfig.innerHTML = `
        tailwind.config = {
            corePlugins: {
                preflight: false, // ¡CRÍTICO! Esto evita que Tailwind rompa el CSS del CRM
            }
        }
    `;
    document.head.appendChild(twConfig);

    // 2. Inyectar el CDN oficial de Tailwind
    const twScript = document.createElement('script');
    twScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(twScript);

    // 3. Cuando Tailwind cargue, aplicamos clases a tus elementos de Synergy
    twScript.onload = function() {
        console.log("Tailwind cargado con éxito.");

        // Ejemplo: Buscar la tabla principal y darle estilo de tarjeta moderna
        const mainTable = document.getElementById('rcMainTable');
        if (mainTable) {
            mainTable.classList.add('w-full', 'bg-white', 'rounded-xl', 'shadow-lg', 'border', 'border-gray-200', 'overflow-hidden');
        }

        // Ejemplo: Estilizar todos los inputs de texto
        const inputs = document.querySelectorAll('.Field input[type="text"], .Field select');
        inputs.forEach(input => {
            input.classList.add('w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
        });
    };
})();