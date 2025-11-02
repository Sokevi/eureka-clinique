import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Modal.css";

const ViewMoreModal = ({ isOpen, onClose, title, data, renderItem, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!isOpen) return null;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="view-more-list">
            {currentItems.map((item, index) => (
              <div key={item.id || index} className="view-more-item">
                {renderItem(item, startIndex + index + 1)}
              </div>
            ))}
          </div>

          {data.length === 0 && (
            <div className="empty-state">
              <p>Aucune donnée disponible</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
                Précédent
              </button>

              <div className="pagination-pages">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`pagination-page ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          <div className="pagination-info">
            Affichage de {startIndex + 1} à {Math.min(endIndex, data.length)} sur {data.length} éléments
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreModal;