var _canvas = document.getElementById('game');
var _canvasContext = null;

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');


    var x = 10;
    var y = 10;

    _canvasBufferContext.fillStyle = "rgb(0,127,127)";
    _canvasBufferContext.fillRect(x, y, 100, 85);
    
    x += 120;
    _canvasBufferContext.strokeStyle = "rgb(0,0,0)";
    _canvasBufferContext.strokeRect(x, y, 10, 185);
    x = 10;
    y += 120;
    _canvasBufferContext.fillStyle = "rgb(127,255,0)";
    _canvasBufferContext.font = "bold 26px sans-serif";
    _canvasBufferContext.fillText('Test text ', x, y);
    
    y += 20;
    var img = new Image();
    img.src = "./content/images/car.png";
    img.onload = function () {
        _canvasContext.drawImage(img, x, y);
    }

    _canvasContext.drawImage(_canvasBuffer, 0 , 0);
}


