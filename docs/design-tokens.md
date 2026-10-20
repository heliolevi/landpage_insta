# HL landing · decisões de design

**Fonte de verdade:** design system HL (manual de marca), tema dark.

| Item | Escolha |
|---|---|
| Cores | `bg` #050b1c, `deep` #0a1e43, `cobalt` #1963a6, `azure` #1aa0c5, `cyan` #22c3e6 (único acento), `foam` #dbeaf3 |
| Tipografia | Lexend Exa 500 (títulos), Manrope 400/600/700 (texto e botões), JetBrains Mono 400 (labels, código). Self-hosted em `/fonts`, tamanhos fluidos com `clamp()` |
| Espaço | Grade de 4px; seções com `clamp(64px, …, 112px)` |
| Forma | Controles 10px, painéis 16px, pílula só para status |
| Ícones | Lucide (ISC), traço 1.5, sprite inline |
| Marca | Trace construída pelo módulo do manual: hastes 1u×6u, barra 1,75u, pé 1u, nó 1u a 0,375u do pé |
| Movimento | Um momento autoral: o pacote ciano percorre o fio de "Como funciona" quando a seção entra na tela. Entrada leve do hero. Tudo desliga com `prefers-reduced-motion` |
| Textura | Maré (gradiente + grão) no fundo; retícula de pontos em um card de projeto |

## Conversão
- Um único CTA em toda a página: **Agendar diagnóstico**.
- Formulário trocado por quiz de 3 passos (objetivo, como é feito hoje, contato). Escolher uma opção já avança.
- O envio monta a mensagem e abre o WhatsApp (5598988554840). Estado de sucesso dentro do card, com link de reserva se o pop-up for bloqueado.
- CTA fixo no rodapé do celular, escondido no hero e no formulário.
