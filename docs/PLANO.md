# Site do Koti — plano de desenvolvimento

Fonte da verdade visual: canvas "Koti · Design", página "Site · koti.toski-labs.com.br" (quadros Home claro/celular/escuro/EN, 404, Suporte e Privacidade PT/EN).
Stack: Astro 7 + TypeScript (strict) + Tailwind 4 (`@tailwindcss/vite`) + `@toski-labs/ds` 0.5.3 com o tema Koti (Ameixa).
Hospedagem: Firebase Hosting, projeto `toski-labs` (Plano Spark), site `koti-toskilabs` (`https://koti-toskilabs.web.app`, criado em 10 out 2026), com o endereço final `koti.toski-labs.com.br`.
Regra: tudo gratuito. Site estático, sem cookies, sem Google Analytics. JavaScript no navegador só para: tema e idioma (menu de configurações) e, no Suporte, o menu do e-mail e o botão de copiar.
Modelos seguidos: `toski-labs-web` (estrutura, i18n, layout, acessibilidade) e `pethealth-web` (CSP, checagens automáticas, imagens OG geradas por script, JSON-LD).

## Decisões
- E-mail de suporte e contato: **toskilabs@gmail.com**. Resposta em até 2 dias úteis.
- Idiomas: português em `/`, inglês em `/en`. Sem redirecionamento automático; o menu PT/EN troca para a página equivalente.
- **Rotas (não mudar depois de publicadas: vão para a App Store e o Google):** `/`, `/suporte`, `/privacidade` · `/en`, `/en/support`, `/en/privacy` · `404` (bilíngue, `noindex`).
- PWA: projeto separado, no projeto Firebase do Koti.
- Tema: automático pelo sistema, com menu de configurações (Automático/Claro/Escuro, salvo em `localStorage` `toski-theme`, aplicado por script inline antes da pintura). A chave é a mesma do toski-labs-web.
- Fonte: Outfit hospedada no site (`@fontsource-variable/outfit`), sem Google Fonts.
- Imagens: ícone do Koti vindo do DS (`products/koti`), inline no HTML. Favicon, apple-touch-icon e ícones 192/512 são gerados por `scripts/generate-assets.mjs` (ficam no `.gitignore`).
- Privacidade em Markdown (`src/content/legal/<idioma>/`), com o sumário e a numeração gerados dos `##`.
- Suporte: o botão "Escrever e-mail" abre um menu com Gmail e Outlook (nova aba, `rel="noopener noreferrer"`) e o app de e-mail; o `mailto:` sozinho não faz nada para quem não tem app de e-mail configurado. "Copiar e-mail" aparece só se o navegador tiver a API de área de transferência e avisa em `aria-live`.
- Preços: "Em breve" / "Soon" até o lançamento na App Store (a Home não tem `offers` no JSON-LD).
- Textos de SEO da Home (aprovados): ver "Textos alterados em relação ao canvas" abaixo.
- `@id` da Organization: `https://toski-labs.web.app/#toski-labs` (o mesmo do toski-labs-web). O pethealth-web usa outro (`https://toski-labs.com.br/#organization`): os dois sites já divergem; alinhar quando a Toski Labs tiver domínio próprio.
- Tokens que o DS 0.5.3 ainda não exporta para a web, criados como variáveis locais em `src/styles/global.css` (bloco `TODO(ds)`): cartão "agora" do celular, moldura do celular, destaque do rodapé, selos Lista/Tarefa/Conta e avatar ameixa-claro. Pedir ao DS e apagar o bloco quando sair.

## Textos alterados em relação ao canvas (atualizar o canvas)
| Onde | Agora (PT · EN) |
|---|---|
| Hero, parágrafo | O app para casal ou quem divide casa organizar listas, tarefas e contas. O que um marca, o outro vê na hora. · The app for couples and housemates to share lists, chores and bills. What one checks off, the other sees right away. |
| h2 Recursos | Lista de compras, tarefas e contas da casa, compartilhadas · Shared grocery lists, chores and household bills |
| h3 recursos | Lista de compras compartilhada, ao vivo · Shared grocery list, live / Lista de mercado em tempo real · Real-time grocery list at the store / Tarefas de casa com rodízio · Chore rotation for the home / Contas da casa com boleto e Pix · Household bills with boleto and Pix / Agenda da casa · Home agenda / Dividir as contas e acertar no Pix · Split bills and settle up with Pix |
| h2 Planos | Grátis para casal; Plus para a casa toda · Free for couples; Plus for the whole home |
| Cabeçalho | O botão PT/EN do canvas virou o menu de configurações (tema + idioma), na mesma posição |
| Suporte | "Escrever e-mail" abre um menu (Gmail, Outlook, app de e-mail); o canvas mostra um botão simples |
| 404 | Bilíngue (PT em cima, EN embaixo, com os botões "Ir para o início", "Suporte" e "Go to home"); o canvas tem um quadro por idioma |

## Fase 0 — Fundação ✅ (10 out 2026)
Astro + TS strict + Tailwind 4 + DS com o tema Koti, Outfit local, i18n em `src/i18n/ui.ts`, `BaseLayout` com SEO (canonical, hreflang pt-BR/en/x-default, Open Graph e Twitter completos, `theme-color` claro/escuro, JSON-LD em `@graph`), Header, Footer, CSP em `<meta>` calculada pelo Astro, scripts de checagem copiados do pethealth-web.

## Fase 1 — Páginas ✅ (10 out 2026)
Home (hero com celular, 6 recursos, destaque do mercado, "Sem iPhone", planos, detalhes e ajuda), Suporte (FAQ com 7 perguntas, menu de e-mail, copiar e-mail), Privacidade (10 seções, Markdown), 404.

## Fase 2 — SEO e qualidade ✅ (10 out 2026)
- Título (50–60) e descrição (140–155) por página nos dois idiomas, em `src/data/seo.ts`.
- JSON-LD: `Organization`, `WebSite`, `MobileApplication` (iOS 18+, `LifestyleApplication`, pt-BR e en, sem `offers`), `BreadcrumbList` (Suporte e Privacidade), `FAQPage` (Suporte, as mesmas perguntas da página).
- `@astrojs/sitemap` com pares PT↔EN e `x-default`, sem a 404; `robots.txt` aponta para `/sitemap-index.xml`.
- Imagens de compartilhamento 1200×630 (Home PT e EN) geradas por script, com o ícone e "Nossa casa, juntos." / "Our home, together."
- Smart App Banner pronto em `src/data/app.ts` (`APP_STORE_ID`); liga sozinho quando houver ID.
- CI do GitHub (`.github/workflows/ci.yml`): tudo do `npm run ci` menos o Lighthouse, que fica só na máquina (nota 100 exata oscila em runner compartilhado, e o Chrome dos perfis escuros precisa de ajuste de sandbox lá). Rodar `npm run ci` completo antes de cada deploy.
- Acessibilidade: axe-core sem nenhuma violação (64 varreduras: 7 páginas × claro/escuro × 390/1280 px, com o menu de configurações e o menu do e-mail abertos). Contraste mínimo 4,5:1 conferido pelo axe, inclusive o Ameixa sobre o tint.

## Fase 3 — Publicação no Firebase ✅ (10 out 2026)
- O site do Koti é um **segundo site de Hosting no projeto `toski-labs`**, não um projeto do Koti: `firebase hosting:sites:create koti-toskilabs --project toski-labs`.
- Configurado: `.firebaserc` (target `koti` → `koti-toskilabs`), `firebase.json` (`"target": "koti"`, cleanUrls, sem barra no fim, cache longo em `/_astro/**`, CSP `frame-ancestors`, `nosniff`, `Referrer-Policy`) e `npm run deploy` (`npm run build && firebase deploy --only hosting:koti`).
- **Deploy feito em 10 out 2026** (feito pela Stefany). Para republicar: `npm run deploy`.
- **Domínio `koti.toski-labs.com.br` conectado** ao site `koti-toskilabs` (registrado em 10 out 2026, a pedido da Stefany).

## Situação em 10 out 2026

### Feito e conferido
- Todas as 7 páginas (PT, EN e 404) com o layout do canvas; `astro check` com 0 erros, 0 avisos; build sem avisos.
- `npm run ci` completo passa: `astro check`, build, CSP, SEO, links, JSON-LD, axe e Lighthouse.
- **Lighthouse** (4 perfis: celular e computador × claro e escuro; 7 páginas): **100 em desempenho, acessibilidade, boas práticas e SEO** em todas as páginas, exceto a 404, que tira 63 em SEO por ser `noindex` com status 404 (de propósito; nela valem desempenho e acessibilidade, ambos 100).
- Menu de tema e idioma verificado em navegador: o tema persiste ao recarregar, Esc fecha, os links PT↔EN apontam para a página equivalente.
- Menu do e-mail verificado em navegador (PT e EN): Gmail e Outlook abrem em nova aba, fecha ao escolher, ao clicar fora e com Esc; "Copiar e-mail" muda para "E-mail copiado"/"Email copied", avisa no `aria-live` e volta em 2 s; sem a API de área de transferência o botão some e o e-mail continua visível.
- Capturas 390 e 1280 px, claro e escuro, comparadas com as medidas do canvas (comparação feita contra o código do canvas, não lado a lado em imagem).
- **Rodapé refeito com a estrutura do pethealth-web**: marca do Koti (ícone do DS + "Ko" em `footer-ink` e "ti" em Ameixa clara, `footer-accent`) com a frase "Listas, tarefas e contas da casa, juntos num lugar só."; coluna "Um app da Toski Labs" com `toski-labs.com.br`; coluna Ajuda (Suporte e Privacidade); linha de baixo com o ícone da Toski Labs e "© ano toski labs". Saíram a coluna Projetos, o link do PetHealthTracker e o "Recife, Brasil". Mantidos o botão "Voltar ao topo" no celular, o `aria-labelledby` nos `<nav>` e os alvos de toque de 44 px.
- `main` do remoto sem commits novos antes do CI do rodapé: nada para fazer rebase (conferido em 10 out 2026).

### Não testado
- Não houve teste com leitor de tela de verdade (VoiceOver). Roteiro em `../toski-labs-web/docs/ACESSIBILIDADE.md`.
- Rich Results Test e validador de schema.org: precisam de uma URL pública ou colar o HTML; só a checagem estrutural offline (`npm run check:jsonld`) foi feita. Rodar nos dois depois do deploy.

## Falta
**Publicação (Stefany)**
1. Republicar (`npm run deploy`) para o novo rodapé ir ao ar.

**Com o domínio no ar**
2. **Search Console:** propriedade de prefixo de URL `https://koti.toski-labs.com.br/`, verificada pelo **arquivo HTML** `public/google1c343bc8814b41ea.html` (decisão da Stefany em 10 out 2026, no lugar do Domínio por DNS). **Não apagar o arquivo**, senão a verificação cai. Se o Google recusar por causa do redirect do `cleanUrls` (`.html` → sem extensão), usar a propriedade Domínio com TXT no DNS.
3. Enviar o sitemap: `https://koti.toski-labs.com.br/sitemap-index.xml`.
4. Pedir indexação de cada página (Inspeção de URL › Solicitar indexação, cerca de 5 por dia):
   - [ ] https://koti.toski-labs.com.br/
   - [ ] https://koti.toski-labs.com.br/suporte
   - [ ] https://koti.toski-labs.com.br/privacidade
   - [ ] https://koti.toski-labs.com.br/en
   - [ ] https://koti.toski-labs.com.br/en/support
   - [ ] https://koti.toski-labs.com.br/en/privacy
5. Conferir, uma semana depois, se entraram no Google (`site:koti.toski-labs.com.br`).
6. Rodar o Rich Results Test e o validador de schema.org em `/`, `/suporte` e `/privacidade`.

**Conteúdo e app**
7. **ID da App Store:** preencher `APP_STORE_ID` em `src/data/app.ts` (liga o Smart App Banner) e trocar o "Em breve na App Store" da Home por um link.
8. Preços: trocar "Em breve" quando a monetização for definida; só então adicionar `offers` no `MobileApplication`.
9. Atualizar o canvas com os textos da tabela "Textos alterados em relação ao canvas".
10. Pedir ao DS os tokens do bloco `TODO(ds)` e apagá-lo.
11. Revisão jurídica da Política e confirmar a rede de anúncios (o texto diz que o Koti não mostra anúncios).
