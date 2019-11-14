//declare variables
//level variable is declared in level_logic.js
let shapes = ['cone', 'sphere', 'cube']
let sliderArray = []
let generatingObjects = false;
let slidingObj = [];
let scene;
let camera;
let renderer;
let canvasDiv = document.getElementById("game-canvas")
let spotLight;
let slider;
let usersArray;
let currentUser;
let totalPointsFromLastGame;
let matchProfile = {}

function createScene(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true});
   renderer.setClearColor("#000000");
   renderer.setSize(window.innerWidth, window.innerHeight);
   canvasDiv = document.getElementById("game-canvas")
   canvasDiv.appendChild(renderer.domElement);

   window.addEventListener('resize', (e) => {
    console.log(main)
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth, window.innerHeight;
   })

//add stars
//    let times = 500;
//     for(var i=0; i < times; i++){
//     createBackground();
//    }
//add lighting
   spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
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

   //zoom camera out
   camera.position.z = 20;
}

createScene();

function createSlider(color, shape){
// create shape

createObject(color, shape, true)
 slider.position.y = -12;
//  scene.add( slider );
 sliderArray = [];
 sliderArray.push(slider)

 implementDragging()
}
createSlider(matchProfile.color, matchProfile.shape)

//Implement Dragging
function implementDragging(){
 var controls = new THREE.DragControls( sliderArray, camera, renderer.domElement );
 controls.addEventListener( 'dragstart', function ( event ) {
   event.object.material.emissive.set( 0xaaaaaa );
 } );
 controls.addEventListener( 'dragend', function ( event ) {
   event.object.material.emissive.set( 0x000000 );
   console.log(slider)
 } );
}

// createLevel(level)

//create animations
const animate = () => {
    requestAnimationFrame(animate)
    slider.rotation.x += 0.01
    slider.rotation.y += 0.01
    // slider.position.y -= 0.06
    renderer.render( scene, camera );
}

animate();


//game logic

//draw scene
var render = function () {
    renderer.render(scene,camera);
}

let randomInterval;
let explicitInterval;
let jackyInterval;
function toggleGenerateObjects(){
    generatingObjects = !generatingObjects; 

    let myColor = matchProfile.color
    let myShape = matchProfile.shape

    if (myColor === "" || myShape === "") {
        myColor = randomColor();
        myShape = getRandomShape();
    }

    if (generatingObjects === true){
     jackyInterval = setInterval(createJackieCoin, 15000);
     explicitInterval = setInterval(createObject, 8000, myColor, myShape);
     randomInterval = setInterval(createObject, 2000);
    } else {
     clearInterval(jackyInterval);
     clearInterval(explicitInterval);
     clearInterval(randomInterval);
    }
}

function createObject(color, shape, isSlider){

 let shapeToGenerate = shape
 let colorToGenerate = color
//if shape is not specified, we randomize shape
 if (shapeToGenerate === undefined) {
  shapeToGenerate = getRandomShape();
 }

 if (colorToGenerate === undefined) {
   colorToGenerate = randomColor();
 }

 //if color is undefined, these functions take in an argument of "undefined" and randomize color internally
  if (shapeToGenerate === 'cone') {
   createCone(color, isSlider);
  } else if (shapeToGenerate === 'sphere') {
   createSphere(color, isSlider);
  } else if (shapeToGenerate === 'cube') {
   createCube(color, isSlider);
  }
}

function getRandomShape(){
  return shapes[Math.floor(Math.random() * shapes.length)]
}
userFetch();
function userFetch(){
  fetch('http://[::1]:3000/users')
  .then(r => r.json())
  .then(returnedUsersArray => {
   usersArray = returnedUsersArray
  })
}

function setLevel(userId){
  fetch('http://[::1]:3000/games')
  .then(r => r.json())
  .then(allGames => {
    let myGames = allGames.filter(x => x.user_id === userId)
    if (myGames.length > 0){
     level = myGames[myGames.length - 1]
    } else {
      level = 1
    }
  })
}

function findMyPoints(userId){
  fetch('http://[::1]:3000/games')
  .then(r => r.json())
  .then(allGames => {
    var myGames = allGames.filter(x => x.user_id === userId)
    var myTotal = 0;
    myGames.forEach(game => {
      // debugger
      myTotal += game.points
    });
   points = myTotal
   totalPointsFromLastGame = points
  })
}


