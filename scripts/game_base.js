//HACK proto quest stuff
//var objective = 'Talk with miss AnniePennie';

story = function(quest){
//this.quest = quest;
this.active_quest = quest;
}

quest = function(objective,state){
this.objective = objective;
this.state = state;
}

//quest states inactive,active,turn_in,complete
var quest_001 = new quest('Talk with miss AnniePennie','active');
var story_001 = new story(quest_001);

//event handler for movement
document.onkeydown = move;

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

//HACK - update npcs positions
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
    //shield regen
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

//draw combat text

        for (var i in npcs) {
            if (npcs[i].draw && npcs[i].type == 'enemy'){
                _canvasBufferContext.fillStyle    = '#f00';
                _canvasBufferContext.fillText(npcs[i].hp, npcs[i].x + 25, npcs[i].y - 50);
            }   
        }

//draw npc text

        for (var i in npcs){
            if (npcs[i].draw && npcs[i].type == 'quest' && npcs[i].state == 'active' && chars.jim.state == 'active'){
            //entering quest
                if (Math.abs(chars.jim.x - npcs[i].x) < 100) {
                    //snd_hit.play();
                    _canvasBufferContext.fillStyle = '#aaa';
                    _canvasBufferContext.fillRect(npcs[i].x - 100, npcs[i].y - 75, 200, 25);
                    _canvasBufferContext.fillStyle    = '#00f';
                    _canvasBufferContext.fillText(npcs[i].text, npcs[i].x - 100, npcs[i].y - 75);
                    //quest hacking
                    if (npcs[i].scene == 'lobby' && story_001.active_quest.state == 'active'){
                        npcs.blueshirt.text = 'Save the Lemur!';
                        story_001.active_quest.objective = 'Save the Lemur!';   
                    } else if (npcs[i].scene == 'lobby' && story_001.active_quest.state == 'turn_in'){
                        story_001.active_quest.objective = 'Quest Complete: Save the Lemur!';
                        
                    }

                    if (npcs[i].scene == 'lab2'){
                        npcs.blueshirt.text = 'Thanks for saving the Lemur!';
                        story_001.active_quest.objective = 'Return to Annie!';
                        story_001.active_quest.state = 'turn_in';    
                    }
                                    }
            }
        }

//draw HUD
        _canvasBufferContext.fillStyle    = '#0f0';
        _canvasBufferContext.fillText(chars.jim.hp, chars.jim.x + 40, chars.jim.y - 50);
        _canvasBufferContext.fillText('xp = ', 0, 0);
        _canvasBufferContext.fillText(chars.jim.xp, 50, 0);
        _canvasBufferContext.fillText('ammo = ', 200, 0);
        _canvasBufferContext.fillText(chars.jim.ammo, 270, 0);
        _canvasBufferContext.fillText('objective = ', 400, 0);
        _canvasBufferContext.fillText(story_001.active_quest.objective, 500, 0);

        
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
                    chars.jim.beam = true;
                    snd_hit.play();
                    } 
        }
        break;
}
}


}
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);
