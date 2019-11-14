
var sphereAudio = new Audio('assets/minecraft.ogg');

function createSphere(color, isSlider){
    // create shape
    var sphereGeometry = new THREE.SphereGeometry( 2, 32, 32 );
    // create material, color, or image texture
    
    let myColor = color //if color is not defined, get random color
    if (myColor === undefined) {
    myColor = randomColor()
    }
    
    var sphereMaterial = new THREE.MeshPhongMaterial ( {color: myColor, wireframe: false} );
    var newSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    newSphere.name = `${myColor} sphere`;

    
    newSphere.position.x = Math.random() * 40 - 20;
    // newSphere.position.y = Math.random() * 40 + 15;
    newSphere.position.y = 15
    newSphere.userData.pointsValue = 0
    newSphere.userData.colorMatch = false
    newSphere.userData.shapeMatch = false
    newSphere.userData.type = "sphere"

    //check color
    if (matchProfile.color === ""){
        newSphere.userData.colorMatch = true;
    } else if (matchProfile.color === myColor) {
        newSphere.userData.colorMatch = true;
    } else {
        newSphere.userData.colorMatch = false;
    }
    //check shape
    if (matchProfile.shape === ""){
        newSphere.userData.shapeMatch = true;
    } else if (matchProfile.shape === newSphere.userData.type) {
        newSphere.userData.shapeMatch = true;
    } else {
        newSphere.userData.shapeMatch = false;
    }
    //evaluate points value
    if (newSphere.userData.colorMatch && newSphere.userData.shapeMatch){
        newSphere.userData.pointsValue = 10;
    } else {
        newSphere.userData.pointsValue = -10;
    }

    scene.add( newSphere );
    var sphereObject = scene.getObjectByName( newSphere.name );
    // console.log(sphereObject.position)

    let af; //this will be assigned to the animation frame to be cancelled later

    if (isSlider === true){ //the slider becomes the object
        slider = newSphere
        slider.position.x = -12
    }

   if (isSlider === undefined){
    const animate = () => {
        af = requestAnimationFrame(animate)
 
        newSphere.rotation.x += 0.04
        newSphere.rotation.y += 0.04
        newSphere.position.y -= 0.1

        var xDif = slider.position.x - newSphere.position.x
        var yDif = slider.position.y - newSphere.position.y
        var deathY = -17

        if (newSphere.position.y <= deathY) {
            // breakOpen(myColor, newSphere.position.x, newSphere.position.y)
            // sphereAudio.play()
            sphereObject.geometry.dispose()
            sphereObject.material.dispose()
            if (evaluateStatus === true){
                desiredObjects -= 1;
                gameOver(); 
            }
            scene.remove(newSphere);
            cancelAnimationFrame( af );
        }


        // if (newSphere.position.y < -8.5 && newSphere.position.y > -12.5 && (slider.position.x + 3) > newSphere.position.x && (slider.position.x - 3) < newSphere.position.x) {
            if (yDif < 3 && yDif > -3 && xDif < 3 && xDif > -3) {  
                points += newSphere.userData.pointsValue
                pointsDisplay.innerText = `${points} points`
                sphereAudio.play();
                newSphere.userData.pointsValue = 0 ;
                breakOpen(myColor, newSphere.position.x, newSphere.position.y)
                sphereObject.geometry.dispose()
                sphereObject.material.dispose()
                if (evaluateStatus === true){
                    desiredObjects -= 1;
                    gameOver(); 
                }
                cancelAnimationFrame( af );
                scene.remove(newSphere);  
            } 

        
    }
    
    animate();
  }
    }