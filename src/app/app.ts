import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv3dComponent } from './components/cv-3d/cv-3d.component';
import { PortfolioInfoComponent } from './components/portfolio-info/portfolio-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Cv3dComponent, PortfolioInfoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
