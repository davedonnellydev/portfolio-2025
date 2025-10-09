# ⚡ Quick Start Guide

**Portfolio 2025** - Next.js Portfolio Website

---

## 🏁 Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/portfolio-2025.git
cd portfolio-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:3000

---

## 📝 Common Commands

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run analyze          # Analyze bundle size
```

### Code Quality
```bash
npm test                 # Run ALL quality checks (recommended!)
npm run typecheck        # TypeScript only
npm run lint             # ESLint + Stylelint
npm run prettier:check   # Check formatting
npm run prettier:write   # Auto-format code
```

### Testing
```bash
npm run jest             # Run tests
npm run jest:watch       # Watch mode
npm run storybook        # Start Storybook (http://localhost:6006)
```

### Performance
```bash
npm run lighthouse:local # Full Lighthouse audit
```

---

## 📁 Key Files

```
portfolio-2025/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   └── projects/          # Projects section
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Header/Footer
│   ├── projects/         # Project components
│   └── shared/           # Shared components
├── data/                  # Content data
│   ├── projects.ts       # Project data
│   ├── about.ts          # About content
│   └── microBio.ts       # Bio content
├── lib/                   # Utilities
│   ├── analytics.ts      # Analytics tracking
│   ├── seo.ts            # SEO utilities
│   └── hooks/            # Custom hooks
└── public/               # Static assets
```

---

## 🎨 Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Make Changes
- Edit components in `components/`
- Update content in `data/`
- Modify styles with CSS Modules

### 3. Check Quality
```bash
npm test  # Before every commit!
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: your change description"
git push
```

GitHub Actions will automatically:
- ✅ Run linters
- ✅ Run tests
- ✅ Build project
- ✅ Run Lighthouse audit

---

## 🐛 Common Issues

### "Module not found"
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### "Type errors"
```bash
npm run typecheck  # See specific errors
```

### "Tests failing"
```bash
npm run jest       # See which tests
```

### "Styles not updating"
```bash
rm -rf .next       # Clear Next.js cache
npm run dev
```

---

## 📊 Project Status

- ✅ Tests: 162 passing
- ✅ TypeScript: Strict mode, 0 errors
- ✅ Performance: 95+ desktop, 88-91 mobile
- ✅ Accessibility: WCAG 2.1 AA compliant
- ✅ CI/CD: GitHub Actions configured

---

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance guide
- [THEME.md](./THEME.md) - UI/UX guidelines
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment guide
- Component READMEs in respective folders

---

## 🚀 Ready to Deploy?

See [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) for full checklist.

**Quick version:**
1. Convert `public/og-image.svg` to PNG
2. Set environment variables in Vercel
3. Push to GitHub
4. Deploy on Vercel

---

## 💡 Pro Tips

1. **Always run `npm test` before committing**
2. **Use Storybook for component development**
3. **Check Lighthouse scores with production build**
4. **Keep dependencies updated monthly**
5. **Follow existing patterns in codebase**

---

## 🆘 Need Help?

- Check [README.md](./README.md) for detailed docs
- Review component READMEs for examples
- Check [Storybook](http://localhost:6006) for component demos
- See [PERFORMANCE.md](./PERFORMANCE.md) for optimization tips

---

**Happy coding!** 🎉
