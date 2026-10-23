import { useEffect, useRef } from "react";

const SWEEP_SPEED = 60; // pixels per second on touch devices

export default function CursorLayer() {
  const layerRef = useRef(null);
  const vRef = useRef(null);
  const hRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = layerRef.current;
    const vLine = vRef.current;
    const hLine = hRef.current;

    let mode = window.matchMedia("(hover: none)").matches ? "sweep" : "follow";
    let x = 0;
    let y = 0;
    let raf = 0;
    let last = 0;

    const draw = () => {
      vLine.style.transform = `translateX(${x}px)`;
      hLine.style.transform = `translateY(${y}px)`;
    };

    const show = () => layer.classList.add("on");

    const tick = (t) => {
      if (mode !== "sweep") {
        raf = 0;
        return;
      }
      const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
      last = t;
      x = (x + SWEEP_SPEED * dt) % window.innerWidth;
      y = (y + SWEEP_SPEED * dt) % window.innerHeight;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const startSweep = () => {
      mode = "sweep";
      last = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const spawnSpark = (px, py) => {
      const el = document.createElement("span");
      el.className = "spark";
      el.style.left = `${px}px`;
      el.style.top = `${py}px`;
      el.addEventListener("animationend", () => el.remove());
      layer.appendChild(el);
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      mode = "follow";
      x = e.clientX;
      y = e.clientY;
      draw();
      show();
    };

    const onDown = (e) => {
      x = e.clientX;
      y = e.clientY;
      draw();
      show();
      if (e.pointerType !== "mouse") startSweep();
      spawnSpark(e.clientX, e.clientY);
    };

    if (mode === "sweep") {
      draw();
      show();
      startSweep();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-layer" ref={layerRef} aria-hidden="true">
      <span className="cl-line cl-v" ref={vRef} />
      <span className="cl-line cl-h" ref={hRef} />
    </div>
  );
}