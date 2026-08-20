import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — glowing dot + ring that follows the mouse.
 * Automatically hidden on touch/coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Don't render on touch devices
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        // Offset by half of dot size (4px = 8px/2) to center it on cursor
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const animate = () => {
      if (ringRef.current) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        // Offset by half of ring size (18px = 36px/2) to center it on cursor
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(animate);

    // Hover effects on interactive elements
    const handleOver = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "12px";
        dotRef.current.style.height = "12px";
        dotRef.current.style.background = "#a5b4fc";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "52px";
        ringRef.current.style.height = "52px";
        ringRef.current.style.borderColor = "rgba(139,92,246,0.7)";
      }
    };
    const handleOut = () => {
      if (dotRef.current) {
        dotRef.current.style.width = "8px";
        dotRef.current.style.height = "8px";
        dotRef.current.style.background = "#6366f1";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(99,102,241,0.6)";
      }
    };

    const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleOver);
      el.addEventListener("mouseleave", handleOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleOver);
        el.removeEventListener("mouseleave", handleOut);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      className="custom-cursor"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ willChange: "left, top" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ willChange: "left, top" }}
      />
    </div>
  );
}
