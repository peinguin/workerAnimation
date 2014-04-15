var Worker = new Worker("js/worker.js");

var width  = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

var translateX = function(size){
    return (width / 100) * size;
}
var translateY = function(size){
    return (height / 100) * size;
}

var area = {
    x: translateX(10),
    y: translateY(10),
    height: translateY(80),
    width:  translateX(80)
}
var left0 = translateX(10);
var left1 = translateX(30);
var left2 = translateX(50);
var left3 = translateX(70);

var log = document.getElementById('log');
log.style.position = 'absolute';
log.style.left = 0;
log.style.top = 0;
log.style.background = 'rgba(0,0,0,0.85)';
log.style.height = '20px';
log.style.color = 'rgb(255,255,255)';
log.style.overflow = 'hidden';

var log1 = document.getElementById('log1');
log1.style.position = 'absolute';
log1.style.left = 0;
log1.style.top = '25px';
log1.style.height = '20px';
log1.style.background = 'rgba(0,0,0,0.85)';
log1.style.color = 'rgb(255,255,255)';
log1.style.overflow = 'hidden';
console.log = function(text){
    /*var div = document.createElement('span');
    div.innerText = ', ' + text;
    log.appendChild(div);*/
    log.innerText = text;
}
console.log1 = function(text){
   /* var div = document.createElement('span');
    div.innerText = ', ' + text;
    log1.appendChild(div);*/
    log1.innerText = text;
}

window.requestAnimationFrame = (function() {
    return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( callback, element) {
            window.setTimeout(callback, 0);
    };
})();

var draw = function(elements){
    ctx.clearRect(area.x, area.y, area.width, area.height);
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillRect (area.x, area.y, area.width, area.height);

    elements.forEach(function(element){
        var top = translateY(element.top);

        ctx.drawImage(img, left0, top);

        ctx.font="20px Georgia";
        ctx.fillText(element.txt, left1, top);

        ctx.font="30px Verdana";
        ctx.fillText(element.txt, left2, top);

        ctx.font="25px Verdana";
        ctx.fillText(element.txt, left3, top);
    });
}

step = function(){
    var res = recalc();
    console.log1(res.delta);
    draw(res.elements);
    requestAnimationFrame(
        step,
        canvas
    );
}

Worker.onmessage = function (event){
    console.log(event.data.delta);
    draw(event.data.elements);
    requestAnimationFrame(
        function(){
            Worker.postMessage('ready');
        },
        canvas
    );
};

var canvas = document.getElementById('main');

canvas.width = translateX(100);
canvas.height = translateY(100);
canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';

var ctx    = canvas.getContext("2d");
var img    = document.createElement("img");
img.src    = 'img.png';

setTimeout(function(){
    Worker.terminate();
    step();setTimeout(function(){requestAnimationFrame = null;}, 10000);
},10000)
Worker.postMessage('ready');