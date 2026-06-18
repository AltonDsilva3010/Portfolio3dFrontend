import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class CvViewerService {
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private paper: THREE.Mesh | null = null;
  private animationFrameId: number | null = null;

  constructor() {}

  initializeScene(container: HTMLElement): void {
    console.log('initializeScene called with container:', container);

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 10, 20);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    console.log('Container dimensions:', width, 'x', height);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 2.5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    console.log('Renderer created, appending to container');
    container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x64b5f6, 0.5);
    pointLight.position.set(-5, 3, 5);
    this.scene.add(pointLight);

    // Create paper model
    this.createPaperModel();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(container));

    // Handle mouse wheel zoom
    container.addEventListener('wheel', (e) => this.onMouseWheel(e), { passive: false });

    // Start animation loop
    console.log('Starting animation loop');
    this.animate();
  }

  private createPaperModel(): void {
    if (!this.scene) {
      console.warn('Scene not initialized');
      return;
    }

    console.log('Creating paper model');

    // Create paper geometry
    const paperGeometry = new THREE.PlaneGeometry(2, 2.8, 32, 32);

    // Add some displacement for 3D effect
    const positionAttribute = paperGeometry.getAttribute('position') as THREE.BufferAttribute;
    const originalPositions = positionAttribute.array as Float32Array;

    for (let i = 0; i < originalPositions.length; i += 3) {
      // Add subtle wave effect
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      originalPositions[i + 2] = Math.sin(x * 1.5) * 0.05 + Math.cos(y * 1.5) * 0.05;
    }

    const canvas = this.createPaperTexture();
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.1,
      side: THREE.DoubleSide,
      shadowSide: THREE.BackSide,
    });

    this.paper = new THREE.Mesh(paperGeometry, material);
    this.paper.castShadow = true;
    this.paper.receiveShadow = true;
    this.paper.rotation.x = -0.1;
    this.scene.add(this.paper);

    console.log('Paper model created and added to scene');
  }

  private createPaperTexture(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1440;

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Paper background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const leftCol = 40;
    const rightCol = 475;
    const colWidth = 510;
    let leftY = 60;
    let rightY = 60;

    // LEFT COLUMN
    // Name
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText('Alton Dsilva', leftCol, leftY);
    leftY += 40;

    // Contact info - left
    ctx.font = '17px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('(91) 98226 36634', leftCol, leftY);
    leftY += 20;
    ctx.fillText('Emails:', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText('College:', leftCol, leftY);
    ctx.fillStyle = '#0066cc';
    ctx.fillText('crce.9192.cs@gmail.com', leftCol + 60, leftY);
    leftY += 16;
    ctx.fillStyle = '#333333';
    ctx.fillText('Personal:', leftCol, leftY);
    ctx.fillStyle = '#0066cc';
    ctx.fillText('altondsilva3010@gmail.com', leftCol + 60, leftY);
    leftY += 24;
    ctx.fillStyle = '#333333';
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText('899, Chalpeth-Umbergothan Rd.', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Shirlaiwadi, Agashi, Virar(W)', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Mumbai, Maharashtra, India', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Pin : 401 301', leftCol, leftY);
    leftY += 42;

    // EDUCATION - Left
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText('EDUCATION', leftCol, leftY);
    leftY += 20;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Fr. Conceicao Rodrigues', leftCol, leftY);
    leftY += 16;
    ctx.fillText('College of Engineering,', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Bandra(W) – 9.27 CGPA', leftCol, leftY);
    leftY += 20;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('(Upto Sem 6)', leftCol, leftY);
    leftY += 20;
    ctx.font = 'italic 15px Arial, sans-serif';
    ctx.fillText('BE in Computer Engineering', leftCol, leftY);
    leftY += 20;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Expected – 2024', leftCol, leftY);
    leftY += 24;

    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Viva College Of Arts', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Commerce & Science,', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Virar(W) – 88.76%', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('Higher Secondary Certificate', leftCol, leftY);
    leftY += 16;
    ctx.fillText('June -2018 to February-2020', leftCol, leftY);
    leftY += 24;

    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('Carmel Convent High School,', leftCol, leftY);
    leftY += 16;
    ctx.fillText('Virar(W) – 92.20%', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('Secondary School Certificate', leftCol, leftY);
    leftY += 16;
    ctx.fillText('March - 2018', leftCol, leftY);
    leftY += 28;

    // SKILLS - Left
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText('SKILLS', leftCol, leftY);
    leftY += 20;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Programming:', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Java, Javascript, C', leftCol, leftY);
    leftY += 18;

    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('Web Development:', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('ReactJS, NodeJS, ExpressJS,', leftCol, leftY);
    leftY += 14;
    ctx.fillText('MongoDB', leftCol, leftY);
    leftY += 18;

    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('Tools and Packages:', leftCol, leftY);
    leftY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Git, GitHub, VsCode IDE,', leftCol, leftY);
    leftY += 14;
    ctx.fillText('Postman, Eclipse IDE', leftCol, leftY);

    // RIGHT COLUMN
    // PROJECTS - Right
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText('PROJECTS', rightCol, rightY);
    rightY += 22;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Auktionator(Blockchain Auction Store)', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('(2023) – Created a ReactJS web application', rightCol, rightY);
    rightY += 14;
    ctx.fillText('for Auctioning of products and buying them', rightCol, rightY);
    rightY += 14;
    ctx.fillText('using Eth cryptocurrency. The Smart Contract', rightCol, rightY);
    rightY += 14;
    ctx.fillText('was written in Solidity and deployed to', rightCol, rightY);
    rightY += 14;
    ctx.fillText('Sepolia Testnet from Remix IDE. Integrated to', rightCol, rightY);
    rightY += 14;
    ctx.fillText('frontend using Ether.js', rightCol, rightY);
    rightY += 18;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Github   LiveLink', rightCol, rightY);
    rightY += 22;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('ClassMitra (2023) – Classroom Management', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Created a Classroom Management System', rightCol, rightY);
    rightY += 14;
    ctx.fillText('using ReactJs in the Frontend and created a', rightCol, rightY);
    rightY += 14;
    ctx.fillText('RESTful API using NodeJs and ExpressJs.', rightCol, rightY);
    rightY += 18;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Github', rightCol, rightY);
    rightY += 22;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('News Web Application (2022) – Created', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('a Web Application using ReactJs and fetching', rightCol, rightY);
    rightY += 14;
    ctx.fillText('the News data from the Bing News Search API.', rightCol, rightY);
    rightY += 18;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Github   LiveLink', rightCol, rightY);
    rightY += 28;

    // EXPERIENCE - Right
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText('EXPERIENCE', rightCol, rightY);
    rightY += 20;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Head of Public Relations at Mozilla', rightCol, rightY);
    rightY += 16;
    ctx.fillText('Campus Club CRCE', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('(August 2022 – August 2023)', rightCol, rightY);
    rightY += 16;
    ctx.fillStyle = '#333333';
    ctx.fillText("-Worked on council events' promotion.", rightCol, rightY);
    rightY += 14;
    ctx.fillText('-Assembled a group of industry experts', rightCol, rightY);
    rightY += 14;
    ctx.fillText('to serve as judges and mentors for the', rightCol, rightY);
    rightY += 14;
    ctx.fillText('Unscript 2k23 hackathon organized by', rightCol, rightY);
    rightY += 14;
    ctx.fillText('the council', rightCol, rightY);
    rightY += 28;

    // COURSES - Right
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText('COURSES', rightCol, rightY);
    rightY += 20;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('JavaScript Course(2022)', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Javascript along with Modern Javascript', rightCol, rightY);
    rightY += 14;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Course certificate', rightCol, rightY);
    rightY += 18;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('MERN Stack Course(2022)', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Full Stack Web development using ReactJs,', rightCol, rightY);
    rightY += 14;
    ctx.fillText('Nodejs, ExpressJs, MongoDb', rightCol, rightY);
    rightY += 14;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Course certificate', rightCol, rightY);
    rightY += 18;

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText('Web Development Course (2022)', rightCol, rightY);
    rightY += 16;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('Full coursework about the inner workings', rightCol, rightY);
    rightY += 14;
    ctx.fillText('of the website and exploring different web', rightCol, rightY);
    rightY += 14;
    ctx.fillText('technologies.', rightCol, rightY);
    rightY += 14;
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('Course certificate', rightCol, rightY);

    return canvas;
  }

  private addPaperFrame(): void {
    if (!this.scene) return;

    const frameGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(2, 2.8));
    const frameMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc, linewidth: 2 });
    const frameLines = new THREE.LineSegments(frameGeometry, frameMaterial);
    frameLines.position.z = 0.01;
    this.scene.add(frameLines);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (this.paper) {
      // Gentle rotation on mouse movement (will be enhanced with mouse controls)
      this.paper.rotation.y += 0.0005;

      // Gentle floating effect
      this.paper.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  rotatePaper(deltaX: number, deltaY: number): void {
    if (this.paper) {
      this.paper.rotation.y += deltaX * 0.01;
      this.paper.rotation.x += deltaY * 0.01;

      // Limit rotation to prevent flipping
      this.paper.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.paper.rotation.x));
    }
  }

  private onMouseWheel(event: WheelEvent): void {
    event.preventDefault();

    if (!this.camera) return;

    const zoomSpeed = 0.1;
    const minZoom = 0.5;
    const maxZoom = 5;

    // Scroll up = zoom in (decrease z), Scroll down = zoom out (increase z)
    const currentZ = this.camera.position.z;
    const newZ = currentZ + (event.deltaY > 0 ? zoomSpeed : -zoomSpeed);

    // Clamp the zoom level
    this.camera.position.z = Math.max(minZoom, Math.min(maxZoom, newZ));
  }

  private onWindowResize(container: HTMLElement): void {
    if (!this.camera || !this.renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    (this.camera as THREE.PerspectiveCamera).aspect = width / height;
    (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.scene) {
      this.scene.clear();
    }
  }
}
