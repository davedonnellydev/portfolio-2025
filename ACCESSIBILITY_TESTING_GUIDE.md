# Accessibility Testing Guide

Quick reference for testing accessibility features on the portfolio website.

---

## Quick Test: Skip Link (30 seconds)

1. Load any page in the browser
2. Press `Tab` once (don't click anything first)
3. **Expected:** Blue "Skip to main content" link appears at top-left
4. Press `Enter`
5. **Expected:** Page scrolls to main content, focus moves past header

**Status:** ✅ Implemented

---

## Quick Test: Keyboard Navigation (5 minutes)

### Header Navigation
1. Press `Tab` to navigate through header links
2. **Expected:** Blue outline visible on each link
3. Press `Enter` on any link
4. **Expected:** Page navigates or dropdown opens

### Dropdowns (Desktop)
1. Hover over "Home" or "About" nav links
2. **Expected:** Dropdown menu appears
3. Use arrow keys or Tab to navigate items
4. Press `Escape`
5. **Expected:** Dropdown closes

### Mobile Menu
1. Resize browser to mobile (< 768px)
2. Press `Tab` until burger menu is focused
3. Press `Enter` or `Space`
4. **Expected:** Full-screen menu opens
5. Press `Tab` through menu items
6. Press `Escape`
7. **Expected:** Menu closes

**Status:** ✅ Implemented

---

## Quick Test: Screen Reader (5 minutes)

### macOS VoiceOver
1. Press `⌘ + F5` to enable VoiceOver
2. Press `Tab` once
3. **Expected:** Hears "Skip to main content, link"
4. Navigate through page with `Control + Option + →`
5. **Expected:** Hears meaningful labels for all elements

### Test Points
- [ ] Logo announces "Dave Donnelly - Home, link"
- [ ] External links announce "opens in new window"
- [ ] Navigation has clear labels
- [ ] Main content is identifiable
- [ ] Certificate cards have descriptive names
- [ ] Footer identified as "contentinfo"

**Status:** ✅ Ready for testing

---

## Quick Test: Zoom (2 minutes)

1. Open browser to homepage
2. Press `Ctrl/⌘ + +` to zoom to 200%
3. **Expected:** All text readable, no horizontal scroll
4. Continue zooming to 400%
5. **Expected:** Content reflows, remains accessible

**Status:** ✅ Zoom enabled (was previously disabled)

---

## Quick Test: Color Contrast (5 minutes)

### Tools
- Chrome DevTools (Built-in)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Test Points
1. Open DevTools → Lighthouse
2. Run Accessibility audit
3. **Expected:** Score 95+ (aim for 100)
4. Check "Color Contrast" section
5. **Expected:** No contrast issues

**Light Mode:**
- Normal text: 7:1 minimum (AAA)
- Large text: 4.5:1 minimum (AAA)

**Dark Mode:**
- Normal text: 7:1 minimum (AAA)
- Large text: 4.5:1 minimum (AAA)

**Status:** 🔄 Needs manual verification

---

## Quick Test: Reduced Motion (2 minutes)

### macOS
1. System Settings → Accessibility → Display
2. Enable "Reduce motion"
3. Reload website
4. **Expected:** All animations stop, smooth scrolling disabled

### Windows
1. Settings → Ease of Access → Display
2. Enable "Show animations in Windows"
3. Reload website
4. **Expected:** All animations stop

**Status:** ✅ Implemented in code (needs testing)

---

## Full Automated Test with axe DevTools

### Installation
1. Install [axe DevTools Chrome Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

### Running Tests
1. Open any page
2. Open Chrome DevTools (F12)
3. Click "axe DevTools" tab
4. Click "Scan ALL of my page"
5. **Expected:** 0 Critical, 0 Serious issues

### Pages to Test
- [ ] Homepage (/)
- [ ] Projects (/projects)
- [ ] About (/about)
- [ ] Individual project pages (/projects/[slug])

**Status:** 🔄 Ready for testing

---

## Full Lighthouse Audit

### Running Tests
1. Open Chrome DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"

### Target Scores
- **Accessibility:** 95-100
- **Performance:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

**Status:** 🔄 Ready for testing

---

## Screen Reader Testing Checklist

### VoiceOver (macOS)
- [ ] Enable: `⌘ + F5`
- [ ] Navigate: `Control + Option + →`
- [ ] Read all: `Control + Option + A`
- [ ] Headings: `Control + Option + ⌘ + H`
- [ ] Links: `Control + Option + ⌘ + L`
- [ ] Landmarks: `Control + Option + U`

### NVDA (Windows)
- [ ] Enable: Download from [nvaccess.org](https://www.nvaccess.org/)
- [ ] Navigate: `↓`
- [ ] Read all: `Insert + ↓`
- [ ] Headings: `H`
- [ ] Links: `K`
- [ ] Landmarks: `D`

### Test Flow
1. **Homepage:**
   - [ ] Skip link works
   - [ ] Logo has clear label
   - [ ] Navigation is understandable
   - [ ] Hero content readable
   - [ ] Project cards have clear structure
   - [ ] Footer CTAs are clear

2. **Projects Page:**
   - [ ] Search input has label
   - [ ] Filter buttons clear
   - [ ] Project cards structured
   - [ ] No results message clear

3. **About Page:**
   - [ ] Headings follow hierarchy (H1 → H2)
   - [ ] Certificate cards have descriptive labels
   - [ ] External link notifications work

**Status:** 🔄 Ready for testing

---

## Common Issues to Watch For

### ❌ Bad
```html
<a href="/">DD</a>
<!-- Screen reader: "DD, link" (unclear) -->
```

### ✅ Good
```html
<a href="/" aria-label="Dave Donnelly - Home">DD</a>
<!-- Screen reader: "Dave Donnelly - Home, link" (clear) -->
```

---

### ❌ Bad
```html
<div onClick={handleClick}>Click me</div>
<!-- Not keyboard accessible -->
```

### ✅ Good
```html
<button onClick={handleClick}>Click me</button>
<!-- Keyboard accessible, semantic -->
```

---

### ❌ Bad
```html
<Paper component="a" href={url}>
  <Title>{name}</Title>
</Paper>
<!-- Screen reader: "link" (no context) -->
```

### ✅ Good
```html
<Paper component="a" href={url} aria-label={`View ${name} certificate`}>
  <Title>{name}</Title>
</Paper>
<!-- Screen reader: "View Certificate Name certificate, link" -->
```

---

## Reporting Issues

If you find any accessibility issues:

1. **Check audit report:** `ACCESSIBILITY_AUDIT.md`
2. **Check if it's already documented** (may be in P2 recommendations)
3. **Create issue with:**
   - Page/component affected
   - Expected behavior
   - Actual behavior
   - WCAG criterion violated
   - Priority level (P0/P1/P2)

---

## Resources

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Automated testing
- [WAVE](https://wave.webaim.org/extension/) - Visual accessibility evaluation
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Built into Chrome
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Screen Readers
- [VoiceOver Guide](https://www.apple.com/voiceover/info/guide/) (macOS)
- [NVDA Download](https://www.nvaccess.org/download/) (Windows)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Commercial)

### Documentation
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**Last Updated:** October 9, 2025
**Next Review:** After implementing P2 recommendations
**Questions?** See `ACCESSIBILITY_AUDIT.md` for comprehensive details
