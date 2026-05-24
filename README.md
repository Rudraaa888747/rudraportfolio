# Cinematic AI Portfolio

A premium, Awwwards-level interactive portfolio built with Next.js 16. Features immersive 3D storytelling, smooth scrolling, massive typography, and high-end animations using GSAP and Framer Motion. 

## Features

- **Next.js 16 App Router**: Modern and fast framework for server-side and client-side rendering.
- **GSAP & Framer Motion**: Advanced, buttery-smooth cinematic scroll animations and transitions.
- **Three.js & React Three Fiber**: Immersive 3D environments and interactive WebGL experiences.
- **Lenis**: Silky smooth scrolling for a premium navigation feel.
- **Tailwind CSS v4**: Utility-first styling with a dark-luxury aesthetic.
- **Resend Integration**: Fully functional contact forms.

## Getting Started

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   Copy `.env.example` to `.env.local` and fill in the missing placeholder values (e.g., your Resend API key).
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure
- `src/app` - Next.js App Router pages and layouts.
- `src/components` - Reusable React components (3D elements, UI, layouts).
- `src/utils` - Helper functions and configuration.
