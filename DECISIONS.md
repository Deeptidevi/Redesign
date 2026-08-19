# Architectural & Design Decisions

### 1. Why this ingestion strategy over the obvious alternative you rejected?
Instead of building a heavy React/Next.js SPA with external state libraries or hitting the live YouTube Data API on initial page load, I chose a lightweight, vanilla HTML5/ES6 modular architecture. 

**Why I rejected the heavier approach:**
Fetching large playlists and videos dynamically via the YouTube API on first paint introduces API rate limits, network latency, and layout shifts (CLS) on slower connections. For an experiential, video-first landing page, first impressions are critical. By serving curated media directly through native HTML5 video tags, hardware-accelerated CSS `transform: translate3d()` transitions, and modular JS engines, the page achieves instant paint times, zero hydration lag, and silky 60fps animations on mobile and desktop alike.

---

### 2. One trade-off made under the time limit, and what I’d do with a real week
* **The Trade-off:** I focused heavily on frontend visual fidelity, layout hierarchy, and micro-interactions. Because of the limited time, authentication and search filtering are simulated on the client side, and videos play through embedded modal players rather than a custom backend session with real Google OAuth2 tokens.
* **What I'd build with a full week:**
  1. **Live YouTube Data API & OAuth Integration:** Implement Google OAuth2 login so users can pull their actual YouTube subscriptions, watch history, and liked playlists into the custom cinema feed.
  2. **Custom WebGL / Three.js Canvas:** Upgrade the CSS 3D trigonometric card orbit into an interactive WebGL sphere with dynamic camera physics and real-time video textures.
  3. **Adaptive Streaming & Audio Visualizers:** Integrate HLS video streaming and native Web Audio API spectrum analyzers for the soundscape section.

---

### 3. Where I used AI tools, and what I personally verified or changed afterward
* **Where AI helped:** I used AI as an ideation partner for scaffolding the initial HTML structure, calculating the base trigonometric formulas (`Math.cos` and `Math.sin`) for the 3D card orbit, and drafting the CSS grid token system.
* **What I personally reviewed and refined:**
  - **Visual Aesthetics & Polish:** Removed generic animations, aggressive glow effects, and loud canvas particles to maintain a refined, "quiet luxury" dark aesthetic. Replaced generic stock imagery with hand-curated, moody photography.
  - **Dynamic Math & Mobile Tuning:** Refactored `vaultOrbit.js` so that orbital radii (`radiusX` and `radiusY`) calculate dynamically based on `window.innerWidth`, preventing 3D cards from clipping or stacking awkwardly on smaller screens.
  - **Responsiveness & UX Details:** Hand-tuned CSS breakpoints, converted rigid headline dimensions into fluid `clamp()` values, verified modal accessibility, and added keyboard navigation (<kbd>ESC</kbd> dismiss).
