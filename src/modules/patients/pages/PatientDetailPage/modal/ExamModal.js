import React, { useState } from "react";
import { X } from "lucide-react";
import "./Modal.css";

const ExamModal = ({ isOpen, onClose, onSave, patientId }) => {
  const [formData, setFormData] = useState({
    type: "",
    categorie: "",
    date: new Date().toISOString().split('T')[0],
    laboratoire: "",
    medecin: "",
    resultat: "",
    valeurs: "",
    interpretation: "",
    fichier: null
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fichier: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      type: "",
      categorie: "",
      date: new Date().toISOString().split('T')[0],
      laboratoire: "",
      medecin: "",
      resultat: "",
      valeurs: "",
      interpretation: "",
      fichier: null
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔬 Nouvel Examen Médical</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Catégorie d'examen *</label>
              <select name="categorie" value={formData.categorie} onChange={handleChange} required>
                <option value="">Sélectionner...</option>
                <option value="Biologique">Analyse Biologique</option>
                <option value="Imagerie">Imagerie Médicale</option>
                <option value="Fonctionnel">Examen Fonctionnel</option>
                <option value="Anatomopathologie">Anatomopathologie</option>
              </select>
            </div>

            <div className="form-group">
              <label>Type d'examen *</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Sélectionner...</option>
                <optgroup label="Analyses Biologiques">
                  <option value="Analyse de sang">Analyse de sang (NFS)</option>
                  <option value="Glycémie">Glycémie</option>
                  <option value="Cholestérol">Bilan lipidique</option>
                  <option value="Fonction rénale">Fonction rénale</option>
                  <option value="Fonction hépatique">Fonction hépatique</option>
                  <option value="Analyse d'urine">Analyse d'urine</option>
                </optgroup>
                <optgroup label="Imagerie">
                  <option value="Radiographie">Radiographie</option>
                  <option value="Échographie">Échographie</option>
                  <option value="Scanner">Scanner (CT)</option>
                  <option value="IRM">IRM</option>
                  <option value="Mammographie">Mammographie</option>
                </optgroup>
                <optgroup label="Examens Fonctionnels">
                  <option value="ECG">ECG (Électrocardiogramme)</option>
                  <option value="EEG">EEG</option>
                  <option value="Spirométrie">Spirométrie</option>
                  <option value="Épreuve d'effort">Épreuve d'effort</option>
                </optgroup>
                <optgroup label="Autres">
                  <option value="Biopsie">Biopsie</option>
                  <option value="Endoscopie">Endoscopie</option>
                  <option value="Autre">Autre</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date de l'examen *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Laboratoire / Centre</label>
              <input
                type="text"
                name="laboratoire"
                value={formData.laboratoire}
                onChange={handleChange}
                placeholder="Nom du laboratoire ou centre médical"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Médecin prescripteur</label>
            <input
              type="text"
              name="medecin"
              value={formData.medecin}
              onChange={handleChange}
              placeholder="Dr. Nom du médecin"
            />
          </div>

          <div className="form-group">
            <label>Résultat global *</label>
            <select name="resultat" value={formData.resultat} onChange={handleChange} required>
              <option value="">Sélectionner...</option>
              <option value="Normal">Normal / RAS</option>
              <option value="Anomalie mineure">Anomalie mineure</option>
              <option value="Anomalie significative">Anomalie significative</option>
              <option value="Pathologique">Pathologique</option>
              <option value="En attente">En attente</option>
            </select>
          </div>

          <div className="form-group">
            <label>Valeurs / Mesures</label>
            <textarea
              name="valeurs"
              value={formData.valeurs}
              onChange={handleChange}
              placeholder="Ex: Hémoglobine: 14g/dL, Leucocytes: 7000/mm³..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Interprétation / Commentaires</label>
            <textarea
              name="interpretation"
              value={formData.interpretation}
              onChange={handleChange}
              placeholder="Commentaires du médecin ou du biologiste..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Fichier de résultats (PDF, Image)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="file-input"
            />
            <small className="form-hint">Format acceptés: PDF, JPG, PNG (max 5MB)</small>
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

export default ExamModal;