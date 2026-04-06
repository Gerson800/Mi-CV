// Pequeñas animaciones y funcionalidad del PDF
(function() {
  // Animación de barras de progreso cuando aparecen en pantalla
  const progressBars = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Forzamos que el ancho ya viene inline, solo para darle efecto
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.transition = 'width 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        bar.style.width = width;
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  progressBars.forEach(bar => progressObserver.observe(bar));

  // Efecto fade-up en cada sección al hacer scroll
  const secciones = document.querySelectorAll('.seccion');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  secciones.forEach(sec => fadeObserver.observe(sec));

  // Botón para generar PDF (usando la ventana de impresión nativa)
  const pdfBtn = document.getElementById('downloadPDFBtn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      const originalTitle = document.title;
      document.title = 'CV_Gerson_Antifis_Amador_Desarrollador';

      // Inyectamos estilos extra para la versión impresa / PDF
      const printStyles = document.createElement('style');
      printStyles.id = 'print-styles';
      printStyles.innerHTML = `
        @media print {
          body {
            background: white;
            padding: 0;
            margin: 0;
          }
          .cv-container {
            box-shadow: none;
            border-radius: 0;
            grid-template-columns: 34% 66%;
            margin: 0;
            max-width: 100%;
          }
          .btn-pdf {
            display: none;
          }
          .avatar {
            box-shadow: none;
            border: 1px solid #ccc;
          }
          .progress-bar {
            background: #ddd;
          }
          .progress {
            background: #1e2f3f;
          }
          a, .contact-list a {
            text-decoration: none;
            color: black;
          }
          .sidebar {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .card-date, .idioma-nivel, .titulo {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `;
      document.head.appendChild(printStyles);

      window.print();

      // Limpiamos los estilos extra después de un momento
      setTimeout(() => {
        const styleElem = document.getElementById('print-styles');
        if (styleElem) styleElem.remove();
        document.title = originalTitle;
      }, 500);
    });
  }

  // Si por algún motivo falta el ancho de alguna barra (por si acaso)
  const allProgress = document.querySelectorAll('.progress');
  allProgress.forEach(prog => {
    if (!prog.style.width || prog.style.width === '') {
      // Caso improbable, pero lo dejamos cubierto
      prog.style.width = '70%';
    }
  });

  console.log('CV listo - ¡personaliza los datos con tu información!');
})();