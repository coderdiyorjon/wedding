import { useEffect, useRef } from 'react';
import './BackgroundParticles.css';

export default function BackgroundParticles({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 40; // Number of particles

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -0.5 - 0.1; // Float upwards
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
      }

      draw(timestamp) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // 2s rhythm heartbeat pulsing matching the CSS swing-heart animation
        const pulse = (Math.sin(timestamp / 1000 * Math.PI) + 1) / 2; // 0 to 1 over 2 seconds
        // Base opacity + pulsating effect
        const currentOpacity = this.opacity * 0.4 + (this.opacity * 0.6 * pulse);
        
        const colorStr = isDark ? `rgba(198, 160, 82, ${currentOpacity})` : `rgba(198, 160, 82, ${currentOpacity * 0.7})`;
        ctx.fillStyle = colorStr;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(timestamp);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`particles-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <canvas ref={canvasRef} className="particles-canvas" />
      
      {/* Decorative circles as seen in screenshots */}
      <div className="deco-circle circle-1"></div>
      <div className="deco-circle circle-2"></div>
      <div className="deco-circle circle-3"></div>
    </div>
  );
}
