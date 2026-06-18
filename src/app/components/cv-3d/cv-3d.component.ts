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
  private lastPinchDistance = 0;
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
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
    }

    if (event.touches.length === 2) {
      this.lastPinchDistance = this.getPinchDistance(event.touches[0], event.touches[1]);
    }
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault();

    // Single finger = rotate
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this.handleDrag(touch.clientX, touch.clientY);
    }

    // Two fingers = zoom
    if (event.touches.length === 2) {
      const currentDistance = this.getPinchDistance(event.touches[0], event.touches[1]);

      const delta = currentDistance - this.lastPinchDistance;

      this.cvViewerService.zoom(delta);

      this.lastPinchDistance = currentDistance;
    }
  }

  onTouchEnd(): void {
    this.stopDrag();
    this.lastPinchDistance = 0;
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

  private getPinchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }
}
