import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  formatter?: (val: number) => string;
}

export function AnimatedNumber({ 
  value, 
  formatter = (v) => Math.round(v).toLocaleString('vi-VN') 
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 150,
  });
  
  // Wait for the component to be visible before animating
  const isInView = useInView(ref, { once: false, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter(latest);
      }
    });
    return () => unsubscribe();
  }, [springValue, formatter]);

  return <span ref={ref}>{formatter(0)}</span>;
}
