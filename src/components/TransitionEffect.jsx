import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import './TransitionEffect.css';

export default function TransitionEffect({ onComplete }) {
  const [showHeart, setShowHeart] = useState(true);

  useEffect(() => {
    // The total transition takes about 2 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="transition-overlay">
      {/* Expanding Golden Circle */}
      <motion.div 
        className="golden-circle"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 30] }}
        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 1] }}
      />
      
      {/* Popping small circles */}
      <motion.div 
        className="pop-circle pop-1"
        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
        animate={{ scale: 1.5, opacity: 0, x: -100, y: -100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div 
        className="pop-circle pop-2"
        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
        animate={{ scale: 1.5, opacity: 0, x: 100, y: -50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div 
        className="pop-circle pop-3"
        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
        animate={{ scale: 1.5, opacity: 0, x: -50, y: 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div 
        className="pop-circle pop-4"
        initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
        animate={{ scale: 1.5, opacity: 0, x: 80, y: 80 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Spinning Heart */}
      <motion.div
        className="transition-heart-wrapper"
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 0.8, 3], rotate: 360, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, ease: "easeInOut", times: [0, 0.3, 0.6, 1] }}
      >
        <Heart size={80} className="white-heart" fill="currentColor" />
      </motion.div>
    </div>
  );
}
