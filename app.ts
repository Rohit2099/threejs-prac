import * as THREE from "three";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

// Asex

const xAxisPoints = [new THREE.Vector3(-1000, 0, 0), new THREE.Vector3(1000, 0, 0)];
const yAxisPoints = [new THREE.Vector3(0, -1000, 0), new THREE.Vector3(0, 1000, 0)];
const zAxisPoints = [new THREE.Vector3(0, 0, -1000), new THREE.Vector3(0, 0, 1000)];

const axisMaterial = new THREE.LineBasicMaterial({ color: "white" });

const xAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(xAxisPoints), axisMaterial);
const yAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(yAxisPoints), axisMaterial);
const zAxisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(zAxisPoints), axisMaterial);
scene.add(xAxisLine);
scene.add(yAxisLine);
scene.add(zAxisLine);

const box = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(10, 25, 2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

const meshMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(box, meshMaterial);
cube.position.x = 10;
scene.add(cube);
scene.add(plane);
perspectiveCamera.position.z = 100;
perspectiveCamera.position.x = 10;
perspectiveCamera.position.y = -10;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, perspectiveCamera);