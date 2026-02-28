import { useState, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ink: #0E0E0E;
    --paper: #F7F4EE;
    --red: #D63C2F;
    --muted: rgba(14,14,14,0.4);
    --border: rgba(14,14,14,0.1);
    --white: #FFFFFF;
    --gold: #C9A84C;
    --green: #3D6E5A;
  }

  html, body { height: 100%; }

  .app {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── SHARED NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 64px;
    background: rgba(247,244,238,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .logo span { color: var(--red); font-style: italic; }
  .nav-right { display: flex; align-items: center; gap: 32px; }
  .nav-link { font-size: 13px; color: var(--muted); letter-spacing: 0.5px; cursor: pointer; }
  .nav-link:hover { color: var(--ink); }
  .nav-btn {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 9px 22px; background: var(--ink); color: var(--paper);
    border: none; cursor: pointer; border-radius: 2px;
  }

  /* ══════════════════════════════
     SCREEN 1 — LANDING
  ══════════════════════════════ */
  .landing {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120px 64px 80px;
    position: relative;
    overflow: hidden;
  }

  .landing-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214,60,47,0.07) 0%, transparent 70%);
  }

  .landing-eyebrow {
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--red); margin-bottom: 40px;
    display: flex; align-items: center; gap: 14px;
  }
  .landing-eyebrow::before, .landing-eyebrow::after {
    content: ''; width: 28px; height: 1px; background: var(--red);
  }

  .landing-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(56px, 8vw, 100px);
    font-weight: 300;
    line-height: 0.95;
    text-align: center;
    margin-bottom: 36px;
    letter-spacing: -2px;
  }
  .landing-h1 em {
    font-style: italic; color: var(--red);
  }

  .landing-sub {
    font-size: 16px; color: var(--muted); line-height: 1.7;
    text-align: center; max-width: 480px; margin-bottom: 64px;
    font-weight: 300;
  }

  .url-form {
    width: 100%; max-width: 580px;
    display: flex; flex-direction: column; gap: 12px;
  }

  .url-row {
    display: flex; gap: 0;
    border: 1.5px solid var(--border);
    border-radius: 4px;
    background: white;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .url-row:focus-within { border-color: var(--red); }

  .url-icon {
    padding: 0 18px; display: flex; align-items: center;
    color: var(--muted); font-size: 16px; flex-shrink: 0;
    border-right: 1px solid var(--border);
  }

  .url-input {
    flex: 1; padding: 18px 20px;
    font-family: 'Space Grotesk', sans-serif; font-size: 14px;
    border: none; outline: none; background: transparent; color: var(--ink);
  }
  .url-input::placeholder { color: var(--muted); }

  .go-btn {
    padding: 0 28px;
    background: var(--red); color: white; border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.2s;
    display: flex; align-items: center; gap: 8px;
    flex-shrink: 0;
  }
  .go-btn:hover { background: #b8332a; }

  .or-upload {
    text-align: center; font-size: 12px; color: var(--muted);
    letter-spacing: 1px; text-transform: uppercase;
    display: flex; align-items: center; gap: 16px;
  }
  .or-upload::before, .or-upload::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  .drop-zone {
    border: 1.5px dashed rgba(14,14,14,0.2);
    border-radius: 4px;
    padding: 28px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: rgba(255,255,255,0.5);
  }
  .drop-zone:hover { border-color: var(--red); background: rgba(214,60,47,0.03); }
  .drop-zone.dragging { border-color: var(--red); background: rgba(214,60,47,0.05); border-style: solid; }

  .drop-zone-text { font-size: 13px; color: var(--muted); }
  .drop-zone-text strong { color: var(--ink); font-weight: 500; }

  .supported-sites {
    display: flex; justify-content: center; align-items: center; gap: 20px;
    margin-top: 40px; color: var(--muted); font-size: 12px;
    letter-spacing: 0.5px;
  }
  .site-badge {
    padding: 5px 14px; border: 1px solid var(--border);
    border-radius: 20px; font-size: 11px; color: var(--muted);
  }

  .scroll-hint {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--muted); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  }
  .scroll-arrow {
    width: 1px; height: 40px; background: var(--border); position: relative; overflow: hidden;
  }
  .scroll-arrow::after {
    content: ''; position: absolute; top: -100%;
    width: 1px; height: 100%; background: var(--red);
    animation: scrollLine 1.8s ease-in-out infinite;
  }
  @keyframes scrollLine { 0% { top: -100%; } 100% { top: 100%; } }


  /* ══════════════════════════════
     SCREEN 2 — ANALYZING
  ══════════════════════════════ */
  .analyzing {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 120px 64px 80px;
    position: relative;
  }

  .analyze-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px; font-weight: 300;
    text-align: center; margin-bottom: 12px;
  }
  .analyze-title em { font-style: italic; color: var(--red); }

  .analyze-sub { font-size: 14px; color: var(--muted); margin-bottom: 64px; }

  .steps-list {
    width: 100%; max-width: 480px;
    display: flex; flex-direction: column; gap: 0;
  }

  .step {
    display: flex; align-items: flex-start; gap: 20px;
    padding: 24px 0;
    border-bottom: 1px solid var(--border);
  }

  .step-num {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; flex-shrink: 0;
    transition: all 0.5s;
  }
  .step-num.done { background: var(--green); color: white; }
  .step-num.active { background: var(--red); color: white; animation: stepPulse 1s ease-in-out infinite; }
  .step-num.waiting { background: var(--border); color: var(--muted); }
  @keyframes stepPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(214,60,47,0.3); } 50% { box-shadow: 0 0 0 8px rgba(214,60,47,0); } }

  .step-info { flex: 1; }
  .step-label { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
  .step-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

  .step-bar {
    margin-top: 8px;
    height: 2px; background: var(--border); border-radius: 1px; overflow: hidden;
  }
  .step-fill {
    height: 100%; border-radius: 1px;
    background: var(--red);
    animation: fillStep 2s ease-out forwards;
  }
  @keyframes fillStep { from { width: 0%; } to { width: 100%; } }

  .analyze-url-preview {
    margin-top: 40px;
    padding: 16px 24px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex; align-items: center; gap: 14px;
    width: 100%; max-width: 480px;
  }
  .yt-icon { font-size: 20px; flex-shrink: 0; }
  .yt-url { font-size: 13px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }


  /* ══════════════════════════════
     SCREEN 3 — CONFIRM LOCATION
  ══════════════════════════════ */
  .confirm {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr;
    padding-top: 86px;
  }

  .confirm-left {
    padding: 80px 64px;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 1px solid var(--border);
  }

  .confirm-tag {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--green); margin-bottom: 20px;
    display: flex; align-items: center; gap: 10px;
  }
  .confirm-tag::before { content: ''; width: 24px; height: 1px; background: var(--green); }

  .confirm-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px; font-weight: 300; line-height: 1.05;
    margin-bottom: 8px;
  }
  .confirm-h2 em { font-style: italic; color: var(--red); }

  .confirm-country { font-size: 16px; color: var(--muted); margin-bottom: 40px; }

  .confidence-block { margin-bottom: 40px; }
  .conf-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); margin-bottom: 10px; }
  .conf-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .conf-fill { height: 100%; background: linear-gradient(90deg, var(--red), var(--gold)); width: 93%; animation: fillBar 1.2s ease-out; border-radius: 2px; }
  @keyframes fillBar { from { width: 0%; } }

  .detected-from {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; background: rgba(61,110,90,0.06);
    border-radius: 6px; border: 1px solid rgba(61,110,90,0.2);
    margin-bottom: 40px; font-size: 13px; color: var(--green);
  }
  .detected-from strong { font-weight: 600; }

  .confirm-actions { display: flex; gap: 12px; }

  .btn-confirm {
    flex: 1; padding: 16px;
    background: var(--ink); color: var(--paper);
    border: none; font-family: 'Space Grotesk', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 1px;
    text-transform: uppercase; cursor: pointer; border-radius: 3px;
    transition: background 0.2s;
  }
  .btn-confirm:hover { background: #222; }

  .btn-change {
    padding: 16px 24px;
    background: transparent; color: var(--ink);
    border: 1.5px solid var(--border);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px; cursor: pointer; border-radius: 3px;
    transition: border-color 0.2s;
  }
  .btn-change:hover { border-color: var(--ink); }

  .confirm-right {
    background: var(--ink);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    padding: 80px 64px;
    justify-content: flex-end;
  }

  .confirm-right-bg {
    position: absolute; inset: 0; pointer-events: none;
    background: 
      radial-gradient(ellipse at 70% 20%, rgba(214,60,47,0.25) 0%, transparent 55%),
      radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.15) 0%, transparent 50%);
  }

  .frame-strips {
    position: absolute; top: 0; left: 0; right: 0; bottom: 40%;
    display: flex; gap: 4px; overflow: hidden;
  }

  .frame-strip {
    flex: 1; border-radius: 0 0 4px 4px; overflow: hidden;
    position: relative; opacity: 0.8;
  }

  .strip-color-1 { background: linear-gradient(180deg, #2a2018 0%, #4a3a28 100%); }
  .strip-color-2 { background: linear-gradient(180deg, #1a2820 0%, #2d4a38 100%); }
  .strip-color-3 { background: linear-gradient(180deg, #28201a 0%, #3d2a18 100%); }
  .strip-color-4 { background: linear-gradient(180deg, #201828 0%, #382040 100%); }
  .strip-color-5 { background: linear-gradient(180deg, #182020 0%, #283830 100%); }

  .frame-label {
    position: absolute; bottom: 8px; left: 8px;
    font-size: 8px; color: rgba(255,255,255,0.4);
    letter-spacing: 1px; text-transform: uppercase;
  }

  .confirm-place-card {
    position: relative; z-index: 2;
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 28px;
  }

  .place-card-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }

  .place-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; color: white; font-style: italic;
  }

  .place-card-badge {
    padding: 4px 12px; background: rgba(61,110,90,0.3);
    border: 1px solid rgba(61,110,90,0.5);
    border-radius: 20px; font-size: 11px; color: #7abf9a;
    letter-spacing: 0.5px;
  }

  .place-card-tags {
    display: flex; gap: 8px; flex-wrap: wrap;
  }

  .place-tag {
    padding: 6px 14px; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px; font-size: 12px; color: rgba(255,255,255,0.5);
  }


  /* ══════════════════════════════
     SCREEN 4 — RESULTS
  ══════════════════════════════ */
  .results { padding-top: 86px; min-height: 100vh; }

  .results-hero {
    background: var(--ink); padding: 64px;
    display: grid; grid-template-columns: 1fr auto;
    gap: 40px; align-items: end;
  }

  .results-place-tag {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .results-place-tag::before { content: ''; width: 24px; height: 1px; background: var(--gold); }

  .results-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 64px; color: white; font-weight: 300; line-height: 1;
    margin-bottom: 8px; letter-spacing: -1px;
  }
  .results-subtitle { font-size: 15px; color: rgba(255,255,255,0.4); margin-bottom: 28px; }

  .results-meta {
    display: flex; gap: 32px;
  }
  .meta-item { }
  .meta-val { font-size: 22px; color: white; font-weight: 600; }
  .meta-label { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }

  .results-actions { display: flex; flex-direction: column; gap: 10px; }

  .btn-save {
    padding: 14px 28px;
    background: var(--red); color: white;
    border: none; font-family: 'Space Grotesk', sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; cursor: pointer; border-radius: 3px;
    white-space: nowrap;
  }

  .btn-share {
    padding: 14px 28px;
    background: transparent; color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.15);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px; letter-spacing: 1.5px;
    text-transform: uppercase; cursor: pointer; border-radius: 3px;
    white-space: nowrap;
  }

  /* INFO BAR */
  .info-bar {
    display: flex; align-items: center;
    padding: 20px 64px;
    border-bottom: 1px solid var(--border);
    gap: 40px; overflow-x: auto;
  }

  .info-chip {
    display: flex; align-items: center; gap: 10px;
    flex-shrink: 0;
  }
  .info-chip-icon { font-size: 16px; }
  .info-chip-text { font-size: 13px; color: var(--muted); }
  .info-chip-val { font-size: 13px; font-weight: 500; color: var(--ink); }
  .info-divider { width: 1px; height: 20px; background: var(--border); flex-shrink: 0; }

  /* DAY TABS */
  .day-tabs {
    display: flex; gap: 0;
    padding: 0 64px;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
  }

  .day-tab {
    padding: 18px 28px;
    border: none; background: transparent;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px; color: var(--muted);
    cursor: pointer; border-bottom: 2px solid transparent;
    margin-bottom: -1px; transition: all 0.2s;
    white-space: nowrap;
  }
  .day-tab.active { color: var(--ink); border-bottom-color: var(--red); font-weight: 500; }
  .day-tab:hover:not(.active) { color: var(--ink); }

  /* ITINERARY TIMELINE */
  .itinerary-body {
    display: grid; grid-template-columns: 320px 1fr;
    min-height: calc(100vh - 380px);
  }

  .timeline-col {
    padding: 48px 40px 48px 64px;
    border-right: 1px solid var(--border);
  }

  .timeline-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; margin-bottom: 32px;
  }
  .timeline-title em { font-style: italic; color: var(--red); }

  .timeline {
    display: flex; flex-direction: column;
    position: relative;
  }

  .timeline::before {
    content: ''; position: absolute;
    left: 14px; top: 8px; bottom: 8px; width: 1px;
    background: var(--border);
  }

  .timeline-item {
    display: flex; gap: 20px;
    margin-bottom: 28px; cursor: pointer;
    position: relative;
  }

  .tl-dot {
    width: 30px; height: 30px; border-radius: 50%;
    flex-shrink: 0; display: flex; align-items: center;
    justify-content: center; font-size: 12px;
    border: 2px solid var(--border); background: var(--paper);
    transition: all 0.2s; position: relative; z-index: 1;
  }

  .timeline-item.active .tl-dot {
    border-color: var(--red); background: var(--red; color: white;
  }

  .tl-content { flex: 1; padding-top: 4px; }
  .tl-time { font-size: 11px; color: var(--muted); letter-spacing: 1px; margin-bottom: 4px; }
  .tl-name { font-size: 14px; font-weight: 500; }
  .tl-type { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* DETAIL PANEL */
  .detail-col { padding: 48px 64px 48px 48px; }

  .detail-header { margin-bottom: 32px; }
  .detail-time-tag {
    font-size: 11px; color: var(--red); letter-spacing: 2px;
    text-transform: uppercase; margin-bottom: 10px;
  }
  .detail-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300; line-height: 1.1; margin-bottom: 8px;
  }
  .detail-type { font-size: 14px; color: var(--muted); }

  .detail-section { margin-bottom: 32px; }
  .detail-section-title {
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 12px;
  }
  .detail-section-text {
    font-size: 15px; line-height: 1.75; color: rgba(14,14,14,0.75);
    font-weight: 300;
  }

  .detail-chips { display: flex; gap: 10px; flex-wrap: wrap; }
  .detail-chip {
    padding: 8px 18px; border: 1px solid var(--border);
    border-radius: 20px; font-size: 13px; color: var(--ink);
  }
  .detail-chip.highlight {
    background: rgba(214,60,47,0.08); border-color: rgba(214,60,47,0.25);
    color: var(--red);
  }

  .detail-tips {
    background: rgba(14,14,14,0.03);
    border-radius: 8px; padding: 20px 24px;
    border: 1px solid var(--border);
  }
  .tip-item {
    display: flex; gap: 10px; font-size: 13px;
    color: rgba(14,14,14,0.65); margin-bottom: 10px; line-height: 1.5;
  }
  .tip-item:last-child { margin-bottom: 0; }
  .tip-bullet { color: var(--red); flex-shrink: 0; margin-top: 1px; }

  /* ══════════════════════════════
     SCREEN 5 — PACKING / EXTRAS
  ══════════════════════════════ */
  .extras-section {
    padding: 64px;
    border-top: 1px solid var(--border);
    background: var(--white);
  }

  .extras-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; margin-bottom: 40px;
  }
  .extras-heading em { font-style: italic; color: var(--red); }

  .extras-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  }

  .extra-card {
    border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .extra-card:hover { box-shadow: 0 8px 32px rgba(14,14,14,0.08); }

  .extra-card-head {
    padding: 24px; background: var(--ink); color: white;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .extra-card-title { font-size: 15px; font-weight: 500; }
  .extra-card-icon { font-size: 20px; }
  .extra-card-body { padding: 20px 24px; }
  .extra-item {
    display: flex; justify-content: space-between;
    padding: 8px 0; border-bottom: 1px solid var(--border);
    font-size: 13px;
  }
  .extra-item:last-child { border-bottom: none; }
  .extra-item-label { color: var(--muted); }
  .extra-item-val { font-weight: 500; }

  /* FOOTER */
  .footer {
    padding: 40px 64px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    background: var(--paper);
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif; font-size: 18px;
  }
  .footer-logo span { color: var(--red); font-style: italic; }
  .footer-copy { font-size: 12px; color: var(--muted); }

  /* ── SCREEN SWITCHER ── */
  .screen-nav {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 6px; z-index: 100;
    background: rgba(14,14,14,0.9); backdrop-filter: blur(12px);
    padding: 8px 12px; border-radius: 40px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .snav-btn {
    padding: 7px 18px; border-radius: 20px; font-size: 11px;
    letter-spacing: 0.5px; cursor: pointer; border: none;
    font-family: 'Space Grotesk', sans-serif;
    transition: all 0.2s;
    background: transparent; color: rgba(255,255,255,0.4);
  }
  .snav-btn.active { background: var(--red); color: white; }
  .snav-btn:hover:not(.active) { color: white; }
`;

const SCREENS = ["Landing", "Analyzing", "Confirm", "Results"];

const TIMELINE_ITEMS = [
  { time: "9:00 AM", name: "Fushimi Inari Shrine", type: "Cultural Site", emoji: "⛩️" },
  { time: "12:00 PM", name: "Nishiki Market", type: "Food & Drink", emoji: "🏮" },
  { time: "2:30 PM", name: "Gion District Walk", type: "Sightseeing", emoji: "🪷" },
  { time: "5:00 PM", name: "Kinkaku-ji Temple", type: "Cultural Site", emoji: "🏯" },
  { time: "7:30 PM", name: "Pontocho Alley Dinner", type: "Restaurant", emoji: "🍜" },
];

export default function Reeal() {
  const [screen, setScreen] = useState(0);
  const [url, setUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTl, setActiveTl] = useState(0);
  const fileRef = useRef();

  const handleSubmit = () => {
    if (!url.trim()) return;
    setScreen(1);
    setAnalysisStep(0);
    setTimeout(() => setAnalysisStep(1), 1200);
    setTimeout(() => setAnalysisStep(2), 2600);
    setTimeout(() => setAnalysisStep(3), 3800);
    setTimeout(() => setScreen(2), 4800);
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="logo">RE<span>EAL</span></div>
          <div className="nav-right">
            <span className="nav-link">How it works</span>
            <span className="nav-link">Examples</span>
            <span className="nav-link">Pricing</span>
            <button className="nav-btn">Sign up free</button>
          </div>
        </nav>

        {/* ── SCREEN 1: LANDING ── */}
        {screen === 0 && (
          <div className="landing">
            <div className="landing-bg" />

            <div className="landing-eyebrow">Reel meets Real</div>

            <h1 className="landing-h1">
              Watch it.<br />
              <em>Live it.</em>
            </h1>

            <p className="landing-sub">
              Paste any travel video URL — Instagram, YouTube, TikTok. Our AI reads the footage, detects the location, and builds your complete trip plan in seconds.
            </p>

            <div className="url-form">
              <div className="url-row">
                <div className="url-icon">▶</div>
                <input
                  className="url-input"
                  placeholder="Paste a YouTube, Instagram, or TikTok URL..."
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
                <button className="go-btn" onClick={handleSubmit}>
                  Plan it →
                </button>
              </div>

              <div className="or-upload">or upload a file</div>

              <div
                className={`drop-zone ${dragging ? "dragging" : ""}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); setUrl("uploaded-video.mp4"); handleSubmit(); }}
                onClick={() => fileRef.current.click()}
              >
                <input ref={fileRef} type="file" accept="video/*" style={{ display: "none" }}
                  onChange={() => { setUrl("uploaded-video.mp4"); handleSubmit(); }} />
                <div className="drop-zone-text">
                  <strong>Drop your video here</strong> or click to browse · MP4, MOV, AVI
                </div>
              </div>
            </div>

            <div className="supported-sites">
              <span style={{ fontSize: 11, letterSpacing: 1 }}>Works with</span>
              <span className="site-badge">YouTube</span>
              <span className="site-badge">Instagram</span>
              <span className="site-badge">TikTok</span>
              <span className="site-badge">Twitter / X</span>
              <span className="site-badge">Any MP4</span>
            </div>

            <div className="scroll-hint">
              <span>Scroll</span>
              <div className="scroll-arrow" />
            </div>
          </div>
        )}

        {/* ── SCREEN 2: ANALYZING ── */}
        {screen === 1 && (
          <div className="analyzing">
            <div className="analyze-title">
              <em>Analyzing</em> your reel...
            </div>
            <div className="analyze-sub">This usually takes under 10 seconds</div>

            <div className="analyze-url-preview">
              <span className="yt-icon">▶</span>
              <span className="yt-url">{url || "your-video.mp4"}</span>
            </div>

            <div className="steps-list" style={{ marginTop: 32 }}>
              {[
                { label: "Extracting video frames", desc: "Pulling key moments from your footage" },
                { label: "Identifying landmarks", desc: "Matching scenery, signs & architecture to known locations" },
                { label: "Confirming location", desc: "Cross-referencing with geographic database" },
                { label: "Building your itinerary", desc: "Crafting a full trip plan based on the detected destination" },
              ].map((s, i) => {
                const isDone = analysisStep > i;
                const isActive = analysisStep === i;
                return (
                  <div className="step" key={i}>
                    <div className={`step-num ${isDone ? "done" : isActive ? "active" : "waiting"}`}>
                      {isDone ? "✓" : i + 1}
                    </div>
                    <div className="step-info">
                      <div className="step-label">{s.label}</div>
                      <div className="step-desc">{s.desc}</div>
                      {isActive && <div className="step-bar"><div className="step-fill" /></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SCREEN 3: CONFIRM LOCATION ── */}
        {screen === 2 && (
          <div className="confirm">
            <div className="confirm-left">
              <div className="confirm-tag">Location detected</div>
              <h2 className="confirm-h2">Is this <em>Kyoto?</em></h2>
              <div className="confirm-country">Kyoto Prefecture · Japan</div>

              <div className="confidence-block">
                <div className="conf-row">
                  <span>AI Confidence</span>
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>93%</span>
                </div>
                <div className="conf-bar">
                  <div className="conf-fill" />
                </div>
              </div>

              <div className="detected-from">
                <span>📍</span>
                <div>Identified from <strong>Fushimi Inari Shrine</strong> gate patterns and Kamo River scenery in frames 3, 7 & 11</div>
              </div>

              <div className="confirm-actions">
                <button className="btn-confirm" onClick={() => setScreen(3)}>
                  Yes, build my trip →
                </button>
                <button className="btn-change">Change location</button>
              </div>
            </div>

            <div className="confirm-right">
              <div className="confirm-right-bg" />
              <div className="frame-strips">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`frame-strip strip-color-${i}`}>
                    <div className="frame-label">Frame {i * 2 + 1}</div>
                  </div>
                ))}
              </div>

              <div className="confirm-place-card">
                <div className="place-card-row">
                  <div className="place-card-name">Kyoto, Japan</div>
                  <div className="place-card-badge">✓ Confirmed</div>
                </div>
                <div className="place-card-tags">
                  {["Ancient capital", "Zen temples", "Geisha culture", "Spring cherry blossoms", "UNESCO sites"].map(t => (
                    <span key={t} className="place-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SCREEN 4: RESULTS ── */}
        {screen === 3 && (
          <div className="results">
            {/* HERO */}
            <div className="results-hero">
              <div>
                <div className="results-place-tag">Your trip plan · Ready</div>
                <div className="results-title">Kyoto</div>
                <div className="results-subtitle">Kyoto Prefecture, Japan · 5-Day Itinerary</div>
                <div className="results-meta">
                  <div className="meta-item">
                    <div className="meta-val">5</div>
                    <div className="meta-label">Days</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-val">18</div>
                    <div className="meta-label">Activities</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-val">~$1,400</div>
                    <div className="meta-label">Est. Budget</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-val">Apr–May</div>
                    <div className="meta-label">Best Time</div>
                  </div>
                </div>
              </div>
              <div className="results-actions">
                <button className="btn-save">↓ Save itinerary</button>
                <button className="btn-share">↗ Share</button>
              </div>
            </div>

            {/* INFO BAR */}
            <div className="info-bar">
              <div className="info-chip">
                <span className="info-chip-icon">✈️</span>
                <div>
                  <div className="info-chip-text">Nearest airport</div>
                  <div className="info-chip-val">Kansai International (KIX)</div>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-chip">
                <span className="info-chip-icon">🌡️</span>
                <div>
                  <div className="info-chip-text">Avg. temp in Apr</div>
                  <div className="info-chip-val">14°C – 22°C</div>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-chip">
                <span className="info-chip-icon">💴</span>
                <div>
                  <div className="info-chip-text">Currency</div>
                  <div className="info-chip-val">Japanese Yen (¥)</div>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-chip">
                <span className="info-chip-icon">🛂</span>
                <div>
                  <div className="info-chip-text">Visa for US citizens</div>
                  <div className="info-chip-val">Visa-free · 90 days</div>
                </div>
              </div>
              <div className="info-divider" />
              <div className="info-chip">
                <span className="info-chip-icon">🌐</span>
                <div>
                  <div className="info-chip-text">Language</div>
                  <div className="info-chip-val">Japanese · English widely spoken</div>
                </div>
              </div>
            </div>

            {/* DAY TABS */}
            <div className="day-tabs">
              {["Day 1 — Arrival & Shrines", "Day 2 — Markets & Gion", "Day 3 — Day Trip: Nara", "Day 4 — Arashiyama", "Day 5 — Departure"].map((d, i) => (
                <button key={i} className={`day-tab ${activeDay === i ? "active" : ""}`} onClick={() => setActiveDay(i)}>{d}</button>
              ))}
            </div>

            {/* ITINERARY BODY */}
            <div className="itinerary-body">
              <div className="timeline-col">
                <div className="timeline-title">Day {activeDay + 1} — <em>Schedule</em></div>
                <div className="timeline">
                  {TIMELINE_ITEMS.map((item, i) => (
                    <div key={i} className={`timeline-item ${activeTl === i ? "active" : ""}`} onClick={() => setActiveTl(i)}>
                      <div className="tl-dot" style={activeTl === i ? { background: "var(--red)", border: "2px solid var(--red)" } : {}}>
                        {activeTl === i ? "●" : item.emoji}
                      </div>
                      <div className="tl-content">
                        <div className="tl-time">{item.time}</div>
                        <div className="tl-name" style={activeTl === i ? { color: "var(--red)" } : {}}>{item.name}</div>
                        <div className="tl-type">{item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-col">
                <div className="detail-header">
                  <div className="detail-time-tag">{TIMELINE_ITEMS[activeTl].time} · {TIMELINE_ITEMS[activeTl].type}</div>
                  <div className="detail-name">{TIMELINE_ITEMS[activeTl].name}</div>
                  <div className="detail-type">Kyoto, Japan</div>
                </div>

                <div className="detail-section">
                  <div className="detail-section-title">About</div>
                  <div className="detail-section-text">
                    {activeTl === 0 && "One of the most iconic sites in all of Japan. Over 10,000 vermillion torii gates wind their way up Mount Inari. Arrive before 7am to experience near-silence — just birdsong and your footsteps on ancient stone."}
                    {activeTl === 1 && "Kyoto's famous 'kitchen' stretches 400 meters through the center of the city. Over 100 stalls sell everything from fresh tofu and pickled plums to matcha-covered everything. Come hungry."}
                    {activeTl === 2 && "The best-preserved geisha district in Japan. Wander the stone-paved lanes of Hanamikoji at dusk to spot geiko and maiko heading to their evening engagements. Respectful observation only."}
                    {activeTl === 3 && "The Golden Pavilion. The top two floors are covered in gold leaf, and the reflection on the surrounding pond is genuinely breathtaking. Arrive early — this is Kyoto's busiest attraction."}
                    {activeTl === 4 && "A narrow, lantern-lit alley running alongside the Kamo River. Some of Kyoto's finest kaiseki restaurants line both sides. Book at least two weeks in advance for the best spots."}
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-section-title">Details</div>
                  <div className="detail-chips">
                    <span className="detail-chip">⏱ {["2–3 hours", "1–2 hours", "1 hour", "45 mins", "1.5 hours"][activeTl]}</span>
                    <span className="detail-chip">💴 {["Free", "~¥1,500", "Free", "¥500", "¥8,000+"][activeTl]}</span>
                    <span className="detail-chip">📍 {["Fushimi Ward", "Nakagyō-ku", "Higashiyama", "Kinkakuji-cho", "Nakagyō-ku"][activeTl]}</span>
                    <span className="detail-chip highlight">{["Must-see", "Local favorite", "Evening only", "Book ahead", "Reservation required"][activeTl]}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-section-title">Insider Tips</div>
                  <div className="detail-tips">
                    {[
                      ["Go before 7am to avoid crowds", "Bring cash — no card machines at most stalls", "The upper trails are far less crowded than the lower"],
                      ["The best stalls are mid-market, not at the entrance", "Try the grilled squid at the far end", "Weekday mornings are quietest"],
                      ["7–9pm is the best window to spot geiko", "Photography of geiko without permission is disrespectful", "Ichiriki Chaya is the most famous ochaya"],
                      ["The garden is best in winter with light snow", "Skip the gift shops inside", "Combine with Ryoan-ji (10 min walk away)"],
                      ["Kikunoi and Nakamura are the best bets", "Ask your hotel to call — cold calls rarely get tables", "Counter seating gives the best view of the chef"],
                    ][activeTl].map((tip, j) => (
                      <div className="tip-item" key={j}>
                        <span className="tip-bullet">→</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* EXTRAS */}
            <div className="extras-section">
              <div className="extras-heading">Everything else you <em>need to know</em></div>
              <div className="extras-grid">
                <div className="extra-card">
                  <div className="extra-card-head">
                    <div className="extra-card-title">Budget Breakdown</div>
                    <div className="extra-card-icon">💴</div>
                  </div>
                  <div className="extra-card-body">
                    {[["Accommodation (5 nights)", "$600"], ["Food & drink", "$250"], ["Transport", "$180"], ["Entrance fees", "$80"], ["Shopping buffer", "$300"]].map(([l,v]) => (
                      <div className="extra-item" key={l}>
                        <span className="extra-item-label">{l}</span>
                        <span className="extra-item-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="extra-card">
                  <div className="extra-card-head">
                    <div className="extra-card-title">Getting Around</div>
                    <div className="extra-card-icon">🚌</div>
                  </div>
                  <div className="extra-card-body">
                    {[["IC Card (Suica/ICOCA)", "Best for all transit"], ["Bus 1-Day Pass", "¥700 — worth it"], ["Bicycle rental", "~¥1,000/day"], ["Taxi", "Expensive, avoid"], ["JR Kyoto–Osaka", "¥570 by rapid train"]].map(([l,v]) => (
                      <div className="extra-item" key={l}>
                        <span className="extra-item-label">{l}</span>
                        <span className="extra-item-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="extra-card">
                  <div className="extra-card-head">
                    <div className="extra-card-title">What to Pack</div>
                    <div className="extra-card-icon">🎒</div>
                  </div>
                  <div className="extra-card-body">
                    {[["Comfortable walking shoes", "Essential"], ["Portable WiFi or SIM", "Pick up at airport"], ["Cash (¥)", "Many places are cash-only"], ["Layer clothing", "Temps vary widely"], ["Umbrella or raincoat", "Spring showers common"]].map(([l,v]) => (
                      <div className="extra-item" key={l}>
                        <span className="extra-item-label">{l}</span>
                        <span className="extra-item-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
              <div className="footer-logo">RE<span>EAL</span></div>
              <div className="footer-copy">© 2025 REEAL · Reel meets Real</div>
            </div>
          </div>
        )}

        {/* SCREEN SWITCHER */}
        <div className="screen-nav">
          {SCREENS.map((s, i) => (
            <button key={i} className={`snav-btn ${screen === i ? "active" : ""}`} onClick={() => setScreen(i)}>
              {i + 1}. {s}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
