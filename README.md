# MF Company — React Store 🇧🇷

Site de loja esportiva premium para a coleção Brasil 2026.

---

## 🚀 Como rodar

```bash
# 1. Entre na pasta do projeto
cd mfcompany-react

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Para gerar o build final (produção)
npm run build
```

---

## 📁 Estrutura de arquivos

```
mfcompany-react/
│
├── public/
│   └── img/                     ← 🖼️  Imagens dos produtos (coloque aqui)
│       ├── camisa-fem.jpg
│       ├── camisa-away.jpg
│       ├── camisa-masc1.jpg
│       └── camisa-banner.jpg
│
├── src/
│   ├── main.jsx                 ← Ponto de entrada React
│   ├── App.jsx                  ← Componente raiz (monta tudo)
│   │
│   ├── data/
│   │   ├── products.js          ← ✏️  EDITE AQUI: lista de produtos
│   │   └── config.js            ← ✏️  EDITE AQUI: WhatsApp, Instagram
│   │
│   ├── hooks/
│   │   ├── useScrolled.js       ← Detecta scroll para header
│   │   └── useIntersection.js   ← Animações de fade-in
│   │
│   ├── styles/
│   │   └── global.css           ← Variáveis CSS globais e reset
│   │
│   └── components/
│       ├── Header/
│       │   ├── Header.jsx
│       │   └── Header.module.css
│       ├── Hero/
│       │   ├── Hero.jsx
│       │   └── Hero.module.css
│       ├── Marquee/
│       │   ├── Marquee.jsx
│       │   └── Marquee.module.css
│       ├── Collection/
│       │   ├── Collection.jsx
│       │   └── Collection.module.css
│       ├── ProductCard/
│       │   ├── ProductCard.jsx
│       │   └── ProductCard.module.css
│       ├── Modal/
│       │   ├── Modal.jsx
│       │   └── Modal.module.css
│       ├── About/
│       │   ├── About.jsx
│       │   └── About.module.css
│       └── Footer/
│           ├── Footer.jsx
│           └── Footer.module.css
│
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ Como personalizar

### Trocar o número do WhatsApp
Abra `src/data/config.js` e altere:
```js
whatsappNumber: '5581999999999', // coloque seu número com DDI+DDD
```

### Adicionar ou editar produtos
Abra `src/data/products.js` e edite o array:
```js
{
  id: 5,
  name: 'Nova Camisa',
  price: 'R$ 129,90',
  tag: 'Novo',
  tagVariant: 'gold',    // 'green' ou 'gold'
  color: 'Branco / Azul',
  img: '/img/nova-camisa.jpg',   // coloque a imagem em public/img/
  description: 'Descrição da camisa...',
}
```

### Adicionar novas imagens
Coloque os arquivos `.jpg` ou `.png` na pasta `public/img/` e referencie como `/img/nome-do-arquivo.jpg` no `products.js`.

---

## 🛠️ Tecnologias

- **React 18** com Vite
- **CSS Modules** (cada componente tem seu próprio `.module.css`)
- **Sem dependências extras** — só React puro
- **Fontes**: Bebas Neue + DM Sans (Google Fonts)
