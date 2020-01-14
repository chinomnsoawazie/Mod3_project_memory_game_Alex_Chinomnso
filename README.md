## Shape Buster

Welcome to Shape Buster, the game where you test your ability to remember instructions. Here are a few things you should keep in mind.

### How to Play

- Sign up or log in to get started
  - Game will start automatically after logging in
- Move your shape to the falling objects in order to break them open
- You will see a display on the lefthand side of the screen that tells you which shapes to hit
  - For example, you may need to hit all the *blue* objects, or all the *cubes*, or all the *blue cubes*
- Hit the correct objects and you will gain points
- Hit the wrong objects and you will lose points
- The falling face cards are worth 50 bonus points!

### How to Test

- To run this beta version on your machine...
  1. Clone this repository
  2. cd into the backend/ folder and run any necessary Rails migrations (backend was created with PostgreSQL)
    * rails db:create
    * rails db:migrate 
    * rails s
  3. Go back to the root directory (cd ..) and then cd into the front_end folder
  4. Open index.html in your web browser

### Glossary
* Canvas: HTML element used to draw graphics on a web page; used to render 3D shapes with Three.js
* Scene: The "world" rendered by Three.js inside of the canvas; includes booth seen and unseen items (for example, items that are behind the camera)
* Camera: The point of view which the Three.js scene is viewed by the user

### Technologies
* Ruby on Rails
* Three.js
* JavaScript
* PostgreSQL
* CSS

## Project Description

##### Overview:
Because Three.js objects are not HTML elements, the game logic relies on the render() method to check the position of each falling shape relative to the player-controlled shape 60 times per second. Take a sphere with a radius of 3, for example. If the player's object is 6 units away (because the player's movable shape would also have a radius of 3), then a contact event has occurred and the shape will break open and add or subtract from the players total points.

The "match profile" - or the parameters which the player is expected to match to - is randomly selected from an array of predefined colors and shapes. As the levels increase, the players will have to match by both shape *and* color, rather than just shape *or* color. Each falling shape is ascribed its own color and shape randomly. If the player contacts a falling object with their movable object, the points value will be determined (whether negative or positive) based on the match profile.

The Camera remains fixed in this game. As soon as the shapes fall off screen, they are removed from the Scene to imrpove performance.

The "stars" in the background are also 3D shapes that are positioned far away from the Camera on the Z axis and have a slight glowing effect.

##### Challenges:
We elected not to use JWT authentication for this project, since there is absolutely no sensitive information being used. While this simplified the process of development and allowed us to focus on rendering beautiful shapes and employing accurate game logic, it would be a hinderance if we wanted to release this game to the public. 

## TODO 
* Add JWT auth for better security
* Add additional shapes, colors, and bonus features to make the game more exciting
* Allow users to sign up using an email address or Facebook account
* Release game to public hosted on Facebook
