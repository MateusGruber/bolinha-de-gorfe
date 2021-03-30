import '../assets/styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import Golfball from './golfball';

// const gui = new dat.GUI();

/*TODO
    - Create shadow
    - Insert shake inside the canvas
    - Rotation by mouse interaction
*/

const canvas = document.querySelector('canvas#WebGL')
const scene = new THREE.Scene()
const golfball = new Golfball(scene);
golfball.renderSphere();
golfball.renderLights();

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
golfball.camera(renderer);
golfball.createBallEvent(renderer);
renderer.setSize(golfball._sizes.width, golfball._sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
// var mouse = new THREE.Vector2();
// var pointOfIntersection = new THREE.Vector3();
// var raycaster = new THREE.Raycaster();

// const onMouseMove = e => {
//     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);
//     raycaster.ray.intersectPlane(plane, pointOfIntersection);
//     sphere.lookAt(pointOfIntersection);
// }

// canvas.addEventListener('mousemove', onMouseMove, false);

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    golfball._sphere.rotation.y = .5 * elapsedTime
    renderer.render(scene, golfball._camera)
    window.requestAnimationFrame(tick)
}

tick()