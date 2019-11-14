// matchProfile = {shape: matchShape, color: matchColor}

let desiredObjects;

let level;
let evaluateStatus = true;

//display level on html
let levelDispay = document.getElementById('level-display')
// levelDispay.innerText = `level ${level}`

const objectColors = ["salmon", "green", "cyan", "red", "blue", "purple"];

function setLevel(userId){
  return fetch('http://[::1]:3000/games')
  .then(r => r.json())
  .then(allGames => {
    let myGames = allGames.filter(x => x.user_id === userId)
    if (myGames.length > 0){
     level = myGames[myGames.length - 1].level
     level += 1
     levelDispay.innerText = `level ${level}`
    } else {
      level = 1
      levelDispay.innerText = `level ${level}`
    }
    desiredObjects = level * 5;
  }) 
}

function findMyPoints(userId){
  return fetch('http://[::1]:3000/games')
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
   pointsDisplay.innerText = `Total points to date: ${points}`
  })
}

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
  let gamePoints = points - totalPointsFromLastGame

  let winStatues;
    if (points >= level * 10){      
      winStatues = 'win'
      levelDispay.innerText = `level ${level + 1}`
     controlsDiv.innerHTML = ""; 
    } else {
     winStatues = 'lost'
     levelDispay.innerText = `level ${level}`
     controlsDiv.innerHTML = "";
    }

    if (evaluateStatus === false) {
      createContinueMenu(winStatues);
    }

    fetch('http://[::1]:3000/games', {
      method: 'POST',
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({
          points: gamePoints,
          level: level,
          winstatus: winStatues,
          user_id: currentUser.id
      })
  })
  .then(r => r.json())
  .then(game => {
    console.log(game)
  })

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
    console.log(level)
    evaluateStatus = true;
    matchProfile.color = "";
    matchProfile.shape = "";
    findMyPoints(currentUser.id)
    // debugger
    levelDispay.innerText = `level ${level}`
    controlsDiv.innerHTML = "";
    createExitButton();
    
    
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
  
  // pointsDisplay.innerText = `${points} points`

  // levelDispay.innerText = `level ${level}`

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