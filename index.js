import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* import * as config from './configuracion.js'//importo el modulo de configuracion
config.init();
console.log("data exportada: ",config.config); */

let container, stats;
let camera, scene, renderer;
let pointLight;

let resolution = 1

//variable de la sombra
let shadow = true
//listenin del evento click del checkbox
document.getElementById("shadow").addEventListener("click", shadowUpdate);//siempre que hace click corre una funcion

//listenin del evento click del slider del fog near
document.getElementById("fogNear").addEventListener("click", fogNearUpdate);

//listenin del evento click del slider del fog far
document.getElementById("fogFar").addEventListener("click", fogFarUpdate);

//listenin del evento click del boton de resolucion bajo
document.getElementById("baja").addEventListener("click", resolutionBaja);

//listenin del evento click del boton de resolucion media
document.getElementById("media").addEventListener("click", resolutionMedia);

//listenin del evento click del boton de resolucion alta
document.getElementById("alta").addEventListener("click", resolutionAlta);

function resolutionBaja() {//baja al render para ver el renderer.setPixelRatio que es donde se hace el cambio
	resolution = 0.5
}
function resolutionMedia() {
	resolution = 1
}
function resolutionAlta() {
	resolution = 2
}

function shadowUpdate() {
	let data = document.getElementById("shadow").checked//capturo el estado del checkbox
	shadow = data //lo igualo a la variable con el estado de la sombra
	directional.castShadow = shadow
	console.log("directional.castShadow:", directional.castShadow);
	
}

function fogNearUpdate() {
	let data = document.getElementById("fogNear").value
	fog.near = data
	console.log("fogNear:", fog.near);
}
function fogFarUpdate() {
	let data = document.getElementById("fogFar").value
	fog.far = data
	console.log("fogFar:", fog.far);
}

scene = new THREE.Scene();

let fog = scene.fog = new THREE.Fog( 0xcccccc, 10, 1 );

var loader = new GLTFLoader();

init();
animate();

//lights
const ambient = new THREE.AmbientLight( 0xffffff );
ambient.castShadow = true
scene.add( ambient );

const directional = new THREE.DirectionalLight( "#4d191a", 20 );

//Aqui para activar o desactivar las sombras
directional.castShadow = true;
directional.position.y = 1000
directional.position.x = 1000
directional.castShadow = true
scene.add( directional );

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.z = -1000;
	camera.position.x = -1000;
	camera.position.y = 1000

	//background
	scene.background = null;

	/* pointLight = new THREE.PointLight( 0xffffff, 2 );
	scene.add( pointLight ); */

	//models
	loader.load( './models/Soldier.glb', function ( gltf )
	{

		//const updatables = []

		const soldier = gltf.scene;
		soldier.scale.set(200, 200, 200);

		soldier.castShadow = true

		scene.add(soldier);

		const clips = gltf.animations;
		const mixer = new THREE.AnimationMixer( soldier );

		//console.log(clips);

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
	plane.receiveShadow = true;
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


function inputShadow() {
	let data = document.getElementById("shadow").checked
	shadow = data
	console.log("shadow",shadow);
	return(shadow)
}
window.inputShadow=true;
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
	renderer.setPixelRatio(window.devicePixelRatio * resolution);
	stats.update();

}