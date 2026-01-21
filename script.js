// 1. Animação dos Contadores (Versão Corrigida para Decimais)
const counters = document.querySelectorAll('.counter');
const speed = 150; // Ajustado para uma subida mais fluída

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let currentDecimalValue = 0; // Variável interna para cálculo preciso

        const updateCount = () => {
            const inc = target / speed;

            if (currentDecimalValue < target) {
                currentDecimalValue += inc;
                
                // Lógica de exibição:
                // Se o alvo for inteiro (ex: 20), mostra sem casas decimais.
                // Se for decimal (ex: 4.8), mostra com uma casa decimal (.toFixed(1)).
                if (Number.isInteger(target)) {
                    counter.innerText = Math.ceil(currentDecimalValue);
                } else {
                    counter.innerText = currentDecimalValue.toFixed(1);
                }
                
                setTimeout(updateCount, 10);
            } else {
                // Garante que o número final seja exatamente o alvo
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer para disparar a animação ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#dados');
if(statsSection) observer.observe(statsSection);

// 2. Lógica do Formulário
const form = document.getElementById('newsletter-form');
const feedback = document.getElementById('form-feedback');

if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        form.style.display = 'none';
        feedback.innerHTML = `<p style="font-weight: bold;">Obrigado! O guia será enviado para ${email}. 🚀</p>`;
    });
}

// 3. Alternância de Tema (Dark/Light Mode)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerText = '🌙';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    themeToggle.innerText = isLight ? '🌙' : '🌓';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});