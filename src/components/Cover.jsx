import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import './Cover.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Cover({ onOpen }) {
  return (
    <motion.div 
      className="cover-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-circle top-left">
        <div className="orbit-dot"></div>
      </div>
      <div className="bg-circle bottom-right">
        <div className="orbit-dot"></div>
      </div>
      <div className="bg-circle center-large"></div>

      <div className="cover-card-wrapper">
        <div className="cover-card-border">
          <div className="sparkle top-left"><Sparkles size={20} strokeWidth={1.5} /></div>
          <div className="sparkle bottom-right"><Sparkles size={20} strokeWidth={1.5} /></div>
        </div>

        <motion.div 
          className="cover-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="heart-divider top" variants={itemVariants}>
            <div className="line left"></div>
            <Heart size={20} className="gold-icon swinging-heart" fill="currentColor" />
            <div className="line right"></div>
          </motion.div>

          <motion.p className="cover-subtitle" variants={itemVariants}>Nikoh Taklifnomasi</motion.p>
          
          <motion.h1 className="cover-title" variants={itemVariants}>Xurshidjon</motion.h1>
          <motion.div className="ampersand" variants={itemVariants}>&amp;</motion.div>
          <motion.h1 className="cover-title" variants={itemVariants}>Ruxshonaoy</motion.h1>
          
          <motion.div className="diamond-divider" variants={itemVariants}>
            <div className="line left"></div>
            <div className="diamond"></div>
            <div className="line right"></div>
          </motion.div>
          
          <motion.button className="open-btn" onClick={onOpen} variants={itemVariants}>
            <Heart size={16} className="btn-icon" fill="currentColor" />
            <span>Taklifnomani ochish</span>
          </motion.button>
          
          <motion.div className="cover-dates-column" variants={itemVariants}>
            <span>10.10.2026 — Jizzax viloyati</span>
            <div className="date-separator-line"></div>
            <span>16.10.2026 — Jizzax viloyati</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
