# AI Engineer Portfolio

A modern, minimal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and static content. Features dark/light mode, responsive design, and smooth animations.

## ✨ Features

- **Modern Design**: Clean, minimal aesthetic with Apple-like white space
- **Responsive**: Fully responsive design for desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Animations**: Smooth motion effects with Framer Motion
- **Static Content**: Fast loading with pre-built content
- **SEO Optimized**: Meta tags, sitemap, and robots.txt

## 🎯 Sections

- **Hero**: Animated introduction with call-to-action buttons
- **Projects**: Grid layout with trending AI project cards
- **Blogs**: Latest insights on AI and autonomous systems
- **Research**: Academic papers and publications
- **About**: Personal bio and skills
- **Contact**: Contact form and social links

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes
- **UI Components**: ShadCN UI

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-engineer-portfolio.git
   cd ai-engineer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Local Development

The portfolio runs locally with static content featuring:

### Projects
- Advanced AI Agent System
- Autonomous System Intelligence (ASI)
- AI-Powered Research Assistant

### Blogs
- The Rise of Autonomous System Intelligence (ASI)
- Advanced AI Agents: Beyond Traditional Chatbots
- The Future of AI Research: Trends and Predictions

### Research
- Advanced Fine-tuning Techniques for Large Language Models
- Autonomous System Intelligence: A New Paradigm
- Multi-Agent Systems for Complex Problem Solving

## 🎨 Customization

### Update Personal Information
Edit the following files to customize your portfolio:

- `src/components/sections/hero.tsx` - Your name, title, and tagline
- `src/components/sections/about.tsx` - Your bio and skills
- `src/components/sections/contact.tsx` - Contact information

### Update Projects
Edit `src/components/sections/projects.tsx` to add your own projects.

### Update Blogs
Edit `src/components/sections/blogs.tsx` to add your own blog posts.

### Update Research
Edit `src/components/sections/research.tsx` to add your own research papers.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

### Environment Variables (Optional)

For full customization, add these environment variables in Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME="Your Name - AI Engineer Portfolio"
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourusername
NEXT_PUBLIC_EMAIL=your.email@example.com
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/           # ShadCN UI components
│   ├── sections/     # Page sections
│   ├── header.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   └── utils.ts      # Utility functions
└── types/            # TypeScript types
```

## 🎯 Performance

- **Static Generation**: Pre-built pages for fast loading
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **SEO**: Meta tags and structured data

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add navigation link in `src/components/header.tsx`

## 📝 License

MIT License - feel free to use this template for your own portfolio.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have questions or need help:

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS docs](https://tailwindcss.com/docs)
- Open an issue on GitHub

---

Built with ❤️ for AI Engineers and Researchers

**Latest Update**: Removed Contentful dependencies for static-only deployment
