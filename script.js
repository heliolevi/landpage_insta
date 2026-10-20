// HL · landing de captura
// Quiz de 3 passos que monta a mensagem e abre o WhatsApp. Sem dependências.

const WHATSAPP = '5598988554840';

/* ---------- traço do "Como funciona" ---------- */
const trace = document.querySelector('[data-trace]');
if (trace && 'IntersectionObserver' in window) {
  const setWidth = () => {
    const nodes = trace.querySelectorAll('.trace__node');
    const d = nodes[nodes.length - 1].getBoundingClientRect().left - nodes[0].getBoundingClientRect().left;
    trace.style.setProperty('--trace-d', `${d}px`);
  };
  setWidth();
  window.addEventListener('resize', setWidth, { passive: true });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          trace.classList.add('is-live');
          io.disconnect();
        }
      });
    },
    { threshold: 0.45 }
  );
  io.observe(trace);
} else if (trace) {
  trace.classList.add('is-live');
}

/* ---------- CTA fixo no celular ---------- */
const dock = document.querySelector('[data-dock]');
const hero = document.querySelector('.hero');
const capture = document.querySelector('#diagnostico');
if (dock && hero && capture && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let captureVisible = false;
  const update = () => {
    const on = !heroVisible && !captureVisible;
    dock.classList.toggle('is-on', on);
    dock.setAttribute('aria-hidden', String(!on));
    dock.tabIndex = on ? 0 : -1;
  };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }, { threshold: 0 }).observe(hero);
  new IntersectionObserver(([e]) => { captureVisible = e.isIntersecting; update(); }, { threshold: 0 }).observe(capture);
}

/* ---------- quiz ---------- */
const form = document.getElementById('quiz');
if (form) {
  const steps = [...form.querySelectorAll('.quiz__step')];
  const btnNext = form.querySelector('[data-next]');
  const btnBack = form.querySelector('[data-back]');
  const btnSubmit = form.querySelector('[data-submit]');
  const progress = form.querySelector('[data-progress]');
  const bar = form.querySelector('[data-bar]');
  const done = form.querySelector('[data-done]');
  const waLink = form.querySelector('[data-wa-link]');
  let current = 0;

  const show = (i) => {
    steps.forEach((s, idx) => {
      s.hidden = idx !== i;
      s.classList.toggle('is-in', idx === i);
    });
    current = i;
    progress.textContent = `Pergunta ${i + 1} de ${steps.length}`;
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    btnBack.hidden = i === 0;
    btnNext.hidden = i === steps.length - 1;
    btnSubmit.hidden = i !== steps.length - 1;
  };

  const radioError = (step) => {
    const name = step.querySelector('input[type="radio"]').name;
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    const err = step.querySelector('[data-error]');
    err.textContent = checked ? '' : 'Escolha uma opção para continuar.';
    return !!checked;
  };

  // escolher uma opção já avança (menos um clique)
  steps.slice(0, -1).forEach((step, i) => {
    step.addEventListener('change', (e) => {
      if (e.target.matches('input[type="radio"]')) {
        step.querySelector('[data-error]').textContent = '';
        setTimeout(() => { show(i + 1); focusStep(i + 1); }, 180);
      }
    });
  });

  const focusStep = (i) => {
    const first = steps[i].querySelector('input');
    if (first) first.focus({ preventScroll: true });
  };

  btnNext.addEventListener('click', () => {
    if (!radioError(steps[current])) return;
    show(current + 1);
    focusStep(current);
  });
  btnBack.addEventListener('click', () => {
    show(current - 1);
    focusStep(current);
  });

  // máscara leve de telefone
  const whats = form.querySelector('#whats');
  whats.addEventListener('input', () => {
    const d = whats.value.replace(/\D/g, '').slice(0, 11);
    let out = d;
    if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
    whats.value = out;
  });

  const setError = (name, msg) => {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    const input = form.querySelector(`[name="${name}"]`);
    if (el) el.textContent = msg;
    if (input && input.type !== 'checkbox') input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };

  ['nome', 'whats'].forEach((n) => {
    const el = form.querySelector(`[name="${n}"]`);
    // só cobra no blur depois de algo digitado ou de uma tentativa de envio (evita erro ao só passar pelo campo)
    el.addEventListener('blur', () => { if (el.value.trim() || form.dataset.tried) validate(n); });
  });

  form.querySelector('[name="aceite"]').addEventListener('change', () => { if (form.dataset.tried) validate('aceite'); });

  const validate = (only) => {
    const data = new FormData(form);
    const checks = {
      nome: () => setError('nome', (data.get('nome') || '').trim().length >= 2 ? '' : 'Escreve seu nome para eu saber com quem falo.'),
      whats: () => setError('whats', (data.get('whats') || '').replace(/\D/g, '').length >= 10 ? '' : 'Confere o número: precisa ter DDD + telefone.'),
      aceite: () => setError('aceite', data.get('aceite') ? '' : 'Marque a autorização para eu poder te chamar.'),
    };
    if (only) return checks[only]();
    const results = Object.keys(checks).map((k) => checks[k]());
    return results.every(Boolean);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.dataset.tried = '1';
    if (!validate()) {
      const firstBad = form.querySelector('[aria-invalid="true"]') || form.querySelector('[name="aceite"]');
      firstBad && firstBad.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      'Oi, Hélio! Quero agendar o diagnóstico grátis da HL.',
      '',
      `Nome: ${data.nome.trim()}`,
      `Negócio: ${(data.negocio || '').trim() || 'Não informado'}`,
      `Quero: ${data.objetivo}`,
      `Hoje isso é feito: ${data.hoje}`,
      `WhatsApp: ${data.whats}`,
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    btnSubmit.disabled = true;
    window.open(url, '_blank', 'noopener');

    waLink.href = url;
    steps.forEach((s) => (s.hidden = true));
    form.querySelector('.quiz__nav').hidden = true;
    progress.textContent = 'Concluído';
    bar.style.width = '100%';
    done.hidden = false;
    done.focus();
  });

  show(0);
}
