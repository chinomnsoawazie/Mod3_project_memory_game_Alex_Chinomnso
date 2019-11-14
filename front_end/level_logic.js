// matchProfile = {shape: matchShape, color: matchColor}

let desiredObjects;

let level = 1
let evaluateStatus = true;

//display level on html
let levelDispay = document.getElementById('level-display')
levelDispay.innerText = `level ${level}`

const objectColors = ["salmon", "green", "cyan", "red", "blue", "purple"];

function randomColor() {
    return objectColors[Math.floor(Math.random() * objectColors.length)];
 } 

 
 function gameOver(){
     if (desiredObjects <= 0){
       evaluateStatus = false;
        toggleGenerateObjects();
        checkWin();
        console.log('game over');
    }
    
}

function checkWin(){

  let winStatues;
    if (points >= level * 10){      
      winStatues = 'win'
    } else {
     winStatues = 'lost'
    }

    if (evaluateStatus === false) {
      createContinueMenu(winStatues);
    }
}

//create random color
function randomColor(){
    return objectColors[Math.floor(Math.random() * objectColors.length)]
}

// var level;
// var levelObjNos = fetch(user_data).then(r => r.json()).then(userInfo => {
//     userInfo.games.last.level + 1
    
// })

function createLevel(level){
    // create 'level * level" no of objects
    desiredObjects = level * 5;
    evaluateStatus = true;
    matchProfile.color = "";
    matchProfile.shape = "";


  if (level < 3) { 
    // determine shape to match
    matchProfile.shape = getRandomShape();
    determineMatchProfile(undefined, matchProfile.shape);

      //this is defined in world.js
    toggleGenerateObjects();

    //create a slider that matches the matching shape with random color
    createSlider(undefined, matchProfile.shape)
  } else if (level < 6)
  {
    //determine color to match
    matchProfile.color = randomColor();
    determineMatchProfile(matchProfile.color, undefined);

    toggleGenerateObjects();

    //create slider with random shape and matching color
    createSlider(matchProfile.color, undefined)
  } else {
    //match by shape and color
    matchProfile.color = randomColor();
    matchProfile.shape = getRandomShape();

    determineMatchProfile(matchProfile.color, matchProfile.shape)

    toggleGenerateObjects();

    //create slider that matches shape and color
    createSlider(matchProfile.color, matchProfile.shape)
  }

}


function determineSliderShapeAndColor(shape, color){
    if (shape === "cone") {
     createCone(color, true)
    } else if (shape === "sphere"){
     createSphere(color, true)
    } else if (shape === "cube"){
     createCube(color, true)
    }
  }