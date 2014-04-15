var HEIGHT = 10;
var SPEED = 300;

var elements = (function() {
  var elements = [];
  for(var i = 0; i < 10; i++){
    elements.push({
      txt: 'Text' + i,
      top: i * HEIGHT
    });
  }
  return elements;
})();

var last = (new Date).getTime();

var recalc = function(){
  var delta = (new Date).getTime() - last;
  elements.forEach(function(element){
    element.top += 0.7;//(delta / SPEED) * HEIGHT;
  });
  last = (new Date).getTime();

  elements = elements.map(function(element){
    if(element.top >= 100){
      element.top -= 100;
    }
    return element;
  });

  var elementsToDisplay = elements.filter(function(element){
    if(element.top < 0 || element.top >= 100){
      return false;
    }else{
      return true;
    }
  });

  return {elements:elementsToDisplay,delta:delta};
}

onmessage = function() {
  postMessage(recalc());
}