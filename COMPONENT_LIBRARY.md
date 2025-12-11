# 🎨 Lexchange Component Library

Quick reference guide for all futuristic components.

---

## 🤖 FloatingAIButton

**Location:** `src/components/FloatingAIButton.tsx`

### Usage
```tsx
import FloatingAIButton from '@/components/FloatingAIButton';

// In your component
<FloatingAIButton />
```

### Features
- Pulsing ring animations
- Particle effects
- Expandable menu
- Links to AI Trader, Trading Bots, Market Intel

### Customization
Currently uses fixed styling. Future: add props for colors, position, menu items.

---

## 📊 LivePriceTicker

**Location:** `src/components/LivePriceTicker.tsx`

### Usage
```tsx
import LivePriceTicker from '@/components/LivePriceTicker';

<LivePriceTicker />
```

### Features
- Infinite scroll animation
- Real-time price updates (simulated)
- 6 major cryptocurrencies
- Trend indicators

### Future Enhancements
- Connect to real API (CoinGecko/Binance)
- Add more coins
- Customizable update interval
- Click to view details

---

## ✨ HolographicCard

**Location:** `src/components/HolographicCard.tsx`

### Usage
```tsx
import HolographicCard from '@/components/HolographicCard';

<HolographicCard intensity={0.8}>
  <div>Your content here</div>
</HolographicCard>
```

### Props
- `children`: React.ReactNode (required)
- `intensity`: number (optional, default: 1)
  - Controls tilt strength
  - Range: 0-2 (0 = no tilt, 2 = extreme)

### Features
- 3D tilt effect
- Dynamic glow
- Rainbow shimmer
- Mouse tracking

---

## 🌐 CyberGridBackground

**Location:** `src/components/CyberGridBackground.tsx`

### Usage
```tsx
import CyberGridBackground from '@/components/CyberGridBackground';

<div style={{ position: 'relative' }}>
  <CyberGridBackground />
  <div style={{ position: 'relative', zIndex: 1 }}>
    Your content here
  </div>
</div>
```

### Features
- Animated grid pattern
- Scanning line effect
- Pulsing nodes
- Canvas-based (high performance)

### Customization
Edit component to change:
- Grid size (default: 50px)
- Colors (default: purple)
- Scan speed
- Pulse intensity

---

## 🎭 GlitchText

**Location:** `src/components/GlitchText.tsx`

### Usage
```tsx
import GlitchText from '@/components/GlitchText';

<GlitchText 
  text="Lexchange" 
  className="my-class"
  style={{ fontSize: '3rem' }}
/>
```

### Props
- `text`: string (required)
- `className`: string (optional)
- `style`: React.CSSProperties (optional)

### Features
- Random glitch effect
- RGB split (magenta/cyan)
- Skew animations
- Auto-triggering

### Customization
- Glitch frequency: Edit `glitchInterval` (default: 3000ms)
- Glitch duration: Edit timeout (default: 200ms)
- Colors: Edit `::before` and `::after` colors

---

## 🎨 Global CSS Utilities

**Location:** `src/app/globals.css`

### Animations

```css
/* Neon glow effect */
.neon-border {
  border: 2px solid rgba(167, 139, 250, 0.5);
  animation: neon-glow 2s ease-in-out infinite;
}

/* Cyber grid background */
.cyber-grid {
  background-image: 
    linear-gradient(rgba(167, 139, 250, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 139, 250, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Holographic effect */
.holographic {
  background: linear-gradient(
    45deg,
    rgba(255, 0, 255, 0.2),
    rgba(0, 255, 255, 0.2),
    rgba(255, 255, 0, 0.2),
    rgba(255, 0, 255, 0.2)
  );
  background-size: 300% 300%;
  animation: gradient-shift 3s ease infinite;
}

/* Text glow effects */
.text-glow-purple {
  text-shadow: 
    0 0 10px rgba(167, 139, 250, 0.8),
    0 0 20px rgba(167, 139, 250, 0.6),
    0 0 30px rgba(167, 139, 250, 0.4);
}

.text-glow-cyan {
  text-shadow: 
    0 0 10px rgba(34, 211, 238, 0.8),
    0 0 20px rgba(34, 211, 238, 0.6),
    0 0 30px rgba(34, 211, 238, 0.4);
}
```

### Available Keyframes

1. `neon-glow` - Pulsing glow
2. `matrix-rain` - Falling effect
3. `cyber-scan` - Scanning line
4. `holographic-shimmer` - Moving gradient
5. `pulse-glow` - Breathing light
6. `slide-in-up` - Enter from bottom
7. `slide-in-down` - Enter from top
8. `rotate-3d` - 3D rotation
9. `particle-float` - Particle movement
10. `gradient-shift` - Background animation

---

## 📋 Integration Examples

### Example 1: Enhanced Landing Page
```tsx
import FloatingAIButton from '@/components/FloatingAIButton';
import LivePriceTicker from '@/components/LivePriceTicker';
import HolographicCard from '@/components/HolographicCard';

export default function Home() {
  return (
    <main>
      <Hero />
      <LivePriceTicker />
      
      <section>
        {features.map((feature, idx) => (
          <HolographicCard key={idx} intensity={0.8}>
            <FeatureCard {...feature} />
          </HolographicCard>
        ))}
      </section>
      
      <FloatingAIButton />
    </main>
  );
}
```

### Example 2: AI Trader Page
```tsx
import CyberGridBackground from '@/components/CyberGridBackground';
import GlitchText from '@/components/GlitchText';

export default function AITrader() {
  return (
    <div>
      <CyberGridBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <GlitchText text="AI Trader" style={{ fontSize: '3rem' }} />
        <AITraderChat />
      </div>
    </div>
  );
}
```

### Example 3: Custom Card
```tsx
<HolographicCard intensity={1.2}>
  <div className="glass-card neon-border">
    <h3 className="text-glow-purple">Premium Feature</h3>
    <p>Your content here</p>
  </div>
</HolographicCard>
```

---

## 🎯 Best Practices

### Performance
1. Use `HolographicCard` sparingly (max 6-8 per page)
2. `CyberGridBackground` should be used once per page
3. Limit `GlitchText` to headings only
4. `LivePriceTicker` is optimized for continuous use

### Accessibility
1. Ensure content inside effects is readable
2. Provide alternative navigation to `FloatingAIButton`
3. Test with reduced motion preferences
4. Maintain sufficient color contrast

### Styling
1. Combine effects for maximum impact
2. Use consistent color palette (purple/cyan/green)
3. Layer effects with proper z-index
4. Test on different screen sizes

---

## 🔧 Troubleshooting

### Issue: Components not rendering
**Solution:** Check imports and file paths

### Issue: Animations stuttering
**Solution:** Reduce number of simultaneous effects

### Issue: SSR errors
**Solution:** Ensure `'use client'` directive is present

### Issue: Z-index conflicts
**Solution:** Review stacking context hierarchy

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [React Best Practices](https://react.dev/learn)

---

**Built with Antigravity AI** 🤖
