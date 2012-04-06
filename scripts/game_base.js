//instantiate character
var jim = new character (true,10,50,400,"./content/images/robin.png",150);
//instantiate npc
var redshirt = new character (false,10,300,500,"./content/images/redshirt.png",96);
var blueshirt = new character (false,10,700,500,"./content/images/female_blueshirt.png",96);
var robin = new character (true,10,600,400,"./content/images/batman_left.png",96);


//instantiate scenes (formerly background)
var box = new walkbox(800,200,0,350);
var lobby = new scene(true,'lobby',"./content/images/batcave.png",'lobby','elevator',true);
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','elevator');
var elevator_interior = new scene(false,'elevator_interior',"./content/images/elevator_interior.png",'elevator','lab');

//init sounds
var snd_lobby = new Audio("./content/sounds/lobby.mp3");

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

if (lobby.play_intro == true) {
	snd_lobby.play();
	lobby.play_intro = false;
    }
//add ai, scene transition etc in here
    if (jim.x > _canvas.width -1 && lobby.draw ) {
        //scene transition
	elevator.draw = true;
	lobby.draw = false;
        jim.x = 1;
	redshirt.draw = false;
        blueshirt.draw = false;
        robin.draw = false;
    }else if (jim.x < 1 && elevator.draw){
        elevator.draw = false;
	lobby.draw = true;
	jim.x = _canvas.width -2;
        redshirt.draw = true;
        blueshirt.draw = true;
        robin.draw = true;

    }else if (jim.y < box.yorigin + 1 && jim.x > 325 && elevator.draw){
        elevator.draw = false;
        elevator_interior.draw = true;
        jim.x = 450;
	
    }
    else if (jim.y > 350 && elevator_interior.draw){
        elevator_interior.draw = false;
        elevator.draw = true;
        jim.x = 425;
        //jim.y = box.yorigin + 2;
        jim.y = 400;
    }

    redshirt.x = redshirt.x + 1;
    blueshirt.x = blueshirt.x -1;
    //robin.x = robin.x - 2;
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
        
        //draw active npcs
        if (redshirt.draw == true) {
            _canvasBufferContext.drawImage(redshirt.img, redshirt.x, redshirt.y);	
	}
        if (blueshirt.draw == true) {
            _canvasBufferContext.drawImage(blueshirt.img, blueshirt.x, blueshirt.y);	
	}
        if (robin.draw == true) {
            _canvasBufferContext.drawImage(robin.img, robin.x, robin.y);	
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
            jim.img.src = "./content/images/robin.png";
        }
        break;


        case 68: // D
        if (jim.x < box.xorigin + box.xsize){
            jim.x = jim.x + jim.speed;
            jim.img.src = "./content/images/robin.png";
        }
    
    break;



        case 83: // S

        if (jim.y < box.yorigin + box.ysize - jim.height){
            jim.y = jim.y + jim.speed;
        }
        
break;



}
}


}
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);
