import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".canvas"),
  antialias: true,
  // alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(0, 0, 1);
scene.add(pointLight);
// Add light helpers
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

// Load HDRI environment map

new RGBELoader().load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdr",
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    // scene.environment = texture;
  }
);
const loader = new GLTFLoader();
loader.load("./mobile_home.glb", function (gltf) {
  gltf.scene.rotation.y = Math.PI / 2;
  gltf.scene.position.y = 0;
  gltf.scene.position.z = 0;
  // scene.add(gltf.scene);
});
// Create a basic cube geometry
const geometry = new THREE.TorusGeometry(0.5, 0.05, 100, 100);
const material = new THREE.MeshStandardMaterial({
  color: "red",
  metalness: 0.9,
  roughness: 0.1,
  wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const geometry1 = new THREE.TorusGeometry(0.35, 0.05, 100, 100);
const material1 = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 0.9,
  roughness: 0.1,
  wireframe: false,
});
const cube1 = new THREE.Mesh(geometry1, material1);
scene.add(cube1);
const geometry2 = new THREE.TorusGeometry(0.2, 0.05, 100, 100);
const material2 = new THREE.MeshStandardMaterial({
  color: "white",
  metalness: 0.9,
  roughness: 0.1,
  wireframe: false,
});
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube2);
const geometry3 = new THREE.SphereGeometry(0.1, 100, 100);
const material3 = new THREE.MeshStandardMaterial({
  color: "red",
  metalness: 0.1,
  roughness: 0.3,
  wireframe: false,
});
const cube3 = new THREE.Mesh(geometry3, material3);
scene.add(cube3);
// Add a test mesh

// Position camera
camera.position.z = 1;

// Handle window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.y += 0.03;
  cube.rotation.x += 0.03;
  cube.rotation.z += 0.03;
  cube1.rotation.y += 0.05;
  cube1.rotation.x += 0.05;
  cube1.rotation.z += 0.05;
  cube2.rotation.y += 0.1;
  cube2.rotation.x += 0.1;
  cube2.rotation.z += 0.1;
  renderer.render(scene, camera);
}
animate();
