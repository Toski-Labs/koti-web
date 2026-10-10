export const languages = { pt: 'Português', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

/** Páginas do site. A chave é a mesma nos dois idiomas; o endereço muda. */
export type PageKey = 'app' | 'privacy' | 'support';

/**
 * Endereços públicos. Vão para o App Store Connect e o Google: não mudar depois de publicados.
 * Reservados para o PWA (entra depois neste repositório): /convite/* e /app/*. Não criar páginas neles aqui.
 */
export const routes: Record<Lang, Record<PageKey, string>> = {
  pt: { app: '/', privacy: '/privacidade', support: '/suporte' },
  en: { app: '/en', privacy: '/en/privacy', support: '/en/support' },
};

/** Âncoras da Home (ids das seções). */
export const anchors: Record<Lang, { features: string; market: string; plans: string }> = {
  pt: { features: 'recursos', market: 'mercado', plans: 'planos' },
  en: { features: 'features', market: 'groceries', plans: 'plans' },
};

/** Textos compartilhados (cabeçalho, rodapé, metadados). Textos de cada página ficam na própria página. */
export const ui = {
  pt: {
    'site.name': 'Koti',
    'site.tagline': 'Nossa casa, juntos.',
    'nav.label': 'Principal',
    'nav.features': 'Recursos',
    'nav.market': 'Mercado',
    'nav.plans': 'Planos',
    'nav.support': 'Suporte',
    'nav.privacy': 'Privacidade',
    'settings.button': 'Configurações: tema e idioma',
    'settings.title': 'Configurações',
    'settings.theme': 'Tema',
    'settings.theme.auto': 'Automático',
    'settings.theme.light': 'Claro',
    'settings.theme.dark': 'Escuro',
    'settings.hint.auto': 'Segue o tema do seu aparelho.',
    'settings.hint.light': 'Sempre claro, mesmo à noite.',
    'settings.hint.dark': 'Sempre escuro, mesmo de dia.',
    'settings.language': 'Idioma',
    'settings.saved': 'Suas escolhas ficam salvas neste navegador.',
    'footer.lab': 'Laboratório de tecnologia para o ecossistema Apple.',
    'footer.projects': 'Projetos',
    'footer.help': 'Ajuda',
    'footer.place': 'Recife, Brasil',
    'toTop': 'Voltar ao topo',
    'skip': 'Pular para o conteúdo',
  },
  en: {
    'site.name': 'Koti',
    'site.tagline': 'Our home, together.',
    'nav.label': 'Main',
    'nav.features': 'Features',
    'nav.market': 'Groceries',
    'nav.plans': 'Plans',
    'nav.support': 'Support',
    'nav.privacy': 'Privacy',
    'settings.button': 'Settings: theme and language',
    'settings.title': 'Settings',
    'settings.theme': 'Theme',
    'settings.theme.auto': 'Automatic',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.hint.auto': 'Follows your device’s theme.',
    'settings.hint.light': 'Always light, even at night.',
    'settings.hint.dark': 'Always dark, even during the day.',
    'settings.language': 'Language',
    'settings.saved': 'Your choices are saved in this browser.',
    'footer.lab': 'A technology lab for the Apple ecosystem.',
    'footer.projects': 'Projects',
    'footer.help': 'Help',
    'footer.place': 'Recife, Brazil',
    'toTop': 'Back to top',
    'skip': 'Skip to content',
  },
} as const;

export type UiKey = keyof (typeof ui)['pt'];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Idioma a partir do locale atual do Astro (Astro.currentLocale). */
export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'pt';
}

export function otherLang(lang: Lang): Lang {
  return lang === 'pt' ? 'en' : 'pt';
}

/** Mesma página no outro idioma (menu de configurações e hreflang). */
export function alternatePath(page: PageKey, lang: Lang): string {
  return routes[otherLang(lang)][page];
}

/** Atalho para montar links internos: href(lang, 'support') → '/suporte' ou '/en/support'. */
export function href(lang: Lang, page: PageKey, hash?: string): string {
  const path = routes[lang][page];
  return hash ? `${path}#${hash}` : path;
}

/** Site da Toski Labs (rodapé). */
export const LAB_URL: Record<Lang, string> = { pt: 'https://toski-labs.com.br', en: 'https://toski-labs.com.br/en' };

/** Página do PetHealthTracker no site da Toski Labs (rodapé). */
export const PETHEALTH_URL: Record<Lang, string> = { pt: 'https://toski-labs.com.br/pethealthtracker', en: 'https://toski-labs.com.br/en/pethealthtracker' };

/** E-mail de suporte e contato (site, política, App Store e Google). */
export const SUPPORT_EMAIL = 'toskilabs@gmail.com';

/** ID do app na App Store (só os dígitos). Com um valor, liga <meta name="apple-itunes-app">. null = desligado. */
export const APP_STORE_ID: string | null = null;

/** Categoria do app nos dados estruturados (schema.org › applicationCategory). */
export const APP_CATEGORY = 'LifestyleApplication';

/** Chaves do localStorage (tudo fica só no navegador da pessoa; nada vai para servidor). */
export const STORAGE = {
  theme: 'toski-theme', // 'light' | 'dark' (ausente = automático)
  lang: 'toski-lang', // idioma escolhido no menu
} as const;
