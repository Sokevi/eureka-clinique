import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./modules/patients/components/layout/Layout";
import Dashboard from "./modules/patients/pages/dashboard/Dashboard";
import PatientsListPage from "./modules/patients/pages/PatientsListPage/PatientsListPage";
import PatientDetailPage from "./modules/patients/pages/PatientDetailPage/PatientDetailPage";
import AddPatient from "./modules/patients/pages/AddPatient/AddPatient";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout global qui englobe tout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsListPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="patients/add" element={<AddPatient />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
