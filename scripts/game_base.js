//big mess of inits that needs to get broken out up top

//create an object to use as an associative array to store characters
var chars = new Object;

//create an object to use as an associative array to store npcs
var npcs = new Object;

//create an object to use as an associative array to store scenes
var scenes = new Object;

//create an object to use as an associative array to store enemies
var enemies = new Object;

//instantiate character and stuff him in the associative array chars
var jim = new character (true,10,50,505,"./content/images/meepo.png",96,'lobby');
chars.jim = jim;
var spidey = new character (false,10,120,505,"./content/images/spidey.png",96,'lobby');
chars.spidey = spidey;

//instantiate enemies and stuff them in the associative array enemies (and npcs for now)
var ninja = new character (false,10,220,505,"./content/images/ninja_left.png",96,'elevator');
var ettrigan = new character (false,10,220,505,"./content/images/ettrigan.png",96,'lab1');
enemies.ninja = ninja;
npcs.ninja = ninja;
npcs.ettrigan = ettrigan;

//instantiate npcs and stuff them in the associative array npcs
var redshirt = new character (true,10,300,500,"./content/images/redshirt.png",96,'lobby');
var blueshirt = new character (true,10,700,500,"./content/images/female_blueshirt.png",96,'lobby');
var armor = new character (true,10,600,505,"./content/images/jim_left_white_armor.png",96,'lobby');
npcs.redshirt = redshirt;
npcs.blueshirt = blueshirt;
npcs.armor = armor;

//instantiate scenes and stuff them in the associative array scenes
var lobby = new scene(true,'lobby',"./content/images/lobby.png",'none','elevator',true);
var elevator = new scene(false,'elevator',"./content/images/elevator.png",'lobby','elevator_interior');
var elevator_interior = new scene(false,'elevator_interior',"./content/images/elevator_interior.png",'elevator','lab1');
var lab1 = new scene(false,'lab1',"./content/images/lab1.png",'elevator_interior','lab2');
var lab2 = new scene(false,'lab2',"./content/images/lab2.png",'lab1','none');

scenes.lobby = lobby;
scenes.elevator = elevator;
scenes.elevator_interior = elevator_interior;
scenes.lab1 = lab1;
scenes.lab2 = lab2;

//instantiate the walkbox
var box = new walkbox(750,200,0,400);

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


game_base.run = function () {
    game_base.update();
    game_base.draw();
}


game_base.update = function(event) {

//play song the first time the player enters the lobby
if (lobby.play_intro == true) {
	snd_lobby.play();
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
//    blueshirt.x = blueshirt.x -1;
    armor.x = armor.x - 2;
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
            if (npcs[i].draw){
                _canvasBufferContext.drawImage(npcs[i].img, npcs[i].x, npcs[i].y);
            }   
        }
        
        //draw active characters from the associative array

        for (var i in chars){
            if (chars[i].draw){
                _canvasBufferContext.drawImage(chars[i].img, chars[i].x, chars[i].y);
            }
                
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
            jim.img.src = "./content/images/jim_left.png";
        }
        break;


        case 68: // D
        if (jim.x < box.xorigin + box.xsize){
            jim.x = jim.x + jim.speed;
            jim.img.src = "./content/images/meepo.png";
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
