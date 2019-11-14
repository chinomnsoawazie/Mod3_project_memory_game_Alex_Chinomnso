
const starColors = ["#ff618b", "#39ff14", "#5efdff", "#0026ff", "#f000ff"];

function randomStarColor(colors) {
    return starColors[Math.floor(Math.random() * colors.length)];
 }

function createBackground(){

    let myColor = randomStarColor(starColors)
	var geometry	= new THREE.PlaneGeometry( 3, 3, 32 );
	var material	= new THREEx.createAtmosphereMaterial({
		color	: new THREE.Color(myColor)
    })
    material.uniforms.glowColor.value	= new THREE.Color(myColor)
    material.uniforms.coeficient.value	= 1.5
	material.uniforms.power.value		= 0.6
	var mesh	= new THREE.Mesh( geometry, material );
	var glowMesh	= new THREEx.GeometricGlowMesh(mesh)
    mesh.add(glowMesh.object3d)
    scene.add( mesh );
    
    mesh.position.y = Math.random() * 500 - 250;
    mesh.position.x = Math.random() * 1100 - 550;
    mesh.position.z = -350 + (Math.random() * -100);

function animate() {
    requestAnimationFrame(animate)     
    mesh.rotation.y += 0.00006;
    mesh.rotation.x += 0.00006;
}
 animate();
}

