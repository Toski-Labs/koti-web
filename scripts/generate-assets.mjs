// Gera, a partir do Toski DS (@toski-labs/ds), o que o site precisa fora do HTML:
//   public/favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png  (ícone do app)
//   public/og/og-pt.png, og-en.png                                         (cards de compartilhamento 1200 × 630)
// Roda em predev e prebuild. A saída fica no .gitignore: a fonte é o DS.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ds = path.join(root, 'node_modules/@toski-labs/ds');
const pub = path.join(root, 'public');
const read = (p) => readFile(path.join(ds, p), 'utf8');
const stripMeta = (svg) => svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '');

await mkdir(path.join(pub, 'og'), { recursive: true });

// Ícones
const iconSvg = stripMeta(await read('products/koti/icon/koti-icon-light.svg'));
await writeFile(path.join(pub, 'favicon.svg'), iconSvg);
const iconPng = await readFile(path.join(ds, 'products/koti/icon/koti-icon-light-1024.png'));
for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  // O ícone é quadrado e opaco (o iOS exige isso no apple-touch-icon); o redimensionamento descarta o metadata C2PA.
  await sharp(iconPng).resize(size, size).flatten().png({ compressionLevel: 9 }).toFile(path.join(pub, name));
}

// Cards de compartilhamento
const tokens = JSON.parse(await read('build/json/web.koti.json'));
const c = tokens.light;
const fonts = [
  { name: 'Outfit', weight: 400, style: 'normal', data: await readFile(path.join(root, 'node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff')) },
  { name: 'Outfit', weight: 600, style: 'normal', data: await readFile(path.join(root, 'node_modules/@fontsource/outfit/files/outfit-latin-600-normal.woff')) },
];
const dataUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
const text = {
  pt: { tagline: 'Nossa casa, juntos.', sub: 'Listas, tarefas e contas de quem mora junto.', badge: 'App para iPhone · iOS 18+' },
  en: { tagline: 'Our home, together.', sub: 'Lists, chores and bills for people who live together.', badge: 'iPhone app · iOS 18+' },
};
const el = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });

for (const lang of ['pt', 'en']) {
  const tree = el('div', { width: 1200, height: 630, boxSizing: 'border-box', background: c.hero, fontFamily: 'Outfit', color: c.ink, padding: 72, alignItems: 'center', justifyContent: 'space-between' }, [
    el('div', { flexDirection: 'column', gap: 26, width: 660 }, [
      el('div', { fontSize: 56, fontWeight: 600, letterSpacing: -1, color: c.accent }, 'koti'),
      el('div', { fontSize: 84, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }, text[lang].tagline),
      el('div', { fontSize: 30, lineHeight: 1.3, color: c.muted }, text[lang].sub),
      el('div', { alignItems: 'center', height: 44, padding: '0 20px', borderRadius: 22, border: `2px solid ${c.accent}`, color: c.accent, fontSize: 24, fontWeight: 600, alignSelf: 'flex-start' }, text[lang].badge),
    ]),
    { type: 'img', props: { src: dataUri(iconSvg.replace(/ width="1024" height="1024"/, '')), width: 360, height: 360, style: { borderRadius: 80 } } },
  ]);
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(path.join(pub, 'og', `og-${lang}.png`), png);
}
console.log('assets: ícones e cards OG gerados em public/');
