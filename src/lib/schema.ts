import { faq } from '../data/faq';
import type { Lang } from '../i18n/ui';
import { APP_CATEGORY } from '../data/app';

/** Mesmo @id da Organization do toski-labs-web (src/layouts/BaseLayout.astro). */
export const ORG_ID = 'https://toski-labs.web.app/#toski-labs';

/** App na página inicial. Sem offers, aggregateRating nem review até o app estar na App Store e ter preço. */
export function mobileApplication(site: URL, url: string, description: string) {
  return {
    '@type': 'MobileApplication',
    '@id': new URL('/#app', site).href,
    name: 'Koti',
    url,
    description,
    operatingSystem: 'iOS 18.0 or later',
    applicationCategory: APP_CATEGORY,
    inLanguage: ['pt-BR', 'en'],
    image: new URL('/icon-512.png', site).href,
    publisher: { '@id': ORG_ID },
  };
}

/** Trilha de navegação (Suporte e Privacidade): Koti › página. */
export function breadcrumb(site: URL, homeUrl: string, name: string, url: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Koti', item: new URL(homeUrl, site).href },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
}

/** FAQPage do Suporte, com as mesmas perguntas da página. */
export function faqPage(lang: Lang, url: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: lang === 'pt' ? 'pt-BR' : 'en',
    mainEntity: faq[lang].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
