//create objects to use as associative arrays 
var chars = new Object;
var npcs = new Object;
var scenes = new Object;

/* cheat sheet for initializing characters,npcs,enemies
character_location
                     draw,x,y,scene,
base_stats
                     speed,height,width,
                     src,defeated_src,suit
                     role,text,contact,xp,
combat_stats
                     state,hp,max_hp,hp_regen_rate,hp_regen_baseline,shield,max_shield,shield_regen_rate,
                     ammo,beam,beam_damage,melee_damage
*/

//generic base and combat stats
var npc_base_stats= new base_stats(1,96,96,"./content/images/redshirt.png","./content/images/redshirt.png","labcoat","npc","hi",false,0);
var npc_combat_stats = new combat_stats("active",0,0,0,0,0,0,0,0,false,0,0);

//character
var jim_loc = new character_location(true,50,505,"lobby");
var jim_stats= new base_stats(10,96,96,"./content/images/jim_right.png","./content/images/jim_defeated.png","labcoat","hero","rawr",false,0);
var jim_combat_stats = new combat_stats("active",100,100,1,25,25,25,1,200,false,3,3);

var jim = new character (jim_loc,jim_stats,jim_combat_stats);
chars.jim = jim;

//enemies - Lab level 
var ninja_base_stats = new base_stats(2,96,96,"./content/images/ninja_left.png","./content/images/ninja_defeated.png","ninja","enemy","HIIIIYAGH",false,50)
var ninja_combat_stats = new combat_stats("active",50,50,0,0,0,0,0,0,false,0,2);

var ninja_loc = new character_location(false,500,505,"elevator");
var ninja = new character(ninja_loc, ninja_base_stats, ninja_combat_stats);
var ninja2_loc = new character_location(false,700,511,"elevator");
var ninja2 = new character(ninja2_loc, ninja_base_stats, ninja_combat_stats);
var ninja3_loc = new character_location(false,400,413,"lab1");
var ninja3 = new character(ninja3_loc, ninja_base_stats, ninja_combat_stats);
var ninja4_loc = new character_location(false,500,505,"lab1");
var ninja4 = new character(ninja4_loc, ninja_base_stats, ninja_combat_stats);
var ninja5_loc = new character_location(false,600,513,"lab2");
var ninja5 = new character(ninja5_loc, ninja_base_stats, ninja_combat_stats);
var ninja6_loc = new character_location(false,400,423,"lab2");
var ninja6 = new character(ninja6_loc, ninja_base_stats, ninja_combat_stats);

npcs.ninja = ninja;
npcs.ninja2 = ninja2;
npcs.ninja3 = ninja3;
npcs.ninja4 = ninja4;
npcs.ninja5 = ninja5;
npcs.ninja6 = ninja6;

var razer_base_stats = new base_stats(1,96,96,"./content/images/razer_left.png","./content/images/razer_defeated.png","razer","enemy","BLOOD!",false,100)
var razer_combat_stats = new combat_stats("active",100,100,1,0,0,0,0,100,true,2,3);
var razer_loc = new character_location(false,700,423,"lab2");
var razer = new character(razer_loc, razer_base_stats, razer_combat_stats);

npcs.razer = razer;

//enemies - Ninja Palace Level
var np2_trigger_loc = new character_location(false,400,505,"ninja_palace2");
var np2_trigger_base_stats = new base_stats(0,96,96,"./content/images/trigger.png","./content/images/trigger.png","trigger","quest","GET EM!",false,0);
var np2_trigger = new character(np2_trigger_loc, np2_trigger_base_stats, npc_combat_stats);

var grey_ninja_base_stats = new base_stats(3,96,96,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png","grey_ninja","enemy","HIIIIYAGH",false,75)
var grey_ninja_combat_stats = new combat_stats("active",75,75,0,0,0,0,0,0,false,0,3);

var palace_ninja_loc = new character_location(false,500,511,"ninja_palace");
var palace_ninja = new character(palace_ninja_loc, grey_ninja_base_stats, grey_ninja_combat_stats);
var palace_ninja2_loc = new character_location(false,25,511,"monster_closet");
var palace_ninja2 = new character(palace_ninja2_loc, grey_ninja_base_stats, grey_ninja_combat_stats);
var palace_ninja3_loc = new character_location(false,700,511,"monster_closet");
var palace_ninja3 = new character(palace_ninja3_loc, grey_ninja_base_stats, grey_ninja_combat_stats);



npcs.palace_ninja = palace_ninja;
npcs.palace_ninja2 = palace_ninja2;
npcs.palace_ninja3 = palace_ninja3;

/*

var ironman = new character (false,1,750,423,"./content/images/ironman_left.png","./content/images/ironman_defeated.png",96,'ninja_palace3','enemy',100,'active','Repulsor Blast!!',0,70,true,false,2,'ironman');


(false,2,500,511,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'ninja_palace','enemy',50,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');


var palace_ninja2 = new character (false,2,25,505,"./content/images/grey_ninja_right.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',60,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');
var palace_ninja3 = new character (false,2,800,505,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',70,'active','HIIIIYAH!',0,0,false,false,1,'grey ninja');
var palace_ninja4 = new character (false,2,700,505,"./content/images/grey_ninja_left.png","./content/images/grey_ninja_defeated.png",96,'none','enemy',100,'active','HIIIIYAH!',0,0,false,false,2,'grey ninja');

var pink_ninja = new character (false,.1,700,405,"./content/images/pink_ninja_left.png","./content/images/pink_ninja_defeated.png",96,'ninja_palace3','enemy',100,'active','HIIIIYAH!',0,0,false,false,5,'pink ninja');

//enemies.ninja = ninja;
npcs.palace_ninja1 = palace_ninja1;
npcs.palace_ninja2 = palace_ninja2;
npcs.palace_ninja3 = palace_ninja3;
npcs.palace_ninja4 = palace_ninja4;
npcs.ironman = ironman;
npcs.pink_ninja = pink_ninja;

*/



//npcs

var redshirt_loc = new character_location(true,500,505,"lobby");
var redshirt = new character(redshirt_loc, npc_base_stats, npc_combat_stats);

var annie_loc = new character_location(true,400,505,"lobby");
var annie_base_stats= new base_stats(1,96,96,"./content/images/annie.png","./content/images/annie.png","labcoat","quest","Save the Lemur!",false,0)
var annie = new character(annie_loc, annie_base_stats, npc_combat_stats);

var pogo_loc = new character_location(false,500,275,"launch");
var pogo_base_stats = new base_stats(-1,256,256,"./content/images/pogo.png","./content/images/pogo.png","pogo","quest","RRRRUMBLE",false,0);
var pogo = new character(pogo_loc,pogo_base_stats,npc_combat_stats);

var meepo_loc = new character_location(false,600,505,"lab2");
var meepo_base_stats = new base_stats(0,96,96,"./content/images/meepo.png","./content/images/meepo.png","lemur","quest","",false,0);
var meepo = new character(meepo_loc,meepo_base_stats,npc_combat_stats);


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

