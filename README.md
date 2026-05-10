# Jon Trailor — Portfolio

Personal portfolio for [jontrailor.dev](https://jontrailor.dev), built with React and Tailwind CSS and deployed to GitHub Pages.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env.local` file in the project root with your EmailJS credentials:

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

These values are available in your [EmailJS dashboard](https://dashboard.emailjs.com). The file is gitignored and must never be committed.

### Run locally

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) with hot reload.

### Format code

```bash
npm run format
```

Runs Prettier across all `src/**/*.{js,jsx}` files.

---

## Deploying to GitHub Pages

The site is hosted at a custom domain via GitHub Pages. The `public/CNAME` file must remain in place — `gh-pages` overwrites the deployment branch on every deploy, so the CNAME lives in `public/` rather than the repo root.

```bash
npm run deploy
```

This runs `npm run build` automatically via the `predeploy` hook, then pushes the `build/` output to the `gh-pages` branch.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Styling | Tailwind CSS v3 |
| Contact form | EmailJS (`@emailjs/browser`) |
| Carousel | Swiper v11 |
| Icons | React Icons v5 |
| Deployment | GitHub Pages (`gh-pages`) |
| Formatting | Prettier |

---

## Features

### Dark mode
Persisted theme toggle in the navigation bar. On first visit the theme defaults to the OS preference (`prefers-color-scheme`); subsequent visits restore the explicit user choice from `localStorage`. Implemented via React Context with Tailwind's `class`-based dark mode strategy.

### Active section highlighting
Navigation links highlight in real time as the user scrolls. A passive scroll listener checks which section's top edge is within the upper 40% of the viewport, keeping the correct link highlighted at any scroll speed. Uses a scroll-event approach rather than `IntersectionObserver` at mount so it works correctly with lazily loaded sections.

### 3D card tilt
Experience and Skills cards respond to mouse position with a `perspective(800px) rotateX/Y` transform. CSS transitions are disabled during cursor tracking for instant response and re-enabled on mouse leave for a smooth snap-back.

### Typewriter animation
The hero tagline cycles through four phrases using a custom `useTypewriter` hook — typing at 65 ms/character, pausing 2 s at completion, then deleting at 30 ms/character before advancing to the next phrase. No external dependencies.

### Scroll-triggered animations
Sections and cards fade up into view as they enter the viewport via a custom `useInView` hook backed by `IntersectionObserver`. The observer disconnects after the first intersection so animations are one-shot and do not re-trigger on scroll-back.

### Code splitting and lazy loading
All below-fold sections (`Experience`, `Projects`, `Skills`, `Contact`, `Footer`) are loaded with `React.lazy` + `Suspense`, splitting them into separate JS chunks that the browser only downloads when needed. Project images also use native `loading="lazy"`.

### Responsive design
Fully responsive from 375 px mobile through wide desktop. The navigation collapses to a hamburger menu on small screens. A double `requestAnimationFrame` scroll strategy ensures programmatic section navigation lands at the correct position after the mobile menu closes.

### Contact form
EmailJS-powered form with client-side validation, a disabled send button during in-flight requests to prevent double submission, and branded toast notifications for success and error feedback.
