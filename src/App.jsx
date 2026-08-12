import { useState, useEffect } from 'react';
import Cover from './components/Cover';
import MainContent from './components/MainContent';
import BackgroundParticles from './components/BackgroundParticles';
import TransitionEffect from './components/TransitionEffect';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpened && !isTransitioning) {
      window.scrollTo(0, 0);
    }
  }, [isOpened]);

  const handleOpen = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setIsOpened(true);
  };

  return (
    <div className="app-container">
      <BackgroundParticles isDark={!isOpened && !isTransitioning} />
      
      {isTransitioning && <TransitionEffect onComplete={handleTransitionComplete} />}

      <AnimatePresence mode="wait">
        {!isOpened && !isTransitioning ? (
          <Cover key="cover" onOpen={handleOpen} />
        ) : isOpened && !isTransitioning ? (
          <MainContent key="main" />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
