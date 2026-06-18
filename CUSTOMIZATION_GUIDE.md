# Exact Customization Points

## 1. Your Name & Title (3 Files to Update)

### File 1: Footer

**Location**: `src/app/app.html`, line ~21

```html
<p>&copy; 2024 Your Name. All rights reserved.</p>
<!-- Change "Your Name" to your name -->
```

### File 2: CV Text

**Location**: `src/app/services/cv-viewer.service.ts`, lines ~106-125

```typescript
const cvContent = [
  'Full Stack Developer', // ← Change this
  'UI/UX Designer', // ← Change this
  '',
  'Skills:',
  'Angular | React | Node.js', // ← Update your skills
  'Three.js | WebGL', // ← Update your skills
  // Add more content here
];
```

### File 3: About Section

**Location**: `src/app/components/portfolio-info/portfolio-info.component.ts`, lines ~16-20

```typescript
about: {
  title: 'About Me',
  content: `I'm a passionate full-stack developer...`  // ← Replace with your bio
},
```

## 2. Update Skills Section

**Location**: `src/app/components/portfolio-info/portfolio-info.component.ts`, lines ~21-26

```typescript
skills: {
  title: 'Skills',
  items: [
    { category: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'Three.js', 'WebGL'] },
    // ↑ Update these
    { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
    // ↑ Update these
    { category: 'Tools', skills: ['Docker', 'AWS', 'Git', 'WebPack', 'Vite'] }
    // ↑ Update these
  ]
}
```

## 3. Update Projects

**Location**: `src/app/components/portfolio-info/portfolio-info.component.ts`, lines ~28-45

```typescript
projects: {
  title: 'Featured Projects',
  items: [
    {
      name: '3D Interactive Portfolio',           // ← Change to your project name
      description: 'An immersive portfolio...',   // ← Change description
      tags: ['Angular', 'Three.js', 'WebGL']    // ← Change tags
    },
    // Add more projects with same structure:
    {
      name: 'Your Project Name',
      description: 'Your project description',
      tags: ['tag1', 'tag2', 'tag3']
    }
  ]
}
```

## 4. Update Contact Information

**Location**: `src/app/components/portfolio-info/portfolio-info.component.ts`, lines ~48-58

```typescript
contact: {
  title: 'Get In Touch',
  content: `I'm always interested in hearing...`,  // ← Update contact message
  links: [
    { label: 'Email', value: 'hello@example.com', icon: '📧' },          // ← Your email
    { label: 'GitHub', value: 'github.com/yourprofile', icon: '🐙' },   // ← Your GitHub
    { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', icon: '💼' },  // ← Your LinkedIn
    { label: 'Twitter', value: '@yourhandle', icon: '𝕏' }               // ← Your Twitter
  ]
}
```

## 5. Change Colors

### Primary Color (Blue)

Search and replace in all CSS files:

- From: `#64b5f6` (current light blue)
- To: Your color code

**Files to search**:

- `src/app/app.css`
- `src/app/components/cv-3d/cv-3d.component.css`
- `src/app/components/portfolio-info/portfolio-info.component.css`

### Background Colors

**Main background** (dark navy):

- Current: `#0d0d15` (main background)
- Change in: `src/styles.css`, `src/app/app.css`

**Secondary background**:

- Current: `#1a1a2e` (card/section background)
- Change in: `src/app/app.css`, service file

**Paper color** (CV texture):

- Current: `#f5f1e8` (off-white)
- Location: `src/app/services/cv-viewer.service.ts`, line ~90
  ```typescript
  ctx.fillStyle = '#f5f1e8'; // ← Change this
  ```

## 6. Customize 3D Scene Colors

**Location**: `src/app/services/cv-viewer.service.ts`

### Background

Line ~24:

```typescript
this.scene.background = new THREE.Color(0x1a1a2e); // ← Hex color code
```

### Ambient Light Color

Line ~33:

```typescript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // ← 0xffffff = white
```

### Directional Light

Line ~36:

```typescript
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // ← Light color
```

### Point Light

Line ~43:

```typescript
const pointLight = new THREE.PointLight(0x64b5f6, 0.5); // ← 0x64b5f6 = light blue
```

### Fog Color (same as background)

Line ~25:

```typescript
this.scene.fog = new THREE.Fog(0x1a1a2e, 10, 20); // ← Match background
```

## 7. Header Text

**Location**: `src/app/app.html`, lines ~2-4

```html
<header class="portfolio-header">
  <div class="header-content">
    <h1>Portfolio</h1>
    <!-- ← Change title -->
    <p class="header-subtitle">Interactive 3D CV Experience</p>
    <!-- ← Change subtitle -->
  </div>
</header>
```

## 8. Page Title & Meta

**Location**: `src/index.html`

```html
<title>Interactive 3D Portfolio - CV</title>
<!-- ← Change page title -->
<meta name="description" content="An immersive 3D portfolio website..." />
<!-- ← Change description -->
```

## 9. Material Properties (3D Paper)

**Location**: `src/app/services/cv-viewer.service.ts`, lines ~99-105

```typescript
const material = new THREE.MeshStandardMaterial({
  map: texture,
  roughness: 0.6, // 0 = shiny, 1 = matte. ← Adjust reflectiveness
  metalness: 0.1, // 0 = not metal, 1 = mirror. ← Adjust metallic look
  side: THREE.FrontSide,
  shadowSide: THREE.BackSide,
});
```

## 10. Rotation Sensitivity

**Location**: `src/app/services/cv-viewer.service.ts`, line ~134

```typescript
rotatePaper(deltaX: number, deltaY: number): void {
  if (this.paper) {
    this.paper.rotation.y += deltaX * 0.01;  // ← Increase 0.01 for faster rotation
    this.paper.rotation.x += deltaY * 0.01;  // ← Increase 0.01 for faster rotation
  }
}
```

## Quick Reference - Most Important Changes

| What          | Where                                      | What to Change                       |
| ------------- | ------------------------------------------ | ------------------------------------ |
| Your Name     | `app.html` + `portfolio-info.component.ts` | Multiple locations, search your name |
| About Me      | `portfolio-info.component.ts` line ~18     | `content` value                      |
| Skills        | `portfolio-info.component.ts` line ~23     | `items` array                        |
| Projects      | `portfolio-info.component.ts` line ~30     | `items` array                        |
| Email         | `portfolio-info.component.ts` line ~54     | Email in contact links               |
| Primary Color | Search `#64b5f6`                           | Replace in all CSS files             |
| Background    | `src/styles.css`                           | Change `background: #0d0d15`         |

## Testing After Changes

1. **Save the file** → Browser auto-refreshes (dev server watching)
2. **Check console** → Press F12 to see any errors
3. **Clear cache** → Ctrl+Shift+R (hard refresh)
4. **Mobile test** → Use Chrome DevTools device emulation

## Production Build After Customization

```bash
npm run build
# Output in: dist/portfolio-3d/
```

---

**Happy customizing!** Make it uniquely yours! 🎨
