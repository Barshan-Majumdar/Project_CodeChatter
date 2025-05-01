
import React, { useEffect, useRef } from 'react';

interface CodeRainProps {
  className?: string;
}

const CodeRain: React.FC<CodeRainProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);

    class Column {
      x: number;
      fontSize: number;
      symbols: string;
      y: number;
      speed: number;

      constructor(x: number, fontSize: number, canvasHeight: number) {
        this.x = x;
        this.fontSize = fontSize;
        this.symbols = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        this.y = Math.random() * canvasHeight;
        this.speed = (Math.random() * 2) + 1;
      }

      draw(context: CanvasRenderingContext2D): void {
        const text = this.symbols.charAt(Math.floor(Math.random() * this.symbols.length));
        const gradient = context.createLinearGradient(0, this.y - this.fontSize, 0, this.y);
        gradient.addColorStop(0, '#10FFA210');
        gradient.addColorStop(0.7, '#10FFA280');
        gradient.addColorStop(1, '#10FFA2');
        
        context.fillStyle = gradient;
        context.font = `${this.fontSize}px 'Courier New'`;
        context.fillText(text, this.x, this.y);

        if (this.y > canvas.height) {
          this.y = 0;
        } else {
          this.y += this.speed;
        }
      }
    }

    const fontSize = 16;
    const columns: Column[] = [];
    
    for (let i = 0; i < canvas.width / fontSize; i += 2) {
      columns.push(new Column(i * fontSize, fontSize, canvas.height));
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns.forEach(column => column.draw(ctx));
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 50);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 opacity-20 ${className || ''}`}
    />
  );
};

export default CodeRain;
