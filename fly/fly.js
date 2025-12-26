import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { Water } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/objects/Water.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x8a9a9b, 150, 600);
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
leftWheel.position.set(-3, 1.5, -3);
leftWheel.rotation.z = Math.PI / 2;
leftWheel.castShadow = true;

const rightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
rightWheel.position.set(3, 1.5, -3);
rightWheel.rotation.z = Math.PI / 2;
rightWheel.castShadow = true;

const leftAxle = new THREE.Mesh(axleGeometry, strutMaterial);
leftAxle.position.set(-3, 1, -2.5);
leftAxle.castShadow = true;

const rightAxle = new THREE.Mesh(axleGeometry, strutMaterial);
rightAxle.position.set(3, 1, -2.5);
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

const fleet = [];
const navyGroup = new THREE.Group();

const hullShape = new THREE.Shape();
hullShape.moveTo(0, 40);
hullShape.bezierCurveTo(15, 20, 15, -20, 10, -40);
hullShape.lineTo(-10, -40);
hullShape.bezierCurveTo(-15, -20, -10, 20, 0, 40);
const extrude = {
    steps: 1,
    depth: 6,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 5,
    bevelOffset: -5,
    bevelSegments: 5
}
const hullGeometry = new THREE.ExtrudeGeometry(hullShape, extrude);
const hullMaterial = new THREE.MeshStandardMaterial({
    color: 0x444d53,
    metalness: 0.5,
    roughness: 0.4
});
const hull = new THREE.Mesh(hullGeometry, hullMaterial);
hull.rotation.x = -Math.PI / 2;
hull.castShadow = true;
hull.receiveShadow = true;
navyGroup.add(hull);

const superstructure = new THREE.Group();

const lowerTierGeometry = new THREE.BoxGeometry(12, 25, 8);
const lowerTier = new THREE.Mesh(lowerTierGeometry, hullMaterial);
lowerTier.position.set(0, 4, 0);
lowerTier.castShadow = true;
lowerTier.receiveShadow = true;
superstructure.add(lowerTier);

const upperTierGeometry = new THREE.BoxGeometry(8, 12, 6);
const upperTier = new THREE.Mesh(upperTierGeometry, hullMaterial);
upperTier.position.set(0, 8, 4);
upperTier.castShadow = true;
upperTier.receiveShadow = true;
superstructure.add(upperTier);

const mastGeometry = new THREE.CylinderGeometry(0.5, 1, 15, 8);
const mast = new THREE.Mesh(mastGeometry, hullMaterial);
mast.position.set(0, 14, 0);
mast.castShadow = true;
superstructure.add(mast);

superstructure.position.set(0, 0, 14);
hull.add(superstructure);

function createTurret(yPos) {
    const turretGroup = new THREE.Group();

    const baseGeometry = new THREE.BoxGeometry(8, 8, 4);
    const base = new THREE.Mesh(baseGeometry, hullMaterial);
    base.position.z = 2;
    turretGroup.add(base);

    const barrelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 10, 8);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });

    const leftBarrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    leftBarrel.rotation.x = Math.PI / 2;
    leftBarrel.position.set(-1.5, 5, 2);

    const rightBarrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
    rightBarrel.rotation.x = Math.PI / 2;
    rightBarrel.position.set(1.5, 5, 2);

    turretGroup.add(leftBarrel, rightBarrel);
    turretGroup.position.set(0, yPos, 7);
    return turretGroup;
}

const frontTurret = createTurret(25);
const rearTurret = createTurret(-25);
hull.add(frontTurret, rearTurret);

for (let i = 0; i < 100; i++) {
    const navyship = navyGroup.clone();
    const x = (Math.random() - 0.5) * 5000;
    const z = (Math.random() - 0.5) * 5000;
    navyship.position.set(x, -205, z);
    navyship.rotation.y = Math.random() * Math.PI * 2;
    scene.add(navyship);
    fleet.push(navyship);
}

const bullets = [];
const bulletGeometry = new THREE.SphereGeometry(0.2, 8, 8);
const bulletMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

const bombs = [];

const bbGeometry = new THREE.CylinderGeometry(5, 5, 8, 8);
const bbMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000
});
for (let i = 0; i < 150; i++) {
    const bb = new THREE.Mesh(bbGeometry, bbMaterial);
    bb.position.set(
        (Math.random() - 0.5) * 3000,
        1000 + Math.random() * 500,
        (Math.random() - 0.5) * 3000
    );
    bombs.push(bb);
    scene.add(bb);
}

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true
});
const STAR_COUNT = 5000;
const STAR_RADIUS = 2000;
const starsVertices = [];
for (let i = 0; i < STAR_COUNT; i++) {
    const radius = STAR_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    starsVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

const cloudGeometry = new THREE.SphereGeometry(20, 8, 8);
const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7
});

for (let i = 0; i < 30; i++) {
    const cloud = new THREE.Group();
    for (let j = 0; j < 3; j++) {
        const sphere = new THREE.Mesh(cloudGeometry, cloudMaterial);
        sphere.position.set(Math.random() * 40 - 20, Math.random() * 20 - 10, Math.random() * 40 - 20);
        sphere.scale.set(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5);
        cloud.add(sphere);
    }
    cloud.position.set(
        Math.random() * 2000 - 1000,
        Math.random() * 200 + 100,
        Math.random() * 2000 - 1000
    );
    scene.add(cloud);
}

const seaGeometry = new THREE.PlaneGeometry(10000, 10000);
const sea = new Water(
    seaGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    }
)
sea.rotation.x = -Math.PI / 2;
sea.position.y = -200;
scene.add(sea);


const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.3);
directionalLight.position.set(100, 300, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

const idealOffset = new THREE.Vector3(0, -50, 50);
const idealLookAt = new THREE.Vector3(0, 0, 0);

flightGroup.position.set(0, 150, 0);
camera.position.set(0, 25, 50);
camera.lookAt(0, 0, 0);

scene.add(flightGroup);


let propellerSpeed = 0;
let speed = 0.05;
let speedy = 0;
let shipHits = 0;
const bulletspeed = 1;
const MAX_SPEED = 2;
const ACCELERATION = 0.01;
const DECELERATION = 0.005;
const ROTATION = 0.01;
const GRAVITY = 0.001;
const SEA_LEVEL = -200;

const keys = {};

const bbVelocities = bombs.map(() => 0);

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    if (e.code === 'Space') shoot();
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function updateControls() {
    if (keys['w']) {
        speed = Math.min(speed + ACCELERATION, MAX_SPEED);
        propellerSpeed = 1;
    } else if (keys['s']) {
        speed = Math.max(speed - ACCELERATION, 0);
        propellerSpeed = Math.max(propellerSpeed - ACCELERATION, 0);
    } else {
        speed = Math.max(speed - DECELERATION, 0);
        propellerSpeed = Math.max(propellerSpeed, 0);
    }

    // Pitch
    if (keys['arrowup']) flightGroup.rotateX(ROTATION);
    if (keys['arrowdown']) flightGroup.rotateX(-ROTATION);

    // Roll
    if (keys['a']) flightGroup.rotateY(ROTATION);
    if (keys['d']) flightGroup.rotateY(-ROTATION);

    // Yaw
    if (keys['arrowright']) flightGroup.rotateZ(-ROTATION);
    if (keys['arrowleft']) flightGroup.rotateZ(ROTATION);

    speedy = Math.max(Math.min(speedy, 0.5), -0.5);

    if (keys['w']) {
        document.getElementById('instructions').style.opacity = '0';
        document.getElementById('instructions').style.transition = 'opacity 1s';
    }
}

function updatePhysics() {
    const forward = new THREE.Vector3(0, 1, 0);
    forward.applyQuaternion(flightGroup.quaternion);

    flightGroup.position.addScaledVector(forward, speed);

    if (speed < 0.2) {
        speedy -= GRAVITY * 2;
    } else {
        speedy *= 0.9;
    }

    flightGroup.position.y += speedy;

    if (flightGroup.position.y <= SEA_LEVEL + 3) {
        flightGroup.position.y = SEA_LEVEL + 3;
        speedy = 0;
        speed *= 0.95;
    }

    fleet.forEach((ship) => {
        if (flightGroup.position.distanceTo(ship.position) < 35) {
            createExplosion(flightGroup.position);

            speed = -0.1;
            speed = 0.2;

            alert("NO SIGNALS!");
        }
    });
}

function shoot() {
    const wingOffsets = [-10, 10];
    wingOffsets.forEach(xOffset => {
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.copy(flightGroup.position);

        const localOffset = new THREE.Vector3(xOffset, 0, 0);
        localOffset.applyQuaternion(flightGroup.quaternion);
        bullet.position.add(localOffset);

        const direction = new THREE.Vector3(0, 1, 0);
        direction.applyQuaternion(flightGroup.quaternion);

        bullet.userData.velocity = direction.multiplyScalar(bulletspeed + speed);
        bullet.userData.aliveTime = 0;

        scene.add(bullet);
        bullets.push(bullet);
    });
}

const explosions = [];
function createExplosion(position) {
    const particleCount = 10;
    const group = new THREE.Group();
    group.position.copy(position);

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 2, 4, 4);
        const material = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xff4400 : 0xffaa00,
            transparent: true
        });
        const particle = new THREE.Mesh(geometry, material);

        particle.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        );
        group.add(particle);
    }

    scene.add(group);
    explosions.push({ group, life: 1.0 });

    camera.position.x += (Math.random() - 0.5) * 5;
    camera.position.y += (Math.random() - 0.5) * 5;
}

// F4U Corsair
function createCorsair(isEnemy = true) {
    const corsairGroup = new THREE.Group();

    const color = isEnemy ? 0x152238 : 0xaaaaaa;
    const bodyGeometry = new THREE.CylinderGeometry(1.8, 1.2, 18, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.6,
        roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    corsairGroup.add(body);

    const createWing = (side) => {
        const wingGroup = new THREE.Group();

        const wingInnerGeometry = new THREE.BoxGeometry(6, 0.5, 4);
        const inner = new THREE.Mesh(wingInnerGeometry, bodyMaterial);
        inner.position.set(2 * side, 0, 0);
        inner.rotation.z = 0.4 * side;

        const wingOuterGeometry = new THREE.BoxGeometry(8, 0.4, 3.5);
        const outer = new THREE.Mesh(wingOuterGeometry, bodyMaterial);
        outer.position.set(6 * side, 1.5, 0);
        outer.rotation.z = -0.3 * side;

        wingGroup.add(inner, outer);
        return wingGroup;
    };

    corsairGroup.add(createWing(1));
    corsairGroup.add(createWing(-1));

    const stabilizerGeometry = new THREE.BoxGeometry(10, 0.1, 2);
    const stabilizer = new THREE.Mesh(stabilizerGeometry, bodyMaterial);
    stabilizer.position.set(0, -7, 0);
    corsairGroup.add(stabilizer);

    const tailGeometry = new THREE.BoxGeometry(0.2, 5, 3);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(0, -7, 1.5);
    corsairGroup.add(tail);

    const propellerBladeGeometry = new THREE.BoxGeometry(5, 0.1, 0.5);
    const propeller = new THREE.Group();
    for (let i = 0; i < 3; i++) {
        const blade = new THREE.Mesh(propellerBladeGeometry, bodyMaterial);
        blade.rotation.y = (i * Math.PI * 2) / 3;
        propeller.add(blade);
    }
    propeller.position.set(0, 9, 0);
    propeller.name = "propeller";
    corsairGroup.add(propeller);

    return corsairGroup;
}

const enemies = [];
const wingmen = [];

for (let i = 0; i < 5; i++) {
    const enemy = createCorsair(true);
    enemy.position.set(
        (Math.random() - 0.5) * 1000,
        200 + Math.random() * 100,
        (Math.random() - 0.5) * 1000
    );
    enemy.userData.behavior = Math.random() > 0.5 ? 'intercept' : 'circle';
    enemy.userData.circleAngle = Math.random() * Math.PI * 2;
    enemy.userData.preferredAltitude = 150 + Math.random() * 100;
    scene.add(enemy);
    enemies.push(enemy);
}

for (let i = 0; i < 2; i++) {
    const ally = createCorsair(false);
    const sideOffset = (i === 0) ? 30 : -30;
    ally.position.set(
        flightGroup.position.x + sideOffset,
        Math.max(flightGroup.position.y - 5, SEA_LEVEL + 50),
        flightGroup.position.z - 40
    );
    ally.rotation.copy(flightGroup.rotation);
    scene.add(ally);
    wingmen.push(ally);
}

function updateAI() {
    const time = Date.now() * 0.001;
    const MIN_SAFE_ALTITUDE = SEA_LEVEL + 25;

    enemies.forEach((enemy, i) => {
        const propeller = enemy.getObjectByName("propeller");
        if (propeller) propeller.rotation.y += 0.3;

        const toPlayer = new THREE.Vector3().subVectors(flightGroup.position, enemy.position);
        const distance = toPlayer.length();

        let targetPosition = new THREE.Vector3();

        const targetAltitude = Math.max(flightGroup.position.y + 10, MIN_SAFE_ALTITUDE);

        if (enemy.userData.behavior === 'circle') {
            const CIRCLE_RADIUS = 200;
            enemy.userData.circleAngle += 0.01;
            targetPosition.x = flightGroup.position.x + Math.cos(enemy.userData.circleAngle) * CIRCLE_RADIUS;
            targetPosition.z = flightGroup.position.z + Math.sin(enemy.userData.circleAngle) * CIRCLE_RADIUS;
            targetPosition.y = targetAltitude;
        } else {
            const playerForward = new THREE.Vector3(0, 1, 0);
            playerForward.applyQuaternion(flightGroup.quaternion);
            targetPosition.copy(flightGroup.position).sub(playerForward.multiplyScalar(50));
            targetPosition.y = targetAltitude;
        }

        const lookMatrix = new THREE.Matrix4();
        lookMatrix.lookAt(enemy.position, targetPosition, new THREE.Vector3(0, 1, 0));
        const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookMatrix);

        const adjustment = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        targetQuaternion.multiply(adjustment);

        enemy.quaternion.slerp(targetQuaternion, 0.03);
        const forward = new THREE.Vector3(0, 1, 0);
        forward.applyQuaternion(enemy.quaternion);
        enemy.position.addScaledVector(forward, 0.9);

        if (enemy.position.y < MIN_SAFE_ALTITUDE) {
            enemy.position.y = MIN_SAFE_ALTITUDE;
        }

        if (distance > 2000) {
            enemy.position.set(
                flightGroup.position.x + (Math.random() - 0.5) * 500,
                flightGroup.position.y + 100,
                flightGroup.position.z - 800
            );
        }

        if (distance < 400) {
            if (!enemy.userData.lastShotTime || time * 1000 - enemy.userData.lastShotTime > ENEMY_FIRE_RATE) {
                spawnEnemyBullet(enemy);
                enemy.userData.lastShotTime = time * 1000;
            }
        }
    });

    enemyBullets.forEach((bullet, index) => {
        if (!bullet.userData.velocity) return;

        bullet.position.add(bullet.userData.velocity);

        if (bullet.position.distanceTo(flightGroup.position) < 5) {
            createExplosion(bullet.position);
            scene.remove(bullet);
            enemyBullets.slice(index, 1);

            speed *= 0.7;
            alert("SYSTEMS CRITICAL: WE ARE HIT!");
        }

        if (bullet.position.distanceTo(flightGroup.position) > 1000) {
            scene.remove(bullet);
            enemyBullets.splice(index, 1);
        }
    });

    wingmen.forEach((ally, i) => {
        const sideOffset = (i === 0) ? 30 : -30;
        const targetPosition = new THREE.Vector3(sideOffset, -5, -40);
        targetPosition.applyQuaternion(flightGroup.quaternion);
        targetPosition.add(flightGroup.position);

        if (targetPosition.y < MIN_SAFE_ALTITUDE) {
            const flightGroupToTarget = targetPosition.clone().sub(flightGroup.position);
            const horizontalDistance = new THREE.Vector2(flightGroupToTarget.x, flightGroupToTarget.z).length();

            targetPosition.y = MIN_SAFE_ALTITUDE;

            const forwardDirection = new THREE.Vector3(0, 0, 1);
            forwardDirection.applyQuaternion(flightGroup.quaternion);
            forwardDirection.y = 0;
            forwardDirection.normalize();

            const horizontalOffset = new THREE.Vector3(sideOffset, 0, 0);
            horizontalOffset.applyQuaternion(flightGroup.quaternion);

            targetPosition.copy(flightGroup.position);
            targetPosition.y = MIN_SAFE_ALTITUDE;
            targetPosition.add(horizontalOffset);
            targetPosition.add(forwardDirection.multiplyScalar(-40));
        }

        ally.position.lerp(targetPosition, 0.05);

        const targetQuaternion = flightGroup.quaternion.clone();
        if (flightGroup.position.y < MIN_SAFE_ALTITUDE + 100) {
            const pitchUp = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(1, 0, 0),
                Math.PI * 0.02
            );
            targetQuaternion.multiply(pitchUp);
        }

        ally.quaternion.slerp(targetQuaternion, 0.07);
    });
}
const enemyBullets = [];
const ENEMY_FIRE_RATE = 2000;
function spawnEnemyBullet(enemy) {
    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(geometry, material);

    bullet.position.copy(enemy.position);

    const direction = new THREE.Vector3();
    direction.subVectors(flightGroup.position, enemy.position).normalize();

    bullet.userData.velocity = direction.multiplyScalar(4);

    scene.add(bullet);
    enemyBullets.push(bullet);
}

const infoElement = document.getElementById('info');
function updateUI() {
    const altitude = Math.max(0, flightGroup.position.y - SEA_LEVEL).toFixed(1);

    const displayspeed = (speed * 100).toFixed(0);

    infoElement.innerHTML = `
        [ FLIGHT 001 ]<br>
        SPEED: ${displayspeed} knots<br>
        ALTITUDE: ${altitude} ft<br>
        SHIP HITS: ${shipHits}<br>
    `;
}
const alertElement = document.getElementById('alert');
function alert(message) {
    alertElement.innerHTML = message;
    alertElement.style.opacity = "1";

    clearTimeout(alertElement.timeout);
    alertElement.timeout = setTimeout(() => {
        alertElement.style.opacity = "0";
    }, 2000);
}
const radarElement = document.getElementById('radar');
const RADAR_RANGE = 1000;
const RADAR_SIZE = 150;
function updateRadar() {
    const oldDots = document.querySelectorAll('.radar-dot');
    oldDots.forEach(dot => dot.remove());

    const drawDot = (otherPlane, color) => {
        const dx = otherPlane.position.x - flightGroup.position.x;
        const dz = otherPlane.position.z - flightGroup.position.z;
        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dz, 2));

        if (distance < RADAR_RANGE) {
            const dot = document.createElement('div');
            dot.className = 'radar-dot';
            dot.style.background = color;

            const x = (dx / RADAR_RANGE) * (RADAR_SIZE / 2) + (RADAR_SIZE / 2);
            const y = (dz / RADAR_RANGE) * (RADAR_SIZE / 2) + (RADAR_SIZE / 2);

            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            radarElement.appendChild(dot);

            const isFiring = distance < 100;
            if (isFiring) {
                dot.style.boxShadow = "0 0 10px #ff0000";
                dot.style.width = "6px";
                dot.style.height = "6px";
            }
        }
    };

    enemies.forEach(enemy => drawDot(enemy, '#ff0000'));
    wingmen.forEach(ally => drawDot(ally, '#00ffff'));
}

function animate() {
    requestAnimationFrame(animate);
    updateControls();
    updatePhysics();
    updateUI();
    updateAI();
    updateRadar();

    sea.material.uniforms['time'].value += 0.016;

    propeller.rotation.y += propellerSpeed;

    // Camera follows plane rotation
    const offset = idealOffset.clone();
    offset.applyQuaternion(flightGroup.quaternion);
    const targetPosition = flightGroup.position.clone().add(offset);

    const lookAt = idealLookAt.clone();
    lookAt.applyQuaternion(flightGroup.quaternion);
    const targetLookAt = flightGroup.position.clone().add(lookAt);

    // Smooth camera movement
    camera.position.lerp(targetPosition, 0.1);
    if (camera.position.y < SEA_LEVEL) {
        camera.position.y = SEA_LEVEL + 10;
    }

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt, 0.1);
    camera.lookAt(currentLookAt);

    // Stars
    const positions = starGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += speed;
        if (positions[i + 2] > camera.position.z + 200) {
            positions[i + 2] = camera.position.z - 200;
        }
    }
    starGeometry.attributes.position.needUpdate = true;

    // bb
    bombs.forEach((bomb, i) => {
        bbVelocities[i] += GRAVITY * 10;
        bomb.position.y -= bbVelocities[i];

        if (bomb.position.y < SEA_LEVEL) {
            bomb.position.y = SEA_LEVEL;
            bbVelocities[i] = 0;
        }

        const distance = bomb.position.distanceTo(flightGroup.position);

        if (distance < 50 && distance > 20) {
            alert("PROXIMITY WARNING: MMINE NEARBY");
        }

        if (distance < 20) {
            createExplosion(bomb.position);

            bomb.position.y = 800;
            bomb.position.x = (Math.random() - 0.5) * 1000;
            bomb.position.z = (Math.random() - 0.5) * 1000;
            bbVelocities[i] = 0;

            speed *= 0.4;
            alert("CRITICAL HIT: ENGINE DAMAGE");
        }
    });

    // rocking
    const time = Date.now() * 0.001;
    fleet.forEach((ship, i) => {
        ship.rotation.z = Math.sin(time + i) * 0.015;
        ship.position.y += Math.sin(time + i) * 0.02;
    });

    // bullets
    bullets.forEach((bullet, index) => {
        bullet.position.add(bullet.userData.velocity);
        bullet.userData.aliveTime++;

        fleet.forEach((ship) => {
            if (bullet.position.distanceTo(ship.position) < 40) {
                createExplosion(bullet.position);
                shipHits++;

                scene.remove(bullet);
                bullets.splice(index, 1);

                ship.children[0].material.emissive.setHex(0xff0000);
                setTimeout(() => {
                    if (ship.children[0]) ship.children[0].material.emissive.setHex(0x000000);
                }, 100);
            }
        });

        if (bullet.userData.aliveTime > 250) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }
    });

    // explosions
    explosions.forEach((explosion, eIndex) => {
        explosion.life -= 0.02;
        explosion.group.children.forEach(p => {
            p.position.add(p.userData.velocity);
            p.material.opacity = explosion.life;
            p.scale.multiplyScalar(0.98);
        });

        if (explosion.life <= 0) {
            scene.remove(explosion.group);
            explosions.splice(eIndex, 1);
        }
    });

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});