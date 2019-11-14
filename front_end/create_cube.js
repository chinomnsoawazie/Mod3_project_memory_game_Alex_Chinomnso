var cubeAudio = new Audio('assets/Grass4.ogg');

function createCube(color, isSlider){
    // create shape
    var cubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
    // create material, color, or image texture

    let myColor = color
    if (myColor === undefined) {
    myColor = randomColor()
    }
    
    var cubeMaterial = new THREE.MeshPhongMaterial ( {color: myColor, wireframe: false} );
    var newCube = new THREE.Mesh( cubeGeometry, cubeMaterial );
    newCube.name = `${myColor} cube`;
    newCube.position.x = Math.random() * 40 - 20;
    // newCube.position.y = Math.random() * 40 + 15;
    newCube.position.y = 15
    newCube.userData.pointsValue = 0
    newCube.userData.colorMatch = false
    newCube.userData.shapeMatch = false
    newCube.userData.type = "cube"

    //check color
    if (matchProfile.color === ""){
        newCube.userData.colorMatch = true;
    } else if (matchProfile.color === myColor) {
        newCube.userData.colorMatch = true;
    } else {
        newCube.userData.colorMatch = false;
    }
    //check shape
    if (matchProfile.shape === ""){
        newCube.userData.shapeMatch = true;
    } else if (matchProfile.shape === newCube.userData.type) {
        newCube.userData.shapeMatch = true;
    } else {
        newCube.userData.shapeMatch = false;
    }
    //evaluate points value
    if (newCube.userData.colorMatch && newCube.userData.shapeMatch){
        newCube.userData.pointsValue = 10;
    } else {
        newCube.userData.pointsValue = -10;
    }

    scene.add( newCube );
    var cubeObject = scene.getObjectByName( newCube.name );

    if (isSlider === true){
        slider = newCube
        slider.position.x = -12
    }
 
    let af;

  if (isSlider === undefined){ // if its not a slider, we animate it
    const animate = () => {
        af = requestAnimationFrame(animate)

        newCube.rotation.x += 0.06
        newCube.rotation.y += 0.06
        newCube.position.y -= 0.1

        var xDif = slider.position.x - newCube.position.x
        var yDif = slider.position.y - newCube.position.y
        var deathY = -17

        if (newCube.position.y <= deathY) {
            // breakOpen(myColor, newCube.position.x, newCube.position.y)
            // cubeAudio.play();
            cubeObject.geometry.dispose()
            cubeObject.material.dispose()
            if (evaluateStatus === true){
                desiredObjects -= 1;
                gameOver(); 
            }
            scene.remove(newCube);
            cancelAnimationFrame( af );
        }

        if (yDif < 3 && yDif > -3 && xDif < 3 && xDif > -3){
                points += newCube.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                cubeAudio.play();
                newCube.userData.pointsValue = 0 ;
                breakOpen(myColor, newCube.position.x, newCube.position.y)
                cubeObject.geometry.dispose()
                cubeObject.material.dispose()
                if (evaluateStatus === true){
                    desiredObjects -= 1;
                    gameOver(); 
                }
                cancelAnimationFrame( af );
                scene.remove(newCube); 
        }
    }
    
    animate();
  }
    }