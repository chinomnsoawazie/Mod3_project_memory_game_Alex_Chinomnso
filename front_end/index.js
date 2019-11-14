let points = document.createElement('div')

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#00000F");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objectColors = ["#4287f5", "#c910ae", "#00ffaa", "#fff766", "#e01212", "#1000c4"];

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
 }

function createSphere(){
// create shape
var geometry = new THREE.SphereGeometry( 5, 32, 32 );
// create material, color, or image texture

var material = new THREE.MeshPhongMaterial ( {color: "#c910ae", wireframe: false} );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.y = -18;
scene.add( sphere );

}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth, window.innerHeight;
    camera.updateProjectionMatrix();
})

//add lighting

var spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
spotLight.position.set( 200, 250, 600 );
spotLight.target.position.set( 100, -50, 0 );
spotLight.castShadow = true;
scene.add( spotLight.target );
scene.add( spotLight );
//Set up shadow properties for the spotLight
spotLight.shadow.mapSize.width = 512; // default
spotLight.shadow.mapSize.height = 512; // default
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 15000; // default

// create shape
var geometry = new THREE.SphereGeometry( 2, 32, 32 );
// create material, color, or image texture

var material = new THREE.MeshPhongMaterial ( {color: "#c910ae", wireframe: false} );
var sphere = new THREE.Mesh( geometry, material );
sphere.position.y = -12;
scene.add( sphere );

// zoom camera out
camera.position.z = 20;

//add event listeners
const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
domEvents.addEventListener(sphere, 'click', (e) => {
    console.log(sphere.position)
})
document.addEventListener('keydown', event => {
    event.preventDefault();
    if (event.keyCode == '37' && sphere.position.x > -29){
     sphere.position.x -= 0.8
    } 
    else if (event.keyCode == '39' && sphere.position.x < 29){
        sphere.position.x += 0.8
    }
})


//create animations
const animate = () => {
    requestAnimationFrame(animate)
    sphere.rotation.x += 0.01
    sphere.rotation.y += 0.01
    // sphere.position.y -= 0.06
    renderer.render( scene, camera );
}

animate();


//game logic

var update = function() {
//  cube.rotation.x +=
}

//draw scene
var render = function () {
    renderer.render(scene,camera);
}

var GameLoop = function () {
  requestAnimationFrame(GameLoop);
  update();
  render();
}



