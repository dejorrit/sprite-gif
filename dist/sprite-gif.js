!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SpriteGif=e():t.SpriteGif=e()}(window,function(){return function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return s});const r={autostart:!0,frameRate:30,loop:!0,speed:1};class s{constructor(t,e){if(this.el=t,this.settings=Object.assign({},r,e),!e.sprite)throw new Error("no sprite defined");this.isPlaying=!1,this.width=this._getWidth(),this.height=this._getHeight(),this._animate=this._animate.bind(this),this._onSpriteLoaded=this._onSpriteLoaded.bind(this),this._loadSprite().then(t=>{this._onSpriteLoaded(t)})}play(){this.isPlaying||(this.isPlaying=!0,this.currentFrame===this.frames&&this._renderFrame(0),this._resetLastFrameTime(),this._requestAF())}pause(){this.isPlaying&&(this.isPlaying=!1,this._cancelAF())}stop(){this._stopAtEnd(),this._renderFrame(0)}setLoop(t){if("boolean"!=typeof t)throw new Error("loop setting not of type Boolean");this.settings.loop=t}setSpeed(t){if("number"!=typeof t)throw new Error("speed setting not of type number");this.settings.speed=t}setFrameRate(t){if("number"!=typeof t)throw new Error("frameRate not of type number");this.settings.frameRate}_loadSprite(){return new Promise((t,e)=>{let i=new Image;i.onload=(()=>i.naturalWidth?t(i):e()),i.src=this.settings.sprite})}_onSpriteLoaded(t){let e=this.height/t.naturalHeight;this.frames=t.naturalWidth*e/this.width,this._insertSprite(),this._renderFrame(0),this.settings.autostart&&this.play()}_insertSprite(){this.el.style.backgroundImage=`url('${this.settings.sprite}')`,this.el.style.backgroundSize="auto 100%"}_animate(t){this.lastFrameTime||(this.lastFrameTime=t);let e=1e3/(this.settings.frameRate*this.settings.speed),i=t-this.lastFrameTime;i>e&&(this.lastFrameTime=t,this._renderFrame(this.currentFrame+Math.round(i/e))),this.currentFrame>=this.frames?this._onEnd():this._requestAF()}_onEnd(){this.settings.loop?(this._renderFrame(0),this._requestAF()):this._stopAtEnd()}_stopAtEnd(){this.isPlaying=!1,this._resetLastFrameTime(),this._cancelAF()}_requestAF(){this.raf=window.requestAnimationFrame(this._animate)}_cancelAF(){this.raf&&window.cancelAnimationFrame(this.raf)}_renderFrame(t){t=Math.min(t,this.frames),this.el.style.backgroundPositionX=`-${t*this.width}px`,this.el.style.backgroundPositionY="0px",this.currentFrame=t}_resetLastFrameTime(){this.lastFrameTime=null}_getWidth(){return this.el.offsetWidth}_getHeight(){return this.el.offsetHeight}}}])});