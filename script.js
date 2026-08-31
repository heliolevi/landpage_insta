const form = document.getElementById('leadForm');

if (window.anime) {
  const animatedElements = document.querySelectorAll('.hero-copy, .hero-card, .form-section, .lead-form > *');

  anime({
    targets: animatedElements,
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 700,
    delay: anime.stagger(70, { start: 100 }),
    easing: 'easeOutCubic',
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const serviceMap = {
    automacao: 'Automação de processos',
    site: 'Criação de site / landing page',
    sistema: 'Sistema / dashboard',
    consultoria: 'Consultoria estratégica',
    projeto_personalizado: 'Projeto personalizado',
  };

  const budgetMap = {
    ate_1k: 'Até R$ 1.000',
    '1k_3k': 'R$ 1.000 - R$ 3.000',
    '3k_10k': 'R$ 3.000 - R$ 10.000',
    '10k_mais': 'Acima de R$ 10.000',
  };

  const urgencyMap = {
    normal: 'Normal',
    prioridade: 'Prioridade',
    urgente: 'Urgente',
  };

  const message = [
    'Olá, Hélio Levi! Tenho interesse em um projeto.',
    '',
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone}`,
    `Empresa: ${data.empresa || 'Não informado'}`,
    `Serviço: ${serviceMap[data.servico] || data.servico}`,
    `Urgência: ${urgencyMap[data.urgencia] || data.urgencia || 'Normal'}`,
    `Data preferida: ${data.dataPreferencia || 'Não informada'}`,
    `Orçamento: ${budgetMap[data.orcamento] || data.orcamento || 'Não informado'}`,
    '',
    'Descrição do projeto:',
    data.descricao,
  ].join('\n');

  const whatsappNumber = '5598988554840';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');
  form.reset();

  if (window.anime) {
    anime({
      targets: form,
      scale: [1, 1.01, 1],
      duration: 450,
      easing: 'easeOutCubic',
    });
  }

  alert('Sua solicitação foi preparada no WhatsApp. Você pode revisar e enviar para Hélio Levi.');
});
