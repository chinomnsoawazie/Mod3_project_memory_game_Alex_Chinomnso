
function breakOpen(color, startX, startY){
    var cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );   
    var cubeMaterial = new THREE.MeshPhongMaterial ( {color: color, wireframe: false} );
    var newCube1 = new THREE.Mesh( cubeGeometry, cubeMaterial );
    var newCube2 = new THREE.Mesh( cubeGeometry, cubeMaterial );
    var newCube3 = new THREE.Mesh( cubeGeometry, cubeMaterial );
    var newCube4 = new THREE.Mesh( cubeGeometry, cubeMaterial );
    var newCube5 = new THREE.Mesh( cubeGeometry, cubeMaterial );

    newCube1.position.x = startX
    newCube2.position.x = startX
    newCube3.position.x = startX
    newCube4.position.x = startX
    newCube5.position.x = startX

    newCube1.position.y = startY
    newCube2.position.y = startY
    newCube3.position.y = startY
    newCube4.position.y = startY
    newCube5.position.y = startY

    scene.add(newCube1)
    scene.add(newCube2)
    scene.add(newCube3)
    scene.add(newCube4)
    scene.add(newCube5)

    const animate = () => {
        requestAnimationFrame(animate)
        newCube1.rotation.x += 0.01
        newCube2.rotation.x += 0.05
        newCube3.rotation.x -= 0.02
        newCube4.rotation.x -= 0.08
        newCube5.rotation.x += 0.01

        newCube1.rotation.x += 0.01
        newCube2.rotation.x += 0.05
        newCube3.rotation.x -= 0.02
        newCube4.rotation.x -= 0.08
        newCube5.rotation.x += 0.01

        newCube1.position.x += Math.random()
        newCube2.position.x += Math.random()
        newCube3.position.x -= Math.random()
        newCube4.position.x -= Math.random()
        newCube5.position.x += Math.random()

        newCube1.position.y += Math.random()
        newCube2.position.y -= Math.random()
        newCube3.position.y += Math.random()
        newCube4.position.y -= Math.random()
        newCube5.position.y += Math.random()

        newCube2.position.z += 0.1
        newCube4.position.z += 0.2
    }
    
    animate();

}