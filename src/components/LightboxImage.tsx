"use client";

import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface LightboxImageProps {
  src: string;
  alt: string;
  label?: string;
  sub?: string;
  imgStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export function LightboxImage({
  src, alt, label, sub, imgStyle, containerStyle, children,
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const modal = mounted && open
    ? ReactDOM.createPortal(
        <div
          className="lb-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${label || alt}`}
        >
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className="lb-close"
              onClick={handleClose}
              aria-label="Close expanded photo"
            >
              ✕
            </button>
            <img src={src} alt={alt} />
            {label && (
              <div className="lb-cap">
                <span className="lb-cap-label">{label}</span>
                {sub && <span className="lb-cap-sub">{sub}</span>}
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="lb-trigger"
        style={{
          display: "block",
          width: "100%",
          padding: 0,
          border: 0,
          background: "transparent",
          textAlign: "inherit",
          cursor: "zoom-in",
          ...containerStyle,
        }}
        onClick={() => setOpen(true)}
      >
        {children ?? (
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={src} alt={alt} style={imgStyle} />
            {label && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "12px 16px",
                background: "linear-gradient(to top, rgba(6,8,8,0.85) 0%, rgba(6,8,8,0) 100%)",
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                pointerEvents: "none",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--cream)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</span>
                {sub && <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--muted-cream)", letterSpacing: "0.15em" }}>{sub}</span>}
              </div>
            )}
          </div>
        )}
      </button>
      {modal}
    </>
  );
}
