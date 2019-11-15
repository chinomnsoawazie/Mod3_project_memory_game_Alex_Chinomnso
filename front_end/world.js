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
let randomInterval;
let explicitInterval;
let jackyInterval;
createScene();

function createScene(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias: true});
   renderer.setClearColor("#000000");
   renderer.setSize(window.innerWidth, window.innerHeight);
   canvasDiv.appendChild(renderer.domElement);

// add stars
   let times = 300;
    for(var i=0; i < times; i++){
    createBackground();
   }
//add lighting
   spotLight = new THREE.SpotLight( 0xFFFFFF, 2);
   spotLight.position.set( 200, 250, 600 );
   spotLight.target.position.set( 100, -50, 0 );
   spotLight.castShadow = true;
   scene.add( spotLight.target );
   scene.add( spotLight );
   spotLight.shadow.mapSize.width = 512;
   spotLight.shadow.mapSize.height = 512;
   spotLight.shadow.camera.near = 0.5;
   spotLight.shadow.camera.far = 15000;
   camera.position.z = 20;

   window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  
  // console.log(canvasDiv)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function createSlider(color, shape){
 createObject(color, shape, true)
 slider.position.y = -12;
 sliderArray = [];
 sliderArray.push(slider)

 implementDragging()
}
createSlider(matchProfile.color, matchProfile.shape)

function implementDragging(){
 var controls = new THREE.DragControls( sliderArray, camera, renderer.domElement );
 controls.addEventListener( 'dragstart', function ( event ) {
   event.object.material.emissive.set( 0xaaaaaa );
 } );
 controls.addEventListener( 'dragend', function ( event ) {
   event.object.material.emissive.set( 0x000000 );
 } );
}

//create animations
const animate = () => {
    requestAnimationFrame(animate)
    slider.rotation.x += 0.01
    slider.rotation.y += 0.01
    renderer.render( scene, camera );
}

animate();

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
 if (shapeToGenerate === undefined) {
  shapeToGenerate = getRandomShape();
 }

 if (colorToGenerate === undefined) {
   colorToGenerate = randomColor();
 }

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
      myTotal += game.points
    });
   points = myTotal
   totalPointsFromLastGame = points
  })
}


