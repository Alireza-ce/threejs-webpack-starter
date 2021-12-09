import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoading = new THREE.TextureLoader()
const normalTexture = textureLoading.load('/map.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry =new THREE.SphereGeometry( 0.7, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.5;
material.roughness =0
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)

scene.add(sphere)

//Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


// Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(1,1,1)
pointLight.intensity = 0.5
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000)
pointLight2.position.set(2,3,4)
pointLight2.intensity = 2
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xff0000)
pointLight3.position.set(0,0,1)
pointLight3.intensity = 2
scene.add(pointLight3)

gui.add(pointLight3,'intensity')

gui.add(pointLight3.position,'y','-100','100','1')
gui.add(pointLight3.position,'x','-100','100','1')
gui.add(pointLight3.position,'z','-100','100','1')


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */



 const controls = new OrbitControls( camera, canvas );
 controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    
    // Update objects
    sphere.rotation.y =  Math.cos(elapsedTime)

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()