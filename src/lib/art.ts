/**
 * Arte do Koti vinda do Toski DS (@toski-labs/ds/products/koti), inline no HTML.
 * Não usamos ProductIcon/ProductLogo do pacote: eles emitem style="" e a CSP não permite.
 */
import iconLight from '@toski-labs/ds/products/koti/icon/koti-icon-light.svg?raw';
import iconDark from '@toski-labs/ds/products/koti/icon/koti-icon-dark.svg?raw';

export type Mode = 'light' | 'dark';

const inner = (svg: string) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<metadata>[\s\S]*?<\/metadata>/g, '').replace(/<title>[^<]*<\/title>/, '');
const viewBox = (svg: string) => svg.match(/viewBox="([^"]+)"/)![1];

/** Ajusta um SVG do DS: tira metadados, define largura, acessibilidade e ids únicos. */
function tune(svg: string, uid: string, width: number, label?: string): string {
  const [, , vw, vh] = viewBox(svg).split(/\s+/).map(Number);
  const h = Math.round((width * vh) / vw);
  const a11y = label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"';
  let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(svg)}" width="${width}" height="${h}" ${a11y} focusable="false">${inner(svg)}</svg>`;
  for (const id of new Set([...out.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))) {
    out = out.replaceAll(`id="${id}"`, `id="${uid}-${id}"`).replaceAll(`url(#${id})`, `url(#${uid}-${id})`);
  }
  return out;
}

const icons: Record<Mode, string> = { light: iconLight, dark: iconDark };

/** Ícone do app (claro e escuro; o CSS do DS mostra o do tema ativo via data-art). */
export function appIcon(uid: string, size: number, label?: string): { mode: Mode; html: string }[] {
  return (['light', 'dark'] as const).map((mode) => ({ mode, html: tune(icons[mode], `${uid}${mode}`, size, label) }));
}
