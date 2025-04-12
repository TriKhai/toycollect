import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-white border border-green rounded-full pointer-events-none transition-transform duration-150 ease-out"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`, // Căn giữa cursor
      }}
    />
  );
};

export default CustomCursor;
