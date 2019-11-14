
let pointsDisplay = document.getElementById("points-display");
let points = 0;
pointsDisplay.innerText = `${points} points`

let matchDisplay = document.getElementById("match-display") 
// matchShape = "sphere"
// matchColor = "purple"

function determineMatchProfile(matchColor, matchShape) {
    let myColor = matchColor
    let myShape = matchShape

    if (myColor === undefined){
        myColor = ""
    }

    if (myShape === undefined){
        myShape = ""
    }
matchProfile = {shape: myShape, color: myColor}
matchDisplay.innerText = `hit all the ${matchProfile.color} ${matchProfile.shape}s`
}
//hardcoding, for now
// determineMatchProfile(matchColor, matchShape);

function buildSignInForm(){
    let signInForm = document.createElement('form');
    signInForm.id = "sign-in-form";

let usernameField = document.createElement('input');
usernameField.id = "username-field";
usernameField.type = "text";
usernameField.name = "username";
usernameField.placeholder = "username..."

let passwordField = document.createElement('input');
passwordField.id = "password-field"
passwordField.type = "password";
passwordField.name = "password";
passwordField.placeholder = "password..."

let loginButton = document.createElement('input');
loginButton.type = 'submit';
loginButton.value = "submit";
loginButton.className = "button";
loginButton.style['background-color'] = 'Transparent';
loginButton.style['font-family'] = 'Pixel Square';
loginButton.style['color'] = 'rgb(0, 255, 0)';
loginButton.style['border-color'] = 'rgb(0, 255, 0)';

let backButton = document.createElement('button');
backButton.innerText = "back";
backButton.className = "button";
backButton.style['background-color'] = 'Transparent';
backButton.style['font-family'] = 'Pixel Square';
backButton.style['color'] = 'rgb(0, 255, 0)';
backButton.style['border-color'] = 'rgb(0, 255, 0)';
backButton.addEventListener('click', () => {
    sphereAudio.play();
    buildControlsDiv();;

})
signInForm.appendChild(usernameField)
signInForm.appendChild(passwordField)
signInForm.appendChild(loginButton)
signInForm.appendChild(backButton)

 controlsDiv.innerHTML = "";
 controlsDiv.appendChild(signInForm);
}

let controlsDiv = document.getElementById("controls-div");

function buildControlsDiv(){
    controlsDiv.innerHTML = "";

    let divider = document.createElement('div')
    divider.className = "divider";

let newUserBtn = document.createElement('button')
newUserBtn.id = "new-player";
newUserBtn.className = "button";
newUserBtn.innerText = "new player";
newUserBtn.style['background-color'] = 'Transparent';
newUserBtn.style['font-family'] = 'Pixel Square';
newUserBtn.style['color'] = 'rgb(0, 255, 0)';
newUserBtn.style['border-color'] = 'rgb(0, 255, 0)';

newUserBtn.addEventListener('click', () => {
    sphereAudio.play();
    buildSignInForm();
    let newUserForm = document.querySelector("#sign-in-form");
    newUserForm.addEventListener('submit', (e) => {
        e.preventDefault()
        //the method here should be post to Users table
    })
    
})

controlsDiv.appendChild(newUserBtn)
controlsDiv.appendChild(divider)

let returningUserBtn = document.createElement('button')
returningUserBtn.id = "returning-player";
returningUserBtn.className = "button";
returningUserBtn.innerText = "returning player";
returningUserBtn.style['background-color'] = 'Transparent';
returningUserBtn.style['font-family'] = 'Pixel Square';
returningUserBtn.style['color'] = 'rgb(0, 255, 0)';
returningUserBtn.style['border-color'] = 'rgb(0, 255, 0)';

returningUserBtn.addEventListener('click', () => {
    sphereAudio.play();
    buildSignInForm();
    let returningUserForm = document.querySelector("#sign-in-form");
    returningUserForm.addEventListener('submit', (e) => {
        //the method here should be GET to Users table
        e.preventDefault()

    })

})

controlsDiv.appendChild(returningUserBtn)
}
buildControlsDiv();

function createContinueMenu(winOrLose){
    controlsDiv.innerHTML = "";
    sphereAudio.play();
    let header = document.createElement('h2');
    header.innerText = `you ${winOrLose}. continue?`
    controlsDiv.appendChild(header)

    let continueButton = document.createElement('button')
    continueButton.id = "continue-button";
    continueButton.className = "button";
    continueButton.innerText = "yes";
    continueButton.style['background-color'] = 'Transparent';
    continueButton.style['font-family'] = 'Pixel Square';
    continueButton.style['color'] = 'rgb(0, 255, 0)';
    continueButton.style['border-color'] = 'rgb(0, 255, 0)';

    continueButton.addEventListener('click', (e) => {
     sphereAudio.play();
        e.preventDefault()
        level += 1
        console.log(level)
        levelDispay.innerText = `level ${level}`
        controlsDiv.innerHTML = "";
        createExitButton();
        createLevel(level)
        console.log(level)

    })
    controlsDiv.appendChild(continueButton)

    createExitButton();

}

function createExitButton(){
    let exitButton = document.createElement('button')
    exitButton.id = "exit-button";
    exitButton.className = "button";
    exitButton.innerText = "exit game";
    exitButton.style['background-color'] = 'Transparent';
    exitButton.style['font-family'] = 'Pixel Square';
    exitButton.style['color'] = 'rgb(0, 255, 0)';
    exitButton.style['border-color'] = 'rgb(0, 255, 0)';

    exitButton.addEventListener('click', (e) => {
     sphereAudio.play();
        e.preventDefault();
        sphereAudio.play();
        location.reload();

    })
    controlsDiv.appendChild(exitButton)
}
