character = function(draw,speed,x,y,src,height){
this.draw = draw;
this.speed = speed;
this.x = x;
this.y = y;
this.src = src;
this.img = new Image();
this.img.src = src;
this.height = height;
}

walkbox = function(xsize,ysize,xorigin,yorigin) {
this.xsize = xsize;
this.ysize = ysize;
this.xorigin = xorigin;
this.yorigin = yorigin;
}

scene = function(draw,scene_name,src,left_transition,right_transition) {
this.draw = draw;
this.scene_name = scene_name;
this.img = new Image();
this.img.src = src;
this.left_transition = left_transition;
this.right_transition = right_transition;
}

//background = function(screen_name,src) {
//this.screen_name = screen_name;
//this.img = new Image();
//this.img.src = src;
//}

//instantiate character
var jim = new character (true,10,50,500,"./content/images/jim.png",48);

//instantiate scenes (formerly background)
var box = new walkbox(800,100,0,450);
var lobby = new scene(true,'lobby',"./content/images/lobby.png",'lobby','elevator');
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','elevator');
var elevator_interior = new scene(false,'elevator_interior',"./content/images/elevator_interior.png",'elevator','lab');


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

//add ai, scene transition etc in here
    if (jim.x > _canvas.width -1 && lobby.draw ) {
        //scene transition
	elevator.draw = true;
	lobby.draw = false;
        jim.x = 1;
    }else if (jim.x < 1 && elevator.draw){
        elevator.draw = false;
	lobby.draw = true;
	jim.x = _canvas.width -2;
    }else if (jim.y < box.yorigin + 1 && jim.x > 325 && elevator.draw){
        elevator.draw = false;
        elevator_interior.draw = true;
        jim.x = 450;
    }
    else if (jim.y > 499 && elevator_interior.draw){
        elevator_interior.draw = false;
        elevator.draw = true;
        jim.x = 425;
        //jim.y = box.yorigin + 2;
        jim.y = 500;
    }
}

game_base.draw = function() {

	_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);

        //draw active scene        
        if (lobby.draw){
            _canvasBufferContext.drawImage(lobby.img, 0, 0);
        } else if (elevator.draw){
            _canvasBufferContext.drawImage(elevator.img, 0, 0);
        } else if (elevator_interior.draw){
            _canvasBufferContext.drawImage(elevator_interior.img, 0, 0);
        }
        
        //draw active character
        if (jim.draw == true) {
            _canvasBufferContext.drawImage(jim.img, jim.x, jim.y);	
	}
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}



function move (event) {


    if (event){
        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
        if (jim.y > box.yorigin){

    
            jim.y = jim.y - jim.speed;
        } 
    
    break;

        

case 65: // A

        if (jim.x > box.xorigin){
            jim.x = jim.x - jim.speed;
        }
        break;


        case 68: // D
        if (jim.x < box.xorigin + box.xsize){
        jim.x = jim.x + jim.speed;
        }
    
    break;



        case 83: // S

        if (jim.y < box.yorigin + box.ysize - jim.height){
        //if (jim.y < box.yorigin + box.ysize){
            jim.y = jim.y + jim.speed;
        }
        
break;



}
}


}
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);
