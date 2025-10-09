# Mobile TOC Dropdown Fix - Positioning Issue

## Problem Description
The Table of Contents dropdown menu on project pages was experiencing positioning issues on mobile devices:
- ✅ Worked correctly at the top of the page
- ❌ When scrolled to middle of page:
  - Menu would flicker but not appear
  - Sometimes appeared off-screen to the right
  - Most of the element was not visible

## Root Cause Analysis

### The Issue
When the ProjectNavBar transitions from static to sticky (position: fixed), the button's coordinates in the viewport change dramatically. The Mantine Menu component uses Floating UI under the hood to calculate positioning relative to the button. However, when calculated while the parent is transitioning or in a fixed position, the positioning can fail, especially on mobile devices.

### Why It Worked at Top but Not Middle
- **At top**: Navbar is not sticky (static position), normal positioning calculations work
- **At middle**: Navbar is sticky (fixed position), positioning reference point changes, calculations fail

## Solutions Implemented

### 1. Changed Position Strategy on Mobile
```typescript
const menuPosition = isMobile ? 'bottom-start' : 'bottom-end';
```
- **Desktop**: `bottom-end` (aligns right edge, works better with desktop layout)
- **Mobile**: `bottom-start` (aligns left edge, keeps menu in viewport)

This ensures the menu starts from the left edge of the button on mobile, reducing chances of overflow.

### 2. Added Floating UI Middlewares
```typescript
middlewares={{
  flip: true,
  shift: { padding: 16 },
}}
```
- **flip**: Automatically flips the dropdown to the opposite side if it doesn't fit
- **shift**: Shifts the dropdown to stay within viewport with 16px padding

These middlewares are provided by Floating UI (the positioning engine Mantine uses) and handle edge cases automatically.

### 3. Auto-Close on Sticky State Change
```typescript
useEffect(() => {
  if (opened) {
    setOpened(false);
  }
}, [isSticky]);
```
When the navbar transitions between sticky and non-sticky states, any open menu is automatically closed. This prevents stale positioning data.

### 4. Force Remount with Key
```typescript
<Menu
  key={`toc-menu-${isSticky ? 'sticky' : 'normal'}`}
  // ... other props
>
```
The key changes when sticky state changes, forcing React to unmount and remount the entire Menu component. This ensures:
- Fresh positioning calculations
- No cached positioning data
- Clean slate for Floating UI calculations

### 5. Proper Portal Configuration
```typescript
withinPortal={true}
zIndex={1001}
keepMounted={false}
portalProps={{
  target: typeof document !== 'undefined' ? document.body : undefined,
}}
```
- **withinPortal**: Renders dropdown at document root, avoiding clipping
- **zIndex**: Ensures it appears above navbar and header
- **keepMounted={false}**: Dropdown is destroyed when closed, no stale state
- **portalProps**: Explicitly targets document.body for portal

## Technical Flow

### Before Fix
```
1. User scrolls → Navbar becomes sticky (position: fixed)
2. User taps TOC button
3. Menu tries to calculate position
4. ❌ Position calculation uses stale coordinates
5. ❌ Menu renders off-screen or flickers
```

### After Fix
```
1. User scrolls → Navbar becomes sticky
2. Menu component remounts (due to key change)
3. Any open menu is closed (due to useEffect)
4. User taps TOC button
5. ✅ Fresh positioning calculation with current coordinates
6. ✅ Floating UI middlewares adjust if needed
7. ✅ Menu appears in correct position
```

## Testing Checklist

- [x] Build succeeds with no errors
- [x] TypeScript types are correct
- [x] Menu appears correctly at top of page
- [x] Menu appears correctly in middle of page
- [x] Menu appears correctly at bottom of page
- [x] Menu stays within viewport on mobile
- [x] Menu doesn't flicker
- [x] Touch interaction works smoothly
- [x] Menu closes when navigating
- [x] Menu repositions correctly when sticky state changes

## Files Modified

1. **`TableOfContents.tsx`**
   - Added `isSticky` prop
   - Added useEffect to close menu on sticky change
   - Added dynamic key based on sticky state
   - Changed position strategy for mobile
   - Added Floating UI middlewares
   - Added separate media query for very small screens

2. **`ProjectNavBar.tsx`**
   - Pass `isSticky` state to TableOfContents component

3. **`TableOfContents.module.css`**
   - Removed conflicting manual positioning rules
   - Kept responsive sizing and touch optimizations

## Browser Support
- ✅ iOS Safari (primary concern)
- ✅ Android Chrome
- ✅ Mobile Firefox
- ✅ All desktop browsers (unchanged)

## Performance Impact
- Minimal: Menu remount only happens on sticky state transition
- No continuous recalculations during scroll
- Floating UI middleware calculations are highly optimized
- Portal rendering is standard practice for dropdowns

## Additional Benefits
This fix also improves:
- Desktop experience (better flip behavior)
- Landscape mobile orientation handling
- Small tablet device support
- Edge case handling (window resize, orientation change)

## Prevention
To prevent similar issues in the future:
1. Always consider fixed/sticky positioning when using portals
2. Use Floating UI middlewares for automatic adjustment
3. Force remount when positioning context changes
4. Test on actual mobile devices, not just browser DevTools
5. Check behavior at different scroll positions
