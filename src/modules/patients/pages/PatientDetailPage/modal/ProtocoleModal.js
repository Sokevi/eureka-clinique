import React, { useState } from "react";
import { X, Plus, Trash2, Check, Clock } from "lucide-react";
import "./Modal.css";

const ProtocoleModal = ({ isOpen, onClose, onSave, patientId }) => {
  const [formData, setFormData] = useState({
    nom: "",
    origine: "",
    motif: "",
    objectif: "",
    service: "",
    etapes: [
      { id: 1, ordre: 1, type: "", nom: "", dosage: "", frequence: "", responsable: "" }
    ]
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEtape = () => {
    setFormData({
      ...formData,
      etapes: [
        ...formData.etapes,
        { 
          id: Date.now(), 
          ordre: formData.etapes.length + 1, 
          type: "", 
          nom: "", 
          dosage: "", 
          frequence: "", 
          responsable: "" 
        }
      ]
    });
  };

  const removeEtape = (id) => {
    if (formData.etapes.length > 1) {
      setFormData({
        ...formData,
        etapes: formData.etapes.filter(e => e.id !== id)
      });
    }
  };

  const updateEtape = (id, field, value) => {
    setFormData({
      ...formData,
      etapes: formData.etapes.map(e =>
        e.id === id ? { ...e, [field]: value } : e
      )
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-xlarge" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🩺 Créer un Protocole de Soins</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            {/* Informations générales */}
            <div className="form-section">
              <h3>📋 Informations générales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nom du protocole *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Ex: Protocole Soins Ambulatoires IV"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Origine *</label>
                  <select name="origine" value={formData.origine} onChange={handleChange} required>
                    <option value="">Sélectionner...</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Hospitalisation">Hospitalisation</option>
                    <option value="Acte chirurgical">Acte chirurgical</option>
                    <option value="Prescription">Prescription médicale</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Service concerné</label>
                  <select name="service" value={formData.service} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Soins ambulatoires">Soins ambulatoires</option>
                    <option value="Chirurgie">Chirurgie</option>
                    <option value="Hospitalisation">Hospitalisation</option>
                    <option value="Soins infirmiers">Soins infirmiers</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Motif de création *</label>
                <textarea
                  name="motif"
                  value={formData.motif}
                  onChange={handleChange}
                  placeholder="Ex: Douleur post-opératoire nécessitant analgésie IV"
                  rows="2"
                  required
                />
              </div>

              <div className="form-group">
                <label>Objectif du protocole</label>
                <textarea
                  name="objectif"
                  value={formData.objectif}
                  onChange={handleChange}
                  placeholder="Ex: Soulagement de la douleur et prévention gastrique"
                  rows="2"
                />
              </div>
            </div>

            {/* Liste des étapes */}
            <div className="form-section">
              <div className="section-header-inline">
                <h3>📝 Étapes du protocole</h3>
                <button
                  type="button"
                  className="btn-add-medication"
                  onClick={addEtape}
                >
                  <Plus size={16} />
                  Ajouter une étape
                </button>
              </div>

              <div className="medications-list">
                {formData.etapes.map((etape, index) => (
                  <div key={etape.id} className="medication-item">
                    <div className="medication-header">
                      <span className="medication-number">Étape #{index + 1}</span>
                      {formData.etapes.length > 1 && (
                        <button
                          type="button"
                          className="btn-remove-medication"
                          onClick={() => removeEtape(etape.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="medication-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label>Type *</label>
                          <select
                            value={etape.type}
                            onChange={(e) => updateEtape(etape.id, 'type', e.target.value)}
                            required
                          >
                            <option value="">Sélectionner...</option>
                            <option value="Médicament">Médicament</option>
                            <option value="Consommable">Consommable</option>
                            <option value="Acte">Acte</option>
                            <option value="Observation">Observation</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Nom/Description *</label>
                          <input
                            type="text"
                            value={etape.nom}
                            onChange={(e) => updateEtape(etape.id, 'nom', e.target.value)}
                            placeholder="Ex: Novalgin 2.5g Injectable"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Dosage</label>
                          <input
                            type="text"
                            value={etape.dosage}
                            onChange={(e) => updateEtape(etape.id, 'dosage', e.target.value)}
                            placeholder="Ex: 5ml, 1g"
                          />
                        </div>

                        <div className="form-group">
                          <label>Fréquence</label>
                          <input
                            type="text"
                            value={etape.frequence}
                            onChange={(e) => updateEtape(etape.id, 'frequence', e.target.value)}
                            placeholder="Ex: 1x, Toutes les 8h"
                          />
                        </div>

                        <div className="form-group">
                          <label>Responsable</label>
                          <select
                            value={etape.responsable}
                            onChange={(e) => updateEtape(etape.id, 'responsable', e.target.value)}
                          >
                            <option value="">Sélectionner...</option>
                            <option value="Infirmier">Infirmier</option>
                            <option value="Médecin">Médecin</option>
                            <option value="Aide-soignant">Aide-soignant</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-save">
              <Check size={18} />
              Créer le protocole
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProtocoleModal;