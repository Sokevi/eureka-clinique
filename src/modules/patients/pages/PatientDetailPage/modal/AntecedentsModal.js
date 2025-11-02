import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import "./Modal.css";

const AntecedentsModal = ({ isOpen, onClose, onSave, patientId, data }) => {
  const [formData, setFormData] = useState({
    personnels: data?.personnels || [],
    familiaux: data?.familiaux || [],
    allergies: data?.allergies || [],
    chirurgicaux: data?.chirurgicaux || [],
    gynecologiques: "",
    professionnels: "",
    habitudes: {
      tabac: "",
      alcool: "",
      sport: "",
      alimentation: ""
    }
  });

  const [newItems, setNewItems] = useState({
    personnel: "",
    familial: "",
    allergie: "",
    chirurgical: ""
  });

  if (!isOpen) return null;

  const addItem = (category) => {
    const item = newItems[category];
    if (item.trim()) {
      setFormData({
        ...formData,
        [category === "personnel" ? "personnels" : 
         category === "familial" ? "familiaux" :
         category === "allergie" ? "allergies" : "chirurgicaux"]: 
        [...formData[category === "personnel" ? "personnels" : 
                    category === "familial" ? "familiaux" :
                    category === "allergie" ? "allergies" : "chirurgicaux"], item]
      });
      setNewItems({ ...newItems, [category]: "" });
    }
  };

  const removeItem = (category, index) => {
    const key = category === "personnel" ? "personnels" : 
                category === "familial" ? "familiaux" :
                category === "allergie" ? "allergies" : "chirurgicaux";
    const newList = [...formData[key]];
    newList.splice(index, 1);
    setFormData({ ...formData, [key]: newList });
  };

  const handleHabitChange = (e) => {
    setFormData({
      ...formData,
      habitudes: { ...formData.habitudes, [e.target.name]: e.target.value }
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
          <h2>⚠️ Gestion des Antécédents</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="antecedents-grid">
            {/* Antécédents Personnels */}
            <div className="antecedent-section">
              <h3>🩺 Antécédents Personnels</h3>
              <div className="add-item-group">
                <input
                  type="text"
                  value={newItems.personnel}
                  onChange={(e) => setNewItems({ ...newItems, personnel: e.target.value })}
                  placeholder="Diabète Type 2 (2020)..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('personnel'))}
                />
                <button type="button" className="btn-add-item" onClick={() => addItem('personnel')}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="items-list">
                {formData.personnels.map((item, index) => (
                  <div key={index} className="list-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem('personnel', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Antécédents Familiaux */}
            <div className="antecedent-section">
              <h3>👨‍👩‍👧‍👦 Antécédents Familiaux</h3>
              <div className="add-item-group">
                <input
                  type="text"
                  value={newItems.familial}
                  onChange={(e) => setNewItems({ ...newItems, familial: e.target.value })}
                  placeholder="Père: Diabète..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('familial'))}
                />
                <button type="button" className="btn-add-item" onClick={() => addItem('familial')}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="items-list">
                {formData.familiaux.map((item, index) => (
                  <div key={index} className="list-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem('familial', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Allergies */}
            <div className="antecedent-section allergie-section">
              <h3>⚠️ Allergies</h3>
              <div className="add-item-group">
                <input
                  type="text"
                  value={newItems.allergie}
                  onChange={(e) => setNewItems({ ...newItems, allergie: e.target.value })}
                  placeholder="Pénicilline, Arachides..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('allergie'))}
                />
                <button type="button" className="btn-add-item" onClick={() => addItem('allergie')}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="items-list">
                {formData.allergies.map((item, index) => (
                  <div key={index} className="list-item allergie-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem('allergie', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Antécédents Chirurgicaux */}
            <div className="antecedent-section">
              <h3>🔪 Antécédents Chirurgicaux</h3>
              <div className="add-item-group">
                <input
                  type="text"
                  value={newItems.chirurgical}
                  onChange={(e) => setNewItems({ ...newItems, chirurgical: e.target.value })}
                  placeholder="Appendicectomie (2015)..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('chirurgical'))}
                />
                <button type="button" className="btn-add-item" onClick={() => addItem('chirurgical')}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="items-list">
                {formData.chirurgicaux.map((item, index) => (
                  <div key={index} className="list-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem('chirurgical', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Antécédents Gynécologiques */}
          <div className="form-group">
            <label>🤰 Antécédents Gynécologiques & Obstétricaux</label>
            <textarea
              name="gynecologiques"
              value={formData.gynecologiques}
              onChange={(e) => setFormData({ ...formData, gynecologiques: e.target.value })}
              placeholder="G2P2, Grossesses antérieures, complications..."
              rows="2"
            />
          </div>

          {/* Antécédents Professionnels */}
          <div className="form-group">
            <label>💼 Antécédents Professionnels</label>
            <textarea
              name="professionnels"
              value={formData.professionnels}
              onChange={(e) => setFormData({ ...formData, professionnels: e.target.value })}
              placeholder="Exposition à produits toxiques, maladies professionnelles..."
              rows="2"
            />
          </div>

          {/* Habitudes de vie */}
          <div className="habitudes-section">
            <h3>🚬 Habitudes de Vie</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Tabac</label>
                <input
                  type="text"
                  name="tabac"
                  value={formData.habitudes.tabac}
                  onChange={handleHabitChange}
                  placeholder="Non-fumeur / 10 cig./jour..."
                />
              </div>
              <div className="form-group">
                <label>Alcool</label>
                <input
                  type="text"
                  name="alcool"
                  value={formData.habitudes.alcool}
                  onChange={handleHabitChange}
                  placeholder="Occasionnel / 2 verres/jour..."
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Activité Physique</label>
                <input
                  type="text"
                  name="sport"
                  value={formData.habitudes.sport}
                  onChange={handleHabitChange}
                  placeholder="Sédentaire / 3x par semaine..."
                />
              </div>
              <div className="form-group">
                <label>Alimentation</label>
                <input
                  type="text"
                  name="alimentation"
                  value={formData.habitudes.alimentation}
                  onChange={handleHabitChange}
                  placeholder="Équilibrée / Régime particulier..."
                />
              </div>
            </div>
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

export default AntecedentsModal;