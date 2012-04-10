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
document.onkeydown = move;

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


game_base.run = function () {
    game_base.update();
    game_base.draw();
}


game_base.update = function(event) {

//play song the first time the player enters the lobby
if (lobby.play_intro == true) {
	//snd_lobby.play();
	lobby.play_intro = false;
    }
//transition to scene to the right
    if (jim.x > _canvas.width - 75  ) {
        for (var i in scenes){
            if (scenes[i].draw && scenes[i].right_transition != 'none') {
                scenes[i].draw = false;
                scenes[scenes[i].right_transition].draw = true;
                chars.jim.x = 50;
                for (var j in npcs){
                    if (npcs[j].scene == scenes[i].right_transition) {
                        npcs[j].draw = true;
                    } else { 
                        npcs[j].draw = false;
                    } 
                }
                break;
            }
        }
//transition to scene to the left
    } else if (jim.x < 2) {
        for (var i in scenes){
            if (scenes[i].draw && scenes[i].left_transition != 'none') {
                scenes[i].draw = false;
                scenes[scenes[i].left_transition].draw = true;
                chars.jim.x = 700;
                for (var j in npcs){
                    if (npcs[j].scene == scenes[i].left_transition) {
                        npcs[j].draw = true;
                    } else { 
                        npcs[j].draw = false;
                    } 
                }
                break;
            }
        }
    }      

//update npcs positions
    redshirt.x = redshirt.x + 1;
    armor.x = armor.x - 2;


//check for combat
    for (var i in npcs){
        if (npcs[i].draw && npcs[i].type == 'enemy' && npcs[i].state == 'active' && chars.jim.state == 'active'){
            //entering combat
            if (chars.jim.x > npcs[i].x +50) {
                npcs[i].x = npcs[i].x + npcs[i].speed;
            } else if (chars.jim.x < npcs[i].x -50) {
                npcs[i].x = npcs[i].x - npcs[i].speed;
            }
            if (chars.jim.y > npcs[i].y) {
                npcs[i].y = npcs[i].y + npcs[i].speed;
            } else if (chars.jim.y < npcs[i].y) {
                npcs[i].y = npcs[i].y - npcs[i].speed;
            }
            if (Math.abs(chars.jim.x - npcs[i].x) < 100) {
                snd_hit.play();
                chars.jim.hp = chars.jim.hp - 2;
                if (chars.jim.state == 'active'){
                    npcs[i].hp = npcs[i].hp -2;
                }                
            }
            if (chars.jim.hp < 0){
                chars.jim.state = 'defeated';
                //chars.jim.img.src = "./content/images/jim_defeated.png";
            }
            if (npcs[i].hp < 0){
                 npcs[i].state = 'defeated';
                 //need to allow for enemie specific defeated sprite
                 //npcs[i].img.src = "./content/images/ninja_defeated.png";
                 //npcs[i].img.src = "./content/images/alien_defeated.png";
                 chars.jim.xp = chars.jim.xp + 50;
		 chars.jim.hp = chars.jim.hp + 10;
            }
                
        }
    }
    if (chars.jim.hp < 25 && chars.jim.state != 'defeated'){
        chars.jim.hp = chars.jim.hp + 1;
    } 
}

game_base.draw = function() {
        
        //clear the canvas and the buffer for the next frame
	_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);

        //draw active scene        
        for (var i in scenes){
            if (scenes[i].draw){
                _canvasBufferContext.drawImage(scenes[i].img, 0, 0);       
            }       
        }
        
        //draw active npcs

        for (var i in npcs) {
            if (npcs[i].draw && npcs[i].state != 'defeated'){
                _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x, npcs[i].y);
            } else if (npcs[i].draw && npcs[i].state == 'defeated'){
                _canvasBufferContext.drawImage(npcs[i].img_defeated, npcs[i].x, npcs[i].y);
            }   
        }
        
        //draw active characters from the associative array

        for (var i in chars){
            if (chars[i].draw && chars[i].state != 'defeated'){
                _canvasBufferContext.drawImage(chars[i].img, chars[i].x, chars[i].y);
            } else if (chars[i].draw && chars[i].state == 'defeated'){
                _canvasBufferContext.drawImage(chars[i].img_defeated, chars[i].x, chars[i].y);
            }    
        }
        //combat text
        for (var i in npcs) {
            if (npcs[i].draw && npcs[i].type == 'enemy'){
                _canvasBufferContext.fillStyle    = '#f00';
                _canvasBufferContext.fillText(npcs[i].hp, npcs[i].x + 25, npcs[i].y - 50);
            }   
        }
       //check for npc text
        for (var i in npcs){
            if (npcs[i].draw && npcs[i].type == 'quest' && npcs[i].state == 'active' && chars.jim.state == 'active'){
            //entering quest
                if (Math.abs(chars.jim.x - npcs[i].x) < 100) {
                    //snd_hit.play();
                    _canvasBufferContext.fillStyle = '#aaa';
                    _canvasBufferContext.fillRect(npcs[i].x - 100, npcs[i].y - 75, 200, 25);
                    _canvasBufferContext.fillStyle    = '#00f';
                    _canvasBufferContext.fillText(npcs[i].text, npcs[i].x - 100, npcs[i].y - 75);
                    if (npcs[i].scene == 'lab2'){
                        npcs.blueshirt.text = 'Thanks for saving the Lemur!';
                    }
                }
            }
        }
        _canvasBufferContext.fillStyle    = '#0f0';
        _canvasBufferContext.fillText(chars.jim.hp, chars.jim.x + 40, chars.jim.y - 50);
        _canvasBufferContext.fillText('xp = ', 0, 0);
        _canvasBufferContext.fillText(chars.jim.xp, 50, 0);
        _canvasBufferContext.fillText('ammo = ', 200, 0);
        _canvasBufferContext.fillText(chars.jim.ammo, 270, 0);
        
        //draw the science beam
        if (chars.jim.beam && chars.jim.ammo > 0){
            for (var i in npcs) {
                if (npcs[i].draw && npcs[i].type == 'enemy' && npcs[i].state != 'defeated'){
                    npcs[i].hp = npcs[i].hp - .5;
                    chars.jim.ammo = chars.jim.ammo - .5;
                    if (npcs[i].hp % 2) {                   
                    _canvasBufferContext.strokeStyle = '#f00';
                    } else {
                    _canvasBufferContext.strokeStyle = '#ff0';
                    }
                    _canvasBufferContext.lineWidth   = 4;

                    _canvasBufferContext.beginPath();
                    // Start from the top-left point.
                    _canvasBufferContext.moveTo(chars.jim.x + 50, chars.jim.y + 50);                                              _canvasBufferContext.lineTo(npcs[i].x + 50, npcs[i].y + 50);                    
                    _canvasBufferContext.stroke();
            }   
        }

        }

        _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}



function move (event) {


    if (event && chars.jim.state != 'defeated'){
        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
        if (jim.y > box.yorigin){

    
            jim.y = jim.y - jim.speed;
            chars.jim.beam = false;
        } 
    
    break;

        

case 65: // A

        if (jim.x > box.xorigin){
            jim.x = jim.x - jim.speed;
            jim.img.src = "./content/images/jim_left.png";
            chars.jim.beam = false;
        }
        break;


        case 68: // D
        if (jim.x < box.xorigin + box.xsize){
            jim.x = jim.x + jim.speed;
            jim.img.src = "./content/images/jim_right.png";
            chars.jim.beam = false;
        }
    
    break;



        case 83: // S

        if (jim.y < box.yorigin + box.ysize - jim.height){
            jim.y = jim.y + jim.speed;
            chars.jim.beam = false;
        }
        
break;

        case 32: // Space bar : SCIENCE BEAM

        for (var i in npcs) {
        if (npcs[i].draw && npcs[i].type == 'enemy' & chars.jim.ammo > 0){
                    //npcs[i].hp = npcs[i].hp - 25;
                    chars.jim.beam = true;
                    //chars.jim.ammo = chars.jim.ammo -1;
        } 
        }
        break;
}
}


}
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);
