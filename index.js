import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let container, stats;
let camera, scene, renderer;
let pointLight;

scene = new THREE.Scene();

var loader = new GLTFLoader();

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = -1000;
	camera.position.x = -1000;
	camera.position.y = 1000

	//background
	scene.background = null;

	//lights
	const ambient = new THREE.AmbientLight( 0xffffff );
	scene.add( ambient );

	pointLight = new THREE.PointLight( 0xffffff, 2 );
	scene.add( pointLight );

	//models
	loader.load( './models/Soldier.glb', function ( gltf )
	{

		//const updatables = []

		const soldier = gltf.scene;
		soldier.scale.set(200, 200, 200);
		soldier.traverse(function (object) {
			if (object.isMesh) object.castShadow = true;
		});
		scene.add(soldier);

		const clips = gltf.animations;
		const mixer = new THREE.AnimationMixer( soldier );

		console.log(clips);

		const runClip = THREE.AnimationClip.findByName( clips, 'Run' );
		const runAction = mixer.clipAction( runClip );
		runAction.play();

		const clock = new THREE.Clock();

		// you must do this every frame
		const delta = clock.getDelta();
		mixer.update(delta);

		soldier.tick = (delta) => mixer.update(delta);

		//updatables.push(soldier);


		
		
	} );

	//floor
	const geometryFloor = new THREE.PlaneGeometry( 1, 1 );
	const materialFloor = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometryFloor, materialFloor );
	plane.scale.set(2500,2500,2500)
	plane.rotation.x = - Math.PI / 2;
	scene.add( plane );

	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//controls
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.minPolarAngle = Math.PI / 4;
	controls.maxPolarAngle = Math.PI / 1.5;

	//stats
	stats = new Stats();
	container.appendChild( stats.dom );

	window.addEventListener( 'resize', onWindowResize );

}

//open menu
document.onkeydown = function (e) {
	if (e.key == "Escape") {
		const div = document.getElementById("menu"); 
	
		var span = document.getElementById("close");

		div.style.visibility = "visible"

		span.onclick = function() {
			div.style.visibility = "hidden"
		}
	}
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	renderer.render( scene, camera );
	stats.update();

}