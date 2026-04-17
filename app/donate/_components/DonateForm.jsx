'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, CreditCard, ChevronRight, Lock, Gift } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import styles from './DonateForm.module.css';

const sevaOptions = [
  { id: 'anna-daan', name: 'Anna Daan Seva', amount: 3400, unitPrice: 34, unitLabel: 'People', icon: '🍛', impact: 'Feed 100 People', desc: 'Sponsor a day of free prasadam for 100 devotees and the needy.', presets: [{q:100, label: '100 People'}, {q:200, label: '200 People'}, {q:500, label: '500 People'}, {q:1000, label: '1000 People'}] },
  { id: 'mandir-nirman', name: 'Mandir Nirman Seva', amount: 2500, unitPrice: 2500, unitLabel: 'Sq Ft', icon: '🛕', impact: '1 Sq Ft of Mandir', desc: 'Every sq ft counts. Donors receive a Krishna Gift set (Calendar, Mala, Prasadam & Book).', presets: [{q:1, label: '1 Sq Ft'}, {q:5, label: '5 Sq Ft'}, {q:10, label: '10 Sq Ft'}, {q:21, label: '21 Sq Ft'}] },
  { id: 'gau-seva', name: 'Gau Seva', amount: 2100, unitPrice: 2100, unitLabel: 'Days', icon: '🐄', impact: '1 Day', desc: 'Provide food, shelter, and medical care for a sacred cow.', presets: [{q:1, label: '1 Day'}, {q:7, label: '7 Days'}, {q:15, label: '15 Days'}, {q:30, label: '1 Month'}] },
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
  const [inputQuantity, setInputQuantity] = useState('1');
  const [customAmount, setCustomAmount] = useState('1101');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    dedication: '',
    atgRequired: false,
    panNo: '',
    aadharNo: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    pinCode: '',
    addressType: 'Residential',
  });

  const amount = customAmount ? Number(customAmount) : (selectedSeva ? (Number(inputQuantity) || 0) * selectedSeva.unitPrice : 0);

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
    setInputQuantity(String(seva.presets[0].q));
    setCustomAmount('');
  };

  const handleQuickAmount = (amt) => {
    setSelectedSeva(null);
    setInputQuantity('1');
    setCustomAmount(String(amt));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: nextValue });

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === 'name' && value.trim()) delete next.name;
      if (name === 'mobile' && /^\d{10}$/.test(value)) delete next.mobile;
      if (name === 'email' && (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) delete next.email;
      if (name === 'pinCode' && /^\d{6}$/.test(value)) delete next.pinCode;
      if (name === 'panNo' && (/^[A-Z]{5}\d{4}[A-Z]$/.test(value.toUpperCase()) || !value.trim())) delete next.panNo;
      if (name === 'aadharNo' && (/^\d{12}$/.test(value) || !value.trim())) delete next.aadharNo;
      if (name === 'addressLine1' && value.trim()) delete next.addressLine1;
      if (name === 'city' && value.trim()) delete next.city;
      if (name === 'state' && value.trim()) delete next.state;
      if (name === 'country' && value.trim()) delete next.country;
      if (name === 'atgRequired' && !checked) {
        delete next.panNo;
        delete next.aadharNo;
      }
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

    if (!form.addressLine1.trim()) {
      nextFieldErrors.addressLine1 = 'Please enter your address.';
    }

    if (!form.city.trim()) {
      nextFieldErrors.city = 'Please enter your city.';
    }

    if (!form.state.trim()) {
      nextFieldErrors.state = 'Please enter your state.';
    }

    if (!form.country.trim()) {
      nextFieldErrors.country = 'Please enter your country.';
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      nextFieldErrors.pinCode = 'Please enter a valid 6-digit PIN code.';
    }

    if (form.atgRequired) {
      if (!form.panNo.trim() && !form.aadharNo.trim()) {
        nextFieldErrors.panNo = 'Enter PAN or Aadhaar to claim 80G.';
        nextFieldErrors.aadharNo = 'Enter PAN or Aadhaar to claim 80G.';
      }

      if (form.panNo && !/^[A-Z]{5}\d{4}[A-Z]$/.test(form.panNo.toUpperCase())) {
        nextFieldErrors.panNo = 'Please enter a valid PAN number.';
      }

      if (form.aadharNo && !/^\d{12}$/.test(form.aadharNo)) {
        nextFieldErrors.aadharNo = 'Please enter a valid 12-digit Aadhaar number.';
      }
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
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          name: form.name,
          email: form.email || '',
          mobile: form.mobile,
          sevaType: selectedSeva?.name || 'General Donation',
          dedication: form.dedication,
          atgRequired: form.atgRequired,
          panNo: form.atgRequired ? form.panNo.trim() : '',
          aadharNo: form.atgRequired ? form.aadharNo.trim() : '',
          addressLine1: form.addressLine1.trim(),
          addressLine2: form.addressLine2.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          country: form.country.trim(),
          pinCode: form.pinCode.trim(),
          addressType: form.addressType,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : { error: 'Unexpected server response. Please try again.' };

      if (!res.ok) {
        throw new Error(data.error || 'Payment initialization failed.');
      }

      if (data.success && data.formFields && data.gatewayUrl) {
        const formEl = document.createElement('form');
        formEl.method = 'POST';
        formEl.action = data.gatewayUrl;

        Object.entries(data.formFields).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value ?? '');
          formEl.appendChild(input);
        });

        document.body.appendChild(formEl);
        formEl.submit();
      } else if (data.success && data.paymentUrl) {
        console.log('Generated Payment URL:', data.paymentUrl);
        // Fallback to GET redirect if POST data is missing.
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
            Your seva builds the Mandir, serves prasadam, and protects cows. Every contribution creates
            daily impact across Jodhpur.
          </p>
          <div className={styles.headerTrust}>
            <span>Secure ICICI payment</span>
            <span>80G tax benefit</span>
            <span>Serving since 2012</span>
          </div>
          <div className={styles.headerImpact}>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>1.51+ lakh</span>
              <span className={styles.impactLabel}>meals served in Jodhpur</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>31,000 sq ft</span>
              <span className={styles.impactLabel}>mandir in progress</span>
            </div>
            <div className={styles.impactCard}>
              <span className={styles.impactValue}>1+ crore</span>
              <span className={styles.impactLabel}>global devotee community</span>
            </div>
          </div>
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
                    
                    <button
                      className={`${styles.sevaCard} ${!selectedSeva ? styles.sevaSelected : ''}`}
                      onClick={() => { setSelectedSeva(null); setCustomAmount('1101'); }}
                    >
                      <span className={styles.sevaIcon}>🙏</span>
                      <div className={styles.sevaInfo}>
                        <strong>General Donation</strong>
                        <span className={styles.sevaImpact}>Support all activities</span>
                      </div>
                      <span className={styles.sevaAmt}>Any Amount</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {selectedSeva?.id === 'mandir-nirman' && (
                      <motion.div 
                        className={styles.giftNotification}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Gift className={styles.giftIcon} size={20} />
                        <div className={styles.giftText}>
                          <span className={styles.giftTitle}>Special Krishna Gift Included!</span>
                          <span className={styles.giftList}>
                            You will receive: <span className={styles.giftHighlight}>Calendar, Jaap Mala, Prasadam & Gita Sar book</span>.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={styles.quickSection}>
                    {selectedSeva ? (
                      <>
                        <label className={styles.fieldLabel}>Choose Quantity</label>
                        <div className={styles.quickGrid}>
                          {selectedSeva.presets?.map((p) => (
                            <button
                              key={p.q}
                              className={`${styles.quickBtn} ${!customAmount && Number(inputQuantity) === p.q ? styles.quickActive : ''}`}
                              onClick={() => { setInputQuantity(String(p.q)); setCustomAmount(''); }}
                            >
                              {p.label} <br/><small style={{opacity: 0.8, fontSize: '0.85em', marginTop: '4px', display: 'block'}}>₹{(selectedSeva.unitPrice * p.q).toLocaleString()}</small>
                            </button>
                          ))}
                        </div>
                        <label className={styles.fieldLabel} style={{ marginTop: '1.5rem' }}>
                          Or Enter Custom Number of {selectedSeva.unitLabel}
                        </label>
                        <div className={styles.customRow}>
                          <span className={styles.currency} style={{ fontSize: '1.2rem', padding: '0 0.8rem' }}>{selectedSeva.icon}</span>
                          <input
                            type="number"
                            placeholder={`Enter no of ${selectedSeva.unitLabel.toLowerCase()}`}
                            value={inputQuantity}
                            onChange={(e) => { setInputQuantity(e.target.value); setCustomAmount(''); }}
                            className={styles.customInput}
                            min="1"
                          />
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}

                    {!selectedSeva && (
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
                    )}
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
                        autoComplete="name"
                        enterKeyHint="next"
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
                          autoComplete="email"
                          enterKeyHint="next"
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
                          autoComplete="tel"
                          enterKeyHint="next"
                          className={`${styles.input} ${fieldErrors.mobile ? styles.inputError : ''}`}
                        />
                        {fieldErrors.mobile && <p className={styles.inlineError}>{fieldErrors.mobile}</p>}
                      </div>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Dedicate this donation (optional)</label>
                      <input name="dedication" value={form.dedication} onChange={handleChange} placeholder="In memory of / On behalf of..." enterKeyHint="next" className={styles.input} />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.checkRow}>
                        <input
                          type="checkbox"
                          name="atgRequired"
                          checked={form.atgRequired}
                          onChange={handleChange}
                          className={styles.checkBox}
                        />
                        I want 80G certificate
                      </label>
                      <p className={styles.helperText}>80G receipt will include PAN or Aadhaar details for tax benefit.</p>
                    </div>

                    {form.atgRequired && (
                      <div className={styles.atgGrid}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>PAN Number *</label>
                          <input
                            name="panNo"
                            value={form.panNo}
                            onChange={handleChange}
                            placeholder="ABCDE1234F"
                            enterKeyHint="next"
                            className={`${styles.input} ${fieldErrors.panNo ? styles.inputError : ''}`}
                          />
                          {fieldErrors.panNo && <p className={styles.inlineError}>{fieldErrors.panNo}</p>}
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Aadhaar Number</label>
                          <input
                            name="aadharNo"
                            value={form.aadharNo}
                            onChange={handleChange}
                            placeholder="12-digit Aadhaar"
                            enterKeyHint="next"
                            className={`${styles.input} ${fieldErrors.aadharNo ? styles.inputError : ''}`}
                            inputMode="numeric"
                            maxLength={12}
                          />
                          {fieldErrors.aadharNo && <p className={styles.inlineError}>{fieldErrors.aadharNo}</p>}
                        </div>
                      </div>
                    )}

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Address Line 1 *</label>
                      <input
                        name="addressLine1"
                        value={form.addressLine1}
                        onChange={handleChange}
                        placeholder="House no, street"
                        autoComplete="address-line1"
                        enterKeyHint="next"
                        className={`${styles.input} ${fieldErrors.addressLine1 ? styles.inputError : ''}`}
                      />
                      {fieldErrors.addressLine1 && <p className={styles.inlineError}>{fieldErrors.addressLine1}</p>}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Address Line 2 (optional)</label>
                      <input
                        name="addressLine2"
                        value={form.addressLine2}
                        onChange={handleChange}
                        placeholder="Area, landmark"
                        autoComplete="address-line2"
                        enterKeyHint="next"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>City *</label>
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="City"
                          autoComplete="address-level2"
                          enterKeyHint="next"
                          className={`${styles.input} ${fieldErrors.city ? styles.inputError : ''}`}
                        />
                        {fieldErrors.city && <p className={styles.inlineError}>{fieldErrors.city}</p>}
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>State *</label>
                        <input
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          placeholder="State"
                          autoComplete="address-level1"
                          enterKeyHint="next"
                          className={`${styles.input} ${fieldErrors.state ? styles.inputError : ''}`}
                        />
                        {fieldErrors.state && <p className={styles.inlineError}>{fieldErrors.state}</p>}
                      </div>
                    </div>

                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Country *</label>
                        <input
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="Country"
                          autoComplete="country-name"
                          enterKeyHint="next"
                          className={`${styles.input} ${fieldErrors.country ? styles.inputError : ''}`}
                        />
                        {fieldErrors.country && <p className={styles.inlineError}>{fieldErrors.country}</p>}
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>PIN Code *</label>
                        <input
                          name="pinCode"
                          value={form.pinCode}
                          onChange={handleChange}
                          placeholder="6-digit PIN"
                          autoComplete="postal-code"
                          enterKeyHint="done"
                          className={`${styles.input} ${fieldErrors.pinCode ? styles.inputError : ''}`}
                          inputMode="numeric"
                          maxLength={6}
                        />
                        {fieldErrors.pinCode && <p className={styles.inlineError}>{fieldErrors.pinCode}</p>}
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Address Type</label>
                      <select
                        name="addressType"
                        value={form.addressType}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="Residential">Residential</option>
                        <option value="Office">Office</option>
                        <option value="Factory">Factory</option>
                      </select>
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

              {selectedSeva ? (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>{selectedSeva.icon}</span>
                  <div>
                    <strong>{selectedSeva.name}</strong>
                    <br />
                    <small>
                      {!customAmount && Number(inputQuantity) > 0 
                        ? `${inputQuantity} ${selectedSeva.unitLabel}` 
                        : selectedSeva.impact}
                    </small>
                  </div>
                </div>
              ) : (
                <div className={styles.summaryItem}>
                  <span className={styles.summaryIcon}>🙏</span>
                  <div>
                    <strong>General Donation</strong>
                    <br />
                    <small>Support all activities</small>
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
