//big mess of inits that needs to get broken out up top

//create an object to use as an associative array to store characters
var chars = new Object;

//create an object to use as an associative array to store npcs
var npcs = new Object;

//create an object to use as an associative array to store scenes
var scenes = new Object;

//create an object to use as an associative array to store enemies
//var enemies = new Object;

//instantiate character and stuff him in the associative array chars
var jim = new character (true,10,50,505,"./content/images/jim_right.png","./content/images/jim_defeated.png",96,'lobby','hero',100,'active', 'rawr',0,200,false);
chars.jim = jim;
//var spidey = new character (false,10,120,505,"./content/images/spidey.png",96,'lobby');
//chars.spidey = spidey;

//instantiate enemies and stuff them in the associative array npcs (for now)
var ninja = new character (false,2,500,505,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'elevator','enemy',50,'active');
var ninja2 = new character (false,2,700,511,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'elevator','enemy',50,'active');
var ninja3 = new character (false,2,400,413,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab1','enemy',50,'active');
//var ettrigan = new characte (false,1,500,505,"./content/images/ettrigan.png",96,'lab1','enemy',50,'active');
var ettrigan = new character (false,1,500,505,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab1','enemy',50,'active');
var ninja4 = new character (false,2,600,513,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab2','enemy',50,'active');
var ninja5 = new character (false,2,400,423,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab2','enemy',50,'active');
var alien = new character (false,1,800,423,"./content/images/alien_left.png","./content/images/alien_defeated.png",96,'lab1','enemy',30,'active');


//enemies.ninja = ninja;
npcs.ninja = ninja;
npcs.ettrigan = ettrigan;
npcs.ninja2 = ninja2;
npcs.ninja3 = ninja3;
npcs.ninja4 = ninja4;
npcs.ninja5 = ninja5;
npcs.alien = alien;

//instantiate npcs and stuff them in the associative array npcs
var redshirt = new character (true,10,300,500,"./content/images/redshirt.png","./content/images/redshirt.png",96,'lobby');
var blueshirt = new character (true,10,600,500,"./content/images/female_blueshirt.png","./content/images/female_blueshirt.png",96,'lobby','quest',50,'active','Save the Lemur!');
var armor = new character (true,10,600,505,"./content/images/jim_left_white_armor.png","./content/images/jim_left_white_armor.png",96,'lobby');
var meepo = new character (false,10,600,505,"./content/images/meepo.png","./content/images/meepo.png",96,'lab2','quest',50,'active','Thanks, Im Saved!');
var bunny = new character (true,10,300,505,"./content/images/bunny.png","./content/images/bunny.png",96,'lobby','quest',50,'active','press space for Science beam!');
npcs.redshirt = redshirt;
npcs.blueshirt = blueshirt;
npcs.armor = armor;
npcs.meepo = meepo;
npcs.bunny = bunny;

//instantiate scenes and stuff them in the associative array scenes
var lobby = new scene(true,'lobby',"./content/images/lobby2.png",'none','elevator',true);
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','lab1');
//var elevator_interior = new scene(false,'elevator_interior',"./content/images/elevator_interior.png",'elevator','lab1');
var lab1 = new scene(false,'lab1',"./content/images/lab1.png",'elevator','lab2');
var lab2 = new scene(false,'lab2',"./content/images/lab2.png",'lab1','none');

scenes.lobby = lobby;
scenes.elevator = elevator;
//scenes.elevator_interior = elevator_interior;
scenes.lab1 = lab1;
scenes.lab2 = lab2;

//instantiate the walkbox
var box = new walkbox(750,100,0,500);

//init sounds
var snd_lobby = new Audio("./content/sounds/lobby.mp3");
var snd_hit = new Audio("./content/sounds/thunder.wav");

//init filthy global variables
game_base.fps = 50;

//event handler for movement
//document.onkeydown = move;

var combat_text = function(){
var text = ' ';
}

//init canvas and buffer
var _canvas = document.getElementById('game_base');
var _canvasContext = null;

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

    _canvasBufferContext.fillStyle    = '#00f';
    _canvasBufferContext.font         = 'bold 15px sans-serif';
    _canvasBufferContext.textBaseline = 'top';
}

