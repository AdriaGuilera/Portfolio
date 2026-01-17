# Adrià Guilera Bernabé - Portfolio

A modern, minimalist portfolio website built with Next.js, TypeScript, and Framer Motion.

## 🎨 Design Style

This portfolio follows a **Pure Minimalism** aesthetic with:
- Abundant whitespace
- Monochrome color palette
- Ultra-thin borders (1px)
- Light shadows and subtle animations
- Clean typography with light font weights

## 🚀 Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React** - UI library

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

## 🏃 Running the Project

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Sticky navigation with active states
│   ├── Hero.tsx          # Animated hero section
│   ├── About.tsx         # About section with skills
│   ├── Work.tsx          # Projects showcase
│   ├── Gallery.tsx       # 3D figures gallery
│   ├── Contact.tsx       # Contact form and info
│   └── Footer.tsx        # Footer component
├── public/               # Static assets
│   ├── media/           # 3D figure images
│   └── CV.pdf           # Resume/CV
└── ...config files
```

## ✨ Features

### Animations
- Smooth scroll animations
- Parallax effects on hero section
- Staggered entrance animations
- Hover interactions on all interactive elements
- Modal transitions for gallery
- Form submission feedback

### Sections
1. **Hero** - Animated introduction with parallax background
2. **About** - Bio, skills, and interests
3. **Work** - Project showcase with hover effects
4. **Gallery** - Interactive 3D figures with modal view
5. **Contact** - Contact form and social links
6. **Footer** - Social links and copyright

### Responsive Design
- Mobile-first approach
- Breakpoints: `md` (768px), `lg` (1024px)
- Mobile menu for navigation
- Optimized layouts for all screen sizes

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#000000',
  secondary: '#404040',
  accent: '#666666',
  background: '#ffffff',
  surface: '#fafafa',
  text: '#000000',
  textSecondary: '#737373',
  border: '#e5e5e5',
}
```

### Content
- Update personal information in component files
- Replace project data in `Work.tsx`
- Update contact information in `Contact.tsx`
- Add/remove gallery items in `Gallery.tsx`

### Media
- Add images to `public/media/`
- Update image paths in components
- Replace CV in `public/` directory

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

© 2026 Adrià Guilera Bernabé. All rights reserved.
