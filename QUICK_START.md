# Quick Start Guide for 3D Portfolio

## Running the Project

### Development Mode

```bash
npm start
```

This will start the development server at `http://localhost:4200`

### Production Build

```bash
npm run build
```

Output will be in `dist/portfolio-3d/`

## Customizing Your Portfolio

### 1. Update Your CV Content

Open `src/app/services/cv-viewer.service.ts` and find the `createPaperTexture()` method:

```typescript
private createPaperTexture(): HTMLCanvasElement {
  // ... existing code ...

  // Modify this section to add your content:
  const cvContent = [
    'YOUR NAME',
    'Your Job Title',
    '',
    'Skills:',
    'Your Skill 1 | Your Skill 2',
    // Add more content here
  ];

  // ... rest of code ...
}
```

### 2. Update Portfolio Information

Open `src/app/components/portfolio-info/portfolio-info.component.ts` and update the `sections` object:

```typescript
sections = {
  about: {
    title: 'About Me',
    content: 'Your bio here...'
  },
  skills: {
    title: 'Skills',
    items: [
      { category: 'Frontend', skills: ['Skill1', 'Skill2', ...] },
      // Add more skill categories
    ]
  },
  projects: {
    title: 'Featured Projects',
    items: [
      {
        name: 'Project Name',
        description: 'Project description',
        tags: ['tag1', 'tag2']
      },
      // Add more projects
    ]
  },
  contact: {
    title: 'Get In Touch',
    links: [
      { label: 'Email', value: 'your@email.com', icon: '📧' },
      // Add contact links
    ]
  }
};
```

### 3. Change Colors

#### Global Colors

Edit `src/app/app.css` and `src/styles.css`

#### 3D Scene Colors

In `src/app/services/cv-viewer.service.ts`:

- Background color: `new THREE.Color(0x1a1a2e)` (change `0x1a1a2e`)
- Light colors: Change `0xffffff` values
- Point light color: Change `0x64b5f6` values

#### UI Colors

In component CSS files, look for color values like:

- `#64b5f6` - Primary blue
- `#f5f1e8` - Paper background
- `#1a1a2e` - Dark background

## Features You Can Customize

1. **3D Model**: Currently uses a plane with wave effects. You can:
   - Change `PlaneGeometry(2, 2.8, 32, 32)` parameters
   - Add more geometry displacement
   - Change material properties (roughness, metalness)

2. **Lighting**: Edit lighting setup in `initializeScene()`:
   - Adjust light intensity values
   - Add more lights
   - Change shadow settings

3. **Animations**:
   - CV rotation speed: Modify `rotatePaper()` multiplier
   - Floating effect: Change `Math.sin(Date.now() * 0.001)` factor
   - Add custom animations in `animate()` method

4. **Responsive Layout**:
   - Adjust breakpoints in `.css` files
   - Modify width/height ratios in media queries
   - Change section proportions (cv-section vs info-section)

## Browser DevTools Tips

1. **Inspect 3D Rendering**: Open Chrome DevTools
2. **WebGL Inspector**: Use Three.js Inspector extension
3. **Performance**: Use Performance tab to profile rendering
4. **Console**: Check for Three.js warnings or errors

## File Locations for Common Edits

| What to Change    | File Location                                                    |
| ----------------- | ---------------------------------------------------------------- |
| CV Text/Content   | `src/app/services/cv-viewer.service.ts`                          |
| Portfolio Info    | `src/app/components/portfolio-info/portfolio-info.component.ts`  |
| Colors            | `src/app/app.css`, `src/styles.css`, component `.css` files      |
| Layout/Responsive | `src/app/app.css`                                                |
| Paper Texture     | `src/app/services/cv-viewer.service.ts` > `createPaperTexture()` |
| 3D Scene Setup    | `src/app/services/cv-viewer.service.ts` > `initializeScene()`    |

## Deployment

### Deploy to GitHub Pages

```bash
npm run build
# Then upload dist/portfolio-3d/ to your hosting
```

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

Drag and drop the `dist/portfolio-3d/` folder to Netlify

## Troubleshooting

**Black Screen**:

- Check browser console for errors
- Enable WebGL in browser settings
- Try a different browser

**3D Model Not Visible**:

- Check canvas size is > 0
- Verify camera position `this.camera.position.z = 3`
- Check material color isn't black

**Rotation Not Working**:

- Verify mouse events are firing
- Check `isDragging` state is updating
- Inspect `rotatePaper()` method

## Next Steps

1. Replace placeholder text with your information
2. Update colors to match your brand
3. Add your actual projects and skills
4. Test on mobile devices
5. Deploy to your hosting provider
6. Share your awesome portfolio!

---

Happy customizing! 🎨✨
