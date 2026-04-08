'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, CreditCard, ChevronRight, Lock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import styles from './DonateForm.module.css';

const sevaOptions = [
  { id: 'anna-daan', name: 'Anna Daan Seva', amount: 4500, icon: '🍛', impact: 'Feed 100 People', desc: 'Sponsor a day of free prasadam for 100 devotees and the needy.' },
  { id: 'mandir-nirman', name: 'Mandir Nirman Seva', amount: 2100, icon: '🛕', impact: '1 Sq Ft of Mandir', desc: 'Build the temple brick by brick. Every sq ft counts.' },
  { id: 'gau-seva', name: 'Gau Seva', amount: 2100, icon: '🐄', impact: '1 Month / 1 Cow', desc: 'Provide food, shelter, and medical care for a sacred cow.' },
];

const featuredAmounts = [
  { amount: 501, impact: 'Feed 5 people' },
  { amount: 1101, impact: 'Support a family', recommended: true },
  { amount: 2101, impact: 'Make a bigger impact' },
];

const otherAmounts = [5100, 11000, 21000, 51000];

export default function DonateForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1); // 1=details, 2=payment
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [customAmount, setCustomAmount] = useState('1101');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dedication: '',
  });

  const amount = customAmount ? Number(customAmount) : (selectedSeva?.amount || 0);

  useEffect(() => {
    const amountParam = searchParams.get('amount');
    if (!amountParam) return;
    const parsed = Number(amountParam);
    if (!Number.isFinite(parsed) || parsed <= 0) return;
    setSelectedSeva(null);
    setCustomAmount(String(parsed));
  }, [searchParams]);

  const handleSevaSelect = (seva) => {
    setSelectedSeva(seva);
    setCustomAmount(String(seva.amount));
  };

  const handleQuickAmount = (amt) => {
    setSelectedSeva(null);
    setCustomAmount(String(amt));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && value.trim()) delete next.name;
      if (name === 'mobile' && /^\d{10}$/.test(value)) delete next.mobile;
      if (name === 'email' && (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) delete next.email;
      return next;
    });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');

    const nextFieldErrors = {};

    if (!form.name.trim()) {
      nextFieldErrors.name = 'Please enter your full name.';
    }

    if (!form.mobile.trim()) {
      nextFieldErrors.mobile = 'Please enter your mobile number.';
    } else if (!/^\d{10}$/.test(form.mobile)) {
      nextFieldErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextFieldErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    if (!amount || amount < 1) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          name: form.name,
          email: form.email || '',
          mobile: form.mobile,
          sevaType: selectedSeva?.name || 'General Donation',
          dedication: form.dedication,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : { error: 'Unexpected server response. Please try again.' };

      if (!res.ok) {
        throw new Error(data.error || 'Payment initialization failed.');
      }

      if (data.success && data.paymentUrl) {
        // Redirect immediately after API response to avoid gateway session expiry.
        window.location.replace(data.paymentUrl);
      } else {
        setError(data.error || 'Payment failed. Please try again.');
        setStep(2);
      }
    } catch (err) {
      setError(err?.message || 'Network error. Please check your connection and try again.');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Support Hare Krishna Marwar Mandir</span>
          <h1 className={styles.title}>Make a Donation</h1>
          <p className={styles.subtitle}>
            Your generous contribution helps us build the Mandir, feed the hungry, and protect cows.
          </p>
        </div>

        {/* Steps indicator */}
        <div className={styles.steps}>
          {['Details', 'Payment'].map((label, i) => (
            <div key={label} className={`${styles.stepItem} ${step >= i + 1 ? styles.stepActive : ''}`}>
              <div className={styles.stepNum}>{i + 1}</div>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Left — Form */}
          <div className={styles.formSide}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  <h2 className={styles.stepTitle}>Donation Details</h2>
                  <div className={styles.sevaGrid}>
                    {sevaOptions.map((s) => (
                      <button
                        key={s.id}
                        className={`${styles.sevaCard} ${selectedSeva?.id === s.id ? styles.sevaSelected : ''}`}
                        onClick={() => handleSevaSelect(s)}
                      >
                        <span className={styles.sevaIcon}>{s.icon}</span>
                        <div className={styles.sevaInfo}>
                          <strong>{s.name}</strong>
                          <span className={styles.sevaImpact}>{s.impact}</span>
                        </div>
                        <span className={styles.sevaAmt}>₹{s.amount.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.quickSection}>
                    <label className={styles.fieldLabel}>Quick Choose Amount</label>

                    <div className={styles.featuredAmountGrid}>
                      {featuredAmounts.map((item) => (
                        <button
                          key={item.amount}
                          className={`${styles.featuredAmountCard} ${Number(customAmount) === item.amount ? styles.featuredAmountActive : ''}`}
                          onClick={() => handleQuickAmount(item.amount)}
                        >
                          <span className={styles.featuredAmountValue}>₹{item.amount.toLocaleString()}</span>
                          <span className={styles.featuredAmountImpact}>{item.impact}</span>
                          {item.recommended && <span className={styles.recommendedTag}>Recommended</span>}
                        </button>
                      ))}
                    </div>

                    <label className={styles.fieldLabel}>Other Amount</label>
                    <div className={styles.quickGrid}>
                      {otherAmounts.map((a) => (
                        <button
                          key={a}
                          className={`${styles.quickBtn} ${Number(customAmount) === a ? styles.quickActive : ''}`}
                          onClick={() => handleQuickAmount(a)}
                        >
                          ₹{a.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className={styles.customRow}>
                      <span className={styles.currency}>₹</span>
                      <input
                        type="number"
                        placeholder="Enter custom amount (optional)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className={styles.customInput}
                        min="1"
                      />
                    </div>
                  </div>

                  <button
                    className={`btn btn-donate ${styles.nextBtn}`}
                    onClick={() => amount > 0 && setStep(2)}
                    disabled={!amount || amount < 1}
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  <h2 className={styles.stepTitle}>Payment</h2>
                  <form onSubmit={handlePay} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
                        autoFocus
                      />
                      {fieldErrors.name && <p className={styles.inlineError}>{fieldErrors.name}</p>}
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Email (optional)</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                        />
                        {fieldErrors.email && <p className={styles.inlineError}>{fieldErrors.email}</p>}
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Mobile *</label>
                        <input
                          name="mobile"
                          value={form.mobile}
                          onChange={handleChange}
                          required
                          placeholder="10-digit number"
                          maxLength={10}
                          inputMode="numeric"
                          className={`${styles.input} ${fieldErrors.mobile ? styles.inputError : ''}`}
                        />
                        {fieldErrors.mobile && <p className={styles.inlineError}>{fieldErrors.mobile}</p>}
                      </div>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Dedicate this donation (optional)</label>
                      <input name="dedication" value={form.dedication} onChange={handleChange} placeholder="In memory of / On behalf of..." className={styles.input} />
                    </div>

                    {error && <div className={styles.errorMsg}>{error}</div>}

                    <div className={styles.trustStrip}>
                      <span><Shield size={14} /> Trusted by 1000+ Devotees</span>
                      <span><Heart size={14} /> Serving since 2012</span>
                    </div>

                    <div className={styles.formActions}>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Back</button>
                      <button type="submit" className={`btn btn-donate ${styles.payBtn}`} disabled={loading}>
                        <CreditCard size={18} /> Donate ₹{amount.toLocaleString()} Securely
                      </button>
                    </div>

                    <div className={styles.ctaReassurance}>
                      <p><Lock size={14} /> 100% Secure Payment via ICICI Bank</p>
                      <p><Shield size={14} /> Eligible for 80G Tax Benefit</p>
                      <p><Heart size={14} /> Your donation helps serve meals today</p>
                    </div>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right — Summary */}
          <div className={styles.summarySide}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Donation Summary</h3>

              {selectedSeva && (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>{selectedSeva.icon}</span>
                  <div>
                    <strong>{selectedSeva.name}</strong>
                    <small>{selectedSeva.impact}</small>
                  </div>
                </div>
              )}

              <div className={styles.summaryTotal}>
                <span>Amount</span>
                <strong>₹{amount.toLocaleString()}</strong>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.badge}><Shield size={16} /> Secure Payment</div>
                <div className={styles.badge}><CreditCard size={16} /> ICICI Bank Gateway</div>
                <div className={styles.badge}><Heart size={16} /> 80G Tax Benefit Available</div>
              </div>

              <p className={styles.summaryNote}>
                All donations go directly to Hare Krishna Movement Jodhpur. You will receive a receipt via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
