"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FIELD_ORDER, SIGNATURES } from "@/lib/field";
import { createFieldEngine, type FieldEngine } from "./fluid/engine";

/* ------------------------------------------------------------------ context */

type FieldContext = {
  /** Lock the plume to a role's signature. Pass null to release. */
  focus: (roleId: string | null) => void;
  focused: string | null;
};

const Ctx = createContext<FieldContext>({ focus: () => {}, focused: null });

export const useCareerField = () => useContext(Ctx);

/**
 * Attach to any element that represents a role. Hover, focus and touch all
 * pull the field's colour to that role's signature.
 */
export function useFieldFocus(roleId: string) {
  const { focus } = useCareerField();
  return useMemo(
    () => ({
      onMouseEnter: () => focus(roleId),
      onMouseLeave: () => focus(null),
      onFocusCapture: () => focus(roleId),
      onBlurCapture: () => focus(null),
    }),
    [focus, roleId],
  );
}

/* ---------------------------------------------------------------- component */

const PALETTE = FIELD_ORDER.map((id) => SIGNATURES[id].rgb);

export default function CareerField({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<FieldEngine | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  const focus = useCallback((roleId: string | null) => {
    setFocused(roleId);
    const index = roleId ? FIELD_ORDER.indexOf(roleId as never) : -1;
    engineRef.current?.setSignature(index >= 0 ? index : null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const engine = createFieldEngine(canvas, {
      palette: PALETTE,
      ground: [0.024, 0.024, 0.031],
    });
    if (!engine) return; // CSS fallback beneath stays visible
    engineRef.current = engine;

    // Render scale, not device pixel ratio. Every pixel this canvas draws is
    // low-frequency colour, so rendering at 1x and letting the compositor
    // upscale is visually indistinguishable and costs a quarter of the fill of
    // a 2x display. The watchdog below drops this further on weak hardware.
    let scale = 1;

    const applySize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      engine.setSize(w, h, scale);
      engine.setIntensity(w < 768 ? 0.85 : 1);
    };

    applySize();
    // Warm the buffer so the reveal shows a developed plume, never an empty
    // frame filling in.
    engine.prime(5);
    setLive(true);

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __field?: FieldEngine }).__field = engine;
    }

    if (reduced) {
      const onResizeStatic = () => {
        applySize();
        engine.prime(9);
      };
      window.addEventListener("resize", onResizeStatic);
      return () => {
        window.removeEventListener("resize", onResizeStatic);
        engine.dispose();
        engineRef.current = null;
      };
    }

    let raf = 0;
    let running = true;

    // Watchdog: if the machine cannot hold a smooth frame, step the render
    // scale down rather than letting the page feel heavy. Two steps only, then
    // stop measuring — a permanently-degraded loop is worse than a fixed one.
    let samples = 0;
    let accum = 0;
    let last = 0;
    let steps = 0;

    const watch = (now: number) => {
      if (last) {
        accum += now - last;
        samples++;
        if (samples >= 90) {
          const avg = accum / samples;
          if (avg > 22 && steps < 2) {
            steps++;
            scale = steps === 1 ? 0.75 : 0.55;
            engine.setSize(window.innerWidth, window.innerHeight, scale);
          }
          samples = 0;
          accum = 0;
          if (steps >= 2) last = -1;
        }
      }
      last = now;
    };

    const loop = (now: number) => {
      if (!running) return;
      engine.frame(now);
      if (last !== -1) watch(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      const shouldRun = document.visibilityState === "visible";
      if (shouldRun === running) return;
      running = shouldRun;
      if (running) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      engine.setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };

    window.addEventListener("resize", applySize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", applySize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <Ctx.Provider value={{ focus, focused }}>
      {/*
        Decorative. Every fact the field encodes is also present as real text on
        the page, so a screen reader loses nothing by skipping it.
      */}
      <div className="field" aria-hidden="true">
        <div className="field__fallback" />
        <canvas
          ref={canvasRef}
          className="field__canvas"
          data-live={live ? "true" : "false"}
        />
        <div className="field__scrim" />
      </div>
      {children}
    </Ctx.Provider>
  );
}
