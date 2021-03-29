import '../assets/styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Interaction } from 'three.interaction';

// const gui = new dat.GUI();

/*TODO
    - Organize this mess 
    - Create shadow
    - Insert shake inside the canvas
*/

const textureLoader = new THREE.TextureLoader()
const golfBallTexture = textureLoader.load('/textures/golfball.jpg')
const canvas = document.querySelector('canvas#WebGL')
const scene = new THREE.Scene()
const geometry = new THREE.SphereBufferGeometry(0.5, 30, 30);
const material = new THREE.MeshStandardMaterial({
    color: 0xf1f1f1,
    emissive: 0xdcdcdc,
    metalness: 0.2,
    roughness: 0.5,
    normalMap: golfBallTexture
})


const debounce = (callback, wait, immediate = false) => {
    let timeout = null

    return function () {
        const callNow = immediate && !timeout
        const next = () => callback.apply(this, arguments)

        clearTimeout(timeout)
        timeout = setTimeout(next, wait)

        if (callNow) {
            next()
        }
    }
}

const triggeredBolinhaDeGorfe = () => {
    document.body.classList.add("triggered");
    document.querySelector('audio').play();
    pointLight.color.setHex(0xff0000)
    pointLight.intensity = 1
    frontalPointLight.color.setHex(0xff0000)
    frontalPointLight.intensity = 1
    material.emissive.setHex(0x000000)
    setTimeout(() => {
        document.body.classList.remove("triggered");
        pointLight.color.setHex(0xffffff)
        frontalPointLight.color.setHex(0xffffff)
        material.emissive.setHex(0xdcdcdc)
        frontalPointLight.intensity = 0.07
        pointLight.intensity = 0.07
    }, 1500)
}

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
sphere.cursor = 'pointer'
sphere.on('click', debounce(triggeredBolinhaDeGorfe, 100, true))


const pointLight = new THREE.PointLight(0xffffff, 0.07)
pointLight.position.x = 2.5
pointLight.position.y = 6
pointLight.position.z = 4
scene.add(pointLight)

const frontalPointLight = new THREE.PointLight(0xffffff, 0.07)
frontalPointLight.position.x = 0
frontalPointLight.position.y = 0
frontalPointLight.position.z = 1
scene.add(frontalPointLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const interaction = new Interaction(renderer, scene, camera);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
var raycaster = new THREE.Raycaster();

const onMouseMove = e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, pointOfIntersection);
    sphere.lookAt(pointOfIntersection);
}

canvas.addEventListener('mousemove', onMouseMove, false);

const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()