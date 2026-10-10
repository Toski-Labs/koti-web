import type { Lang } from '../i18n/ui';

/** Perguntas frequentes do Suporte. Alimentam a página e o FAQPage do JSON-LD (as mesmas perguntas). */
export const faq: Record<Lang, [question: string, answer: string][]> = {
  pt: [
    ['Como convido quem mora comigo?', 'Na aba Casa, toque em Convidar alguém. Mande o link pelo WhatsApp ou mostre o QR code. O link vale por 7 dias e para uma pessoa.'],
    ['Quem mora comigo não tem iPhone. E agora?', 'Ele abre o link do convite no navegador do Android ou do computador e entra com Google ou com um link por e-mail. O Koti funciona ali mesmo, ao vivo, e pode ser posto na tela inicial como um app.'],
    ['Os avisos não estão chegando.', 'No iPhone, confira em Ajustes › Notificações › Koti. No navegador, permita as notificações do site. Lembre que você nunca recebe aviso do que você mesmo fez, e que vários checks seguidos viram um aviso só.'],
    ['O Koti paga as contas?', 'Não. Ele guarda o código do boleto ou do Pix para você copiar no app do banco, lembra o vencimento e avisa a casa quando alguém marca Paguei.'],
    ['Como saio de uma casa?', 'Na aba Casa, toque em Sair desta casa. O que você fez continua lá com o seu nome, e você sai do revezamento das tarefas. Se o saldo não estiver zerado, o Koti pede para acertar antes.'],
    ['Como restauro ou cancelo o Plus?', 'A assinatura é da Apple: Ajustes do iPhone › seu nome › Assinaturas. Para restaurar, use Você › Plano › Restaurar compras com o mesmo ID Apple. O Plus vale para todos da casa enquanto quem assinou continuar nela.'],
    ['Como excluo minha conta?', 'Toque no seu avatar › Excluir minha conta. Se você for a dona de uma casa, primeiro passe a casa para outra pessoa ou apague a casa. A assinatura é cancelada à parte, na Apple.'],
  ],
  en: [
    ['How do I invite my housemates?', 'In the Home tab, tap Invite someone. Send the link or show the QR code. The link lasts 7 days and works for one person.'],
    ['My housemate doesn’t have an iPhone.', 'They open the invite link in the browser on Android or a computer and sign in with Google or an email link. Koti works right there, live, and can be added to the home screen like an app.'],
    ['Alerts aren’t showing up.', 'On iPhone, check Settings › Notifications › Koti. In the browser, allow notifications for the site. You never get alerts for what you did yourself, and several checks in a row become a single alert.'],
    ['Does Koti pay the bills?', 'No. It keeps the boleto or Pix code for you to paste into your bank app, reminds you of the due date and tells everyone when someone taps Paid.'],
    ['How do I leave a home?', 'In the Home tab, tap Leave this home. What you did stays with your name, and you leave the chore rotation. If the balance isn’t settled, Koti asks you to settle up first.'],
    ['How do I restore or cancel Plus?', 'The subscription is with Apple: iPhone Settings › your name › Subscriptions. To restore, use You › Plan › Restore purchases with the same Apple ID. Plus covers everyone in the home while the subscriber stays in it.'],
    ['How do I delete my account?', 'Tap your avatar › Delete my account. If you own a home, first hand it to someone else or delete it. Your subscription is cancelled separately, with Apple.'],
  ],
};
