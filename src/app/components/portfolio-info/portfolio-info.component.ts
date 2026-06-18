import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-info.component.html',
  styleUrls: ['./portfolio-info.component.css'],
})
export class PortfolioInfoComponent {
  activeSection: string = 'about';

  sections = {
    about: {
      title: 'About Me',
      content: `I'm a passionate full-stack developer and UI/UX designer with expertise in creating
               interactive 3D web experiences. With 2+ years of experience, I specialize in Angular,
               React, and Three.js to build innovative digital solutions.`,
    },
    skills: {
      title: 'Skills',
      items: [
        { category: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'Three.js', 'JSP'] },
        {
          category: 'Backend',
          skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Java', 'SpringBoot'],
        },
        { category: 'Tools', skills: ['Docker', 'AWS', 'Git', 'WebPack', 'Vite'] },
      ],
    },
    projects: {
      title: 'Featured Projects',
      items: [
        {
          name: '3D Interactive Portfolio',
          description:
            'An immersive portfolio website with rotating 3D CV model built with Angular and Three.js',
          tags: ['Angular', 'Three.js', 'WebGL'],
        },
        {
          name: 'Real-time Collaboration App',
          description:
            'Multi-user editing platform with live collaboration features and WebSocket integration',
          tags: ['React', 'Node.js', 'WebSocket'],
        },
        {
          name: 'E-commerce Platform',
          description:
            'Full-stack e-commerce solution with payment integration and inventory management',
          tags: ['Angular', 'Express', 'MongoDB'],
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      content: `I'm always interested in hearing about new projects and opportunities. Feel free to reach out!`,
      links: [
        { label: 'Email', value: 'altondsilva3010@gmai.com', icon: '📧' },
        { label: 'GitHub', value: 'github.com/AltonDsilva3010', icon: '🐙' },
        // { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', icon: '💼' },
        // { label: 'Twitter', value: '@yourhandle', icon: '𝕏' },
      ],
    },
  };

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  get currentSection(): any {
    return this.sections[this.activeSection as keyof typeof this.sections];
  }
}
