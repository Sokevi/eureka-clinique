import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Calendar, FileText, BarChart3, Home, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
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
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Ouvrir la sidebar" : "Fermer la sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className="sidebar-header">
        {isCollapsed ? "🏥" : "🏥 Eureka Clinique"}
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            title={isCollapsed ? item.label : ""}
          >
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <p>© 2025 Eureka Clinique.</p>
          <p>Tous droits réservés.</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;