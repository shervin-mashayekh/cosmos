# Cosmos - Brand Strategy Builder

A standalone React application for building and documenting your brand's strategic cosmos.

## Features

- 🌌 **3D Lava Planet Visualization** - Interactive Three.js scene with auto-rotating planet
- 📝 **Strategic Framework** - 37 comprehensive questions across three dimensions:
  - **Homeland** - 15 questions about values, conflict, and vision
  - **Hierarchy** - 9 questions about power structures and relationships
  - **Habitat** - 13 questions about community, magic, and rituals
- 🎨 **Modern UI** - Dark theme with glass morphism effects and smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 💾 **Dynamic Input** - Add multiple responses per question with easy management

## Prerequisites

- Node.js 18+ or Bun
- Modern web browser with WebGL support

## Installation

1. Navigate to the project directory:
```bash
cd cosmos-standalone-react
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

## Development

Start the development server:
```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

## Production Build

Create an optimized production build:
```bash
npm run build
# or
bun run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

Preview the production build locally:
```bash
npm run preview
# or
bun preview
```

## Project Structure

```
cosmos-standalone-react/
├── public/
│   └── models/              # 3D model files and textures
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # UI component library
│   │   ├── GridBackground.tsx
│   │   ├── Scene3D.tsx
│   │   ├── LavaSphere.tsx
│   │   └── Navigation.tsx
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── pages/
│   │   └── Cosmos.tsx      # Main page component
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Global styles and design system
├── index.html
├── package.json
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite bundler configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Netlify
1. Drag and drop the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository for automatic deployments

### Static Hosting
1. Build the project: `npm run build`
2. Upload the `dist/` directory to any static hosting service

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires WebGL support for 3D rendering

## License

This is a standalone project package. Use it as you wish for your brand strategy work.
