# Engineering & Architectural Decisions

## 1. Why this ingestion strategy over the obvious alternative you rejected?
* **Chosen Ingestion Strategy:** High-performance, declarative client-side asset orchestration with decoupled ES6 modular engines (`heroVideoBg.js`, `vaultOrbit.js`, `vocalCards.js`, `signInModal.js`) feeding off curated high-bitrate media descriptors and native HTML5 video/DOM rendering.
* **Rejected Alternative:** A monolithic framework setup (e.g., heavy Next.js/React bundle with client-side hydration, external state managers, and runtime API dependencies) or full YouTube Data API v3 polling on initial paint.
* **Rationale:** Video-heavy cinematic landing experiences require instant Largest Contentful Paint (LCP) and zero-layout-shift (CLS) without bundle initialization delays or third-party API rate-limit bottlenecks. Using zero-dependency vanilla JS engines with hardware-accelerated CSS `translate3d` transforms and lazy video decoding ensures guaranteed 60fps animations, instant playback, and seamless performance across all devices without build overhead.

---

## 2. One trade-off made under the time limit, and what to do with a real week
* **The Trade-off:** Client-side mock state management for authentication, search filtering, and video modal embedding (using direct iframe integration and localized simulated auth states) rather than a full OAuth2 backend session pipeline with YouTube Data API v3 queries.
* **With a Real Week:**
  1. **Full API & OAuth2 Integration:** Connect Google Identity Services OAuth 2.0 with a lightweight Node.js/Go backend to stream real user subscriptions, playlists, and watch history.
  2. **Custom WebGL / Three.js Shaders:** Upgrade the CSS 3D trigonometric orbit engine to a custom WebGL particle sphere with real-time video textures and depth-of-field post-processing.
  3. **Adaptive Streaming & Caching:** Implement HLS/DASH video streaming with Service Worker pre-caching for offline capabilities and instantaneous video transitions.

---

## 3. Where AI tools were used, and what was personally verified & changed afterward
* **AI Tool Utilization:** AI was leveraged for accelerated layout prototyping, initial trigonometric orbit formulas (`Math.cos`/`Math.sin` 3D projection math), and generating structural CSS tokens for the Bento layout.
* **Manual Verification & Refinements:**
  1. **Aesthetic & Visual Restraint:** Manually stripped all generic glowing canvas particles, bright saturated stock images, and distracting visual clutter to adhere strictly to the "Quiet Luxury / Filmic Dark Mode" design language.
  2. **Trigonometric Math & Viewport Tuning:** Re-engineered the 3D orbit calculations in `vaultOrbit.js` to dynamically scale `radiusX` (410px down to 130px) based on `window.innerWidth`, preventing orbit cards from overlapping or clipping on tablet and mobile viewports.
  3. **Accessibility & Keyboard Traps:** Verified and adjusted focus states, added <kbd>Escape</kbd> key handlers to modals, and implemented responsive fluid clamp typography (`clamp()`) across all breakpoints.
