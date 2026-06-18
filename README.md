# Interactive 3D Portfolio Website

A modern, immersive portfolio website built with Angular and Three.js, featuring an interactive 3D paper CV that visitors can rotate and explore.

## Features

- **Interactive 3D CV Model**: A paper-like 3D model displayed in the center that users can rotate by dragging
- **Responsive Design**: Adapts seamlessly to desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with gradient backgrounds and smooth animations
- **Portfolio Sections**: 
  - About Me
  - Skills (organized by category)
  - Featured Projects
  - Contact Information
- **Real-time Rendering**: Smooth WebGL rendering with Three.js
- **Ambient Lighting**: Professional lighting setup with shadows and effects

## Tech Stack

- **Frontend Framework**: Angular 22+
- **3D Graphics**: Three.js
- **TypeScript**: Full type safety throughout the project
- **CSS**: Modern CSS with animations and responsive design
- **Build Tool**: Webpack (via Angular CLI)

## Project Structure

src/app/components/ - Angular components for the UI
src/app/services/ - Angular services for Three.js management
src/styles.css - Global application styles
package.json - Project dependencies

## Installation

1. Install dependencies: npm install
2. Start dev server: npm start

## Development

### Start the Development Server
\\\ash
npm start
\\\

### Build for Production
\\\ash
npm run build
\\\

## Features

- Interactive 3D paper CV model with mouse rotation
- Responsive portfolio layout
- Multiple information sections (About, Skills, Projects, Contact)
- Professional dark theme with animations
- WebGL rendering with Three.js

## Customization

1. Update CV content in cv-viewer.service.ts
2. Modify portfolio info in portfolio-info.component.ts
3. Customize colors in app.css and component CSS files
4. Add your personal information and projects

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Open-source project - customize as needed!
