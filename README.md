# Personal Portfolio

A minimal, professional portfolio website built with React and Vite. Features a clean, typography-first design that prioritizes clarity and professionalism.

## 🚀 Live Demo

[View Live Site](https://portfolio7566.vercel.app/)

## ✨ Features

- **Typography-First Design** - Inter font family, clean hierarchy
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Fully Responsive** - Mobile-first approach
- **Optimized Performance** - Vite build, minimal bundle size
- **Clean Code Structure** - Organized component folders
- **Zero Dependencies** - Pure CSS, no UI frameworks

## 🛠️ Tech Stack

- React 19
- Vite 7
- Lucide React (icons)
- CSS3 (custom design system)

## 📁 Project Structure

```
src/
├── components/
│   ├── hero/         (Hero.jsx, Hero.css)
│   ├── about/        (About.jsx, About.css)
│   ├── skills/       (Skills.jsx, Skills.css)
│   ├── projects/     (Projects.jsx, Projects.css)
│   ├── education/    (Education.jsx, Education.css)
│   ├── awards/       (Awards.jsx, Awards.css)
│   ├── contact/      (Contact.jsx, Contact.css)
│   ├── footer/       (Footer.jsx, Footer.css)
│   └── common/       (ThemeToggle.jsx)
├── App.jsx
├── main.jsx
└── index.css
```

## 🏃 Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ralblast/Personal-portfolio.git

# Navigate to project
cd Personal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Build: `npm run build`
2. Publish directory: `dist`

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --bg-base: #ffffff;
  --text-primary: #0a0a0a;
  --accent: #525252;
  /* ... */
}
```

### Content

Update component files in `src/components/` folders.

## 📝 Design Philosophy

- **Minimal** - No unnecessary decoration
- **Professional** - Clean, credible aesthetic  
- **Dense** - Optimized for quick scanning
- **Accessible** - Semantic HTML, high contrast

## 📧 Contact

- **Email**: abhisheksingh708226@gmail.com
- **GitHub**: [@Ralblast](https://github.com/Ralblast)
- **LinkedIn**: [Abhishek Singh](https://www.linkedin.com/in/abhishek-singh-9b3541245)

## 📄 License

MIT License - feel free to use for your own portfolio

---

Built with React + Vite