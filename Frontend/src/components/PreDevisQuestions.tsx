import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
const PreDevisQuestions = () => {
  const navigate = useNavigate();
  const questions = [
    {
      category: "Votre entreprise",
      questions: [
        "Quel est le nom de votre entreprise ?",
        "Dans quel secteur d'activité évoluez-vous ?",
        "Quelle est la taille de votre entreprise ?",
        "Avez-vous déjà un site web existant ?"
      ]
    },
    {
      category: "Vos objectifs",
      questions: [
        "Quel est l'objectif principal de votre landing page ?",
        "Quelle action voulez-vous que vos visiteurs effectuent ?",
        "Avez-vous des exemples de landing pages que vous aimez ?",
        "Quel est votre budget approximatif ?"
      ]
    },
    {
      category: "Votre contenu",
      questions: [
        "Avez-vous déjà du contenu (textes, images) ?",
        "Avez-vous un logo et une charte graphique ?",
        "Quels sont vos principaux arguments de vente ?",
        "Avez-vous des témoignages clients ?"
      ]
    },
    {
      category: "Technique",
      questions: [
        "Avez-vous un nom de domaine ?",
        "Avez-vous des préférences d'hébergement ?",
        "Avez-vous besoin d'intégrations spécifiques ?",
        "Quel est votre délai souhaité ?"
      ]
    }
  ];
  return (
    <section className="py-20 bg-slate-50 pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Questions à préparer avant le devis</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Pour vous proposer le devis le plus précis possible, voici les questions que nous aborderons ensemble. 
            Plus vous aurez de réponses, plus notre échange sera efficace !
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {questions.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                {section.category}
              </h3>
              <ul className="space-y-3">
                {section.questions.map((question, questionIndex) => (
                  <li key={questionIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Prêt à démarrer votre projet ?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Même si vous n'avez pas toutes les réponses, n'hésitez pas à me contacter. 
            Je vous accompagnerai pour définir ensemble les meilleures solutions pour votre projet.
          </p>
          <button 
            onClick={() => { trackEvent('contact_click', { source: 'landing', cta: 'devis_questions' }); navigate('/contact'); }}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-white/20 active:scale-95 inline-flex items-center"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default PreDevisQuestions;
