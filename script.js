const form = document.getElementById('leadForm');

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
  alert('Sua solicitação foi preparada no WhatsApp. Você pode revisar e enviar para Hélio Levi.');
});
