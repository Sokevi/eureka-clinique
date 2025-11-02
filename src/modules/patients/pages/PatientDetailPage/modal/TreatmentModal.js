import React, { useState } from "react";
import { X } from "lucide-react";
import "./Modal.css";

const TreatmentModal = ({ isOpen, onClose, onSave, patientId }) => {
  const [formData, setFormData] = useState({
    traitement: "",
    type: "",
    dosage: "",
    frequence: "",
    voie: "",
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: "",
    duree: "",
    statut: "En cours",
    instructions: "",
    effetsSecondaires: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      traitement: "",
      type: "",
      dosage: "",
      frequence: "",
      voie: "",
      dateDebut: new Date().toISOString().split('T')[0],
      dateFin: "",
      duree: "",
      statut: "En cours",
      instructions: "",
      effetsSecondaires: ""
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💊 Nouveau Traitement</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom du traitement *</label>
              <input
                type="text"
                name="traitement"
                value={formData.traitement}
                onChange={handleChange}
                placeholder="Ex: Paracétamol, Insuline..."
                required
              />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Sélectionner...</option>
                <option value="Médicament">Médicament</option>
                <option value="Injection">Injection</option>
                <option value="Perfusion">Perfusion</option>
                <option value="Pommade">Pommade/Crème</option>
                <option value="Kinésithérapie">Kinésithérapie</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Dosage *</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Ex: 500mg, 10 UI..."
                required
              />
            </div>

            <div className="form-group">
              <label>Fréquence *</label>
              <input
                type="text"
                name="frequence"
                value={formData.frequence}
                onChange={handleChange}
                placeholder="Ex: 3x/jour, 2x/semaine..."
                required
              />
            </div>

            <div className="form-group">
              <label>Voie d'administration</label>
              <select name="voie" value={formData.voie} onChange={handleChange}>
                <option value="">Sélectionner...</option>
                <option value="Orale">Orale</option>
                <option value="Intraveineuse">Intraveineuse</option>
                <option value="Intramusculaire">Intramusculaire</option>
                <option value="Sous-cutanée">Sous-cutanée</option>
                <option value="Topique">Topique</option>
                <option value="Inhalation">Inhalation</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date de début *</label>
              <input
                type="date"
                name="dateDebut"
                value={formData.dateDebut}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date de fin</label>
              <input
                type="date"
                name="dateFin"
                value={formData.dateFin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Durée prévue</label>
              <input
                type="text"
                name="duree"
                value={formData.duree}
                onChange={handleChange}
                placeholder="Ex: 7 jours, 3 mois..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>Statut *</label>
            <select name="statut" value={formData.statut} onChange={handleChange} required>
              <option value="En cours">En cours</option>
              <option value="Planifié">Planifié</option>
              <option value="Terminé">Terminé</option>
              <option value="Suspendu">Suspendu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Instructions particulières</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="À prendre avec de l'eau, avant/après repas..."
              rows="2"
            />
          </div>

          <div className="form-group">
            <label>Effets secondaires observés</label>
            <textarea
              name="effetsSecondaires"
              value={formData.effetsSecondaires}
              onChange={handleChange}
              placeholder="Noter tout effet indésirable..."
              rows="2"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-save">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreatmentModal;