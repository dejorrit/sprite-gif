# Sprite Gif

## Demo

👉 [Check out the demo ](https://dejorrit.github.io/sprite-gif/demo/)

## Usage

Use a service like [ezgif.com](https://ezgif.com/gif-to-sprite) to create
a sprite from your gif. Make sure you select "Stack horizontally".

```html
<div id="myGif" width="320" height="280"></div>
```

```javascript
import SpriteGif from 'sprite-gif';
 
let gif = new SpriteGif(document.getElementById('myGif'), {
  sprite: './sprite.png',
});
 
gif.play();
gif.pause();
gif.stop();
gif.setLoop(true);
gif.setSpeed(1);
gif.setFrameRate(30);
```

## Options

You can add some optional settings to the settings object:

#### `autostart` (Boolean)
default: `true`

#### `loop` (Boolean)
default: `true`

#### `speed` (Number)
default: `1`

#### `frameRate` (Number)
default: `30`

## Methods

#### `play()`
#### `pause()`
#### `stop()`
#### `setLoop(false)`
#### `setSpeed(2)`
#### `setFrameRate(40)`