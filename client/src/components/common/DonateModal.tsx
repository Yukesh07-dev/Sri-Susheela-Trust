import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Heart, Copy, Check, ShieldCheck, QrCode } from 'lucide-react';
import { TRUST_INFO } from '../../constants';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<number | null>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProceed = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ zIndex: 99999, backgroundColor: 'rgba(10, 25, 47, 0.78)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="bg-white rounded-4 shadow-lg overflow-hidden position-relative w-100"
        style={{ maxWidth: '650px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="bg-gradient-sst-teal text-white p-4 d-flex align-items-center justify-content-between position-relative">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge badge-gold d-inline-flex align-items-center gap-1">
                <ShieldCheck size={14} /> 80G 50% Tax Benefit
              </span>
            </div>
            <h4 className="fw-bold mb-0 text-white font-heading d-flex align-items-center gap-2 fs-5">
              <Heart className="text-warning fill-warning" size={22} />
              {t('donateModal.title')}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-grow-1">
          {isSuccess ? (
            <div className="text-center py-5">
              <div
                className="rounded-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center mb-3 shadow"
                style={{ width: '70px', height: '70px' }}
              >
                <Check size={40} />
              </div>
              <h4 className="fw-bold text-navy">Thank You for Your Generosity!</h4>
              <p className="text-muted px-4">
                Your pledge to Sri Susheela Trust People Welfare Group directly empowers individuals with food, education, and health. A receipt will be sent for 80G tax claims.
              </p>
            </div>
          ) : (
            <>
              <p className="text-muted mb-4 small">{t('donateModal.subtitle')}</p>

              {/* Tiers */}
              <div className="mb-4">
                <label className="fw-bold text-navy mb-2 small text-uppercase tracking-wider">Select Contribution Amount</label>
                <div className="row g-2">
                  <div className="col-12 col-md-4">
                    <button
                      onClick={() => {
                        setSelectedTier(2000);
                        setCustomAmount('');
                      }}
                      className={`btn w-100 text-start p-3 rounded-3 border transition-all ${
                        selectedTier === 2000 ? 'border-teal bg-teal bg-opacity-10 fw-bold' : 'btn-light'
                      }`}
                      style={{ border: selectedTier === 2000 ? '2px solid #0D5C63' : '1px solid #E2E8F0' }}
                    >
                      <div className="text-sst-teal fw-bold fs-5">₹2,000</div>
                      <div className="small text-muted">Feed 50 People</div>
                    </button>
                  </div>

                  <div className="col-12 col-md-4">
                    <button
                      onClick={() => {
                        setSelectedTier(5000);
                        setCustomAmount('');
                      }}
                      className={`btn w-100 text-start p-3 rounded-3 border transition-all ${
                        selectedTier === 5000 ? 'border-teal bg-teal bg-opacity-10 fw-bold' : 'btn-light'
                      }`}
                      style={{ border: selectedTier === 5000 ? '2px solid #0D5C63' : '1px solid #E2E8F0' }}
                    >
                      <div className="text-sst-teal fw-bold fs-5">₹5,000</div>
                      <div className="small text-muted">1 Student Scholar</div>
                    </button>
                  </div>

                  <div className="col-12 col-md-4">
                    <button
                      onClick={() => {
                        setSelectedTier(10000);
                        setCustomAmount('');
                      }}
                      className={`btn w-100 text-start p-3 rounded-3 border transition-all ${
                        selectedTier === 10000 ? 'border-teal bg-teal bg-opacity-10 fw-bold' : 'btn-light'
                      }`}
                      style={{ border: selectedTier === 10000 ? '2px solid #0D5C63' : '1px solid #E2E8F0' }}
                    >
                      <div className="text-sst-teal fw-bold fs-5">₹10,000</div>
                      <div className="small text-muted">Elderly Care Support</div>
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="number"
                    className="form-control form-control-lg rounded-3 fs-6"
                    placeholder="Or enter custom amount in INR (₹)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedTier(null);
                    }}
                  />
                </div>
              </div>

              {/* Bank Transfer Details Card */}
              <div className="card border-0 bg-sst-cream rounded-3 p-3 mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                  <h6 className="fw-bold mb-0 text-navy d-flex align-items-center gap-2">
                    <QrCode size={18} className="text-sst-gold" />
                    {t('donateModal.bankInfo')}
                  </h6>
                  <span className="badge bg-warning text-dark">Official Account</span>
                </div>

                <div className="row g-2 small">
                  <div className="col-6">
                    <span className="text-muted d-block">{t('donateModal.accountName')}</span>
                    <strong className="text-navy">{TRUST_INFO.bankDetails.accountName}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-muted d-block">{t('donateModal.bankName')}</span>
                    <strong className="text-navy">{TRUST_INFO.bankDetails.bankName}</strong>
                  </div>

                  <div className="col-6 mt-2">
                    <span className="text-muted d-block">{t('donateModal.accountNumber')}</span>
                    <div className="d-flex align-items-center gap-1">
                      <code className="text-dark fw-bold">{TRUST_INFO.bankDetails.accountNumber}</code>
                      <button
                        onClick={() => handleCopy(TRUST_INFO.bankDetails.accountNumber, 'acc')}
                        className="btn btn-sm p-0 text-primary border-0"
                        title="Copy Account Number"
                      >
                        {copiedField === 'acc' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="col-6 mt-2">
                    <span className="text-muted d-block">{t('donateModal.ifsc')}</span>
                    <div className="d-flex align-items-center gap-1">
                      <code className="text-dark fw-bold">{TRUST_INFO.bankDetails.ifsc}</code>
                      <button
                        onClick={() => handleCopy(TRUST_INFO.bankDetails.ifsc, 'ifsc')}
                        className="btn btn-sm p-0 text-primary border-0"
                        title="Copy IFSC Code"
                      >
                        {copiedField === 'ifsc' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="col-12 mt-2 pt-2 border-top">
                    <span className="text-muted d-block">UPI ID / QR Pay:</span>
                    <div className="d-flex align-items-center gap-2">
                      <code className="text-sst-teal fw-bold fs-6">{TRUST_INFO.bankDetails.upiId}</code>
                      <button
                        onClick={() => handleCopy(TRUST_INFO.bankDetails.upiId, 'upi')}
                        className="btn btn-sm btn-outline-teal py-0 px-2 rounded-pill small"
                      >
                        {copiedField === 'upi' ? 'Copied!' : 'Copy UPI'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button onClick={handleProceed} className="btn btn-sst-primary w-100 py-3 justify-content-center">
                <Heart size={18} fill="#ffffff" />
                {t('donateModal.proceedBtn')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
