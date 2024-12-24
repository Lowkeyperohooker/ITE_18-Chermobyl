import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export function startExploration() {

    // Canvas
    let canvas = document.querySelector('.explore-page .webgl');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.classList.add('webgl');
        document.body.appendChild(canvas);
    }
    
    // To check if canvas is loaded
    if (!canvas) {
        console.error('Canvas element not found.');
        return; 
    }

    // Loaders
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    // Scene Setup
    const scene = new THREE.Scene();
    const skyTexture = textureLoader.load('/textures/gray_clouds.jpg');
    scene.background = skyTexture;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 150);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Orbit Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enablePan = false;
    orbitControls.minPolarAngle = Math.PI / 6;
    orbitControls.maxPolarAngle = Math.PI / 3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Ground Plane
    const groundTexture = textureLoader.load('/textures/chernobyl_base.png');
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshStandardMaterial({
            map: groundTexture,
            color: new THREE.Color(0.2, 0.2, 0.2),
            side: THREE.DoubleSide,
        })
    );
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Load Models
    const models = [
        {
            url: '/models/chernobyl_powerplant/scene.gltf',
            position: { x: 50, y: 15, z: -140 },
            scale: { x: 0.5, y: 0.5, z: 0.5 },
            rotation: { y: Math.PI / 2 },
        },
        {
            url: '/models/pripyat_ferris_wheel/scene.gltf',
            position: { x: -370, y: 10, z: 170 },
            scale: { x: 15, y: 15, z: 15 },
            rotation: { y: Math.PI / -5 },
        },
    ];

    const apartmentsPositions = [
        { x: 0, y: 0, z: 250 },
        { x: 0, y: 0, z: 200 },
        { x: -50, y: 0, z: 200 },
        { x: -50, y: 0, z: 250 },
    ];

    // Function to load a model
    const loadModel = (model) => {
        gltfLoader.load(model.url, (gltf) => {
            const loadedModel = gltf.scene;
            loadedModel.scale.set(model.scale.x, model.scale.y, model.scale.z);
            loadedModel.position.set(model.position.x, model.position.y, model.position.z);
            if (model.rotation) {
                loadedModel.rotation.y = model.rotation.y;
            }
            scene.add(loadedModel);
        }, undefined, (error) => {
            console.error(`Error loading model: ${model.url}`, error);
        });
    };

    // Load primary models
    models.forEach(loadModel);

    // Load apartment instances
    apartmentsPositions.forEach((position) => {
        gltfLoader.load('/models/soviet_panel_house_red/scene.gltf', (gltf) => {
            const apartment = gltf.scene.clone();
            apartment.scale.set(1.2, 1.2, 1.2);
            apartment.position.set(position.x, position.y, position.z);
            apartment.rotation.y = Math.PI / 2;
            scene.add(apartment);
        }, undefined, (error) => {
            console.error('Error loading apartment model:', error);
        });
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);
        orbitControls.update();
        renderer.render(scene, camera);
    };
    animate();

    // Resize Event
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

}
