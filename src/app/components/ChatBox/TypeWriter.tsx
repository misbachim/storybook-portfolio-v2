import { useState, useEffect, useRef, CSSProperties } from "react";

interface TypeWriterProps {
  toggleTypingOff?: () => void;
  content?: string;
  speed?: number;
  wrapper?: 'p' | 'h2' | 'div';
  skip?: boolean;
}

export default function TypeWriter({ toggleTypingOff, content = "", speed = 30, wrapper = 'p', skip = false }: TypeWriterProps) {
  const [index, setIndex] = useState(0);
  const hasToggled = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIndex(0);
    hasToggled.current = false;
    if (!content) return;

    intervalRef.current = setInterval(() => {
      setIndex(prev => {
        if (prev < content.length) {
          return prev + 1;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [content, speed]);

  // If skip becomes true, finish the animation
  useEffect(() => {
    if (skip && index < content.length) {
      setIndex(content.length);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [skip, content?.length, index]);

  // Only call toggleTypingOff after the animation is truly finished and only once
  useEffect(() => {
    if (index >= (content?.length ?? 0) && !hasToggled.current) {
      hasToggled.current = true;
      if (toggleTypingOff) { toggleTypingOff(); }
    }
  }, [index, content?.length, toggleTypingOff]);

  const displayedContent = content?.slice(0, index);

  const commonProps = {
    style: { userSelect: 'none' as CSSProperties['userSelect'] }
  };

  switch (wrapper) {
    case 'h2':
      return <h2 {...commonProps}>{displayedContent}</h2>;
    case 'div':
      return <div {...commonProps}>{displayedContent}</div>;
    default:
      return <p {...commonProps}>{displayedContent}</p>;
  }
} 