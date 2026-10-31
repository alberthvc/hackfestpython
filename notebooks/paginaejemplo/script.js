// Marca que JS está activo (las animaciones solo aplican si hay JS)
document.documentElement.classList.add('js');

const stops = Array.from(document.querySelectorAll('.stop'));
const chips = Array.from(document.querySelectorAll('.chip'));

// Alterna izquierda/derecha solo entre las paradas visibles
function aplicarLados() {
    stops
        .filter((s) => !s.hidden)
        .forEach((s, i) => {
            s.classList.toggle('side-left', i % 2 === 0);
            s.classList.toggle('side-right', i % 2 === 1);
        });
}

// Filtro por zona
chips.forEach((chip) => {
    chip.addEventListener('click', () => {
        const filtro = chip.dataset.filter;

        chips.forEach((c) => {
            const activo = c === chip;
            c.classList.toggle('is-active', activo);
            c.setAttribute('aria-pressed', String(activo));
        });

        stops.forEach((s) => {
            s.hidden = filtro !== 'all' && s.dataset.zone !== filtro;
        });

        aplicarLados();
    });
});

// Aparición suave al hacer scroll
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                observer.unobserve(e.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.stop, .tip').forEach((el) => observer.observe(el));

// Año actual en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

aplicarLados();
