import '../assets/styles.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader()

const golfBallTexture = textureLoader.load('/textures/golfball.jpg')

const canvas = document.querySelector('canvas#WebGL')

const scene = new THREE.Scene()

const geometry = new THREE.SphereBufferGeometry(0.5, 30, 30);

const material = new THREE.MeshStandardMaterial({
    color: 0xf1f1f1,
    emissive: 0xdadada,
    metalness: 0.2,
    roughness: 0.5,
    normalMap: golfBallTexture
})

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

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

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()