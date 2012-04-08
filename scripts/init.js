init = function() {


//create an object to use as an associative array to store characters
var chars = new Object;

//create an object to use as an associative array to store npcs
var npcs = new Object;

//create an object to use as an associative array to store scenes
var scenes = new Object;

//instantiate character and stuff him in the associative array chars
var jim = new character (true,10,50,505,"./content/images/jim_right.png",96);
chars.jim = jim;


//instantiate npcs and stuff them in the associative array npcs
var redshirt = new character (true,10,300,500,"./content/images/redshirt.png",96);
var blueshirt = new character (true,10,700,500,"./content/images/female_blueshirt.png",96);
var armor = new character (true,10,600,505,"./content/images/jim_left_white_armor.png",96);

npcs.redshirt = redshirt;
npcs.blueshirt = blueshirt;
npcs.armor = armor;

//instantiate scenes and stuff them in the associative array scenes
var lobby = new scene(true,'lobby',"./content/images/lobby.png",'lobby','elevator',true);
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','elevator_interior');
var elevator_interior = new scene(false,'elevator_interior',"./content/images/elevator_interior.png",'elevator','lab1');
var lab1 = new scene(false,'lab1',"./content/images/lab1.png",'elevator_interior','lab2');
var lab2 = new scene(false,'lab1',"./content/images/lab2.png",'lab1','lab2');

scenes.lobby = lobby;
scenes.elevator = elevator;
scenes.elevator_interior = elevator_interior;
scenes.lab1 = lab1;

//instantiate the walkbox
var box = new walkbox(800,200,0,400);

//init sounds
var snd_lobby = new Audio("./content/sounds/lobby.mp3");

//init filthy global variables
game_base.fps = 50;

//event handler for movement
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

var initialized = true;

}