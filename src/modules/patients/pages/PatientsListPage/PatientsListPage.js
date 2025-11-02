import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronUp, User, Mail, Phone, Calendar, MapPin, Activity } from 'lucide-react';
import './PatientsListPage.css';
import { useNavigate } from "react-router-dom";

// Données de démonstration
const mockPatients = [
  { id: 1, name: "Sophie Martin", patientId: "PAT-2024-001", email: "sophie.m@email.com", phone: "+33 6 12 34 56 78", office: "Paris", joinDate: "2024-01-15", disease: "Hypertension, Asthme", status: "Soins encours", age: 45 },
  { id: 2, name: "Thomas Dubois", patientId: "PAT-2024-002", email: "thomas.d@email.com", phone: "+33 6 23 45 67 89", office: "Lyon", joinDate: "2024-02-20", disease: "Diabète Type 2", status: "active", age: 52 },
  { id: 3, name: "Marie Lefebvre", patientId: "PAT-2024-003", email: "marie.l@email.com", phone: "+33 6 34 56 78 90", office: "Marseille", joinDate: "2024-01-08", disease: "Asthme", status: "inactive", age: 38 },
  { id: 4, name: "Pierre Moreau", patientId: "PAT-2024-004", email: "pierre.m@email.com", phone: "+33 6 45 67 89 01", office: "Paris", joinDate: "2024-03-12", disease: "Migraine,Arthrite", status: "active", age: 61 },
  { id: 5, name: "Claire Bernard", patientId: "PAT-2024-005", email: "claire.b@email.com", phone: "+33 6 56 78 90 12", office: "Toulouse", joinDate: "2024-02-28", disease: "Migraine", status: "active", age: 34 },
  { id: 6, name: "Julien Petit", patientId: "PAT-2024-006", email: "julien.p@email.com", phone: "+33 6 67 89 01 23", office: "Lyon", joinDate: "2024-01-22", disease: "Hypertension, Asthme", status: "Soins encours", age: 48 },
  { id: 7, name: "Emma Rousseau", patientId: "PAT-2024-007", email: "emma.r@email.com", phone: "+33 6 78 90 12 34", office: "Nice", joinDate: "2024-03-05", disease: "Allergie, Migraine", status: "inactive", age: 29 },
  { id: 8, name: "Lucas Garnier", patientId: "PAT-2024-008", email: "lucas.g@email.com", phone: "+33 6 89 01 23 45", office: "Paris", joinDate: "2024-02-14", disease: "Hypertension, Insomnie", status: "active", age: 41 }
];


const PatientsTable = () => {

const navigate = useNavigate();

  const [patients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Filtrage et tri
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.disease.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortConfig.key) {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [patients, searchTerm, sortConfig, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredAndSortedPatients.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown size={14} className="sort-icon-inactive" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="patients-table-container">
      <div className="patients-table-wrapper">
        
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">
            <User size={32} className="title-icon" />
            Gestion des Patients
          </h1>
          <p className="page-subtitle">
            {filteredAndSortedPatients.length} patient{filteredAndSortedPatients.length > 1 ? 's' : ''} • Dernière mise à jour il y a 2 min
          </p>
        </div>

        {/* Barre d'actions */}
        <div className="actions-bar">
          <div className="actions-content">
            
            {/* Recherche */}
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher par nom, ID, email, pathologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>


            {/* Bouton Export */}
            <button className="export-btn">
              <Download size={16} />
              Exporter
            </button>
          </div>
        </div>

        {/* Tableau */}
        <div className="table-card">
          <div className="table-scroll">
            <table className="patients-table">
              <thead>
                <tr>
                  {[
                    { key: 'name', label: 'Patient' },
                    { key: 'patientId', label: 'ID Patient' },
                    { key: 'disease', label: 'Pathologie' },
                    { key: 'joinDate', label: 'Date d\'inscription' },
                    { key: 'age', label: 'Âge' },
                   
                  ].map(col => (
                    <th key={col.key} onClick={() => handleSort(col.key)}>
                      <div className="th-content">
                        {col.label}
                        <SortIcon column={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
  {paginatedPatients.map((patient) => (
    <tr
      key={patient.id}
      className="table-row clickable-row"
      onClick={() => navigate(`/patients/${patient.id}`)}
    >
      <td>
        <div className="patient-cell">
          <div className="patient-avatar">
            {patient.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="patient-name">{patient.name}</div>
            <div className="patient-email">
              <Phone size={12} />
              {patient.phone}
            </div>
          </div>
        </div>
      </td>
      <td>{patient.patientId}</td>
      <td>
        <span className="disease-badge">
          <Activity size={12} />
          {patient.disease}
        </span>
      </td>
      <td>
        <div className="date-cell">
          <Calendar size={14} />
          {new Date(patient.joinDate).toLocaleDateString("fr-FR")}
        </div>
      </td>
      <td>{patient.age} ans</td>
      
    </tr>
  ))}
</tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="pagination-info">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredAndSortedPatients.length)} sur {filteredAndSortedPatients.length} résultats
            </div>
            
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Précédent
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="stats-grid">
          {[
            { label: 'Total Patients', value: patients.length, color: 'blue' },
            { label: 'Actifs', value: patients.filter(p => p.status === 'active').length, color: 'green' },
            { label: 'Inactifs', value: patients.filter(p => p.status === 'inactive').length, color: 'gray' },
            { label: 'Âge Moyen', value: Math.round(patients.reduce((acc, p) => acc + p.age, 0) / patients.length) + ' ans', color: 'blue' }
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-value ${stat.color}`}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PatientsTable;