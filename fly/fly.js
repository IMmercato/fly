import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x111111);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement);

const flightGroup = new THREE.Group();

const bodyGeometry = new THREE.CylinderGeometry(2, 2, 20, 32);
const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.castShadow = true;
body.receiveShadow = true;

const noseGeometry = new THREE.ConeGeometry(2, 4, 32);
const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.position.set(0, 11.5, 0);
nose.castShadow = true;

const tailGeometry = new THREE.CylinderGeometry(0.5, 2, 5);
const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
tail.position.set(0, -11.5, 0);
tail.rotation.z = Math.PI;
tail.castShadow = true;

const stabilizerGeometry = new THREE.BoxGeometry(10, 0.5,2);
const stabilizerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
const stabilizer = new THREE.Mesh(stabilizerGeometry, stabilizerMaterial);
stabilizer.position.set(0, -10, 0);
stabilizer.castShadow = true;

const rudderGeometry = new THREE.BoxGeometry(0.5,4,3);
const rudderMaterial = new THREE.MeshStandardMaterial({
    color: 0xA0522D,
    metalness: 0.2,
    roughness: 0.8
});
const rudder = new THREE.Mesh(rudderGeometry, rudderMaterial);
rudder.position.set(0, -8, 1.5);
rudder.castShadow = true;

flightGroup.add(body);
flightGroup.add(nose);
flightGroup.add(tail);
flightGroup.add(stabilizer);
flightGroup.add(rudder);

flightGroup.rotation.x = Math.PI / -2;

const wingGeometry = new THREE.BoxGeometry(25, 1, 10);
const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
const wingPosition = [
    [0, 7, 0],
    [0, -3, 0]
];

wingPosition.forEach(pos => {
    const wing = new THREE.Mesh(wingGeometry, wingMaterial);
    wing.position.set(pos[0], pos[1], pos[2]);
    flightGroup.add(wing);
});

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

scene.add(flightGroup);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});