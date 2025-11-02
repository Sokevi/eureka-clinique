import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, Activity, Clock, Heart, TrendingUp, Plus,
  Stethoscope, Pill, TestTube, AlertCircle, Edit, FileText, Eye, ClipboardList, CheckCircle
} from "lucide-react";
import patientService from "../../services/patientService";
import VitalsModal from "./modal/VitalsModal";
import ConsultationModal from "./modal/ConsultationModal";
import TreatmentModal from "./modal/TreatmentModal";
import ExamModal from "./modal/ExamModal";
import AntecedentsModal from "./modal/AntecedentsModal";
import OrdonnanceModal from "./modal/OrdonnanceModal";
import ProtocoleModal from "./modal/ProtocoleModal";
import ViewMoreModal from "./modal/ViewMoreModal";
import PatientInfoModal from "./modal/PatientInfoModal";
import "./PatientDetailPage.css";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // États pour les modals
  const [modals, setModals] = useState({
    patientInfo: false,
    vitals: false,
    consultation: false,
    treatment: false,
    exam: false,
    antecedents: false,
    ordonnance: false,
    protocole: false,
    viewMoreDocuments: false,
    viewMoreAlerts: false,
    viewMoreConsultations: false,
    viewMoreTreatments: false,
    viewMoreExams: false,
    viewMoreProtocoles: false
  });

  // Données complètes du patient pour PatientInfoModal
  const [patientFullData, setPatientFullData] = useState({
    civilite: "M.",
    nom: "Dupont",
    prenoms: "Jean Pierre",
    sexe: "Masculin",
    dateNaissance: "1980-05-15",
    lieuNaissance: "Paris",
    email: "jean.dupont@email.com",
    telephone: "+33 6 12 34 56 78",
    quartier: "Plateau",
    profession: "Ingénieur",
    passport: "19FR12345",
    cni: "FR123456789",
    nationalite: "Française",
    groupeSanguin: "O+",
    typeConsultation: "Consultation Générale",
    situationMatrimoniale: "Marié",
    nombreEnfants: "2",
    nomConjoint: "Dupont",
    prenomsConjoint: "Marie",
    contactNom: "Dupont",
    contactPrenoms: "Sophie",
    contactTelephone: "+33 6 98 76 54 32"
  });

  // Données des protocoles
  const protocoles = [
    { 
      id: 1, 
      nom: "Protocole Soins Ambulatoires IV", 
      date: "20/10/2025", 
      statut: "EN_COURS",
      etapesTotal: 5,
      etapesRealisees: 2,
      service: "Soins ambulatoires"
    },
    { 
      id: 2, 
      nom: "Protocole Post-Opératoire", 
      date: "15/10/2025", 
      statut: "TERMINE",
      etapesTotal: 8,
      etapesRealisees: 8,
      service: "Chirurgie"
    },
    { 
      id: 3, 
      nom: "Suivi Diabète Type 2", 
      date: "10/10/2025", 
      statut: "EN_COURS",
      etapesTotal: 3,
      etapesRealisees: 1,
      service: "Endocrinologie"
    },
      { 
      id: 4, 
      nom: "Suivi post operation ", 
      date: "10/10/2025", 
      statut: "EN_COURS",
      etapesTotal: 3,
      etapesRealisees: 1,
      service: "Endocrinologie"
    },
     { 
      id: 5, 
      nom: "Traitement paluu ", 
      date: "10/10/2025", 
      statut: "EN_COURS",
      etapesTotal: 3,
      etapesRealisees: 1,
      service: "Endocrinologie"
    }
  ];

  const protocolesEnCours = protocoles.filter(p => p.statut === "EN_COURS");

  // Données factices pour ce patient
  const consultations = [
    { id: 1, date: "20/10/2025", type: "Consultation Générale", médecin: "Dr. Dupont", motif: "Contrôle routine" },
    { id: 2, date: "12/09/2025", type: "Cardiologie", médecin: "Dr. Martin", motif: "Douleurs thoraciques" },
    { id: 3, date: "05/08/2025", type: "Radiologie", médecin: "Dr. Moreau", motif: "Radio pulmonaire" },
    { id: 4, date: "22/07/2025", type: "Consultation Générale", médecin: "Dr. Dupont", motif: "Suivi diabète" },
    { id: 5, date: "10/06/2025", type: "Ophtalmologie", médecin: "Dr. Leblanc", motif: "Contrôle vision" },
    { id: 6, date: "28/05/2025", type: "Dermatologie", médecin: "Dr. Rousseau", motif: "Vérification grain de beauté" }
  ];

  const traitements = [
    { id: 1, traitement: "Insuline", date: "20/10/2025", statut: "En cours", dosage: "10 UI/jour" },
    { id: 2, traitement: "Antibiotiques", date: "15/09/2025", statut: "Terminé", dosage: "500mg 3x/jour" },
    { id: 3, traitement: "Physiothérapie", date: "01/08/2025", statut: "Planifié", dosage: "2 séances/semaine" },
    { id: 4, traitement: "Metformine", date: "15/07/2025", statut: "En cours", dosage: "850mg 2x/jour" },
    { id: 5, traitement: "Ramipril", date: "10/06/2025", statut: "En cours", dosage: "5mg/jour" },
    { id: 6, traitement: "Atorvastatine", date: "05/05/2025", statut: "En cours", dosage: "20mg le soir" }
  ];

  const examens = [
    { id: 1, type: "Analyse de sang", date: "18/10/2025", résultat: "Normal", laboratoire: "Lab Central" },
    { id: 2, type: "ECG", date: "12/09/2025", résultat: "Anomalie mineure", laboratoire: "Cardio Center" },
    { id: 3, type: "Radio thorax", date: "05/08/2025", résultat: "RAS", laboratoire: "Imagerie Médicale" },
    { id: 4, type: "Échographie abdominale", date: "25/07/2025", résultat: "Normal", laboratoire: "Imagerie Médicale" },
    { id: 5, type: "IRM cérébrale", date: "15/06/2025", résultat: "RAS", laboratoire: "Imagerie Avancée" },
    { id: 6, type: "Test d'effort", date: "02/05/2025", résultat: "Satisfaisant", laboratoire: "Cardio Center" }
  ];

  const documents = [
    { id: 1, nom: "Ordonnance - 12/09/2025", auteur: "Dr. Martin", date: "12/09/2025" },
    { id: 2, nom: "Compte-rendu Radio", auteur: "Imagerie Médicale", date: "05/08/2025" },
    { id: 3, nom: "Résultats analyses", auteur: "Lab Central", date: "18/10/2025" },
    { id: 4, nom: "Certificat médical", auteur: "Dr. Dupont", date: "20/10/2025" },
    { id: 5, nom: "Compte-rendu ECG", auteur: "Cardio Center", date: "12/09/2025" },
    { id: 6, nom: "Ordonnance renouvellement", auteur: "Dr. Dupont", date: "22/07/2025" }
  ];

  const antecedents = {
    personnels: ["Diabète Type 2 (2020)", "Hypertension (2018)", "Hypercholestérolémie (2019)"],
    familiaux: ["Père: Infarctus (65 ans)", "Mère: Diabète", "Frère: Hypertension"],
    allergies: ["Pénicilline", "Arachides", "Latex"],
    chirurgicaux: ["Appendicectomie (2015)", "Ablation vésicule biliaire (2018)"]
  };

  const allAlerts = [
    ...antecedents.allergies.map((a, i) => ({ id: `allergy-${i}`, type: "Allergie", description: a })),
    ...antecedents.familiaux.map((f, i) => ({ id: `family-${i}`, type: "Antécédent Familial", description: f })),
    ...antecedents.personnels.map((p, i) => ({ id: `personal-${i}`, type: "Antécédent Personnel", description: p })),
    ...antecedents.chirurgicaux.map((c, i) => ({ id: `surgery-${i}`, type: "Chirurgie", description: c }))
  ];

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      const data = await patientService.getPatientById(id);
      setPatient(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (modalName) => {
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const handleSavePatientInfo = (data) => {
    setPatientFullData(data);
    alert("✅ Informations patient mises à jour !");
    closeModal('patientInfo');
  };

  const handleSaveVitals = (data) => {
    alert("✅ Signes vitaux enregistrés !");
    closeModal('vitals');
  };

  const handleSaveProtocole = (data) => {
    console.log("Protocole créé:", data);
    alert("✅ Protocole créé avec succès !");
    closeModal('protocole');
  };

  const handleSaveConsultation = (data) => {
    alert("✅ Consultation enregistrée !");
    closeModal('consultation');
  };

  const handleSaveTreatment = (data) => {
    alert("✅ Traitement enregistré !");
    closeModal('treatment');
  };

  const handleSaveExam = (data) => {
    alert("✅ Examen enregistré !");
    closeModal('exam');
  };

  const handleSaveAntecedents = (data) => {
    alert("✅ Antécédents enregistrés !");
    closeModal('antecedents');
  };

  const handleSaveOrdonnance = (data) => {
    alert("✅ Ordonnance créée avec succès !");
    closeModal('ordonnance');
  };

  // Render functions pour ViewMoreModal
  const renderDocument = (doc, index) => (
    <div className="view-more-document">
      <div className="document-index">#{index}</div>
      <FileText size={20} />
      <div className="document-details">
        <strong>{doc.nom}</strong>
        <p>{doc.auteur} - {doc.date}</p>
      </div>
    </div>
  );

  const renderAlert = (alert, index) => (
    <div className={`view-more-alert alert-type-${alert.type.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="alert-index">#{index}</div>
      <AlertCircle size={20} />
      <div className="alert-details">
        <strong>{alert.type}</strong>
        <p>{alert.description}</p>
      </div>
    </div>
  );

  const renderConsultation = (consultation, index) => (
    <div className="view-more-consultation">
      <div className="consultation-index">#{index}</div>
      <div className="consultation-date">{consultation.date}</div>
      <div className="consultation-details">
        <strong>{consultation.type}</strong>
        <p><Stethoscope size={14} /> {consultation.médecin}</p>
        <p className="consultation-motif">{consultation.motif}</p>
      </div>
    </div>
  );

  const renderTreatment = (treatment, index) => (
    <div className="view-more-treatment">
      <div className="treatment-index">#{index}</div>
      <div className="treatment-date">{treatment.date}</div>
      <div className="treatment-details">
        <strong>{treatment.traitement}</strong>
        <p>{treatment.dosage}</p>
        <span className={`status-badge status-${treatment.statut.toLowerCase().replace(' ', '-')}`}>
          {treatment.statut}
        </span>
      </div>
    </div>
  );

  const renderExam = (exam, index) => (
    <div className="view-more-exam">
      <div className="exam-index">#{index}</div>
      <div className="exam-date">{exam.date}</div>
      <div className="exam-details">
        <strong>{exam.type}</strong>
        <p><TestTube size={14} /> {exam.laboratoire}</p>
        <span className={`exam-result ${exam.résultat.toLowerCase()}`}>{exam.résultat}</span>
      </div>
    </div>
  );

  const renderProtocole = (proto, index) => (
    <div className="view-more-protocole">
      <div className="protocole-index">#{index}</div>
      <div className="protocole-date">{proto.date}</div>
      <div className="protocole-details">
        <strong>{proto.nom}</strong>
        <p><ClipboardList size={14} /> {proto.service}</p>
        <div className="protocole-progress">
          <span className="progress-text">{proto.etapesRealisees}/{proto.etapesTotal} étapes</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${(proto.etapesRealisees / proto.etapesTotal) * 100}%`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (!patient) {
    return <div className="error">Patient non trouvé</div>;
  }

  return (
    <div className="detail-container">
      <header className="page-header">
        <Link to="/patients/list" className="back-btn">
          <ChevronLeft size={20} />
          Retour aux patients
        </Link>
        <h1>📋 Dossier Médical Complet</h1>
      </header>
       
      <div className="detail-grid">
        {/* COLONNE 1 - Profil Patient */}
        <div className="detail-col">
          <div className="detail-card">
            <div className="card-header-with-action">
              <h2>👤 Informations Patient</h2>
              <button 
                className="btn-icon" 
                title="Voir détails complets"
                onClick={() => openModal('patientInfo')}
              >
                <Eye size={18} />
              </button>
            </div>
            <div className="profile-header">
              <img src={patient.avatar} alt={patient.name} />
              <div>
                <h3>{patient.name}</h3>
                <p>ID: {patient.patientId}</p>
              </div>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span>📧 Email:</span>
                <span>{patient.email}</span>
              </div>
              <div className="info-item">
                <span>📞 Téléphone:</span>
                <span>{patient.phone}</span>
              </div>
              <div className="info-item">
                <span>📍 Adresse:</span>
                <span>{patient.address}</span>
              </div>
              <div className="info-item">
                <span>🩸 Groupe Sanguin:</span>
                <span className="badge-primary">{patientFullData.groupeSanguin}</span>
              </div>
              <div className="info-item">
                <span>🏥 Maladie Principale:</span>
                <span className="disease-badge">{patient.disease}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE 2 - Signes Vitaux */}
        <div className="detail-col">
          <div className="detail-card vitals-card">
            <div className="detail-card-header">
              <div className="header-left">
                <div className="icon-wrapper pulse">
                  <Activity size={24} />
                </div>
                <div>
                  <h2>Signes Vitaux</h2>
                  <p className="last-update">
                    <Clock size={14} />
                    Dernière prise : {patient.lastVitalsDate || "15/06/2025"}
                  </p>
                </div>
              </div>
              <button 
                className="btn-historique"
                onClick={() => openModal('vitals')}
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            <div className="vitals-grid">
              <div className="vital-item weight">
                <div className="vital-icon">⚖️</div>
                <div className="vital-content">
                  <div className="vital-value">{patient.weight}</div>
                  <div className="vital-label">Poids</div>
                  <div className="vital-unit">kg</div>
                </div>
              </div>
              
              <div className="vital-item height">
                <div className="vital-icon">📏</div>
                <div className="vital-content">
                  <div className="vital-value">{patient.height}</div>
                  <div className="vital-label">Taille</div>
                  <div className="vital-unit">cm</div>
                </div>
              </div>
              
              <div className="vital-item bmi">
                <div className="vital-icon">📊</div>
                <div className="vital-content">
                  <div className="vital-value">{patient.bmi}</div>
                  <div className="vital-label">IMC</div>
                  <div className="vital-unit">kg/m²</div>
                </div>
              </div>
            </div>

            <div className="blood-pressure-container">
              <div className="bp-icon">
                <Heart size={32} className="heartbeat" />
              </div>
              <div className="bp-content">
                <h3>
                  <TrendingUp size={16} />
                  Pression Artérielle
                </h3>
                <div className="bp-value">
                  <span className="systolic">{patient.bloodPressure.systolic}</span>
                  <span className="separator">/</span>
                  <span className="diastolic">{patient.bloodPressure.diastolic}</span>
                  <span className="bp-unit">mmHg</span>
                </div>
                <div className="bp-status normal">● Normale</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE 3 - Protocoles de Soins */}
        <div className="detail-col">
          <div className="detail-card protocole-card">
            <div className="card-header-with-action">
              <h2>🩺 Protocoles de Soins</h2>
              <button
                className="btn-add-small"
                onClick={() => openModal('protocole')}
              >
                <Plus size={16} />
                Créer
              </button>
            </div>

            <div className="protocole-stats">
              <div className="stat-item">
                <span className="stat-value">{protocolesEnCours.length}</span>
                <span className="stat-label">En cours</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{protocoles.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>

            <div className="protocole-list">
              {protocolesEnCours.slice(0, 4).map((proto) => (
                <div key={proto.id} className="protocole-item">
                  <div className="protocole-icon">
                    <ClipboardList size={20} />
                  </div>
                  <div className="protocole-info">
                    <strong>{proto.nom}</strong>
                    <div className="protocole-progress-mini">
                      <span>{proto.etapesRealisees}/{proto.etapesTotal} étapes</span>
                      <div className="progress-bar-mini">
                        <div 
                          className="progress-fill-mini" 
                          style={{width: `${(proto.etapesRealisees / proto.etapesTotal) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <CheckCircle 
                    size={18} 
                    className={proto.statut === "TERMINE" ? "icon-complete" : "icon-progress"} 
                  />
                </div>
              ))}
            </div>

            {protocoles.length > 2 && (
              <button 
                className="btn-view-all-mini"
                onClick={() => openModal('viewMoreProtocoles')}
              >
                <Eye size={14} />
                Voir tous les protocoles
              </button>
            )}
          </div>
        </div>
      </div>
    

      {/* Documents, Antécédents et Ordonnances sur toute la ligne */}
      <div className="bottom-cards-grid">
        {/* Bloc Documents */}
        <div className="detail-card">
          <div className="card-header-with-action">
            <h2>📂 Documents</h2>
            <div className="header-actions">
              <button
                className="btn-view-more"
                onClick={() => openModal('viewMoreDocuments')}
              >
                <Eye size={16} />
                Voir plus
              </button>
              <button
                className="btn-add-small"
                onClick={() => alert("Upload de document (à brancher plus tard)")}
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>
          </div>

          <div className="documents-list">
            {documents.slice(0, 2).map((doc) => (
              <div key={doc.id} className="document-item">
                <FileText size={18} />
                <div>
                  <strong>{doc.nom}</strong>
                  <p>{doc.auteur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Antécédents - Aperçu rapide */}
        <div className="detail-card">
          <div className="card-header-with-action">
            <h2>⚠️ Alertes & Antécédents</h2>
            <div className="header-actions">
              <button
                className="btn-view-more"
                onClick={() => openModal('viewMoreAlerts')}
              >
                <Eye size={16} />
                Voir plus
              </button>
              <button 
                className="btn-add-small"
                onClick={() => openModal('antecedents')}
              >
                <Plus size={16} />
                Gérer
              </button>
            </div>
          </div>
          <div className="quick-alerts">
            <div className="alert-item allergies">
              <AlertCircle size={18} />
              <div>
                <strong>Allergies</strong>
                <p>{antecedents.allergies.slice(0, 2).join(", ")}</p>
              </div>
            </div>
            <div className="alert-item history">
              <AlertCircle size={18} />
              <div>
                <strong>Antécédents Familiaux</strong>
                <p>{antecedents.familiaux[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Ordonnances */}
        <div className="detail-card ordonnance-card">
          <div className="card-header-with-action">
            <h2>📝 Ordonnances</h2>
            <button
              className="btn-add-small btn-create-ordonnance"
              onClick={() => openModal('ordonnance')}
            >
              <Plus size={16} />
              Créer
            </button>
          </div>

          <div className="ordonnance-stats">
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">Ordonnances actives</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Total créées</span>
            </div>
          </div>

          <div className="ordonnance-preview">
            <div className="ordonnance-item">
              <div className="ordonnance-icon">📋</div>
              <div className="ordonnance-info">
                <strong>Ordonnance du 20/10/2025</strong>
                <p>3 médicaments prescrits</p>
              </div>
              <button className="btn-view-pdf" onClick={() => alert("Ouvrir PDF")}>
                <FileText size={16} />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Grille des sections médicales */}
      <div className="medical-sections-grid">
        {/* Consultations */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon consultations">
              <Stethoscope size={24} />
            </div>
            <div className="section-info">
              <h3>Consultations</h3>
              <p>{consultations.length} consultations</p>
            </div>
            <button 
              className="btn-add"
              onClick={() => openModal('consultation')}
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="section-preview">
            {consultations.slice(0, 3).map((c) => (
              <div key={c.id} className="preview-item">
                <div className="preview-date">{c.date}</div>
                <div className="preview-content">
                  <strong>{c.type}</strong>
                  <span className="preview-meta">{c.médecin}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="btn-view-all"
            onClick={() => openModal('viewMoreConsultations')}
          >
            <Eye size={16} />
            Voir toutes les consultations
          </button>
        </div>

        {/* Traitements */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon treatments">
              <Pill size={24} />
            </div>
            <div className="section-info">
              <h3>Traitements</h3>
              <p>{traitements.length} traitements actifs</p>
            </div>
            <button 
              className="btn-add"
              onClick={() => openModal('treatment')}
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="section-preview">
            {traitements.slice(0, 3).map((t) => (
              <div key={t.id} className="preview-item">
                <div className="preview-date">{t.date}</div>
                <div className="preview-content">
                  <strong>{t.traitement}</strong>
                  <span className={`status-badge status-${t.statut.toLowerCase().replace(' ', '-')}`}>
                    {t.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="btn-view-all"
            onClick={() => openModal('viewMoreTreatments')}
          >
            <Eye size={16} />
            Voir tous les traitements
          </button>
        </div>

        {/* Examens */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon exams">
              <TestTube size={24} />
            </div>
            <div className="section-info">
              <h3>Examens & Analyses</h3>
              <p>{examens.length} examens réalisés</p>
            </div>
            <button 
              className="btn-add"
              onClick={() => openModal('exam')}
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="section-preview">
            {examens.slice(0, 3).map((e) => (
              <div key={e.id} className="preview-item">
                <div className="preview-date">{e.date}</div>
                <div className="preview-content">
                  <strong>{e.type}</strong>
                  <span className="preview-meta">{e.résultat}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="btn-view-all"
            onClick={() => openModal('viewMoreExams')}
          >
            <Eye size={16} />
            Voir tous les examens
          </button>
        </div>
      </div>

      {/* MODALS - Actions */}
      <PatientInfoModal
        isOpen={modals.patientInfo}
        onClose={() => closeModal('patientInfo')}
        onSave={handleSavePatientInfo}
        patientData={patientFullData}
      />

      <VitalsModal
        isOpen={modals.vitals}
        onClose={() => closeModal('vitals')}
        onSave={handleSaveVitals}
        patientId={id}
      />

      <ProtocoleModal
        isOpen={modals.protocole}
        onClose={() => closeModal('protocole')}
        onSave={handleSaveProtocole}
        patientId={id}
      />

      <ConsultationModal
        isOpen={modals.consultation}
        onClose={() => closeModal('consultation')}
        onSave={handleSaveConsultation}
        patientId={id}
      />

      <TreatmentModal
        isOpen={modals.treatment}
        onClose={() => closeModal('treatment')}
        onSave={handleSaveTreatment}
        patientId={id}
      />

      <ExamModal
        isOpen={modals.exam}
        onClose={() => closeModal('exam')}
        onSave={handleSaveExam}
        patientId={id}
      />

      <AntecedentsModal
        isOpen={modals.antecedents}
        onClose={() => closeModal('antecedents')}
        onSave={handleSaveAntecedents}
        patientId={id}
        data={antecedents}
      />

      <OrdonnanceModal
        isOpen={modals.ordonnance}
        onClose={() => closeModal('ordonnance')}
        onSave={handleSaveOrdonnance}
        patientId={id}
        patientName={patient.name}
      />

      {/* MODALS - View More */}
      <ViewMoreModal
        isOpen={modals.viewMoreDocuments}
        onClose={() => closeModal('viewMoreDocuments')}
        title="📂 Tous les Documents"
        data={documents}
        renderItem={renderDocument}
        itemsPerPage={5}
      />

      <ViewMoreModal
        isOpen={modals.viewMoreAlerts}
        onClose={() => closeModal('viewMoreAlerts')}
        title="⚠️ Toutes les Alertes & Antécédents"
        data={allAlerts}
        renderItem={renderAlert}
        itemsPerPage={5}
      />

      <ViewMoreModal
        isOpen={modals.viewMoreConsultations}
        onClose={() => closeModal('viewMoreConsultations')}
        title="🩺 Toutes les Consultations"
        data={consultations}
        renderItem={renderConsultation}
        itemsPerPage={5}
      />

      <ViewMoreModal
        isOpen={modals.viewMoreTreatments}
        onClose={() => closeModal('viewMoreTreatments')}
        title="💊 Tous les Traitements"
        data={traitements}
        renderItem={renderTreatment}
        itemsPerPage={5}
      />

      <ViewMoreModal
        isOpen={modals.viewMoreExams}
        onClose={() => closeModal('viewMoreExams')}
        title="🧪 Tous les Examens"
        data={examens}
        renderItem={renderExam}
        itemsPerPage={5}
      />

      <ViewMoreModal
        isOpen={modals.viewMoreProtocoles}
        onClose={() => closeModal('viewMoreProtocoles')}
        title="🩺 Tous les Protocoles"
        data={protocoles}
        renderItem={renderProtocole}
        itemsPerPage={5}
      />
    </div>
  );
};

export default PatientDetailPage;