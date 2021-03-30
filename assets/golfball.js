import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Interaction } from 'three.interaction';

class Golfball {
    constructor(scene) {
        const textureLoader = new THREE.TextureLoader()
        this.texture = textureLoader.load('/textures/golfball.jpg')
        this.scene = scene
        this.sphere = null
        this.geometry = new THREE.SphereBufferGeometry(0.5, 30, 30);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xf1f1f1,
            emissive: 0xdcdcdc,
            metalness: 0.2,
            roughness: 0.5,
            normalMap: this.texture
        })
        this.lights = {
            point: null,
            frontal: null
        }
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    get _camera() {
        return this.camera
    }

    get _sizes() {
        return this.sizes
    }
    get _sphere() {
        return this.sphere
    }

    renderLights() {
        this.lights.point = new THREE.PointLight(0xffffff, 0.07)
        this.lights.point.position.x = 2.5
        this.lights.point.position.y = 6
        this.lights.point.position.z = 4
        this.scene.add(this.lights.point)

        this.lights.frontal = new THREE.PointLight(0xffffff, 0.07)
        this.lights.frontal.position.x = 0
        this.lights.frontal.position.y = 0
        this.lights.frontal.position.z = 1
        this.scene.add(this.lights.frontal)
    }

    camera(renderer) {
        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight
        
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()
        
            renderer.setSize(this.sizes.width, this.sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        this.camera = new THREE.PerspectiveCamera(100, this.sizes.width / this.sizes.height, 0.1, 100)
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 2
        this.scene.add(this.camera)
    }

    createBallEvent(renderer) {
        const triggerBall = () => {
            document.body.classList.add("triggered")
            document.querySelector('audio').play()
            this.lights.point.color.setHex(0xff0000)
            this.lights.point.intensity = 1
            this.lights.frontal.color.setHex(0xff0000)
            this.lights.frontal.intensity = 1
            this.material.emissive.setHex(0x000000)
            setTimeout(() => {
                document.body.classList.remove("triggered")
                this.lights.point.color.setHex(0xffffff)
                this.lights.frontal.color.setHex(0xffffff)
                this.material.emissive.setHex(0xdcdcdc)
                this.lights.frontal.intensity = 0.07
                this.lights.point.intensity = 0.07
            }, 1500)
        }

        this.sphere.cursor = 'pointer';
        this.sphere.on('click', triggerBall, 100, true)
        const interaction = new Interaction(renderer, this.scene, this.camera);
    }

    renderSphere() {
        this.sphere = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.sphere)
    }

}

export default Golfball