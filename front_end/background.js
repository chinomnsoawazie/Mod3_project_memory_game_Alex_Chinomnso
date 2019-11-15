
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
    mesh.rotation.y += 0.06;
    mesh.rotation.x += 0.06;
}
 animate();
}

function createSkybox(){
    var geometry = new THREE.CubeGeometry(1000, 1000, 1000)
    var cubeMaterials = new THREE.MeshPhongMaterial( {color: "black", side: THREE.DoubleSide } );
    var skybox = new THREE.Mesh( geometry, cubeMaterials );
    skybox.userData.name = "skybox"
    skybox.position.z = camera.position.z
    console.log(skybox.material.envMap)
    // skybox.material.envMap = 'reflection' 
    scene.add( skybox );

}