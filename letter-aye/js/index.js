window.onload=function(){
  document.getElementById('settxt').onclick=set;
}
;(function(){
    'use strict';
    var $, wrapper, word;
    var txt = 'V ợ t ươn g l ai  ơi ,    đ ế n  v ới  a n h   đi  !    Đ ế n  c h ậ m  l à e m h ối   h ậ n đ ấ y !';
    var msdn = false; //mouse down?
    var rot = true; //rotating?
    var dM = 30 / 1000; // degree / milisec
    var wn = window;
    init();

    function init(){
        var FPS = 50;
        $ = new createjs.Stage('canv');
        createjs.Touch.enable($, false, true);
        $.snapToPixelEnabled = true;
        wrapper = new createjs.Container();
      $.canvas.width = window.innerWidth;
      $.canvas.height = window.innerHeight
        $.addChild(wrapper).setTransform($.canvas.width / 2, $.canvas.height / 2);
        word = new createjs.Container();
        wrapper.addChild(word);
        $.onMouseUp = function(){
            msdn = false;
        };
        $.onMouseDown = function(){
            msdn = true;
        };
        createjs.Ticker.setFPS(FPS);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.addListener(window);
        go();
    }
    wn.init = init;
    function tick(dt){
        if (msdn){
            set();
        }
        if (rot){
            var r = wrapper.rotation + dM * dt;
            if (r > 360){
                r -= 360;
            }
            wrapper.rotation = r;
        }
        $.update();
    }
    wn.tick = tick;
    function go(){
        word.removeAllChildren();
        wrapper.rotation = 0;
        rot = true;
        var length = 0;
        var size;
        var font = '30px Montserrat, sans-serif';
        if ($.canvas.width > $.canvas.height){
            size = $.canvas.height;
        } else {
            size = $.canvas.width;
        }
        var t = new createjs.Text(txt, font, '#F00');
        var offX = -t.getMeasuredWidth() / 2;
        var offY = -t.getMeasuredHeight() / 2;
        word.setTransform(offX, offY);

        for (var i = 0; i < txt.length; i++){
            var t = new createjs.Text(txt[i], font, 'hsla(8, 100%, 100%, 1)');
            var w = t.getMeasuredWidth();
            var h = t.getMeasuredHeight();
//            t.cache(0, 0, w, h);
            t.snapToPixel = true;
            t.textAlign = 'center';
            t.textBaseline = 'alphabetic';
            if (removeSpace(txt[i]).length){
                var x = Math.random() * size - size / 2;
                var y = Math.random() * size - size / 2;
                var r = Math.random() * 360 - 180;
                var s = Math.random() * 1.5 + 0.5;
                var a = s / 2;
                var shape = new createjs.Shape(t);
                shape.snapToPixel = true;
                shape.startX = length;
                shape.x = x - offX;
                shape.y = y - offY;
                shape.rotation = r;
                shape.scaleX = shape.scaleY = s;
                shape.alpha = a;
                //shadow on canvas can slow down animations.  In this case, rotation is smoother w/o shadow. But I like the depth given.
                shape.shadow = new createjs.Shadow('hsla(0,0%,0%,0.5)', 20, 20, 15);
                word.addChild(shape);
            }
            length += w;
        }
        $.update();
    }
    function set(){
        var t = 800;
        msdn = false;
        rot = false;
        createjs.Tween.get(wrapper).to({ rotation: 0 }, t);
        for (var i = 0; i < word.children.length; i++){
            var c = word.getChildAt(i);
            if (c.startX != undefined){
                createjs.Tween.get(c).to({ rotation: 0, x: c.startX, y: 0, scaleX: 1, scaleY: 1, alpha: 1 }, t);
            }
        }
    }
    wn.set = set;
    function removeSpace(str){
        return str.replace(/[\s]+/g,  '/n');
    }
})();
