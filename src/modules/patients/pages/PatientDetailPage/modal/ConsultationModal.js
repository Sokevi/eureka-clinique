import React, { useState } from "react";
import { X } from "lucide-react";
import "./Modal.css";

const ConsultationModal = ({ isOpen, onClose, onSave, patientId }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "",
    medecin: "",
    motif: "",
    diagnostic: "",
    observations: "",
    prescription: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: "",
      medecin: "",
      motif: "",
      diagnostic: "",
      observations: "",
      prescription: ""
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🩺 Nouvelle Consultation</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Date de consultation *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Type de consultation *</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Sélectionner...</option>
                <option value="Consultation Générale">Consultation Générale</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Urgence">Urgence</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Médecin traitant *</label>
            <input
              type="text"
              name="medecin"
              value={formData.medecin}
              onChange={handleChange}
              placeholder="Dr. Nom du médecin"
              required
            />
          </div>

          <div className="form-group">
            <label>Motif de consultation *</label>
            <textarea
              name="motif"
              value={formData.motif}
              onChange={handleChange}
              placeholder="Raison de la visite..."
              rows="2"
              required
            />
          </div>

          <div className="form-group">
            <label>Diagnostic</label>
            <textarea
              name="diagnostic"
              value={formData.diagnostic}
              onChange={handleChange}
              placeholder="Diagnostic posé..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Observations</label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              placeholder="Notes et observations du médecin..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Prescription / Traitement prescrit</label>
            <textarea
              name="prescription"
              value={formData.prescription}
              onChange={handleChange}
              placeholder="Médicaments prescrits..."
              rows="3"
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

export default ConsultationModal;