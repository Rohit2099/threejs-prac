import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

declare global {
  interface Window {
    scene: THREE.Scene;
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

const orbitControls = new OrbitControls(perspectiveCamera, canvas);
orbitControls.enableDamping = true;

// Axes
const xAxisPoints = [new THREE.Vector3(-1000, 0, 0), new THREE.Vector3(1000, 0, 0)];
const yAxisPoints = [new THREE.Vector3(0, -1000, 0), new THREE.Vector3(0, 1000, 0)];
const zAxisPoints = [new THREE.Vector3(0, 0, -1000), new THREE.Vector3(0, 0, 2000)];

const axisMaterial = new THREE.LineBasicMaterial({ color: "white" });

const xAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(xAxisPoints), axisMaterial);
const yAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(yAxisPoints), axisMaterial);
const zAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(zAxisPoints), axisMaterial);

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 25, 2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({ color: "blue", side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Cube
const box = new THREE.BoxGeometry(1, 1, 1);
const meshMaterial = new THREE.MeshPhongMaterial({ color: "red" });
const cube = new THREE.Mesh(box, meshMaterial);
cube.position.x = 10;
cube.position.y = 10;

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 50, 50);

// Axes Helper
const cubeAxes = new THREE.AxesHelper();
cubeAxes.material.depthTest = false;
cube.add(cubeAxes);

const planeAxes = new THREE.AxesHelper();
planeAxes.material.depthTest = false;
plane.add(planeAxes);

// Grid helper
const axisGrid = new THREE.GridHelper(100, 100);
axisGrid.material.depthTest = false;
axisGrid.rotation.x = Math.PI / 2;

scene.add(cube);
scene.add(plane);
scene.add(light);
scene.add(xAxisLine);
scene.add(yAxisLine);
scene.add(zAxisLine);
scene.add(axisGrid);

perspectiveCamera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, perspectiveCamera);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;
  orbitControls.update();
  renderer.render(scene, perspectiveCamera);

  requestAnimationFrame(animate);
}

window.scene = scene;
requestAnimationFrame(animate);