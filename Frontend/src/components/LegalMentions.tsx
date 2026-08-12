import { useNavigate } from 'react-router-dom';
import ProtectedValue from './ProtectedValue';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, CONTACT_ADDRESS_FULL } from '../config/contact';
const LegalMentions = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Mentions Légales</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            Informations légales concernant le site zenixweb.fr
          </p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">I. INFORMATIONS LÉGALES DE L'ÉDITEUR ET DE L'HÉBERGEUR</h2>
            <div className="space-y-3 text-slate-700">
              <p>Le site web zenixweb.fr est édité par :</p>
              <p><strong>Nom et Prénom :</strong> Enzo Monnet-Mata</p>
              <p><strong>Statut juridique :</strong> Entrepreneur Individuel (Micro-Entrepreneur)</p>
              <p><strong>Numéro d'immatriculation (SIRET) :</strong> 991 413 600 00016</p>
              {/* Adresse ET téléphone : tous deux exigés par l'article 6-III-1
                  de la LCEN, qui impose « leurs nom, prénom, domicile et numéro
                  de téléphone » pour une personne physique éditant à titre
                  professionnel. « Domicile » s'entend de l'adresse complète, la
                  rue comprise — d'où sa présence ici.
                  Les deux passent par <ProtectedValue> : la valeur n'existe pas
                  dans le HTML servi et n'est reconstituée que par le navigateur,
                  ce qui les soustrait aux moissonneurs sans les rendre moins
                  accessibles à un visiteur. Voir src/config/contact.ts. */}
              <p><strong>Siège :</strong> <ProtectedValue encoded={CONTACT_ADDRESS_FULL} /></p>
              <p>
                <strong>Téléphone :</strong>{' '}
                <ProtectedValue
                  encoded={CONTACT_PHONE_DISPLAY}
                  hrefEncoded={CONTACT_PHONE_HREF}
                  className="text-blue-600 hover:underline"
                />
              </p>
              <p><strong>Adresse e-mail :</strong> contact@zenixweb.fr</p>
              <p><strong>Site web :</strong> zenixweb.fr</p>
              <p><strong>Directeur de la publication :</strong> Enzo Monnet-Mata</p>
              <p><strong>Exonération de TVA :</strong></p>
              <p>TVA non applicable – article 293 B du Code Général des Impôts (CGI).</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">II. HÉBERGEMENT ET PRESTATAIRES TECHNIQUES</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Hébergeur :</strong> Enzo Monnet-Mata assure lui-même l'hébergement du site, sur une
                infrastructure qu'il détient et administre, située en France. Ses coordonnées sont celles
                indiquées au paragraphe I.
              </p>
              <p>
                <strong>Intermédiaire technique :</strong> le trafic du site transite par
                <strong> Cloudflare, Inc.</strong>, 101 Townsend Street, San Francisco, CA 94107, États-Unis,
                qui assure la répartition de charge, la protection contre les attaques par déni de service et
                le pare-feu applicatif. À ce titre, Cloudflare traite les données de connexion des visiteurs
                (adresse IP notamment). Bien que les serveurs sollicités pour la France soient situés en
                Europe, cette société relève du droit des États-Unis. Les modalités de ce traitement et les
                garanties encadrant ce transfert sont détaillées dans notre{' '}
                <a href="/politique-confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</a>.
              </p>
              <p>
                Aucun autre prestataire tiers n'intervient dans la diffusion de ce site : la mesure d'audience
                (Umami), l'acheminement des emails du formulaire de contact et les polices de caractères sont
                auto-hébergés sur cette même infrastructure.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">III. PROPRIÉTÉ INTELLECTUELLE</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                L'ensemble de ce site (structure, contenu, images) est soumis à la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
              </p>
              <p>
                Tous les droits de reproduction sont réservés. La reproduction, intégrale ou partielle, du contenu de ce site, sur quelque support que ce soit, est formellement interdite sans l'autorisation expresse et écrite du directeur de la publication.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">IV. COLLECTE ET TRAITEMENT DES DONNÉES PERSONNELLES (RGPD)</h2>
            <div className="space-y-3 text-slate-700">
              <p><strong>Finalité du traitement :</strong></p>
              <p>
                Les informations recueillies via le formulaire de contact sont utilisées pour répondre à vos demandes (devis, contact, informations).
              </p>
              <p><strong>Vos droits :</strong></p>
              <p>
                Conformément à la loi "Informatique et Libertés" et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p><strong>Exercice des droits :</strong></p>
              <p>
                Pour exercer ces droits, veuillez nous contacter par e-mail à : contact@zenixweb.fr.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">V. COOKIES</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Ce site n'utilise aucun cookie de traçage, de publicité ou de profilage, et aucun cookie n'est déposé à des fins statistiques. Seuls des cookies strictement techniques, nécessaires au bon fonctionnement du site, peuvent être utilisés.
              </p>
              <p>
                La fréquentation du site est mesurée avec <strong>Umami</strong>, une solution d'analyse d'audience auto-hébergée sur nos propres serveurs en France. Elle ne dépose aucun cookie, ne suit pas les visiteurs d'un site à l'autre et ne collecte aucune donnée permettant de vous identifier. Aucun bandeau de consentement n'est donc requis. Le détail figure dans notre <a href="/politique-confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</a>.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">VI. LIMITATION DE RESPONSABILITÉ</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Le Prestataire s'efforce d'assurer l'exactitude des informations diffusées sur le site. Si vous constatez une lacune ou une erreur, merci de bien vouloir la signaler par e-mail à contact@zenixweb.fr, en décrivant le problème de la manière la plus précise possible.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">VII. DROIT APPLICABLE ET JURIDICTION</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Tout litige en relation avec l'utilisation du site zenixweb.fr est soumis au droit français.
              </p>
              {/* La clause « compétence exclusive attribuée aux tribunaux de Lyon »
                  a été retirée. L'article 48 du Code de procédure civile ne rend
                  une clause attributive de compétence valable qu'entre commerçants ;
                  or les CGV s'adressent aussi aux associations et aux professions
                  libérales, qui ne le sont pas. La clause était donc nulle à leur
                  égard, tout en donnant une fausse impression de sécurité.
                  Les règles de compétence de droit commun (art. 42 CPC) s'appliquent. */}
              <p>
                À défaut de résolution amiable, les juridictions compétentes sont déterminées selon les règles
                de droit commun. Les relations contractuelles avec les clients professionnels sont régies par
                les{' '}
                <a href="/conditions-vente" className="text-blue-600 hover:underline">conditions générales de vente</a>,
                qui prévalent sur le présent document pour tout ce qui concerne l'exécution des prestations.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            Retour
          </button>
        </div>
      </div>
    </section>
  );
};
export default LegalMentions;
