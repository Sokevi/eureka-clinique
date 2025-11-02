import React, { useState } from "react";
import { X, Save, Eye, Edit2, Shield, AlertCircle } from "lucide-react";
import "./Modal.css";

const PatientInfoModal = ({ isOpen, onClose, onSave, patientData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    civilite: patientData?.civilite || "",
    nom: patientData?.nom || "",
    prenoms: patientData?.prenoms || "",
    sexe: patientData?.sexe || "",
    dateNaissance: patientData?.dateNaissance || "",
    lieuNaissance: patientData?.lieuNaissance || "",
    email: patientData?.email || "",
    telephone: patientData?.telephone || "",
    quartier: patientData?.quartier || "",
    profession: patientData?.profession || "",
    passport: patientData?.passport || "",
    cni: patientData?.cni || "",
    nationalite: patientData?.nationalite || "",
    groupeSanguin: patientData?.groupeSanguin || "",
    typeConsultation: patientData?.typeConsultation || "",
    situationMatrimoniale: patientData?.situationMatrimoniale || "",
    nombreEnfants: patientData?.nombreEnfants || "",
    nomConjoint: patientData?.nomConjoint || "",
    prenomsConjoint: patientData?.prenomsConjoint || "",
    contactNom: patientData?.contactNom || "",
    contactPrenoms: patientData?.contactPrenoms || "",
    contactTelephone: patientData?.contactTelephone || "",
    // Informations d'assurance
    assure: patientData?.assure || "non",
    compagnieAssurance: patientData?.compagnieAssurance || "",
    numeroPolice: patientData?.numeroPolice || "",
    dateExpirationAssurance: patientData?.dateExpirationAssurance || "",
    tauxCouverture: patientData?.tauxCouverture || "",
    typeAssurance: patientData?.typeAssurance || "",
    contactAssurance: patientData?.contactAssurance || ""
  });

  if (!isOpen) return null;

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
        contactAssurance: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const InfoRow = ({ label, value, emoji }) => (
    <div className="info-display-row">
      <span className="info-label">
        {emoji} {label}
      </span>
      <span className="info-value">{value || "—"}</span>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {isEditing ? "✏️ Modifier les informations" : "👤 Informations du patient"}
          </h2>
          <div style={{ display: "flex", gap: "8px" }}>
            {!isEditing && (
              <button
                className="btn-icon-header"
                onClick={() => setIsEditing(true)}
                title="Modifier"
              >  
                <Edit2 size={18} />
                Modifier
              </button>
            )}
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {!isEditing ? (
          // MODE LECTURE
          <div className="modal-body">
            <div className="info-section">
              <h3>📋 Identité</h3>
              <div className="info-grid">
                <InfoRow label="Civilité" value={formData.civilite} emoji="👔" />
                <InfoRow label="Nom" value={formData.nom} emoji="📝" />
                <InfoRow label="Prénoms" value={formData.prenoms} emoji="📝" />
                <InfoRow label="Sexe" value={formData.sexe} emoji="⚧" />
                <InfoRow label="Date de naissance" value={formData.dateNaissance} emoji="🎂" />
                <InfoRow label="Lieu de naissance" value={formData.lieuNaissance} emoji="📍" />
              </div>
            </div>

            <div className="info-section">
              <h3>📞 Contact</h3>
              <div className="info-grid">
                <InfoRow label="Email" value={formData.email} emoji="📧" />
                <InfoRow label="Téléphone" value={formData.telephone} emoji="📱" />
                <InfoRow label="Quartier" value={formData.quartier} emoji="🏘️" />
                <InfoRow label="Profession" value={formData.profession} emoji="💼" />
              </div>
            </div>

            <div className="info-section">
              <h3>🆔 Documents</h3>
              <div className="info-grid">
                <InfoRow label="N° Passeport" value={formData.passport} emoji="🛂" />
                <InfoRow label="N° CNI" value={formData.cni} emoji="🪪" />
                <InfoRow label="Nationalité" value={formData.nationalite} emoji="🌍" />
              </div>
            </div>

            <div className="info-section">
              <h3>🏥 Informations médicales</h3>
              <div className="info-grid">
                <InfoRow label="Groupe sanguin" value={formData.groupeSanguin} emoji="🩸" />
                <InfoRow label="Type de consultation" value={formData.typeConsultation} emoji="🩺" />
              </div>
            </div>

            <div className="info-section">
              <h3>👨‍👩‍👧‍👦 Informations familiales</h3>
              <div className="info-grid">
                <InfoRow label="Situation" value={formData.situationMatrimoniale} emoji="💍" />
                <InfoRow label="Nombre d'enfants" value={formData.nombreEnfants} emoji="👶" />
                <InfoRow label="Conjoint" value={`${formData.prenomsConjoint || ""} ${formData.nomConjoint || ""}`.trim()} emoji="👥" />
              </div>
            </div>

            <div className="info-section">
              <h3>🚨 Personne à prévenir</h3>
              <div className="info-grid">
                <InfoRow label="Nom" value={formData.contactNom} emoji="👤" />
                <InfoRow label="Prénoms" value={formData.contactPrenoms} emoji="👤" />
                <InfoRow label="Téléphone" value={formData.contactTelephone} emoji="📞" />
              </div>
            </div>

            {/* Section Assurance */}
            <div className="info-section">
              <h3>🛡️ Informations d'assurance</h3>
              {formData.assure === "oui" ? (
                <div className="info-grid">
                  <InfoRow label="Compagnie" value={formData.compagnieAssurance} emoji="🏢" />
                  <InfoRow label="N° Police" value={formData.numeroPolice} emoji="📄" />
                  <InfoRow label="Type" value={formData.typeAssurance} emoji="📋" />
                  <InfoRow label="Taux de couverture" value={formData.tauxCouverture ? `${formData.tauxCouverture}%` : "—"} emoji="💯" />
                  <InfoRow label="Date d'expiration" value={formData.dateExpirationAssurance} emoji="📅" />
                  <InfoRow label="Contact" value={formData.contactAssurance} emoji="☎️" />
                </div>
              ) : (
                <div className="no-insurance-display">
                  <div className="info-box warning">
                    <AlertCircle size={24} />
                    <div>
                      <strong>Patient non assuré</strong>
                      <p>Aucune couverture d'assurance enregistrée</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} />
                Modifier
              </button>
              <button className="btn-cancel" onClick={onClose}>
                Fermer
              </button>
            </div>
          </div>
        ) : (
          // MODE ÉDITION
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-section">
              <h3>📋 Identité</h3>
              <div className="form-row">
                <div className="form-group small">
                  <label>Civilité</label>
                  <select name="civilite" value={formData.civilite} onChange={handleChange}>
                    <option value="">-</option>
                    <option value="M.">M.</option>
                    <option value="Mme">Mme</option>
                    <option value="Mlle">Mlle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Prénoms</label>
                  <input
                    type="text"
                    name="prenoms"
                    value={formData.prenoms}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sexe</label>
                  <select name="sexe" value={formData.sexe} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date de naissance</label>
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
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>📞 Contact</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quartier</label>
                  <input
                    type="text"
                    name="quartier"
                    value={formData.quartier}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>🆔 Documents</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>N° Passeport</label>
                  <input
                    type="text"
                    name="passport"
                    value={formData.passport}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>N° CNI</label>
                  <input
                    type="text"
                    name="cni"
                    value={formData.cni}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nationalité</label>
                  <input
                    type="text"
                    name="nationalite"
                    value={formData.nationalite}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>🏥 Informations médicales</h3>
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
                <div className="form-group">
                  <label>Type de consultation</label>
                  <select name="typeConsultation" value={formData.typeConsultation} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Endocrinologie">Endocrinologie</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Radiologie">Radiologie</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section Assurance en mode édition */}
            <div className="form-section">
              <h3>🛡️ Informations d'assurance</h3>
              
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
                      <label>Compagnie d'assurance</label>
                      <select
                        name="compagnieAssurance"
                        value={formData.compagnieAssurance}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="NSIA Assurance">NSIA Assurance</option>
                        <option value="AXA Assurance">AXA Assurance</option>
                        <option value="Allianz Assurance">Allianz Assurance</option>
                        <option value="SUNU Assurances">SUNU Assurances</option>
                        <option value="Saham Assurance">Saham Assurance</option>
                        <option value="Atlantique Assurances">Atlantique Assurances</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>N° de police</label>
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
                      <label>Taux de couverture (%)</label>
                      <input
                        type="number"
                        name="tauxCouverture"
                        value={formData.tauxCouverture}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        placeholder="Ex: 80"
                      />
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
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                Annuler
              </button>
              <button type="submit" className="btn-save">
                <Save size={18} />
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientInfoModal;