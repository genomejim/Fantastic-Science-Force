//big mess of inits that needs to get broken out up top

//create an object to use as an associative array to store characters
var chars = new Object;

//create an object to use as an associative array to store npcs
var npcs = new Object;

//create an object to use as an associative array to store scenes
var scenes = new Object;

//create an object to use as an associative array to store enemies
//var enemies = new Object;


//character(draw,speed,x,y,src,defeated_src,height,scene,type,hp,state,text,xp,ammo,beam,contact,melee_damage,suit,shield,width)
//instantiate character and stuff him in the associative array chars
var jim = new character (true,10,50,505,"./content/images/jim_right.png","./content/images/jim_defeated.png",96,'lobby','hero',100,'active', 'rawr',0,200,false,false,3,'labcoat',25,96);
chars.jim = jim;
//var spidey = new character (false,10,120,505,"./content/images/spidey.png",96,'lobby');
//chars.spidey = spidey;

//instantiate enemies and stuff them in the associative array npcs (for now)
var ninja = new character (false,2,500,505,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'elevator','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'black ninja');
var ninja2 = new character (false,2,700,511,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'elevator','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'black ninja');
var ninja3 = new character (false,2,400,413,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab1','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'black ninja');
var ettrigan = new character (false,1,500,505,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab1','enemy',50,'active','HIIIIYAH!',0,0,false,false,1);
var ninja4 = new character (false,2,600,513,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab2','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'black ninja');
var ninja5 = new character (false,2,400,423,"./content/images/ninja_left.png","./content/images/ninja_defeated.png",96,'lab2','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'black ninja');
var alien = new character (false,1,700,423,"./content/images/alien_left.png","./content/images/alien_defeated.png",96,'lab1','enemy',30,'active','GABLARG!!',0,0,false,false,2,'alien');
var razer = new character (false,1,800,423,"./content/images/razer_left.png","./content/images/razer_defeated.png",96,'lab2','enemy',100,'active','RAWR!!',0,100,true,false,2,'razer');

var ironman = new character (false,1,750,423,"./content/images/ironman_left.png","./content/images/ironman_defeated.png",96,'ninja_palace3','enemy',100,'active','Repulsor Blast!!',0,70,true,false,2,'ironman');

var palace_ninja1 = new character (false,2,500,511,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'ninja_palace','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');
var palace_ninja2 = new character (false,2,25,505,"./content/images/grey_ninja_right.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',60,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');
var palace_ninja3 = new character (false,2,800,505,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',70,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');
var palace_ninja4 = new character (false,2,700,505,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',100,'active','HIIIIYAH!',0,0,false,false,2,'grey ninja');

var pink_ninja = new character (false,.1,700,405,"./content/images/pink_ninja_left.png","./content/images/pink_ninja_defeated.png",96,'ninja_palace3','enemy',100,'active','HIIIIYAH!',0,0,false,false,5,'pink ninja');

//enemies.ninja = ninja;
npcs.ninja = ninja;
npcs.ettrigan = ettrigan;
npcs.ninja2 = ninja2;
npcs.ninja3 = ninja3;
npcs.ninja4 = ninja4;
npcs.ninja5 = ninja5;
npcs.alien = alien;
npcs.razer = razer;
npcs.palace_ninja1 = palace_ninja1;
npcs.palace_ninja2 = palace_ninja2;
npcs.palace_ninja3 = palace_ninja3;
npcs.palace_ninja4 = palace_ninja4;
npcs.ironman = ironman;
npcs.pink_ninja = pink_ninja;

//character(draw,speed,x,y,src,defeated_src,height,scene,type,hp,state,text,xp,ammo,beam,contact,melee_damage,suit)
//instantiate npcs and stuff them in the associative array npcs
var redshirt = new character (true,10,300,500,"./content/images/redshirt.png","./content/images/redshirt.png",96,'lobby');
var blueshirt = new character (true,10,300,500,"./content/images/female_blueshirt.png","./content/images/female_blueshirt.png",96,'lobby','quest',50,'active','Save the Lemur!',0,0,false,false);
var armor = new character (true,10,600,505,"./content/images/jim_left_white_armor.png","./content/images/jim_left_white_armor.png",96,'lobby');
var meepo = new character (false,10,600,505,"./content/images/meepo.png","./content/images/meepo.png",96,'lab2','quest',50,'active','Thanks, Im Saved!',0,0,false,false);
var bunny = new character (true,10,600,505,"./content/images/bunny.png","./content/images/bunny.png",96,'lobby','tutorial',50,'active','press space for Science beam!');

var pogo = new character (false,-1,500,275,"./content/images/pogo.png","./content/images/pogo.png",96,'launch','quest',50,'active','Behold the Pogo Plane!',0,0,false,false);

var ninja_palace2_trigger = new character(false,0,400,505,'none','none',0,'ninja_palace2','quest',0,'active','ATTACK!');

npcs.redshirt = redshirt;
npcs.blueshirt = blueshirt;
npcs.armor = armor;
npcs.meepo = meepo;
npcs.bunny = bunny;
npcs.pogo = pogo;
npcs.ninja_palace2_trigger = ninja_palace2_trigger;

//instantiate scenes and stuff them in the associative array scenes
var lobby = new scene(true,'lobby',"./content/images/lobby2.png",'none','elevator',true);
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','lab1');
var lab1 = new scene(false,'lab1',"./content/images/lab1.png",'elevator','lab2');
var lab2 = new scene(false,'lab2',"./content/images/lab2.png",'lab1','none');

var launch = new scene(false,'launch',"./content/images/launch.png",'lab2','none');

var ninja_palace = new scene(false,'ninja_palace',"./content/images/ninja_palace.png",'none','ninja_palace2');
var ninja_palace2 = new scene(false,'ninja_palace2',"./content/images/ninja_palace2.png",'ninja_palace','ninja_palace3');
var ninja_palace3 = new scene(false,'ninja_palace3',"./content/images/ninja_palace_throne.png",'ninja_palace2','none');

scenes.lobby = lobby;
scenes.elevator = elevator;
scenes.lab1 = lab1;
scenes.lab2 = lab2;
scenes.ninja_palace = ninja_palace;
scenes.ninja_palace2 = ninja_palace2;
scenes.ninja_palace3 = ninja_palace3;

//instantiate the walkbox
var box = new walkbox(800,150,0,450);

//init sounds
var snd_lobby = new Audio("./content/sounds/lobby.mp3");
var snd_hit = new Audio("./content/sounds/thunder.wav");

//init filthy global variables
game_base.fps = 50;

//var combat_text = function(){
//var text = ' ';
//}

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

