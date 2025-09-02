# Framix Carousel Template

A modern portfolio/agency template featuring a stunning vertical parallax carousel with 3D effects. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Vertical Parallax Carousel**: Smooth scroll-driven animations with 3D perspective effects
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Modern Stack**: React 19, TypeScript, Tailwind CSS, and Framer Motion
- **Performance Optimized**: GPU-accelerated animations and efficient rendering
- **Customizable**: Easy to modify colors, content, and animations

## 🚀 Quick Start

### Prerequisites

- Node.js 22.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/An9Yang/framix-carousel-template.git
cd framix-carousel-template
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Customization

### Colors

Edit the color scheme in `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 97%;
  --foreground: 0 0% 20%;
  /* ... other colors */
}
```

### Content

Modify the carousel items in `src/components/carousel/parallax-carousel.tsx`:

```typescript
export function getDefaultCarouselItems(): CarouselItem[] {
  return [
    {
      id: 'project-1',
      title: 'Your Title',
      subtitle: 'Your Subtitle',
      description: 'Your description',
      // ...
    }
  ];
}
```

### Animation Settings

Adjust carousel behavior in `src/utils/carousel-calculations.ts`

## 🛠 Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Rsbuild** - Build Tool
- **Hono** - Backend Framework

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Claude Code