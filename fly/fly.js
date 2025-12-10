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

const stabilizerGeometry = new THREE.BoxGeometry(10, 0.5, 2);
const stabilizerMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
const stabilizer = new THREE.Mesh(stabilizerGeometry, stabilizerMaterial);
stabilizer.position.set(0, -10, 0);
stabilizer.castShadow = true;

const rudderGeometry = new THREE.BoxGeometry(0.5, 4, 3);
const rudder = new THREE.Mesh(rudderGeometry, stabilizerMaterial);
rudder.position.set(0, -8, 1.5);
rudder.castShadow = true;

const wings = new THREE.Group();
const upperWingGeometry = new THREE.BoxGeometry(25, 0.5, 4);
const upperWingMaterial = new THREE.MeshStandardMaterial({
    color: 0xA0522D,
    metalness: 0.2,
    roughness: 0.8
});
const upperWing = new THREE.Mesh(upperWingGeometry, upperWingMaterial);
upperWing.position.set(0, 5, 0);
upperWing.castShadow = true;
upperWing.receiveShadow = true;

const lowerWingGeometry = new THREE.BoxGeometry(20, 0.5, 4);
const lowerWing = new THREE.Mesh(lowerWingGeometry, upperWingMaterial);
lowerWing.position.set(0, 5, 0);
lowerWing.castShadow = true;
lowerWing.receiveShadow = true;
wings.add(upperWing);
wings.add(lowerWing);
wings.rotation.x = Math.PI / 2;

const strutGeometry = new THREE.CylinderGeometry(0.2, 0.2, 7, 8);
const strutMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
const strutPositions = [
    [6, 1.5, 0],
    [-6, 1.5, 0],
    [10, 1.5, 0],
    [-10, 1.5, 0]
];
strutPositions.forEach(pos => {
    const strut = new THREE.Mesh(strutGeometry, strutMaterial);
    strut.position.set(pos[0], pos[1], pos[2]);
    strut.castShadow = true;
    wings.add(strut);
});

const cockpitGeometry = new THREE.SphereGeometry(1.5, 16, 16, 0, Math.PI);
const cockpitMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E90FF,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7
});
const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
cockpit.position.set(0,5,1);
cockpit.rotation.x = Math.PI;
cockpit.castShadow = true;

const wheelGeometry = new THREE.CylinderGeometry(1,1,0.5,16);
const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.5,
    roughness: 0.5
});
const axleGeometry = new THREE.CylinderGeometry(0.1,0.1,4,8);

const leftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
leftWheel.position.set(-3,-8,1.5);
leftWheel.rotation.z = Math.PI / 2;
leftWheel.castShadow = true;

const rightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
rightWheel.position.set(3, -8,1.5);
rightWheel.rotation.z = Math.PI / 2;
rightWheel.castShadow = true;

const leftAxle = new THREE.Mesh(axleGeometry, strutMaterial);
leftAxle.position.set(-3,-8,1.5);
leftAxle.castShadow = true;

const rightAxle = new THREE.Mesh(axleGeometry, strutMaterial);
rightAxle.position.set(3,-8,1.5);
rightAxle.castShadow = true;

flightGroup.add(body);
flightGroup.add(nose);
flightGroup.add(tail);
flightGroup.add(stabilizer);
flightGroup.add(rudder);
flightGroup.add(wings);
flightGroup.add(cockpit);
flightGroup.add(leftAxle);
flightGroup.add(rightAxle);
flightGroup.add(leftWheel);
flightGroup.add(rightWheel);

flightGroup.rotation.x = Math.PI / -2;

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