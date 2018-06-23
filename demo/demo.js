import SpriteGif from './../dist/sprite-gif.js';

let myGif       = document.querySelector('.js-my-gif');
let playButton  = document.querySelector('.js-play');
let pauseButton = document.querySelector('.js-pause');
let stopButton  = document.querySelector('.js-stop');
let speedInput  = document.querySelector('.js-speed');

let mySprite = new SpriteGif(myGif, {
  sprite: './sprite.png',
});

playButton.addEventListener('click',  () => mySprite.play());
pauseButton.addEventListener('click', () => mySprite.pause());
stopButton.addEventListener('click',  () => mySprite.stop());
speedInput.addEventListener('input', (event) => {
  mySprite.setSpeed(parseFloat(event.target.value));
});