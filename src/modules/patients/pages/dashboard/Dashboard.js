// src/modules/patients/pages/dashboard/Dashboard.js
import React from "react";
import { Users, Calendar, HeartPulse, Activity, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./Dashboard.css";

// Données factices pour graphiques
const consultationsParSpecialite = [
  { name: "Cardiologie", value: 40 },
  { name: "Radiologie", value: 30 },
  { name: "Pédiatrie", value: 20 },
  { name: "Généraliste", value: 50 },
];

const consultationsParMois = [
  { mois: "Jan", consultations: 120 },
  { mois: "Fév", consultations: 150 },
  { mois: "Mars", consultations: 100 },
  { mois: "Avr", consultations: 180 },
];

const lastPatients = [
  { id: 1, nom: "Doe", prenom: "John", sexe: "M", contact: "0601234567", type: "Consultation Générale" },
  { id: 2, nom: "Smith", prenom: "Anna", sexe: "F", contact: "0612345678", type: "Cardiologie" },
  { id: 3, nom: "Brown", prenom: "David", sexe: "M", contact: "0623456789", type: "Radiologie" },
  { id: 4, nom: "Martin", prenom: "Julie", sexe: "F", contact: "0634567890", type: "Pédiatrie" },
  { id: 5, nom: "Dupont", prenom: "Paul", sexe: "M", contact: "0645678901", type: "Dermatologie" },
  { id: 6, nom: "Garcia", prenom: "Clara", sexe: "F", contact: "0656789012", type: "Consultation Générale" },
];

const treatments = [
  { id: 1, nom: "John Doe", traitement: "Insuline", date: "24/10/2025", statut: "En cours" },
  { id: 2, nom: "Anna Smith", traitement: "Antibiotiques", date: "22/10/2025", statut: "Terminé" },
  { id: 3, nom: "David Brown", traitement: "Physiothérapie", date: "20/10/2025", statut: "Planifié" },
  { id: 4, nom: "Julie Martin", traitement: "Chimiothérapie", date: "19/10/2025", statut: "En cours" },
  { id: 5, nom: "Paul Dupont", traitement: "Antihypertenseurs", date: "18/10/2025", statut: "En cours" },
  { id: 6, nom: "Clara Garcia", traitement: "Suivi Nutrition", date: "15/10/2025", statut: "Terminé" },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏥 Tableau de Bord</h1>
        <p>bloc Medical</p>
      </header>

      {/* Indicateurs principaux */}
      <div className="stats-grid">
        <div className="stat-card">
          <Users size={32} color="#6366f1" />
          <div>
            <div className="stat-value">1,245</div>
            <div className="stat-label">Patients Actifs</div>
          </div>
        </div>

        <div className="stat-card">
          <Calendar size={32} color="#22c55e" />
          <div>
            <div className="stat-value">35</div>
            <div className="stat-label">RDV Aujourd'hui</div>
          </div>
        </div>

        <div className="stat-card">
          <HeartPulse size={32} color="#ef4444" />
          <div>
            <div className="stat-value">12</div>
            <div className="stat-label">Patients en attente</div>
          </div>
        </div>

        <div className="stat-card">
          <Activity size={32} color="#22c55e" />
          <div>
            <div className="stat-value">28</div>
            <div className="stat-label">Consultés Aujourd’hui</div>
          </div>
        </div>

        <div className="stat-card">
          <FileText size={32} color="#f59e0b" />
          <div>
            <div className="stat-value">85</div>
            <div className="stat-label">Rapports Mensuels</div>
          </div>
        </div>
      </div>


      {/* Graphiques */}
      <div className="charts-grid">
        <div className="chart-card">
          <h2>📈 Consultations par Spécialité</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={consultationsParSpecialite}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {consultationsParSpecialite.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>📊 Evolution des Consultations</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={consultationsParMois}>
            <XAxis dataKey="mois" stroke="#94a3b8" />
            <YAxis />
            <Tooltip />
            <Bar 
            dataKey="consultations" 
            fill="#6366f1" 
            label={{ position: "top", fill: "#e5e7eb", fontSize: 12 }} // ✅ Ajout des valeurs sur les barres
            />
        </BarChart>
        </ResponsiveContainer>

        </div>
      </div>

  {/* 🔥 Deux tableaux côte à côte */}
<div className="tables-grid">
  {/* Derniers patients consultés */}
  <div className="table-card">
    <h2>🧾 Derniers Patients Consultés</h2>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Contact</th>
          <th>Type de Consultation</th>
        </tr>
      </thead>
      <tbody>
        {lastPatients.map((p) => (
          <tr key={p.id}>
            <td>{p.nom}</td>
            <td>{p.prenom}</td>
            <td>{p.sexe}</td>
            <td>{p.contact}</td>
            <td>{p.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Suivi des traitements */}
  <div className="table-card">
    <h2>💊 Suivi des Traitements Patients</h2>
    <table>
      <thead>
        <tr>
          <th>Nom Patient</th>
          <th>Traitement</th>
          <th>Date</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {treatments.map((t) => (
          <tr key={t.id}>
            <td>{t.nom}</td>
            <td>{t.traitement}</td>
            <td>{t.date}</td>
            <td>
              <span
                className={`status-badge ${
                  t.statut === "En cours"
                    ? "status-en-cours"
                    : t.statut === "Terminé"
                    ? "status-termine"
                    : "status-planifie"
                }`}
              >
                {t.statut}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    
    </div>
  );
};

export default Dashboard;
