import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Calendar, User, GraduationCap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { consultationSchema, organizationSchema, personSchema } from '../utils/structuredData';
import { trackEvent } from '../utils/analytics';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const sanitizeInput = (value: string, maxLength: number = 1000): string => {
    return value
      .replace(/[<>"']/g, '')
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

    if (!formData.phone || !validatePhone(formData.phone)) {
      setError('Veuillez entrer un numéro de téléphone valide.');
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
  const structuredData = [
    consultationSchema,
    organizationSchema,
    personSchema
  ];
  return (
    <>
      <SEO
        title="Contact - Prendre RDV Gratuit | Zenix Web"
        description="Prenez rendez-vous gratuitement pour discuter de votre projet de landing page. Consultation gratuite de 15 minutes avec Enzo Monnet Mata, développeur web expert à Lyon."
        keywords="prendre rdv, consultation gratuite, rendez-vous, développeur web, landing page, Lyon, Enzo Monnet Mata, calendly, contact"
        url="https://www.zenixweb.fr/contact"
        type="website"
        structuredData={structuredData}
      />
      <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Demandez votre devis gratuit</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Remplissez ce formulaire et je vous recontacte dans les 24h pour discuter de votre projet de landing page.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 text-center">
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
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center" style={{display: 'none'}}>
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enzo Monnet Mata</h3>
              <p className="text-slate-600 mb-4">Développeur Web & Étudiant Cybersécurité</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center text-slate-600">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  Étudiant à Guardia - Cybersécurité
                </div>
                <div className="flex items-center justify-center text-slate-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Spécialiste Landing Pages
                </div>
                <div className="flex items-center justify-center text-slate-600">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  Lyon, France
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                Comment ça marche ?
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <h5 className="font-semibold text-slate-800">Vous remplissez le formulaire</h5>
                    <p className="text-slate-600 text-sm">Décrivez votre projet en quelques mots</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <h5 className="font-semibold text-slate-800">Je vous recontacte sous 24h</h5>
                    <p className="text-slate-600 text-sm">Par téléphone ou email selon votre préférence</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <h5 className="font-semibold text-slate-800">Devis gratuit et personnalisé</h5>
                    <p className="text-slate-600 text-sm">Basé sur vos besoins spécifiques</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Informations de contact</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <a href="mailto:contact@zenixweb.fr" className="text-slate-600 hover:text-blue-600" onClick={() => trackEvent('contact_click', { source: 'contact_page', method: 'email' })}>
                    contact@zenixweb.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
          {}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Formulaire de contact</h3>
            <p className="text-slate-600 mb-6">Quelques questions pour mieux comprendre votre projet</p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[<>"']/g, '') })}
                    maxLength={100}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase().trim() })}
                    maxLength={255}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9\s\-+()]/g, '') })}
                    maxLength={20}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Votre numéro"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value.replace(/[<>"']/g, '') })}
                    maxLength={100}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-1">
                  Quel type de projet souhaitez-vous ? *
                </label>
                <select
                  id="project"
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionnez votre projet</option>
                  <option value="landing-page-devis">Landing Page (devis personnalisé)</option>
                  <option value="landing-page-standard">Landing Page Standard (100€)</option>
                  <option value="site-vitrine">Site Vitrine Multi-pages</option>
                  <option value="hebergement">Hébergement (Site Vitrine ou Landing Page)</option>
                  <option value="refonte">Refonte (Site Vitrine ou Landing Page)</option>
                  <option value="optimisation-seo">Optimisation SEO</option>
                  <option value="support-technique">Support technique</option>
                  <option value="autre">Autre project</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">
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
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: 180"
                    min="0"
                    max="100000"
                    step="1"
                  />
                  <p className="text-xs text-slate-500 mt-1">Laissez vide si vous ne savez pas</p>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-1">
                    Quand souhaitez-vous votre site ?
                  </label>
                  <select
                    id="timeline"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez un délai</option>
                    <option value="urgent">Rapide (4-6 jours)</option>
                    <option value="rapide">Normal (7 jours)</option>
                    <option value="normal">Detendu (2 semaines tarif réduit)</option>
                    <option value="flexible">Pas pressé (1 mois tarif réduit)</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Décrivez votre projet en quelques mots *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value.replace(/[<>]/g, '') })}
                  rows={4}
                  maxLength={2000}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Je veux une landing page pour promouvoir mon nouveau service de coaching. J'aimerais inclure des témoignages clients et un formulaire de contact..."
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => trackEvent('form_submit_click', { page: 'contact' })}
                className={`w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700 active:scale-95'
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
