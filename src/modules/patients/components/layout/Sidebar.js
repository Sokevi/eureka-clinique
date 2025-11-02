import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Calendar, FileText, BarChart3, Home, UserPlus } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/patients", icon: <Users size={20} />, label: "Patients" },
    { path: "/patients/add", icon: <UserPlus size={20} />, label: "Ajouter Patient" },
    { path: "/rdv", icon: <Calendar size={20} />, label: "Rendez-vous" },
    { path: "/rapports", icon: <FileText size={20} />, label: "Rapports" },
    { path: "/stats", icon: <BarChart3 size={20} />, label: "Statistiques" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">🏥 Eureka Clinique</div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>© 2025 Eureka Clinique.</p>
        <p>Tous droits réservés.</p>
      </div>
    </div>
  );
};

export default Sidebar;