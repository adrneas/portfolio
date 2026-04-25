# Portfolio editorial bilingue

Portifolio em Next.js com App Router, TypeScript e conteudo local em MDX.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Conteudo

Os arquivos ficam em `content/<colecao>/<locale>/<slug>.mdx`.

Colecoes disponiveis:

- `work`
- `art`
- `notes`
- `lab`

Campos base:

```yaml
title: "Titulo"
slug: "slug-da-pagina"
locale: "pt"
year: 2026
type: "Identidade"
summary: "Resumo curto."
cover: "/covers/imagem.svg"
tags: ["tag"]
featured: true
draft: false
```

Campos extras para `work`:

```yaml
role: "Seu papel"
discipline: ["Product design", "UI"]
client: "Cliente"
collaborators: ["Pessoa ou time"]
outcome: "Resultado"
```

Itens com `draft: true` nao aparecem nas listas nem geram paginas publicas.

## Configuracao

Edite `src/config/site.ts` para trocar nome, bio curta, email, WhatsApp, URL do site e link de CV.

Antes de publicar, substitua `public/cv-placeholder.pdf` pelo CV real ou altere `cvUrl`.

## Rotas

- `/` e `/en`
- `/work`, `/art`, `/notes`, `/lab`
- `/en/work`, `/en/art`, `/en/notes`, `/en/lab`
- `/<colecao>/<slug>` e `/en/<colecao>/<slug>`
- `/about` e `/en/about`
