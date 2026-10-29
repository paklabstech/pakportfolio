import { createContext, useCallback, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const TransitionContext = createContext(null);

const SPARK = 7; // half the size of the starting square, in px
const GOLD = "#d4a45c";
const INK = "#101b2b";

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    async (to, origin) => {
      if (busy.current) return;
      if (window.location.pathname === to) return;

      const el = overlayRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !el) {
        navigate(to);
        window.scrollTo(0, 0);
        return;
      }

      busy.current = true;
      el.getAnimations().forEach((a) => a.cancel());

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const x = origin?.x ?? vw / 2;
      const y = origin?.y ?? vh / 2;
      const small = `inset(${y - SPARK}px ${vw - x - SPARK}px ${vh - y - SPARK}px ${x - SPARK}px)`;
      const full = "inset(0px 0px 0px 0px)";

      el.style.visibility = "visible";

      // 1. Square grows to cover the screen and darkens from gold to navy
      await el.animate(
        [
          { clipPath: small, backgroundColor: GOLD },
          { clipPath: full, backgroundColor: INK },
        ],
        { duration: 650, easing: "cubic-bezier(0.7, 0, 0.2, 1)", fill: "forwards" }
      ).finished;

      // 2. Swap the page while the screen is fully covered
      navigate(to);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      window.scrollTo(0, 0);

      // 3. Square shrinks back to the click point and fades out
      await el.animate(
        [
          { clipPath: full, backgroundColor: INK, opacity: 1 },
          { clipPath: small, backgroundColor: INK, opacity: 1, offset: 0.85 },
          { clipPath: small, backgroundColor: INK, opacity: 0 },
        ],
        { duration: 550, easing: "cubic-bezier(0.7, 0, 0.2, 1)", fill: "forwards" }
      ).finished;

      el.getAnimations().forEach((a) => a.cancel());
      el.style.visibility = "hidden";
      busy.current = false;
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div className="transition-overlay" ref={overlayRef} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}

export function TransitionLink({ to, children, onClick, ...rest }) {
  const go = useContext(TransitionContext);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    let origin = { x: e.clientX, y: e.clientY };
    if (e.detail === 0) {
      // Keyboard activation: grow from the middle of the link instead
      const r = e.currentTarget.getBoundingClientRect();
      origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    go(to, origin);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}