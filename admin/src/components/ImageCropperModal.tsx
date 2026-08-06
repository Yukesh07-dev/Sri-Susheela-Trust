import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Check, RefreshCw, Crop } from 'lucide-react';

interface ImageCropperModalProps {
  imageUrl: string;
  onCropComplete: (croppedFile: File, croppedPreviewUrl: string) => void;
  onClose: () => void;
  targetAspectRatio?: number; // e.g. 16/9
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  imageUrl,
  onCropComplete,
  onClose,
  targetAspectRatio = 16 / 9,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [aspect, setAspect] = useState<number>(targetAspectRatio);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset positioning when aspect ratio changes
  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setRotation(0);
  }, [aspect, imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(Math.max(prev + zoomDelta, 0.8), 4));
  };

  const handleApplyCrop = () => {
    if (!imageRef.current || !containerRef.current) return;

    const img = imageRef.current;
    const cropBox = containerRef.current.getBoundingClientRect();

    // Original natural image dimensions
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const imgAspect = nw / nh;

    // Scale of image inside DOM crop box
    let domImgWidth = cropBox.width;
    let domImgHeight = cropBox.height;

    if (imgAspect > aspect) {
      domImgHeight = cropBox.height;
      domImgWidth = cropBox.height * imgAspect;
    } else {
      domImgWidth = cropBox.width;
      domImgHeight = cropBox.width / imgAspect;
    }

    // Ratio converting DOM pixels to original image natural pixels
    const naturalRatio = nw / domImgWidth;

    // Visible crop window size in original image natural pixels
    const sw = (cropBox.width / zoom) * naturalRatio;
    const sh = (cropBox.height / zoom) * naturalRatio;

    // Center of natural image minus offset in natural pixels
    const sx = (nw - sw) / 2 - (offset.x / zoom) * naturalRatio;
    const sy = (nh - sh) / 2 - (offset.y / zoom) * naturalRatio;

    // High quality HD output canvas
    const targetWidth = Math.min(1920, Math.max(1200, Math.round(sw)));
    const targetHeight = Math.round(targetWidth / aspect);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // White background fill for transparent fallback
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    if (rotation !== 0) {
      ctx.save();
      ctx.translate(targetWidth / 2, targetHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, sx, sy, sw, sh, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
      ctx.restore();
    } else {
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], `gallery_cropped_${Date.now()}.jpg`, { type: 'image/jpeg' });
        const croppedPreviewUrl = URL.createObjectURL(blob);
        onCropComplete(croppedFile, croppedPreviewUrl);
      },
      'image/jpeg',
      0.95
    );
  };


  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#1E293B',
          color: '#F8FAFC',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crop size={20} color="#F59E0B" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>
              Crop Photo for Gallery
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div
          style={{
            padding: '0.6rem 1.25rem',
            background: '#0F172A',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>Aspect Ratio:</span>
          <button
            type="button"
            onClick={() => setAspect(16 / 9)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: aspect === 16 / 9 ? '#7A1C1C' : '#334155',
              color: '#FFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            16:9 (Gallery Default)
          </button>
          <button
            type="button"
            onClick={() => setAspect(4 / 3)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: aspect === 4 / 3 ? '#7A1C1C' : '#334155',
              color: '#FFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            4:3
          </button>
          <button
            type="button"
            onClick={() => setAspect(1)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              background: aspect === 1 ? '#7A1C1C' : '#334155',
              color: '#FFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            1:1 Square
          </button>
        </div>

        {/* Interactive Crop Workspace Container */}
        <div
          style={{
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0F172A',
            userSelect: 'none',
          }}
        >
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{
              width: '100%',
              maxWidth: '520px',
              aspectRatio: `${aspect}`,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '12px',
              border: '2px solid #F59E0B',
              boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.35)',
              cursor: isDragging ? 'grabbing' : 'grab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="To Crop"
              style={{
                maxWidth: 'none',
                maxHeight: 'none',
                position: 'absolute',
                transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                pointerEvents: 'none',
                objectFit: 'contain',
              }}
            />

            {/* Grid Overlay Rule of Thirds */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                border: '1px dashed rgba(255, 255, 255, 0.4)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr',
              }}
            >
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)', borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)', borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)', borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)', borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.2)' }} />
              <div />
            </div>
          </div>
        </div>

        {/* Control Bar: Zoom & Rotation */}
        <div
          style={{
            padding: '1rem 1.25rem',
            background: '#1E293B',
            borderTop: '1px solid #334155',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Zoom Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ZoomOut size={16} color="#94A3B8" />
            <input
              type="range"
              min="0.8"
              max="3.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: '#F59E0B', cursor: 'pointer' }}
            />
            <ZoomIn size={16} color="#94A3B8" />
            <span style={{ minWidth: '45px', fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 600, textAlign: 'right' }}>
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Buttons: Reset & Rotate */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: '#F8FAFC',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <RotateCw size={14} /> Rotate
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                  setRotation(0);
                }}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: '#CBD5E1',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              💡 Drag photo to align, scroll or slider to zoom
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '1rem 1.25rem',
            background: '#0F172A',
            borderTop: '1px solid #334155',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #475569',
              background: 'transparent',
              color: '#CBD5E1',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyCrop}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
              color: '#FFFFFF',
              border: '1px solid #D4AF37',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(122, 28, 28, 0.4)',
            }}
          >
            <Check size={16} /> Apply Crop & Use Photo
          </button>
        </div>
      </div>
    </div>
  );
};
