var coneAudio = new Audio('assets/GlassBreak.ogg');

function createCone(color, isSlider){
    // create shape

    var coneGeometry = new THREE.ConeBufferGeometry( 2, 3, 32 );

    let myColor = color
    if (myColor === undefined) {
    myColor = randomColor()
    }

    var coneMaterial = new THREE.MeshPhongMaterial( {color: myColor} );
    var newCone = new THREE.Mesh( coneGeometry, coneMaterial );
    newCone.name = `${myColor} cone`
    scene.add( newCone );

    newCone.position.x = Math.random() * 40 - 20;
    // newCone.position.y = Math.random() * 40 + 15;
    newCone.position.y = 15
    newCone.userData.pointsValue = 0
    newCone.userData.colorMatch = false
    newCone.userData.shapeMatch = false
    newCone.userData.type = "cone"
    
    //check color
    if (matchProfile.color === ""){
        newCone.userData.colorMatch = true;
    } else if (matchProfile.color === myColor) {
        newCone.userData.colorMatch = true;
    } else {
        newCone.userData.colorMatch = false;
    }
    //check shape
    if (matchProfile.shape === ""){
        newCone.userData.shapeMatch = true;
    } else if (matchProfile.shape === newCone.userData.type) {
        newCone.userData.shapeMatch = true;
    } else {
        newCone.userData.shapeMatch = false;
    }
    //evaluate points value
    if (newCone.userData.colorMatch && newCone.userData.shapeMatch){
        newCone.userData.pointsValue = 10;
    } else {
        newCone.userData.pointsValue = -10;
    }
    
    scene.add( newCone );
    var coneObject = scene.getObjectByName( newCone.name );
    let af;

    if (isSlider === true){
        slider = newCone
        slider.position.x = -12
    }

    if (isSlider === undefined){ //if its NOT a slider, we animate it
    
    const animate = () => {
        af = requestAnimationFrame(animate)

        newCone.rotation.x += 0.06
        newCone.rotation.y += 0.06
        newCone.position.y -= 0.1

        var xDif = slider.position.x - newCone.position.x
        var yDif = slider.position.y - newCone.position.y
        var deathY = -17

        if (newCone.position.y <= deathY) {
            // breakOpen(myColor, newCone.position.x, newCone.position.y)
            // coneAudio.play();
            coneObject.geometry.dispose()
            coneObject.material.dispose()
            if (evaluateStatus === true){
                desiredObjects -= 1;
                gameOver(); 
            }
            scene.remove(newCone);
            cancelAnimationFrame( af );
        }

        if (yDif < 3 && yDif > -3 && xDif < 3 && xDif > -3) {
                points += newCone.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                coneAudio.play();
                newCone.userData.pointsValue = 0 ;
                breakOpen(myColor, newCone.position.x, newCone.position.y)
                coneObject.geometry.dispose()
                coneObject.material.dispose()
                if (evaluateStatus === true){
                    desiredObjects -= 1;
                    gameOver(); 
                }
                cancelAnimationFrame( af );
                scene.remove(newCone);
        }
    }
    
    animate();
  }
    }