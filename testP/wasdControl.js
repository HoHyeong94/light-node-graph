

//import {camera} from './App'

// isn't number better choice?



export var Settings = {
    FASTSPEED: 10,
    LOWSPEED: 1
}

var moveForward = 0;
var moveLeft = 0;
var moveBackward = 0;
var moveRight = 0;
var moveBottom = 0;
var moveTop = 0;

var onKeyDown = function(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = -Settings.LOWSPEED;
      break;
    case 37: // left
    case 65: // a
      moveLeft = -Settings.LOWSPEED;
      break;
    case 40: // down
    case 83: // s
      moveBackward = Settings.LOWSPEED;
      break;
    case 39: // right
    case 68: // d
      moveRight = Settings.LOWSPEED;
      break;
    case 81: // q
      moveBottom = -Settings.LOWSPEED;
      break;
    case 69: // e
      moveTop = Settings.LOWSPEED;
      break;
  }
};
var onKeyUp = function(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = 0;
      break;
    case 37: // left
    case 65: // a
      moveLeft = 0;
      break;
    case 40: // down
    case 83: // s
      moveBackward = 0;
      break;
    case 39: // right
    case 68: // d
      moveRight = 0;
      break;
    case 81: // q
      moveBottom = 0;
      break;
    case 69: // e
      moveTop = 0;
      break;
  }
};
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);

export function WasdMove(camera) {
  camera.translateZ(moveForward);
  camera.translateZ(moveBackward);
  camera.translateX(moveRight);
  camera.translateX(moveLeft);
  camera.translateY(moveTop);
  camera.translateY(moveBottom);
}
