
const starColors = ["#ff618b", "#39ff14", "#5efdff", "#0026ff", "#f000ff"];
//#39ff14 is neon green
//#ff618b is pink
//#5efdff is cyan
//#0026ff is blue
//#f000ff is violet

function randomStarColor(colors) {
    return starColors[Math.floor(Math.random() * colors.length)];
 }

function createBackground(){

    let myColor = randomStarColor(starColors)
	var geometry	= new THREE.PlaneGeometry( 3, 3, 32 );
	// var geometry	= new THREE.TorusGeometry(1-0.25, 0.25);
	// var geometry	= new THREE.SphereGeometry(1, 32, 16);
	// var geometry	= new THREE.CubeGeometry(1,1,1, 10, 10, 10);
	var material	= new THREEx.createAtmosphereMaterial({
		color	: new THREE.Color(myColor)
    })
    material.uniforms.glowColor.value	= new THREE.Color(myColor)
    material.uniforms.coeficient.value	= 1.5
	material.uniforms.power.value		= 0.6
	var mesh	= new THREE.Mesh( geometry, material );
	// mesh.visible	= false
	var glowMesh	= new THREEx.GeometricGlowMesh(mesh)
    mesh.add(glowMesh.object3d)
    scene.add( mesh );
    
    mesh.position.y = Math.random() * 500 - 250;
    mesh.position.x = Math.random() * 1100 - 550;
    mesh.position.z = -350 + (Math.random() * -100);
		
	//////////////////////////////////////////////////////////////////////////////////
	//		create the glowMesh						//
	//////////////////////////////////////////////////////////////////////////////////
	// create a glowMesh
	

	//////////////////////////////////////////////////////////////////////////////////
	//		add dat.GUI for fine tuning					//
	//////////////////////////////////////////////////////////////////////////////////
	
	// setup a datGUI for it
	// var datGUI	= new dat.GUI()
	// new THREEx.addAtmosphereMaterial2DatGui(glowMesh.insideMesh.material, datGUI)	
	// new THREEx.addAtmosphereMaterial2DatGui(glowMesh.outsideMesh.material, datGUI)	


const animate = () => {
    requestAnimationFrame(animate)
        
    mesh.rotation.y += 0.05;
    mesh.rotation.x += 0.05;

    // mesh.position.x = 2*Math.cos(t) + 0;
    // mesh.position.z = 2*Math.sin(t) + 0;
}

animate();


}

