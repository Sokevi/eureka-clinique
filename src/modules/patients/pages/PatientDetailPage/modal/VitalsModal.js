import React, { useState } from 'react';
import { X, Activity, Heart, TrendingUp, Thermometer, Save } from 'lucide-react';
import './VitalsModal.css';

const VitalsModal = ({ isOpen, onClose, onSave, patientId }) => {
  const [isPregnant, setIsPregnant] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    imc: '',
    temperature: '',
    pulse: '',
    bpLeft: '',
    bpRight: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Calcul automatique de l'IMC
      if ((name === 'height' || name === 'weight') && updated.height && updated.weight) {
        const heightInMeters = parseFloat(updated.height) / 100;
        const weightInKg = parseFloat(updated.weight);
        const imc = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        updated.imc = isNaN(imc) ? '' : imc;
      }
      
      return updated;
    });
  };

  const handleSubmit = () => {
    const vitalsData = {
      ...formData,
      isPregnant,
      patientId,
      date: new Date().toISOString()
    };
    
    console.log('Données enregistrées:', vitalsData);
    onSave(vitalsData);
    
    // Réinitialiser le formulaire
    setFormData({
      height: '',
      weight: '',
      imc: '',
      temperature: '',
      pulse: '',
      bpLeft: '',
      bpRight: ''
    });
    setIsPregnant(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>
            <Activity size={24} />
            Nouveaux Signes Vitaux
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="modal-body">
          
          {/* Question grossesse */}
          <div className="form-section pregnancy-section">
            <label className="section-label">
              S'agit-il d'une femme enceinte ?
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="pregnant"
                  checked={isPregnant === true}
                  onChange={() => setIsPregnant(true)}
                />
                Oui
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="pregnant"
                  checked={isPregnant === false}
                  onChange={() => setIsPregnant(false)}
                />
                Non
              </label>
            </div>
          </div>

          {/* Taille, Poids, IMC */}
          <div className="form-grid-3">
            <div className="form-group">
              <label>Taille</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="170"
                />
                <span className="input-unit">cm</span>
              </div>
            </div>

            <div className="form-group">
              <label>Poids</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="70"
                />
                <span className="input-unit">Kg</span>
              </div>
            </div>

            <div className="form-group">
              <label>IMC</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="imc"
                  value={formData.imc}
                  readOnly
                  placeholder="Auto"
                  className="readonly-input"
                />
                <span className="input-unit">Kg/m²</span>
              </div>
            </div>
          </div>

          {/* Température et Pouls */}
          <div className="form-grid-2">
            <div className="form-group">
              <label>
                <Thermometer size={16} />
                Température
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder="37.0"
                />
                <span className="input-unit">°C</span>
              </div>
            </div>

            <div className="form-group">
              <label>
                <Heart size={16} />
                Pouls
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="pulse"
                  value={formData.pulse}
                  onChange={handleInputChange}
                  placeholder="75"
                />
                <span className="input-unit">BPM</span>
              </div>
            </div>
          </div>

          {/* Tension artérielle */}
          <div className="form-section bp-section">
            <label className="section-label">
              <TrendingUp size={18} />
              Tension Artérielle
            </label>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="small-label">Bras gauche</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="bpLeft"
                    value={formData.bpLeft}
                    onChange={handleInputChange}
                    placeholder="120/80"
                  />
                  <span className="input-unit">mmHg</span>
                </div>
              </div>

              <div className="form-group">
                <label className="small-label">Bras droit</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="bpRight"
                    value={formData.bpRight}
                    onChange={handleInputChange}
                    placeholder="120/80"
                  />
                  <span className="input-unit">mmHg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="button" className="btn-submit" onClick={handleSubmit}>
              <Save size={18} />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalsModal;