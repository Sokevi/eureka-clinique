import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, User, Phone, Users, FileText, Shield, AlertCircle } from "lucide-react";
import "./AddPatient.css";

const AddPatient = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Étape 1: Informations personnelles
    civilite: "",
    nom: "",
    prenoms: "",
    sexe: "",
    dateNaissance: "",
    lieuNaissance: "",
    email: "",
    passport: "",
    cni: "",
    nationalite: "",
    
    // Étape 2: Contact
    telephone: "",
    quartier: "",
    profession: "",
    
    // Étape 3: Personne à prévenir
    contactNom: "",
    contactPrenoms: "",
    contactTelephone: "",
    
    // Étape 4: Informations familiales
    situationMatrimoniale: "",
    nombreEnfants: "",
    nomConjoint: "",
    prenomsConjoint: "",
    
    // Étape 5: Assurance et infos médicales
    assure: "non", // oui ou non
    compagnieAssurance: "",
    numeroPolice: "",
    dateExpirationAssurance: "",
    tauxCouverture: "",
    typeAssurance: "", // Totale, Partielle, etc.
    contactAssurance: "",
    modePaiement: "", // Tiers-payant, Remboursement
    plafondAnnuel: "",
    franchise: "",
    
    // Couverture par type d'acte
    couvertureConsultation: "",
    couvertureImagerie: "",
    couvertureLaboratoire: "",
    couvertureSpecialise: "",
    
    // Informations médicales de base
    typeConsultation: "",
    groupeSanguin: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si on décoche "assuré", on vide les champs d'assurance
    if (name === "assure" && value === "non") {
      setFormData({
        ...formData,
        assure: "non",
        compagnieAssurance: "",
        numeroPolice: "",
        dateExpirationAssurance: "",
        tauxCouverture: "",
        typeAssurance: "",
        contactAssurance: "",
        modePaiement: "",
        plafondAnnuel: "",
        franchise: "",
        couvertureConsultation: "",
        couvertureImagerie: "",
        couvertureLaboratoire: "",
        couvertureSpecialise: ""
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier qu'on est bien à la dernière étape
    if (currentStep !== totalSteps) {
      console.log("Pas encore à la dernière étape");
      return;
    }
    
    // Validation finale pour l'assurance
    if (!isStepValid()) {
      alert("⚠️ Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    console.log("Données patient:", formData);
    // TODO: Envoyer à l'API
    alert("✅ Patient ajouté avec succès !");
    navigate("/patients/list");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        // Champs obligatoires de l'étape 1
        return formData.nom.trim() !== "" && 
               formData.prenoms.trim() !== "" && 
               formData.sexe !== "" && 
               formData.dateNaissance !== "";
      case 2:
        // Champs obligatoires de l'étape 2
        return formData.telephone.trim() !== "";
      case 3:
        // Étape 3 optionnelle
        return true;
      case 4:
        // Étape 4 optionnelle
        return true;
      case 5:
        // Si assuré, vérifier les champs obligatoires
        if (formData.assure === "oui") {
          return formData.compagnieAssurance !== "" && formData.numeroPolice.trim() !== "";
        }
        // Si non assuré, toujours valide
        return true;
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, title: "Identité", icon: <User size={20} /> },
    { number: 2, title: "Contact", icon: <Phone size={20} /> },
    { number: 3, title: "Personne à prévenir", icon: <Users size={20} /> },
    { number: 4, title: "Infos familiales", icon: <FileText size={20} /> },
    { number: 5, title: "Assurance", icon: <Shield size={20} /> }
  ];

  return (
    <div className="add-patient-container">
      <div className="add-patient-card">
        {/* Header */}
        <div className="add-patient-header">
          <button className="btn-back" onClick={() => navigate("/patients/list")}>
            <ChevronLeft size={20} />
            Retour
          </button>
          <h1>➕ Nouveau Patient</h1>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step-item ${currentStep === step.number ? "active" : ""} ${
                currentStep > step.number ? "completed" : ""
              }`}
            >
              <div className="step-circle">
                {currentStep > step.number ? <Check size={18} /> : step.icon}
              </div>
              <div className="step-label">{step.title}</div>
              {step.number < totalSteps && <div className="step-line" />}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="patient-form">
          {/* ÉTAPE 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>👤 Informations personnelles</h2>
              
              <div className="form-row">
                <div className="form-group small">
                  <label>Civilité *</label>
                  <select name="civilite" value={formData.civilite} onChange={handleChange}>
                    <option value="">-</option>
                    <option value="M.">M.</option>
                    <option value="Mme">Mme</option>
                    <option value="Mlle">Mlle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="NOM"
                  />
                </div>

                <div className="form-group">
                  <label>Prénoms *</label>
                  <input
                    type="text"
                    name="prenoms"
                    value={formData.prenoms}
                    onChange={handleChange}
                    placeholder="Prénoms"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sexe *</label>
                  <select name="sexe" value={formData.sexe} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date de naissance *</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Lieu de naissance</label>
                  <input
                    type="text"
                    name="lieuNaissance"
                    value={formData.lieuNaissance}
                    onChange={handleChange}
                    placeholder="Ville, Pays"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                  />
                </div>

                <div className="form-group">
                  <label>N° Passeport</label>
                  <input
                    type="text"
                    name="passport"
                    value={formData.passport}
                    onChange={handleChange}
                    placeholder="Numéro de passeport"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>N° CNI</label>
                  <input
                    type="text"
                    name="cni"
                    value={formData.cni}
                    onChange={handleChange}
                    placeholder="Numéro CNI"
                  />
                </div>

                <div className="form-group">
                  <label>Nationalité</label>
                  <input
                    type="text"
                    name="nationalite"
                    value={formData.nationalite}
                    onChange={handleChange}
                    placeholder="Nationalité"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2: Contact */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>📞 Informations de contact</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>Téléphone *</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+225 XX XX XX XX XX"
                  />
                </div>

                <div className="form-group">
                  <label>Quartier</label>
                  <input
                    type="text"
                    name="quartier"
                    value={formData.quartier}
                    onChange={handleChange}
                    placeholder="Quartier / Commune"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Profession"
                  />
                </div>

                <div className="form-group">
                  <label>Type de consultation</label>
                  <select name="typeConsultation" value={formData.typeConsultation} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Endocrinologie">Endocrinologie</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Radiologie">Radiologie</option>
                    <option value="Dermatologie">Dermatologie</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Groupe sanguin</label>
                  <select name="groupeSanguin" value={formData.groupeSanguin} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3: Personne à prévenir */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>👥 Personne à prévenir (optionnel)</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="contactNom"
                    value={formData.contactNom}
                    onChange={handleChange}
                    placeholder="Nom"
                  />
                </div>

                <div className="form-group">
                  <label>Prénoms</label>
                  <input
                    type="text"
                    name="contactPrenoms"
                    value={formData.contactPrenoms}
                    onChange={handleChange}
                    placeholder="Prénoms"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="contactTelephone"
                    value={formData.contactTelephone}
                    onChange={handleChange}
                    placeholder="+225 XX XX XX XX XX"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 4: Informations familiales */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>👨‍👩‍👧‍👦 Informations familiales (optionnel)</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>Situation matrimoniale</label>
                  <select
                    name="situationMatrimoniale"
                    value={formData.situationMatrimoniale}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié(e)">Marié(e)</option>
                    <option value="Divorcé(e)">Divorcé(e)</option>
                    <option value="Veuf(ve)">Veuf(ve)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Nombre d'enfants</label>
                  <input
                    type="number"
                    name="nombreEnfants"
                    value={formData.nombreEnfants}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nom du conjoint</label>
                  <input
                    type="text"
                    name="nomConjoint"
                    value={formData.nomConjoint}
                    onChange={handleChange}
                    placeholder="Nom du conjoint"
                  />
                </div>

                <div className="form-group">
                  <label>Prénoms du conjoint</label>
                  <input
                    type="text"
                    name="prenomsConjoint"
                    value={formData.prenomsConjoint}
                    onChange={handleChange}
                    placeholder="Prénoms du conjoint"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 5: Assurance */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>🛡️ Informations d'assurance</h2>

              <div className="insurance-toggle">
                <label className="toggle-label">Le patient est-il assuré ?</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="assure"
                      value="oui"
                      checked={formData.assure === "oui"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>Oui</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="assure"
                      value="non"
                      checked={formData.assure === "non"}
                      onChange={handleChange}
                    />
                    <span className="radio-custom"></span>
                    <span>Non</span>
                  </label>
                </div>
              </div>

              {formData.assure === "oui" && (
                <div className="insurance-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Compagnie d'assurance *</label>
                      <select
                        name="compagnieAssurance"
                        value={formData.compagnieAssurance}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="CNAM">CNAM (Public)</option>
                        <option value="NSIA Assurance">NSIA Assurance</option>
                        <option value="AXA Assurance">AXA Assurance</option>
                        <option value="Allianz Assurance">Allianz Assurance</option>
                        <option value="SUNU Assurances">SUNU Assurances</option>
                        <option value="Saham Assurance">Saham Assurance</option>
                        <option value="SANLAM">SANLAM</option>
                        <option value="Atlantique Assurances">Atlantique Assurances</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>N° de police *</label>
                      <input
                        type="text"
                        name="numeroPolice"
                        value={formData.numeroPolice}
                        onChange={handleChange}
                        placeholder="Numéro de police"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Type d'assurance</label>
                      <select
                        name="typeAssurance"
                        value={formData.typeAssurance}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Assurance Totale">Assurance Totale (100%)</option>
                        <option value="Assurance Partielle">Assurance Partielle</option>
                        <option value="Mutuelle">Mutuelle</option>
                        <option value="Assurance Entreprise">Assurance Entreprise</option>
                        <option value="CMU">Couverture Maladie Universelle (CMU)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Mode de paiement</label>
                      <select
                        name="modePaiement"
                        value={formData.modePaiement}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Tiers-payant">Tiers-payant (Direct)</option>
                        <option value="Remboursement">Remboursement après acte</option>
                        <option value="Remboursement différé">Remboursement différé</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date d'expiration</label>
                      <input
                        type="date"
                        name="dateExpirationAssurance"
                        value={formData.dateExpirationAssurance}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact assurance</label>
                      <input
                        type="tel"
                        name="contactAssurance"
                        value={formData.contactAssurance}
                        onChange={handleChange}
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Plafond annuel (FCFA)</label>
                      <input
                        type="number"
                        name="plafondAnnuel"
                        value={formData.plafondAnnuel}
                        onChange={handleChange}
                        placeholder="Ex: 5000000"
                      />
                    </div>

                    <div className="form-group">
                      <label>Franchise (FCFA)</label>
                      <input
                        type="number"
                        name="franchise"
                        value={formData.franchise}
                        onChange={handleChange}
                        placeholder="Ex: 10000"
                      />
                    </div>
                  </div>

                  {/* Section Couverture par type d'acte */}
                  <div className="coverage-section">
                    <h3>📋 Taux de couverture par type d'acte</h3>
                    <p className="coverage-subtitle">
                      Indiquez le pourcentage pris en charge par l'assurance pour chaque catégorie
                    </p>

                    <div className="coverage-grid">
                      <div className="coverage-item">
                        <div className="coverage-header">
                          <span className="coverage-icon">🩺</span>
                          <span className="coverage-title">Consultations</span>
                        </div>
                        <div className="coverage-input-group">
                          <input
                            type="number"
                            name="couvertureConsultation"
                            value={formData.couvertureConsultation}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="70"
                          />
                          <span className="coverage-unit">%</span>
                        </div>
                        <span className="coverage-hint">Ex: Générale 70%, Spécialiste 60%</span>
                      </div>

                      <div className="coverage-item">
                        <div className="coverage-header">
                          <span className="coverage-icon">🖥️</span>
                          <span className="coverage-title">Imagerie</span>
                        </div>
                        <div className="coverage-input-group">
                          <input
                            type="number"
                            name="couvertureImagerie"
                            value={formData.couvertureImagerie}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="60"
                          />
                          <span className="coverage-unit">%</span>
                        </div>
                        <span className="coverage-hint">Radio, Écho, Scanner, IRM</span>
                      </div>

                      <div className="coverage-item">
                        <div className="coverage-header">
                          <span className="coverage-icon">🧬</span>
                          <span className="coverage-title">Laboratoire</span>
                        </div>
                        <div className="coverage-input-group">
                          <input
                            type="number"
                            name="couvertureLaboratoire"
                            value={formData.couvertureLaboratoire}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="75"
                          />
                          <span className="coverage-unit">%</span>
                        </div>
                        <span className="coverage-hint">Analyses sanguines, tests, etc.</span>
                      </div>

                      <div className="coverage-item">
                        <div className="coverage-header">
                          <span className="coverage-icon">🔍</span>
                          <span className="coverage-title">Examens spécialisés</span>
                        </div>
                        <div className="coverage-input-group">
                          <input
                            type="number"
                            name="couvertureSpecialise"
                            value={formData.couvertureSpecialise}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            placeholder="50"
                          />
                          <span className="coverage-unit">%</span>
                        </div>
                        <span className="coverage-hint">Endoscopie, EEG, etc.</span>
                      </div>
                    </div>
                  </div>

                  <div className="insurance-info">
                    <div className="info-box">
                      <Shield size={24} />
                      <div>
                        <strong>Information importante</strong>
                        <p>Ces taux de couverture seront utilisés pour calculer automatiquement la part prise en charge par l'assurance et le reste à charge du patient lors de la facturation des actes médicaux.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.assure === "non" && (
                <div className="no-insurance-message">
                  <div className="info-box warning">
                    <AlertCircle size={24} />
                    <div>
                      <strong>Patient non assuré</strong>
                      <p>Le patient devra régler l'intégralité des frais médicaux.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button
              type="button"
              className="btn-nav btn-prev"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} />
              Précédent
            </button>

            <div className="step-indicator">
              Étape {currentStep} sur {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn-nav btn-next"
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Suivant
                <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                type="button" 
                className="btn-nav btn-submit" 
                onClick={handleSubmit}
                disabled={!isStepValid()}
              >
                <Check size={20} />
                Enregistrer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;