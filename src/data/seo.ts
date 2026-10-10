import type { Lang, PageKey } from '../i18n/ui';

/**
 * Título (50–60 caracteres) e descrição (140–155) de cada página, por idioma.
 * scripts/check-seo.mjs confere os tamanhos no HTML gerado.
 * Buscas que queremos ganhar — PT: "lista de compras compartilhada", "app para dividir contas da casa",
 * "tarefas de casa com rodízio", "app para casal organizar a casa", "lista de mercado em tempo real".
 * EN: "shared grocery list app", "split household bills", "chore rotation app".
 */
export const seo: Record<Lang, Record<PageKey, { title: string; description: string }>> = {
  pt: {
    app: {
      title: 'Koti: lista de compras compartilhada e contas da casa',
      description: 'App para casal organizar a casa: lista de compras compartilhada, lista de mercado em tempo real, tarefas de casa com rodízio e contas divididas.',
    },
    privacy: {
      title: 'Política de Privacidade do Koti, o app da sua casa',
      description: 'Veja quais dados o Koti guarda, quem na casa os vê, com quem compartilhamos, por quanto tempo ficam e como excluir a sua conta. Sem anúncios.',
    },
    support: {
      title: 'Suporte do Koti: convites, avisos, contas e assinatura',
      description: 'Ajuda com o Koti, app para dividir contas da casa: convidar quem mora com você, avisos, boleto e Pix, Plus e exclusão de conta. Fale com a gente.',
    },
  },
  en: {
    app: {
      title: 'Koti: shared grocery list app to split household bills',
      description: 'Koti is the iPhone app for couples and housemates: a shared grocery list in real time, chore rotation and split household bills, all in one app.',
    },
    privacy: {
      title: 'Koti Privacy Policy | The app for your whole household',
      description: 'See what data Koti stores, who in your home can see it, who we share it with, how long we keep it and how to delete your account. No ads, no data sales.',
    },
    support: {
      title: 'Support | Koti: invites, alerts, bills and subscription',
      description: 'Help with Koti, the app to split household bills: inviting housemates, alerts, boleto and Pix, Plus and deleting your account. Get in touch with us.',
    },
  },
};

/** 404: bilíngue, noindex. */
export const notFound = { title: 'Página não encontrada | Koti', description: 'Esta página não existe. This page does not exist.' };
