import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, MessageSquareQuote, MousePointer2, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './MainContent.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const FloatingHearts = () => {
  // Generate random hearts
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 15}s`,
    animationDelay: `${Math.random() * 10}s`,
    size: 10 + Math.random() * 15
  }));

  return (
    <div className="floating-hearts-container">
      {hearts.map(heart => (
        <Heart 
          key={heart.id} 
          className="float-heart" 
          size={heart.size} 
          fill="currentColor"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay
          }}
        />
      ))}
    </div>
  );
};

export default function MainContent() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    if (!db) {
      const savedWishes = localStorage.getItem('wedding-wishes');
      if (savedWishes) {
        try {
          setWishes(JSON.parse(savedWishes));
        } catch (e) {
          // ignore
        }
      }
      return;
    }

    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishes(wishesData);
    }, (error) => {
      console.error("Firebase connection error:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db && wishes.length > 0) {
      localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
    }
  }, [wishes]);
  
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  const handleWishesSubmit = async (e) => {
    e.preventDefault();
    if (newName.trim() && newText.trim()) {
      if (db) {
        try {
          await addDoc(collection(db, 'wishes'), {
            name: newName,
            text: newText,
            createdAt: serverTimestamp()
          });
        } catch (error) {
          console.error("Error adding wish: ", error);
        }
      } else {
        setWishes([{ id: Date.now(), name: newName, text: newText }, ...wishes]);
      }
      setNewName('');
      setNewText('');
    }
  };

  return (
    <>
      <FloatingHearts />
      <motion.div 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      <div className="light-bg-circle top-left"></div>
      <div className="light-bg-circle bottom-right"></div>

      {/* HERO SECTION */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <div className="heart-icon-wrapper">
          <Heart size={20} className="gold-heart" fill="currentColor" />
        </div>
        <h1 className="hero-title">
          Murodjon<br />
          <span className="ampersand">&amp;</span><br />
          Durdona
        </h1>
        <div className="hero-dates">
          <div className="date-block">
            <span className="date-text">25.08.2026</span>
            <span className="date-sub">JIZZAX VILOYATI</span>
          </div>
          <div className="vertical-line"></div>
          <div className="date-block">
            <span className="date-text">24.09.2026</span>
            <span className="date-sub">JIZZAX VILOYATI</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Pastga</span>
          <MousePointer2 size={24} className="mouse-icon" />
        </div>
      </motion.section>

      {/* MESSAGE SECTION */}
      <motion.section 
        className="message-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <div className="message-inner">
          <div className="quote-icon">
            <MessageSquareQuote size={32} />
          </div>
          <h2 className="section-title">Hurmatli Mehmon!</h2>
          <p className="message-text">
            Sizni hayotimizning eng muhim va quvonchli kuniga taklif qilishdan mamnunmiz. Bu baxtli
            kunimizni siz bilan birga nishonlash biz uchun katta sharafdir.
          </p>
          <p className="message-text">
            Sizning ishtirokingiz to'yimizni yanada fayzli va unutilmas qiladi. Siz bilan bo'ladigan har bir
            lahza qalbimizda abadiy xotira bo'lib qoladi.
          </p>
          <div className="heart-divider">
            <Heart size={16} fill="currentColor" />
          </div>
          <p className="message-signature">Hurmat bilan, Murodjon va Durdona</p>
        </div>
      </motion.section>

      {/* CEREMONIES SECTION */}
      <motion.section 
        className="ceremonies-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <div className="ceremonies-inner">
          <div className="heart-icon-wrapper">
            <Heart size={20} className="gold-heart" fill="currentColor" />
          </div>
          <h2 className="section-title">To'y Marosimlari</h2>
          <p className="section-subtitle">To'yimiz ikki marosimda nishonlanadi</p>
          
          <div className="cards-container">
            {/* Card 1 */}
            <div className="ceremony-card">
              <div className="card-badge">I</div>
              <p className="ceremony-type">BIRINCHI MAROSIM</p>
              <h3 className="ceremony-date">25.08<br/><span>2026-yil</span></h3>
              <h4 className="venue-name">Fayz to'yxonasi</h4>
              <p className="venue-address">
                <MapPin size={14} /> Jizzax viloyati, Sharof Rashidov tumani
              </p>
              <div className="qr-placeholder">
                <div className="qr-wrapper">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.app.goo.gl/77Bd7qB2bn55FyKw6" alt="QR Code" />
                </div>
              </div>
              <p className="qr-text">Manzilni QR orqali oling</p>
              <button className="action-btn primary" onClick={() => window.open('https://maps.app.goo.gl/77Bd7qB2bn55FyKw6', '_blank')}><Navigation size={16} /> Google xaritada ko'rish</button>
              <button disabled className="action-btn secondary"><Calendar size={16} /> Taqvimga qo'shish</button>
            </div>

            {/* Card 2 */}
            <div className="ceremony-card">
              <div className="card-badge">II</div>
              <p className="ceremony-type">IKKINCHI MAROSIM</p>
              <h3 className="ceremony-date">24.09<br/><span>2026-yil</span></h3>
              <h4 className="venue-name">Samo to'yxonasi</h4>
              <p className="venue-address">
                <MapPin size={14} /> Jizzax viloyati, Sharof Rashidov tumani
              </p>
              <div className="qr-placeholder">
                <div className="qr-wrapper">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.app.goo.gl/U3d8DmeBD84Ca2r29" alt="QR Code" />
                </div>
              </div>
              <p className="qr-text">Manzilni QR orqali oling</p>
              <button className="action-btn primary" onClick={() => window.open('https://maps.app.goo.gl/U3d8DmeBD84Ca2r29', '_blank')}><Navigation size={16} /> Google xaritada ko'rish</button>
              <button disabled className="action-btn secondary"><Calendar size={16} /> Taqvimga qo'shish</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WISHES SECTION */}
      <motion.section 
        className="wishes-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <div className="wishes-inner">
          <div className="heart-icon-wrapper">
            <MessageSquareQuote size={20} className="gold-heart" />
          </div>
          <h2 className="section-title">Yaxshi Tilaklar</h2>
          <p className="section-subtitle">Bizga o'z chiroyli tilaklaringizni qoldiring</p>

          <form className="wishes-form" onSubmit={handleWishesSubmit}>
            <input 
              type="text" 
              placeholder="Ismingiz" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <textarea 
              placeholder="Tilak va tabriklaringiz..." 
              rows="4"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              <Heart size={16} fill="currentColor" /> Tilak qoldirish
            </button>
          </form>

          <div className="wishes-grid">
            {wishes.map((wish) => (
              <div key={wish.id} className="wish-card">
                <div className="wish-header">
                  <Heart size={14} className="gold-heart" fill="currentColor" />
                  <span className="wish-name">{wish.name}</span>
                </div>
                <p className="wish-text">{wish.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      </motion.div>

      {/* FOOTER SECTION */}
      <footer className="main-footer">
        <h2 className="footer-title">Murodjon & Durdona</h2>
        <div className="heart-icon-wrapper">
          <Heart size={16} className="gold-heart" fill="currentColor" />
        </div>
        <div className="footer-dates">
          <span>25.08.2026 - Jizzax viloyati</span>
          <span className="dot-separator">•</span>
          <span>24.09.2026 - Jizzax viloyati</span>
        </div>
        <div className="footer-bottom">
          X <Heart size={10} className="gold-heart" fill="currentColor" /> R
        </div>
      </footer>
    </>
  );
}

