character = function (draw,speed,x,y,src){
this.draw = draw;
this.speed = speed;
this.x = x;
this.y = y;
this.src = src;
this.img = new Image();
this.img.src = src;
}

background = function(screen_name,src) {
this.screen_name = screen_name;
this.img = new Image();
this.img.src = src;
}

//instantiate character
var jim = new character (true,5,100,500,"./content/images/jim.png");

//instantiate background
var back = new background('lobby',"./content/images/lobby.png");

//init filthy global variables
game_base.fps = 50;

//attempts at event handlers
document.onkeydown = move;

//init canvas and buffer
var _canvas = document.getElementById('game_base');
var _canvasContext = null;

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

}

game_base.run = function () {
    
    game_base.update();
    game_base.draw();
    

}

game_base.update = function(event) {

//add ai etc in here

}

game_base.draw = function() {

	_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.drawImage(back.img, 0, 0);
        if (jim.draw == true) {
        _canvasBufferContext.drawImage(jim.img, jim.x, jim.y);	
	}
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}

game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);


function move (event) {


    if (event){
    var key = event.keyCode;

    switch (key) {
    
case 87: // W

    jim.y = jim.y - jim.speed; 
    
break;

    

case 65: // A

    jim.x = jim.x - jim.speed;

    break;



    case 68: // D
    jim.x = jim.x + jim.speed;
    
break;



    case 83: // S

    jim.y = jim.y + jim.speed;
    
break;


    }


}
}

