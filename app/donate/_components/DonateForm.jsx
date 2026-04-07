'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, CreditCard, Loader, Gift, ChevronRight } from 'lucide-react';
import styles from './DonateForm.module.css';

const sevaOptions = [
  { id: 'anna-daan', name: 'Anna Daan Seva', amount: 4500, icon: '🍛', impact: 'Feed 100 People', desc: 'Sponsor a day of free prasadam for 100 devotees and the needy.' },
  { id: 'mandir-nirman', name: 'Mandir Nirman Seva', amount: 2100, icon: '🛕', impact: '1 Sq Ft of Mandir', desc: 'Build the temple brick by brick. Every sq ft counts.' },
  { id: 'gau-seva', name: 'Gau Seva', amount: 2100, icon: '🐄', impact: '1 Month / 1 Cow', desc: 'Provide food, shelter, and medical care for a sacred cow.' },
];

const quickAmounts = [501, 1100, 2100, 5100, 11000, 21000, 51000];

export default function DonateForm() {
  const [step, setStep] = useState(1); // 1=choose seva, 2=fill details, 3=processing
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dedication: '',
  });

  const amount = customAmount ? Number(customAmount) : (selectedSeva?.amount || 0);

  const handleSevaSelect = (seva) => {
    setSelectedSeva(seva);
    setCustomAmount(String(seva.amount));
  };

  const handleQuickAmount = (amt) => {
    setCustomAmount(String(amt));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || amount < 1) {
      setError('Please enter a valid donation amount.');
      return;
    }
    if (!form.name || !form.email || !form.mobile) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setStep(3);

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          sevaType: selectedSeva?.name || 'General Donation',
          dedication: form.dedication,
        }),
      });

      const data = await res.json();

      if (data.success && data.paymentUrl) {
        // Redirect to ICICI EazyPay gateway
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || 'Payment failed. Please try again.');
        setStep(2);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
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
          {['Choose Seva', 'Your Details', 'Payment'].map((label, i) => (
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
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className={styles.stepTitle}>Choose Your Seva</h2>
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
                    <label className={styles.fieldLabel}>Or choose an amount</label>
                    <div className={styles.quickGrid}>
                      {quickAmounts.map((a) => (
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
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className={styles.customInput}
                        min="1"
                      />
                    </div>
                  </div>

                  <label className={styles.recurringLabel}>
                    <input type="checkbox" checked={isRecurring} onChange={() => setIsRecurring(!isRecurring)} className={styles.checkBox} />
                    <span>Make it monthly (optional)</span>
                  </label>

                  <button
                    className={`btn btn-donate ${styles.nextBtn}`}
                    onClick={() => amount > 0 && setStep(2)}
                    disabled={!amount || amount < 1}
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className={styles.stepTitle}>Your Details</h2>
                  <form onSubmit={handlePay} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" className={styles.input} />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={styles.input} />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Mobile *</label>
                        <input name="mobile" value={form.mobile} onChange={handleChange} required placeholder="10-digit number" maxLength={10} className={styles.input} />
                      </div>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Dedicate this donation (optional)</label>
                      <input name="dedication" value={form.dedication} onChange={handleChange} placeholder="In memory of / On behalf of..." className={styles.input} />
                    </div>

                    {error && <div className={styles.errorMsg}>{error}</div>}

                    <div className={styles.formActions}>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Back</button>
                      <button type="submit" className={`btn btn-donate ${styles.payBtn}`} disabled={loading}>
                        <CreditCard size={18} /> Pay ₹{amount.toLocaleString()}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.processing}>
                  <Loader size={48} className={styles.spinner} />
                  <h2>Redirecting to Payment...</h2>
                  <p>You are being securely redirected to ICICI Bank&apos;s payment gateway.</p>
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

              {isRecurring && (
                <div className={styles.summaryRecurring}>
                  <Gift size={14} /> Monthly recurring donation
                </div>
              )}

              <div className={styles.trustBadges}>
                <div className={styles.badge}><Shield size={16} /> Secure Payment</div>
                <div className={styles.badge}><CreditCard size={16} /> ICICI Bank Gateway</div>
                <div className={styles.badge}><Heart size={16} /> 80G Exemption (In Process)</div>
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
