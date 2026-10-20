# HL · Landing de diagnóstico

Landing page da HL para captar pedidos de diagnóstico grátis. Criada por Hélio Levi.

Publicada em: https://heliolevi.github.io/landpage_insta/

## Como funciona
- A página explica o que a HL resolve, o processo (Diagnóstico, Escopo, Construção, Entrega), projetos reais e dúvidas comuns.
- O quiz de 3 passos monta uma mensagem e abre o WhatsApp com tudo preenchido.
- O número que recebe os pedidos fica em `script.js`:

```js
const WHATSAPP = '5598988554840';
```

## Estrutura

```text
landpage_insta/
├── index.html
├── styles.css
├── script.js
├── assets/      foto do Hélio (webp + jpg)
├── fonts/       Lexend Exa, Manrope, JetBrains Mono (OFL, self-hosted)
└── docs/design-tokens.md
```

## Rodar localmente

```bash
python -m http.server 8000
```

Abra http://localhost:8000.

## Autor

Hélio Levi · [Portfólio](https://heliolevi.github.io/Projeto-portifolio/) · [Instagram @hl.build](https://www.instagram.com/hl.build/)
