import React, { useState } from "react";
import { X, Plus, Trash2, FileText, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import "./OrdonnanceCard.css";

const OrdonnanceModal = ({ isOpen, onClose, onSave, patientId, patientName }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    medecin: "Dr. Dupont",
    medicaments: [
      { id: 1, nom: "", dosage: "", frequence: "", duree: "", instructions: "" }
    ],
    diagnostic: "",
    observations: ""
  });

  if (!isOpen) return null;

  const addMedicament = () => {
    setFormData({
      ...formData,
      medicaments: [
        ...formData.medicaments,
        { id: Date.now(), nom: "", dosage: "", frequence: "", duree: "", instructions: "" }
      ]
    });
  };

  const removeMedicament = (id) => {
    if (formData.medicaments.length > 1) {
      setFormData({
        ...formData,
        medicaments: formData.medicaments.filter(m => m.id !== id)
      });
    }
  };

  const updateMedicament = (id, field, value) => {
    setFormData({
      ...formData,
      medicaments: formData.medicaments.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      )
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // En-tête
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text("ORDONNANCE MÉDICALE", 105, 20, { align: 'center' });
    
    // Informations médecin
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`${formData.medecin}`, 20, 40);
    doc.text(`Date: ${new Date(formData.date).toLocaleDateString('fr-FR')}`, 20, 47);
    
    // Informations patient
    doc.setFont(undefined, 'bold');
    doc.text("Patient:", 20, 60);
    doc.setFont(undefined, 'normal');
    doc.text(patientName, 50, 60);
    doc.text(`ID: ${patientId}`, 50, 67);
    
    // Diagnostic
    if (formData.diagnostic) {
      doc.setFont(undefined, 'bold');
      doc.text("Diagnostic:", 20, 80);
      doc.setFont(undefined, 'normal');
      const diagnosticLines = doc.splitTextToSize(formData.diagnostic, 170);
      doc.text(diagnosticLines, 20, 87);
    }
    
    // Médicaments
    let yPos = formData.diagnostic ? 105 : 85;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(14);
    doc.text("PRESCRIPTION", 20, yPos);
    doc.setFontSize(12);
    
    formData.medicaments.forEach((med, index) => {
      if (med.nom) {
        yPos += 12;
        doc.setFont(undefined, 'bold');
        doc.text(`${index + 1}. ${med.nom}`, 20, yPos);
        
        yPos += 7;
        doc.setFont(undefined, 'normal');
        if (med.dosage) doc.text(`   Dosage: ${med.dosage}`, 20, yPos);
        
        if (med.frequence) {
          yPos += 6;
          doc.text(`   Fréquence: ${med.frequence}`, 20, yPos);
        }
        
        if (med.duree) {
          yPos += 6;
          doc.text(`   Durée: ${med.duree}`, 20, yPos);
        }
        
        if (med.instructions) {
          yPos += 6;
          const instructionsLines = doc.splitTextToSize(`   Instructions: ${med.instructions}`, 170);
          doc.text(instructionsLines, 20, yPos);
          yPos += (instructionsLines.length - 1) * 6;
        }
        
        yPos += 5;
      }
    });
    
    // Observations
    if (formData.observations) {
      yPos += 10;
      doc.setFont(undefined, 'bold');
      doc.text("Observations:", 20, yPos);
      yPos += 7;
      doc.setFont(undefined, 'normal');
      const obsLines = doc.splitTextToSize(formData.observations, 170);
      doc.text(obsLines, 20, yPos);
    }
    
    // Signature
    yPos = 270;
    doc.setFont(undefined, 'normal');
    doc.text("Signature et cachet du médecin:", 120, yPos);
    
    // Télécharger
    doc.save(`Ordonnance_${patientName.replace(/\s/g, '_')}_${formData.date}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-xlarge" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📝 Créer une Ordonnance</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            {/* Informations générales */}
            <div className="form-section">
              <h3>Informations générales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Médecin prescripteur</label>
                  <input
                    type="text"
                    value={formData.medecin}
                    onChange={(e) => setFormData({ ...formData, medecin: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Diagnostic</label>
                <textarea
                  value={formData.diagnostic}
                  onChange={(e) => setFormData({ ...formData, diagnostic: e.target.value })}
                  placeholder="Diagnostic médical..."
                  rows="2"
                />
              </div>
            </div>

            {/* Liste des médicaments */}
            <div className="form-section">
              <div className="section-header-inline">
                <h3>Médicaments prescrits</h3>
                <button
                  type="button"
                  className="btn-add-medication"
                  onClick={addMedicament}
                >
                  <Plus size={16} />
                  Ajouter un médicament
                </button>
              </div>

              <div className="medications-list">
                {formData.medicaments.map((med, index) => (
                  <div key={med.id} className="medication-item">
                    <div className="medication-header">
                      <span className="medication-number">#{index + 1}</span>
                      {formData.medicaments.length > 1 && (
                        <button
                          type="button"
                          className="btn-remove-medication"
                          onClick={() => removeMedicament(med.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <div className="medication-form">
                      <div className="form-group">
                        <label>Nom du médicament *</label>
                        <input
                          type="text"
                          value={med.nom}
                          onChange={(e) => updateMedicament(med.id, 'nom', e.target.value)}
                          placeholder="Ex: Paracétamol"
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Dosage</label>
                          <input
                            type="text"
                            value={med.dosage}
                            onChange={(e) => updateMedicament(med.id, 'dosage', e.target.value)}
                            placeholder="Ex: 500mg"
                          />
                        </div>
                        <div className="form-group">
                          <label>Fréquence</label>
                          <input
                            type="text"
                            value={med.frequence}
                            onChange={(e) => updateMedicament(med.id, 'frequence', e.target.value)}
                            placeholder="Ex: 3 fois par jour"
                          />
                        </div>
                        <div className="form-group">
                          <label>Durée</label>
                          <input
                            type="text"
                            value={med.duree}
                            onChange={(e) => updateMedicament(med.id, 'duree', e.target.value)}
                            placeholder="Ex: 7 jours"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Instructions</label>
                        <textarea
                          value={med.instructions}
                          onChange={(e) => updateMedicament(med.id, 'instructions', e.target.value)}
                          placeholder="Instructions spécifiques (ex: à prendre pendant les repas)"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observations */}
            <div className="form-section">
              <h3>Observations complémentaires</h3>
              <div className="form-group">
                <textarea
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  placeholder="Observations, recommandations..."
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button
              type="button"
              className="btn-generate-pdf"
              onClick={generatePDF}
            >
              <Download size={16} />
              Télécharger PDF
            </button>
            <button type="submit" className="btn-save">
              <FileText size={16} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrdonnanceModal;