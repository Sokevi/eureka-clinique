import React, { useState } from "react";
import {
  ChevronDown, X, Users, Stethoscope, Building2, TestTube, Camera, Pill,
  CreditCard, Receipt, Wallet, Briefcase, UserCog, Package, Wrench, BarChart3,
  Shield, Smartphone, Video, Megaphone, Syringe, Ambulance, Scissors
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const modules = [
   {
  group: "🏥 Bloc Médical",
  items: [
    { name: "Patients", path: "/patients", icon: <Users size={20} />, color: "#3b82f6" },
    { name: "Consultations", path: "/consultations", icon: <Stethoscope size={20} />, color: "#10b981" },
    { name: "Infirmierie", path: "/infirmierie", icon: <Syringe size={20} />, color: "#ef4444" },
    { name: "Soins ambulatoires", path: "/ambulatoires", icon: <Ambulance size={20} />, color: "#0ea5e9" },
    { name: "Hospitalisations", path: "/hospitalisations", icon: <Building2 size={20} />, color: "#f59e0b" },
    { name: "Rendez-vous", path: "/rdv", icon: <Users size={20} />, color: "#8b5cf6" }
  ],
},
    {
      group: "⚕️ Bloc Médico-technique",
      items: [
        { name: "Laboratoire", path: "/laboratoire", icon: <TestTube size={20} />, color: "#ec4899" },
        { name: "Imagerie", path: "/pacs", icon: <Camera size={20} />, color: "#06b6d4" },
        { name: "Pharmacie", path: "/pharmacie", icon: <Pill size={20} />, color: "#84cc16" },
        { name: "Chirurgie", path: "/chirurgie", icon: <Scissors size={20} />, color: "#f87171" },
      ],
    },
    {
      group: "💰 Bloc Administratif",
      items: [
        { name: "Caisse", path: "/caisse", icon: <CreditCard size={20} />, color: "#14b8a6" },
        { name: "Facturation", path: "/facturation", icon: <Receipt size={20} />, color: "#f97316" },
        { name: "Comptabilité", path: "/comptabilite", icon: <Wallet size={20} />, color: "#6366f1" },
        { name: "RH", path: "/rh", icon: <UserCog size={20} />, color: "#a855f7" },
      ],
    },
    {
      group: "🏗️ Bloc Support",
      items: [
        { name: "Stock", path: "/stock", icon: <Package size={20} />, color: "#0ea5e9" },
        { name: "Équipements", path: "/equipements", icon: <Wrench size={20} />, color: "#f43f5e" },
        { name: "Rapports", path: "/rapports", icon: <BarChart3 size={20} />, color: "#8b5cf6" },
        { name: "Qualité", path: "/qualite", icon: <Shield size={20} />, color: "#10b981" },
      ],
    },
    {
      group: "🌐 Bloc Patient",
      items: [
        { name: "Portail Patient", path: "/portail-patient", icon: <Smartphone size={20} />, color: "#3b82f6" },
        { name: "Téléconsultation", path: "/teleconsultation", icon: <Video size={20} />, color: "#ec4899" },
        { name: "Communication", path: "/promotion", icon: <Megaphone size={20} />, color: "#f59e0b" },
      ],
    },
  ];

  return (
    <header className="app-header">
      {/* Logo */}
      <div className="header-left">
        <img src="/logo192.png" alt="Eureka Clinique" className="header-logo" />
        <h2>MY Clinique</h2>
      </div>

      {/* Menu utilisateur */}
      <div className="header-right">
        <button
          className="module-switcher"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <BarChart3 size={18} />
          <span>Modules</span>
          <ChevronDown size={18} className={showDropdown ? "rotate" : ""} />
        </button>

        {showDropdown && (
          <div className="dropdown-panel center">
            <div className="dropdown-header">
              <h3>🎯 Tous les modules</h3>
              <button className="close-btn" onClick={() => setShowDropdown(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modules-container">
              {modules.map((section, index) => (
                <div key={index} className="module-section">
                  <div className="module-section-title">{section.group}</div>
                  <div className="module-grid">
                    {section.items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="module-card"
                        onClick={() => setShowDropdown(false)}
                      >
                        <div
                          className="module-icon"
                          style={{ background: `${item.color}15`, color: item.color }}
                        >
                          {item.icon}
                        </div>
                        <span className="module-name">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="user-info">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" className="user-avatar" />
          <span className="username">Dr. Martin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
