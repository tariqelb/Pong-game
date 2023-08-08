import React, { useRef, useEffect } from 'react';

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) {
      console.error('CanvasRenderingContext2D not available');
      return;
    }

    // Your game code will go here
    // You can now safely use 'ctx' to draw on the canvas

    // Draw a rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 100);

  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Canvas;
