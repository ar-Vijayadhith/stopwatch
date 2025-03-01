// Three.js 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Add a 3D Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the Camera
camera.position.z = 5;

// Animation Loop
function animateBackground() {
  requestAnimationFrame(animateBackground);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animateBackground();

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Stopwatch Logic
let startTime, elapsedTime = 0, timerInterval;

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  updateDisplay();
}

function updateDisplay() {
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  document.getElementById('milliseconds').textContent = String(milliseconds).padStart(2, '0');
}

// Event Listeners for Buttons
document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('stop-btn').addEventListener('click', stopStopwatch);
document.getElementById('reset-btn').addEventListener('click', resetStopwatch);