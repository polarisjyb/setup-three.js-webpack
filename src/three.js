import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 태양계 모듈
import Sun from './sun';
import Planet from './planet';
import Satellite from './satellite';

// scene, camera, renderer 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('root').appendChild(renderer.domElement);

// x축 (빨간색), y축 (녹색), z축 (파란색) 생성
const axes = new THREE.AxesHelper(3000);
scene.add(axes);

const controls = new OrbitControls(camera, renderer.domElement);

// 태양 생성
const sun = new Sun(54, 0xfff600, true, 0.0001);
sun.setPosition(0, 0, 0);
scene.add(sun.getMesh());
// const sunGeometry = new THREE.SphereGeometry(54, 400, 200);
// const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfff600, wireframe: true });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);


/* 행성 생성 (수, 금, 지(달), 화, 목, 토, 천, 해) */

// mercury (수성)
const mercury = new Planet(0.4, 74, 0xccff00, true);
scene.add(mercury.getMesh());

// venus (금성)
const venus = new Planet(0.9, 89, 0x0000ff, true);
scene.add(venus.getMesh());

// earth (지구)
const earth = new Planet(1, 104, 0x00ff00, true, 0.002, 0.002);
scene.add(earth.getMesh());

// mars (화성)
const mars = new Planet(0.5, 125, 0xff0000, true);
scene.add(mars.getMesh());

// jupiter (목성)
const jupiter = new Planet(11.2, 304, 0xff8000, true);
scene.add(jupiter.getMesh());

// saturn (토성)
const saturn = new Planet(9.4, 554, 0xcccccc, true);
scene.add(saturn.getMesh());

// uranus (천왕성)
const uranus = new Planet(4, 1054, 0x00ffff, true);
scene.add(uranus.getMesh());

// neptune (해왕성)
const neptune = new Planet(3.9, 1554, 0x808080, true);
scene.add(neptune.getMesh());

/* camera 추가 */
camera.position.set( -450, 50, 200 );

controls.update();

// 자전 애니메이션
const animate = () => {
  requestAnimationFrame(animate);

  sun.update();
  earth.update();


  renderer.render(scene, camera);

}
animate();