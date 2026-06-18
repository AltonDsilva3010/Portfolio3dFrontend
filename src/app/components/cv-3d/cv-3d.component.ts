import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvViewerService } from '../../services/cv-viewer.service';

@Component({
  selector: 'app-cv-3d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-3d.component.html',
  styleUrls: ['./cv-3d.component.css'],
})
export class Cv3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas3d', { static: false }) canvasContainer!: ElementRef;

  private isDragging = false;
  private previousPosition = { x: 0, y: 0 };
  private initialized = false;

  constructor(private cvViewerService: CvViewerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeScene();
  }

  private initializeScene(): void {
    if (this.initialized || !this.canvasContainer) return;

    const container = this.canvasContainer.nativeElement;

    if (container.clientWidth === 0 || container.clientHeight === 0) {
      setTimeout(() => this.initializeScene(), 100);
      return;
    }

    this.cvViewerService.initializeScene(container);
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.cvViewerService.dispose();
  }

  // Desktop

  onMouseDown(event: MouseEvent): void {
    this.startDrag(event.clientX, event.clientY);
  }

  onMouseMove(event: MouseEvent): void {
    this.handleDrag(event.clientX, event.clientY);
  }

  onMouseUp(): void {
    this.stopDrag();
  }

  onMouseLeave(): void {
    this.stopDrag();
  }

  // Mobile

  onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    if (!touch) return;

    this.startDrag(touch.clientX, touch.clientY);
  }

  onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    if (!touch) return;

    // Prevent page scrolling while rotating
    event.preventDefault();

    this.handleDrag(touch.clientX, touch.clientY);
  }

  onTouchEnd(): void {
    this.stopDrag();
  }

  private startDrag(x: number, y: number): void {
    this.isDragging = true;
    this.previousPosition = { x, y };
  }

  private handleDrag(x: number, y: number): void {
    if (!this.isDragging) return;

    const deltaX = x - this.previousPosition.x;
    const deltaY = y - this.previousPosition.y;

    this.cvViewerService.rotatePaper(deltaX, deltaY);

    this.previousPosition = { x, y };
  }

  private stopDrag(): void {
    this.isDragging = false;
  }
}
