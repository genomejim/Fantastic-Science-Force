//create objects to use as associative arrays 
var chars = new Object;
var npcs = new Object;
var scenes = new Object;
var projectiles = new Object;

/* cheat sheet for initializing characters,npcs,enemies
character_location
                     draw,x,y,scene,

appearance           
                     height,width,src,defeated_src,suit
base_stats
                     speed,role,text,contact,xp,
combat_stats
                     state,hp,max_hp,hp_regen_rate,hp_regen_baseline,shield,max_shield,shield_regen_rate,
                     ammo,beam,beam_damage,melee_damage
*/

//generic base and combat stats
var npc_base_appearance = new appearance (96,96,"./content/images/redshirt.png","./content/images/redshirt.png","labcoat")
var npc_base_stats= new base_stats(1,"npc","hi",false,0);
var npc_combat_stats = new combat_stats("active",0,0,0,0,0,0,0,0,false,0,0);


//character
var jim_loc = new character_location(true,50,505,"lobby");
var jim_appearance = new appearance(96,96,"./content/images/jim_right.png","./content/images/jim_defeated.png","labcoat");
var jim_stats= new base_stats(10,"hero","rawr",false,0);
var jim_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

var jim = new character (jim_loc,jim_appearance,jim_stats,jim_combat_stats);
chars.jim = jim;


//enemies - Lab level 
var ninja_appearance = new appearance(96,96,"./content/images/ninja_left.png","./content/images/ninja_defeated.png","ninja");
var ninja_base_stats = new base_stats(2,"enemy","HIIIIYAGH",false,50);
var ninja_combat_stats = new combat_stats("active",50,50,0,0,0,0,0,1,false,0,2);

var ninja_loc = new character_location(false,500,505,"elevator");
var ninja = new character(ninja_loc, ninja_appearance,ninja_base_stats, ninja_combat_stats);
var ninja2_loc = new character_location(false,700,511,"elevator");
var ninja2 = new character(ninja2_loc, ninja_appearance, ninja_base_stats, ninja_combat_stats);
var ninja3_loc = new character_location(false,400,413,"lab1");
var ninja3 = new character(ninja3_loc, ninja_appearance,ninja_base_stats, ninja_combat_stats);
var ninja4_loc = new character_location(false,500,505,"lab1");
var ninja4 = new character(ninja4_loc, ninja_appearance,ninja_base_stats, ninja_combat_stats);
var ninja5_loc = new character_location(false,600,513,"lab2");
var ninja5 = new character(ninja5_loc, ninja_appearance,ninja_base_stats, ninja_combat_stats);
var ninja6_loc = new character_location(false,400,423,"lab2");
var ninja6 = new character(ninja6_loc, ninja_appearance, ninja_base_stats, ninja_combat_stats);

npcs.ninja = ninja;
npcs.ninja2 = ninja2;
npcs.ninja3 = ninja3;
npcs.ninja4 = ninja4;
//npcs.ninja5 = ninja5;
//npcs.ninja6 = ninja6;



var razer_appearance = new appearance(96,96,"./content/images/razer_left.png","./content/images/razer_defeated.png","razer");
var razer_base_stats = new base_stats(1,"enemy","BLOOD!",false,100);
var razer_combat_stats = new combat_stats("active",100,100,1,0,0,0,0,25,true,2,3);
var razer_loc = new character_location(false,700,505,"lab2");
var razer = new character(razer_loc, razer_appearance,razer_base_stats, razer_combat_stats);

npcs.razer = razer;


//enemies - Ninja Palace Level
var np2_trigger_loc = new character_location(false,400,505,"ninja_palace2");
var trigger_appearance = new appearance(96,96,"./content/images/trigger.png","./content/images/trigger.png","trigger");
var np2_trigger_base_stats = new base_stats(0,"quest","GET EM!",false,0);
var np2_trigger = new character(np2_trigger_loc, trigger_appearance, np2_trigger_base_stats, npc_combat_stats);

npcs.np2_trigger = np2_trigger;

var grey_ninja_appearance = new appearance
(96,96,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png","grey_ninja");
var grey_ninja_base_stats = new base_stats(1,"enemy","HIIIIYAGH",false,75);
var grey_ninja_combat_stats = new combat_stats("active",75,75,0,0,0,0,0,2,false,0,3);

var palace_ninja_loc = new character_location(false,500,511,"ninja_palace");
var palace_ninja = new character(palace_ninja_loc,grey_ninja_appearance, grey_ninja_base_stats, grey_ninja_combat_stats);
var palace_ninja2_loc = new character_location(false,25,511,"monster_closet");
var palace_ninja2 = new character(palace_ninja2_loc,grey_ninja_appearance, grey_ninja_base_stats, grey_ninja_combat_stats);
var palace_ninja3_loc = new character_location(false,700,511,"monster_closet");
var palace_ninja3 = new character(palace_ninja3_loc,grey_ninja_appearance, grey_ninja_base_stats, grey_ninja_combat_stats);

npcs.palace_ninja = palace_ninja;
npcs.palace_ninja2 = palace_ninja2;
npcs.palace_ninja2.ammo = 10;
npcs.palace_ninja2.speed = 0;
npcs.palace_ninja3 = palace_ninja3;

var ironman_appearance = new appearance(96,96,"./content/images/ironman_left.png","./content/images/ironman_defeated.png","ironman");
var ironman_loc = new character_location(false,800,511,"ninja_palace3");
var ironman_base_stats = new base_stats(1,"enemy","Repulsor Blast!",false,100);
var ironman_combat_stats = new combat_stats("active",100,100,1,0,0,0,0,100,true,2,3);
var ironman = new character(ironman_loc,ironman_appearance, ironman_base_stats, ironman_combat_stats);

npcs.ironman = ironman;

//npcs

var redshirt_loc = new character_location(true,500,505,"lobby");
var redshirt = new character(redshirt_loc, npc_base_appearance,npc_base_stats, npc_combat_stats);

var annie_loc = new character_location(true,400,505,"lobby");
var annie_appearance = new appearance(96,96,"./content/images/annie.png","./content/images/annie.png","labcoat");
var annie_base_stats= new base_stats(1,"quest","Save the Lemur!",false,0)
var annie = new character(annie_loc, annie_appearance,annie_base_stats, npc_combat_stats);

var pogo_loc = new character_location(false,500,275,"launch");
var pogo_appearance = new appearance(256,256,"./content/images/pogo.png","./content/images/pogo.png","pogo");
var pogo_base_stats = new base_stats(-1,"quest","RRRRUMBLE",false,0);
var pogo = new character(pogo_loc,pogo_appearance,pogo_base_stats,npc_combat_stats);

var meepo_loc = new character_location(false,600,505,"lab2");
var meepo_appearance = new appearance(96,96,"./content/images/meepo.png","./content/images/meepo.png","lemur");
var meepo_base_stats = new base_stats(0,"quest","",false,0);
var meepo = new character(meepo_loc,meepo_appearance,meepo_base_stats,npc_combat_stats);


//var bunny = new character (true,10,600,505,"./content/images/bunny.png","./content/images/bunny.png",96,'lobby','tutorial',50,'active','press space for Science beam!');

npcs.redshirt = redshirt;
npcs.annie = annie;
npcs.meepo = meepo;
npcs.pogo = pogo;

//npcs.ninja_palace2_trigger = ninja_palace2_trigger;

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

