let desiredObjects;
let level;
let evaluateStatus = true;
let levelDispay = document.getElementById('level-display')
let booleanWin;

const objectColors = ["salmon", "green", "cyan", "red", "blue", "purple"];

function setLevel(userId){
  return fetch('http://[::1]:3000/games')
  .then(r => r.json())
  .then(allGames => {
    let myGames = allGames.filter(x => x.user_id === userId)
    if (myGames.length > 0){
     level = myGames[myGames.length - 1].level
     if (level.winstatus){
     level += 1
     } else {
       level = level
     }
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
    }
}

function checkWin(){
  let gamePoints = points - totalPointsFromLastGame
  let booleanWin;
  let winStatus;

    if (gamePoints >= level * 10){      
      winStatus = 'win'
      levelDispay.innerText = `level ${level + 1}`
     controlsDiv.innerHTML = ""; 
     booleanWin = true;
    } else {
     winStatus = 'lost'
     levelDispay.innerText = `level ${level}`
     controlsDiv.innerHTML = "";
     booleanWin = false;
     level -= 1;
    }

    if (evaluateStatus === false) {
      createContinueMenu(winStatus);
    }

    fetch('http://[::1]:3000/games', {
      method: 'POST',
      headers: {
          "content-type": "application/json"
      },
      body: JSON.stringify({
          points: gamePoints,
          level: level,
          winstatus: booleanWin,
          user_id: currentUser.id
      })
  })
  .then(r => r.json())
  .then(game => {

  })

}

function randomColor(){
    return objectColors[Math.floor(Math.random() * objectColors.length)]
}

function createLevel(level){
    evaluateStatus = true;
    matchProfile.color = "";
    matchProfile.shape = "";
    findMyPoints(currentUser.id)
    levelDispay.innerText = `level ${level}`
    controlsDiv.innerHTML = "";
    createExitButton();
    
    if (level < 3) { 
      matchProfile.shape = getRandomShape();
      determineMatchProfile(undefined, matchProfile.shape);
      toggleGenerateObjects();
      createSlider(undefined, matchProfile.shape)
  } else if (level < 6)
  {
    matchProfile.color = randomColor();
    determineMatchProfile(matchProfile.color, undefined);
    toggleGenerateObjects();
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