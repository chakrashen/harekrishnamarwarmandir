import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-pattern"></div>
        <div className="hero-glow"></div>
      </div>
      
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-greeting"
        >
          <Sparkles className="greeting-icon" size={16} />
          <span>॥ हरे कृष्ण ॥</span>
          <Sparkles className="greeting-icon" size={16} />
        </motion.div>
        
        <motion.h1 
          className="hero-title text-gradient-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Hare Krishna Marwar
        </motion.h1>
        
        <motion.div 
          className="hero-location"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <MapPin size={18} /> Jodhpur, Rajasthan
        </motion.div>
        
        <motion.div 
          className="hero-verse-box glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="hero-verse">"सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।<br/>अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"</p>
          <p className="hero-verse-ref">— Bhagavad Gita 18.66</p>
        </motion.div>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button className="btn-primary">🪔 Donate Now</button>
          <button className="btn-secondary">🛕 Plan Your Visit</button>
        </motion.div>
        
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="stat-item">
            <div className="stat-number">14+</div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50k+</div>
            <div className="stat-label">Lives Touched</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50L+</div>
            <div className="stat-label">Meals Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Festivals</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
