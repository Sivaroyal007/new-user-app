import { useRef, useState } from 'react';

const useDraggable = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const ref = useRef<HTMLUListElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ref.current) {
      setIsDragging(true);
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && ref.current) {
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      ref.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (ref.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && ref.current) {
      const x = e.touches[0].pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      ref.current.scrollLeft = scrollLeft - walk;
    }
  };

  return {
    ref,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  };
};

export default useDraggable;
