'use client';
import { useEffect, useState } from 'react';

export const ScrollProgressTracker = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Total marks on the ruler (increased for more height)
  const totalMarks = 100;
  const rulerHeight = totalMarks * 8; // 8px per mark = 800px total height

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll percentage (0 to 100)
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener without passive to ensure immediate updates
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate bell curve scale for each mark
  const getBellCurveScale = (markIndex: number) => {
    const currentPosition = (scrollProgress / 100) * totalMarks;
    const distance = Math.abs(markIndex - currentPosition);

    // Bell curve: exponential decay from current position
    // Scale peaks at 1.0 at current position, decreases with distance
    const bellCurve = Math.exp(-(distance * distance) / 80);

    // Scale between 0.4 (minimum) and 1.0 (maximum)
    return 0.4 + (bellCurve * 0.6);
  };

  // Determine mark style (like a real ruler)
  const getMarkStyle = (index: number) => {
    const isMajorMark = index % 10 === 0; // Every 10th mark is major (like cm)
    const isMediumMark = index % 5 === 0 && !isMajorMark; // Every 5th mark (like 5mm)

    const scale = getBellCurveScale(index);

    if (isMajorMark) {
      return {
        width: `${20 * scale}px`, // 20px max for major marks
        height: '2px',
        backgroundColor: '#000000',
      };
    } else if (isMediumMark) {
      return {
        width: `${14 * scale}px`, // 14px max for medium marks
        height: '1.5px',
        backgroundColor: '#4A4A4A',
      };
    } else {
      return {
        width: `${10 * scale}px`, // 10px max for minor marks
        height: '1px',
        backgroundColor: '#B4B4B4',
      };
    }
  };

  // Calculate vertical position of ray based on scroll progress
  const rayTopPosition = `calc(50% - ${rulerHeight / 2}px + ${(scrollProgress / 100) * rulerHeight}px)`;

  // Generate all marks
  const marks = Array.from({ length: totalMarks }, (_, i) => i);

  return (
    <>
      {/* Scroll Progress Tracker - Ruler */}
      <div
        className="fixed left-8 hidden lg:block z-[3]"
        style={{
          top: '50%',
          transform: `translateY(-${rulerHeight / 2}px)`,
        }}
      >
        <div className="relative flex flex-col items-start gap-[5px]">
          {marks.map((mark) => {
            const style = getMarkStyle(mark);
            return (
              <div
                key={mark}
                style={{
                  width: style.width,
                  height: style.height,
                  backgroundColor: style.backgroundColor,
                  transition: 'width 50ms linear, background-color 50ms linear',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Horizontal Ray - Full Screen Width - Moves with scroll */}
      <div
        className="fixed left-0 right-0 hidden lg:block z-[999] pointer-events-none"
        style={{
          top: rayTopPosition,
          transition: 'top 50ms linear',
        }}
      >
        <div className="relative h-0">
          {/* Arrow indicator */}
          <div
            className="absolute flex items-center gap-3"
            style={{
              left: '2rem',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Orange arrow triangle */}
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-swiss-orange" />

            {/* Horizontal orange line spanning screen */}
            <div className="h-[2px] bg-swiss-orange" style={{ width: 'calc(100vw - 4rem)' }} />
          </div>
        </div>
      </div>
    </>
  );
};
