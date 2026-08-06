import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
      style={{ zIndex: 99999, backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
    >
      {/* Top bar */}
      <div className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-center p-3 text-white">
        <span className="badge badge-gold text-uppercase tracking-wider">{item.category}</span>
        <button
          onClick={onClose}
          className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{ width: '42px', height: '42px' }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main image / media container */}
      <div className="position-relative d-flex align-items-center justify-content-center w-100 h-75">
        {onPrev && (
          <button
            onClick={onPrev}
            className="position-absolute start-0 ms-3 btn btn-dark btn-sm rounded-circle p-3 text-white border-secondary z-3"
            style={{ opacity: 0.8 }}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <img
          src={item.mediaUrl}
          alt={item.title}
          className="img-fluid rounded-3 shadow-lg max-h-100"
          style={{ maxHeight: '75vh', objectFit: 'contain' }}
        />

        {onNext && (
          <button
            onClick={onNext}
            className="position-absolute end-0 me-3 btn btn-dark btn-sm rounded-circle p-3 text-white border-secondary z-3"
            style={{ opacity: 0.8 }}
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Caption */}
      <div className="text-center text-white mt-3 px-4 max-w-xl">
        <h5 className="fw-bold font-heading text-warning mb-1">{item.title}</h5>
        <p className="text-light opacity-75 small mb-0">{item.description}</p>
      </div>
    </div>
  );
};
