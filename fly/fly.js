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
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    metalness: 0.3,
    roughness: 0.7
});
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.castShadow = true;
body.receiveShadow = true;

const noseGeometry = new THREE.ConeGeometry(2, 4, 32);
const noseMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    metalness: 0.8,
    roughness: 0.2
});
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
lowerWing.position.set(0, -2, 0);
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

const propellerHubGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
const propellerHubMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.9,
    roughness: 0.1
});
const propellerHub = new THREE.Mesh(propellerHubGeometry, propellerHubMaterial);
propellerHub.position.set(0, 12, 0);
propellerHub.castShadow = true;

const propellerBladeGeometry = new THREE.BoxGeometry(6, 0.1, 1);
const propellerBladeMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.8,
    roughness: 0.3
});

const propeller = new THREE.Group();
for (let i = 0; i < 2; i++) {
    const blade = new THREE.Mesh(propellerBladeGeometry, propellerBladeMaterial);
    blade.rotation.y = i * Math.PI;
    blade.castShadow = true;
    propeller.add(blade);
}
propeller.position.set(0, 12.5, 0);


const cockpitGeometry = new THREE.SphereGeometry(1.5, 16, 16, 0, Math.PI);
const cockpitMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E90FF,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7
});
const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
cockpit.position.set(0, 5, 1);
cockpit.rotation.x = Math.PI;
cockpit.castShadow = true;

const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 16);
const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.5,
    roughness: 0.5
});
const axleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);

const leftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
leftWheel.position.set(-3, -8, 1.5);
leftWheel.rotation.z = Math.PI / 2;
leftWheel.castShadow = true;

const rightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
rightWheel.position.set(3, -8, 1.5);
rightWheel.rotation.z = Math.PI / 2;
rightWheel.castShadow = true;

const leftAxle = new THREE.Mesh(axleGeometry, strutMaterial);
leftAxle.position.set(-3, -8, 1.5);
leftAxle.castShadow = true;

const rightAxle = new THREE.Mesh(axleGeometry, strutMaterial);
rightAxle.position.set(3, -8, 1.5);
rightAxle.castShadow = true;

flightGroup.add(body);
flightGroup.add(nose);
flightGroup.add(tail);
flightGroup.add(stabilizer);
flightGroup.add(rudder);
flightGroup.add(wings);
flightGroup.add(propeller);
flightGroup.add(propellerHub);
flightGroup.add(cockpit);
flightGroup.add(leftAxle);
flightGroup.add(rightAxle);
flightGroup.add(leftWheel);
flightGroup.add(rightWheel);

flightGroup.rotation.x = Math.PI / -2;

const bombs = new THREE.Group();

const bbGeometry = new THREE.CylinderGeometry(5, 5, 8, 8);
const bbMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000
});
const bb = new THREE.Mesh(bbGeometry, bbMaterial);
scene.add(bb);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.5,
    sizeAttenuation: true
});
const starsVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;
    starsVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const cameraOffset = new THREE.Vector3(0, 50, 50);

camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

scene.add(flightGroup);


let propellerSpeed = 0;
let speed = 0;
function animate() {
    requestAnimationFrame(animate);
    propeller.rotation.y += propellerSpeed;
    flightGroup.position.z += -speed;

    camera.position.copy(flightGroup.position).add(cameraOffset);
    camera.lookAt(flightGroup.position);

    const positions = starGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += speed;
        if (positions[i + 2] > camera.position.z + 200) {
            positions[i + 2] = camera.position.z - 200;
        }
    }
    starGeometry.attributes.position.needUpdate = true;

    renderer.render(scene, camera);
}

function start() {
    propellerSpeed = 0.3;
    speed = 10;
}

function stop() {
    propellerSpeed = 0;
    speed = 0;
}

//start();
animate();

window.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        if (propellerSpeed > 0) {
            stop();
        } else {
            start();
        }
    }
});

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});