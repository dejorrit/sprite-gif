# Sprite Gif

## Usage

```javascript
import SpriteGif from 'sprite-gif';
 
let gif = new SpriteGif(document.getElementById('myGif'), {
  sprite: './sprite.png',
  autostart: false,
  loop: false,
  speed: 1,
  frameRate: 30,
});
 
gif.play();
gif.pause();
gif.stop();
gif.setLoop(true);
gif.setSpeed(1);
gif.setFrameRate(30);
```