const defaults = {
  autostart: true,
  frameRate: 30,
  loop:      true,
  speed:     1,
}

export default class SpriteGif {
  
  constructor(element, settings) {
    this.el       = element;
    this.settings = Object.assign({}, defaults, settings);
    
    if (!settings.sprite) {
      throw new Error('no sprite defined');
    }
    
    this.isPlaying = false;
    
    this.width  = this._getWidth();
    this.height = this._getHeight();
    
    this._animate        = this._animate.bind(this);
    this._onSpriteLoaded = this._onSpriteLoaded.bind(this);
    
    this._loadSprite().then(sprite => {
      this._onSpriteLoaded(sprite);
    });
  }
  
  play() {
    if (this.isPlaying) {
      return;
    }
    
    this.isPlaying = true;
    
    if (this.currentFrame === this.frames) {
      this._renderFrame(0);
    }
    
    this._resetLastFrameTime();
    this._requestAF();
  }
  
  pause() {
    if (!this.isPlaying) {
        return;
    }
    
    this.isPlaying = false;
    this._cancelAF();
  }
  
  stop() {
    this._stopAtEnd();
    this._renderFrame(0);
  }
  
  setLoop(loop) {
    if (typeof loop !== 'boolean') {
        throw new Error('loop setting not of type Boolean');
    }
    
    this.settings.loop = loop;
  }
  
  setSpeed(speed) {
    if (typeof speed !== 'number') {
      throw new Error('speed setting not of type number');
    }
    
    this.settings.speed = speed;
  }
  
  setFrameRate(frameRate) {
    if (typeof frameRate !== 'number') {
      throw new Error('frameRate not of type number');
    }
    
    this.settings.frameRate;
  }
  
  _loadSprite() {
    return new Promise((resolve, reject) => {
      let sprite = new Image();
      sprite.onload  = () => {
        if (sprite.naturalWidth) {
          return resolve(sprite);
        } else  {
          return reject();
        }
      };
      sprite.src = this.settings.sprite;
    });
  }
  
  _onSpriteLoaded(sprite) {
    let scale = this.height / sprite.naturalHeight;
    this.frames = (sprite.naturalWidth * scale) / this.width;
    this._insertSprite();
    this._renderFrame(0);
    
    if (this.settings.autostart) {
      this.play();
    }
  }
  
  _insertSprite() {
    this.el.style.backgroundImage = `url('${this.settings.sprite}')`;
    this.el.style.backgroundSize  = `auto 100%`;
  }
  
  _animate(timestamp) {
    if (!this.lastFrameTime) {
      this.lastFrameTime = timestamp;
    }
    
    let timePerFrame   = 1000 / (this.settings.frameRate * this.settings.speed);
    let sinceLastFrame = timestamp - this.lastFrameTime;
    
    if (sinceLastFrame > timePerFrame) {
      this.lastFrameTime = timestamp;
      this._renderFrame(this.currentFrame + Math.round(sinceLastFrame / timePerFrame));
    }
    
    if (this.currentFrame >= this.frames) {
      this._onEnd();
    } else {
      this._requestAF();
    }
  }
  
  _onEnd() {
    if (this.settings.loop) {
      this._renderFrame(0);
      this._requestAF();
    } else {
      this._stopAtEnd();
    }
  }
  
  _stopAtEnd() {
    this.isPlaying = false;
    this._resetLastFrameTime();
    this._cancelAF();
  }
  
  _requestAF() {
    this.raf = window.requestAnimationFrame(this._animate);
  }
  
  _cancelAF() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }
  
  _renderFrame(frame) {
    frame = Math.min(frame, this.frames);
    
    this.el.style.backgroundPositionX = `-${(frame * this.width)}px`;
    this.el.style.backgroundPositionY = '0px';
    this.currentFrame = frame;
  }
  
  _resetLastFrameTime() {
    this.lastFrameTime = null;
  }
  
  _getWidth() {
    return this.el.offsetWidth;
  }
  
  _getHeight() {
    return this.el.offsetHeight;
  }
  
}
