import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Calendar, User, Server, Shield, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import ProtectedValue from './ProtectedValue';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '../config/contact';
const ContactPage = () => {
  const formStartTracked = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onFormInteraction = () => {
      if (!formStartTracked.current) {
        formStartTracked.current = true;
        trackEvent('form_start', { page: 'contact', action: 'devis' });
      }
    };
    form.addEventListener('focusin', onFormInteraction);
    return () => form.removeEventListener('focusin', onFormInteraction);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });
  // Champ piège anti-spam : invisible et hors du parcours clavier, donc jamais
  // rempli par un humain. Le backend ignore silencieusement toute soumission
  // où il est renseigné.
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Neutralise l'injection de balises et borne la longueur.
   *
   * Les guillemets et apostrophes ne sont plus retirés. Ils l'étaient
   * auparavant, ce qui mutilait les données légitimes : « O'Brien » arrivait en
   * « OBrien », « L'Atelier d'Émile » en « LAtelier dÉmile ». En français,
   * l'apostrophe est une lettre du quotidien, pas une charge utile.
   *
   * `<` et `>` restent filtrés : les valeurs sont interpolées dans un gabarit
   * d'email HTML côté email-service, dont on ne maîtrise pas l'échappement
   * depuis ce dépôt. Tant que ce n'est pas vérifié, on garde cette barrière —
   * elle ne coûte rien, aucun champ du formulaire n'ayant besoin de chevrons.
   */
  const sanitizeInput = (value: string, maxLength: number = 1000): string => {
    return value
      .replace(/[<>]/g, '')
      .replace(/\r\n/g, '\n')
      .trim()
      .substring(0, maxLength);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{10,20}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      console.warn('Form submission already in progress, ignoring duplicate submit');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || formData.name.trim().length < 2 || formData.name.length > 100) {
      setError('Le nom doit contenir entre 2 et 100 caractères.');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      setIsSubmitting(false);
      return;
    }

    // Le téléphone est facultatif : on ne le valide que s'il a été saisi.
    if (formData.phone && !validatePhone(formData.phone)) {
      setError('Le numéro de téléphone saisi ne semble pas valide.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.message || formData.message.trim().length < 10 || formData.message.length > 2000) {
      setError('Le message doit contenir entre 10 et 2000 caractères.');
      setIsSubmitting(false);
      return;
    }

    if (formData.budget && (isNaN(Number(formData.budget)) || Number(formData.budget) < 0 || Number(formData.budget) > 100000)) {
      setError('Le budget doit être un nombre valide entre 0 et 100000.');
      setIsSubmitting(false);
      return;
    }

    try {
      const sanitizedData = {
        from_name: sanitizeInput(formData.name, 100),
        from_email: formData.email.trim().toLowerCase(),
        phone: sanitizeInput(formData.phone.replace(/\s/g, ''), 20),
        company: sanitizeInput(formData.company || '', 100),
        project: formData.project,
        budget: formData.budget ? String(Math.max(0, Math.min(100000, Number(formData.budget)))) : '',
        timeline: formData.timeline,
        message: sanitizeInput(formData.message, 2000),
        website,
      };

      console.log('Sending data:', {
        has_name: !!sanitizedData.from_name,
        has_email: !!sanitizedData.from_email,
        has_phone: !!sanitizedData.phone,
        has_message: !!sanitizedData.message,
        has_project: !!sanitizedData.project,
        has_timeline: !!sanitizedData.timeline
      });

      let apiBase = import.meta.env.VITE_BACKEND_URL || '/api';
      if (apiBase.includes('zenix-backend.zenix.svc.cluster.local') || apiBase.startsWith('http://')) {
        apiBase = '/api';
      }
      const sanitizedApiBase = apiBase.replace(/[<>"']/g, '');
      console.log('API base URL:', sanitizedApiBase);
      
      const response = await fetch(`${sanitizedApiBase}/send-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur lors de l\'envoi' }));
        const errorMessage = errorData.error || `Erreur ${response.status}: ${response.statusText}`;
        console.error('Backend error:', errorMessage, errorData);
        throw new Error(errorMessage);
      }
      trackEvent('contact_form_submitted', {
        page: 'contact',
        project_type: formData.project || 'non_renseigne',
        timeline: formData.timeline || 'non_renseigne',
        budget_entered: String(!!formData.budget),
        budget_value: String(formData.budget || 0)
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project: '',
        budget: '',
        timeline: '',
        message: ''
      });
      navigate('/confirmation');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
      setError(errorMessage);
      console.error('Erreur lors de l\'envoi:', err);
      trackEvent('contact_form_error', {
        page: 'contact',
        error: errorMessage.substring(0, 100)
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Les balises SEO sont posées par le gabarit Page (src/App.tsx) à partir de
  // src/config/routes.ts, pour que le pré-rendu du build voie les mêmes valeurs.
  return (
    <>
      <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* h1 : cette page n'en avait aucun, Google n'avait donc aucun titre
              principal pour comprendre son sujet. */}
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">
            Demandez votre devis gratuit pour votre site web
          </h1>
          <div className="h-1 w-20 bg-brand-600 mx-auto mb-6"></div>
          <p className="text-lg text-ink-600 max-w-2xl mx-auto">
            Décrivez votre projet en quelques lignes : je vous réponds sous 24 heures avec un devis
            personnalisé et sans engagement. Site vitrine, e-commerce ou landing page, en Beaujolais, à Lyon et partout en France.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {}
          <div className="space-y-8">
            <div className="bg-brand-50 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/images/profile-photo.webp" 
                  alt="Enzo Monnet Mata"
                  width={128}
                  height={128}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-brand-600 flex items-center justify-center" style={{display: 'none'}}>
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-ink-950 mb-2">Enzo Monnet-Mata</h3>
              <p className="text-ink-500 mb-4">Développeur web et administrateur d'infrastructure</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center text-ink-600">
                  <Server className="w-4 h-4 mr-2 text-brand-600" />
                  Hébergement opéré en propre, en France
                </div>
                <div className="flex items-center justify-center text-ink-600">
                  <Shield className="w-4 h-4 mr-2 text-brand-600" />
                  Sécurité et sauvegardes incluses
                </div>
                <div className="flex items-center justify-center text-ink-600">
                  <MapPin className="w-4 h-4 mr-2 text-brand-600" />
                  Saint-Georges-de-Reneins, Beaujolais
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-ink-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-brand-600 mr-2" />
                Comment ça marche ?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-brand-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-ink-900">Vous remplissez le formulaire</h5>
                    <p className="text-ink-600 text-sm">Décrivez votre projet en quelques mots</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-ink-900">Je vous recontacte sous 24h</h5>
                    <p className="text-ink-600 text-sm">Par téléphone ou email selon votre préférence</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-ink-900">Devis gratuit et personnalisé</h5>
                    <p className="text-ink-600 text-sm">Basé sur vos besoins spécifiques</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-ink-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-ink-900 mb-3">Informations de contact</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-brand-600 mr-3" />
                  <a href="mailto:contact@zenixweb.fr" className="text-ink-600 hover:text-brand-600" onClick={() => trackEvent('contact_click', { source: 'contact_page', method: 'email' })}>
                    contact@zenixweb.fr
                  </a>
                </div>
                {/* Beaucoup de TPE appellent plutôt qu'elles n'écrivent : ne pas
                    proposer de numéro sur la page de devis coûte des conversions.
                    Affichage protégé du moissonnage, voir src/config/contact.ts. */}
                <div
                  className="flex items-center"
                  onClick={() => trackEvent('contact_click', { source: 'contact_page', method: 'phone' })}
                >
                  <Phone className="w-5 h-5 text-brand-600 mr-3" />
                  <ProtectedValue
                    encoded={CONTACT_PHONE_DISPLAY}
                    hrefEncoded={CONTACT_PHONE_HREF}
                    className="text-ink-600 hover:text-brand-600"
                  />
                </div>
              </div>
            </div>
          </div>
          {}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-ink-900 mb-2">Formulaire de contact</h3>
            <p className="text-ink-600 mb-6">Quelques questions pour mieux comprendre votre projet</p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot anti-spam : masqué visuellement, retiré de l'ordre de
                  tabulation et des lecteurs d'écran. Un visiteur ne le voit ni
                  ne l'atteint ; les bots qui remplissent tous les champs se
                  trahissent. */}
              <div className="absolute -left-[9999px] top-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    // Seuls les chevrons sont filtrés à la frappe : retirer aussi
                    // l'apostrophe rendait « O'Brien » impossible à saisir.
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[<>]/g, '') })}
                    maxLength={100}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase().trim() })}
                    maxLength={255}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* Facultatif : un numéro exigé fait renoncer une partie des
                      prospects, et l'email suffit à répondre. Le backend a été
                      aligné (server.js) ainsi que la politique de
                      confidentialité, qui décrit les champs collectés. */}
                  <label htmlFor="phone" className="block text-sm font-medium text-ink-700 mb-1">
                    Téléphone <span className="font-normal text-ink-500">(facultatif)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9\s\-+()]/g, '') })}
                    maxLength={20}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Votre numéro"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-ink-700 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value.replace(/[<>]/g, '') })}
                    maxLength={100}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-ink-700 mb-1">
                  Quel type de projet souhaitez-vous ? *
                </label>
                <select
                  id="project"
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                >
                  <option value="">Sélectionnez</option>
                  <option value="site-vitrine">Un site vitrine</option>
                  <option value="landing-page">Une landing page</option>
                  <option value="ecommerce">Une boutique en ligne</option>
                  <option value="refonte">La refonte d’un site existant</option>
                  <option value="hebergement">L’hébergement d’un site existant</option>
                  <option value="autre">Autre projet</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-ink-700 mb-1">
                    Budget estimé (€)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 100000)) {
                        setFormData({ ...formData, budget: value });
                      }
                    }}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    placeholder="Ex: 180"
                    min="0"
                    max="100000"
                    step="1"
                  />
                  <p className="text-xs text-ink-500 mt-1">Laissez vide si vous ne savez pas</p>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-ink-700 mb-1">
                    {/* L'astérisque manquait alors que le champ est `required` :
                        le visiteur ne comprenait pas pourquoi l'envoi était
                        bloqué. */}
                    Quand souhaitez-vous votre site ? *
                  </label>
                  <select
                    id="timeline"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="rapide">Rapide</option>
                    <option value="normal">Normal</option>
                    <option value="presse">Pressé</option>
                    <option value="ne-sais-pas">Je ne sais pas</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-1">
                  Décrivez votre projet en quelques mots *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value.replace(/[<>]/g, '') })}
                  rows={4}
                  maxLength={2000}
                  className="w-full px-4 py-2 border border-ink-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  placeholder="Ex: Je veux une landing page pour promouvoir mon nouveau service de coaching. J'aimerais inclure des témoignages clients et un formulaire de contact..."
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Information RGPD (articles 13 et 14) — obligatoire AU MOMENT de
                  la collecte. Le formulaire n'en portait aucune : avoir une
                  politique de confidentialité atteignable depuis le pied de page
                  ne suffit pas, rien ne la rattachait à cette collecte.
                  Pas de case à cocher : la base légale est l'intérêt légitime à
                  répondre à une demande entrante, pas le consentement — une case
                  laisserait croire le contraire et créerait un consentement
                  factice, retirable, pour un traitement qui n'en dépend pas.
                  Le lien s'ouvre dans un onglet pour ne pas vider le formulaire. */}
              <p className="text-xs text-ink-500 leading-relaxed">
                Les informations saisies sont utilisées uniquement pour répondre à votre demande et
                établir un devis. Elles sont destinées à Enzo Monnet-Mata (Zenix Web), responsable du
                traitement, et conservées 3 ans après notre dernier échange. Vous disposez d'un droit
                d'accès, de rectification, d'effacement, d'opposition et de portabilité, à exercer à{' '}
                <a href="mailto:contact@zenixweb.fr" className="text-brand-600 hover:underline">
                  contact@zenixweb.fr
                </a>
                , ainsi que du droit d'introduire une réclamation auprès de la CNIL. Détail dans la{' '}
                <a
                  href="/politique-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  politique de confidentialité
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => trackEvent('form_submit_click', { page: 'contact' })}
                className={`w-full py-3 px-6 bg-brand-600 text-white rounded-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-brand-700 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
export default ContactPage;
