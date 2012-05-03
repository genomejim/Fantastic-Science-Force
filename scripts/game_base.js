//Hack projectiles
var projectile_aloft = false;

//event handler for movement
document.onkeydown = down;
document.onkeyup = up;

var pressed_up = false;
var pressed_down = false;
var pressed_right = false;
var pressed_left = false;
var pressed_space = false;

game_base.run = function () {
    game_base.update();
    game_base.draw();
}


game_base.update = function(event) {

//play song the first time the player enters the lobby
    /*
    if (lobby.play_intro == true) {
	//snd_lobby.play();
	lobby.play_intro = false;
    }
    */

//character movement
    if (chars.jim.state != 'defeated' && chars.jim.draw){
        if (pressed_up == true && chars.jim.y > box.yorigin){
            chars.jim.y = chars.jim.y - chars.jim.speed;
        }
        if (pressed_down == true && chars.jim.y < box.yorigin + box.ysize - chars.jim.height){
            chars.jim.y = chars.jim.y + chars.jim.speed;
        }
        if (pressed_left == true && chars.jim.x > box.xorigin){
            chars.jim.x = chars.jim.x - chars.jim.speed;
        }
        if (pressed_right == true && chars.jim.x < box.xorigin + box.xsize - chars.jim.width){
            chars.jim.x = chars.jim.x + chars.jim.speed;
        }
    }

//transition to scene to the right
    if (chars.jim.x > _canvas.width - chars.jim.width  ) {
        for (var i in scenes){
            if (scenes[i].draw && scenes[i].right_transition != "none") {
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
    } else if (chars.jim.x < 1) {
        for (var i in scenes){
            if (scenes[i].draw && scenes[i].left_transition != "none") {
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

//HACK - update npcs positions...ambient movement
    npcs.redshirt.x = npcs.redshirt.x + npcs.redshirt.speed;
//    armor.x = armor.x - 2;


//HACK - level transition
    if (npcs.pogo.contact == true){
        npcs.pogo.y = npcs.pogo.y + npcs.pogo.speed;
        //npcs.pogo.speed = npcs.pogo.speed - .1;
        npcs.pogo.speed = npcs.pogo.speed + (npcs.pogo.speed/50);
        chars.jim.draw = false;
        story_001.active_quest.objective = 'Fly to Ninja Palace';
        //init ninja palace
        if (npcs.pogo.y < -400) {
            scenes.launch.draw = false;
            scenes.ninja_palace.draw = true;
            chars.jim.draw = true;
            chars.jim.x = 100;
            npcs.pogo.contact = false;
            npcs.pogo.draw = false;
            npcs.pogo.role = 'inactive';
            npcs.palace_ninja.draw = true;
            story_001.active_quest.objective = 'Defeat the Grey Ninjas!';           
            pressed_right = false;
        }
    }



//check for combat
    for (var i in npcs){
        if (npcs[i].draw && npcs[i].role == 'enemy' && npcs[i].state == 'active' && chars.jim.state == 'active'){
            //entering combat - enemy movement toward character
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

            //melee combat detection
            if (Math.abs(chars.jim.x - npcs[i].x) < 100 && Math.abs(chars.jim.y - npcs[i].y) < 100)  {
                //snd_hit.play();

                //npc deals melee damage to character
                if (chars.jim.shield > 0) {
                    chars.jim.shield = chars.jim.shield - npcs[i].melee_damage;
                } else {
                    chars.jim.hp = chars.jim.hp - npcs[i].melee_damage;
                }
                
                //character deals melee damage to npc
                chars.jim.hp = chars.jim.hp - npcs[i].melee_damage;
                if (chars.jim.state == 'active'){
                    npcs[i].hp = npcs[i].hp - chars.jim.melee_damage;
                }                
            }


            //ranged combat launch detection
            if (Math.abs(chars.jim.x - npcs[i].x) < 300 && Math.abs(chars.jim.y - npcs[i].y) < 100 && npcs[i].ammo > 0 && (npcs[i].suit == "grey_ninja"||npcs[i].suit == "ninja") && !projectile_aloft)  {
                //snd_hit.play();
            var projectile_name = "ninja_star" + i; 
            var ninja_star = new projectile(npcs[i].x,npcs[i].y);    
            projectiles.projectile_name = ninja_star;
            projectile_aloft = true;
            npcs[i].ammo = npcs[i].ammo -1;   
                                
            }
            

            //check to see if character is defeated and set state
            if (chars.jim.hp < 0){
                chars.jim.state = 'defeated';
                //bring hp back to zero for cleanliness
                chars.jim.hp = 0;
                chars.jim.shield = 0;
            }

            //check to see if npc is defeated and set state
            if (npcs[i].hp < 0){
                 npcs[i].state = "defeated";
                 //set hp of enemy to zero for cleanliness
                 npcs[i].hp = 0;
                 //award xp for defeating an enemy - this needs to be based on an npc attribute at some point
                 chars.jim.xp = chars.jim.xp + npcs[i].xp;                 
            }
                
        }
    }

    //move projectiles
    for (var j in projectiles){
            if (chars.jim.x > projectiles[j].x +50) {
                projectiles[j].x = projectiles[j].x + 10;
            } else if (chars.jim.x < projectiles[j].x -50) {
                projectiles[j].x = projectiles[j].x - 10;
            }
            if (chars.jim.y > projectiles[j].y) {
                projectiles[j].y = projectiles[j].y + 10;
            } else if (chars.jim.y < projectiles[j].y) {
                projectiles[j].y = projectiles[j].y - 10;
            }
            //ranged combat collision detection
            if (Math.abs(chars.jim.x - projectiles[j].x) < 60 && Math.abs(chars.jim.y - projectiles[j].y) < 60)  {
            snd_hit.play();
            chars.jim.hp = chars.jim.hp - 20;
            projectile_aloft = false;   
            delete projectiles[j];                    
            }
    }
    //shield regen
    if (chars.jim.shield < chars.jim.max_shield && chars.jim.state != 'defeated'){
        chars.jim.shield = chars.jim.shield + chars.jim.shield_regen_rate;
    }
    //health regen
    if (chars.jim.hp < chars.jim.hp_regen_baseline && chars.jim.state != 'defeated'){
        chars.jim.hp = chars.jim.hp + chars.jim.hp_regen_rate;
    }
}

game_base.draw = function() {
        
        //clear the canvas and the buffer for the next frame
	//_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
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
//draw projectiles
        for (var i in projectiles) {
                _canvasBufferContext.drawImage(projectiles[i].img, projectiles[i].x, projectiles[i].y);    
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
            if (npcs[i].draw && npcs[i].role == 'enemy'){
                _canvasBufferContext.strokeStyle = '#f00';
                _canvasBufferContext.lineWidth   = 4;
                _canvasBufferContext.beginPath();
                _canvasBufferContext.moveTo(npcs[i].x + 25, npcs[i].y - 25);
                _canvasBufferContext.lineTo(npcs[i].x + 25 + (npcs[i].hp/2), npcs[i].y - 25);
                _canvasBufferContext.stroke();       
                _canvasBufferContext.closePath();
                if (npcs[i].beam == true) {
                   _canvasBufferContext.strokeStyle = '#ff6';
                   _canvasBufferContext.lineWidth   = 4;
                   _canvasBufferContext.beginPath();
                   _canvasBufferContext.moveTo(npcs[i].x + 25, npcs[i].y - 15);
                   _canvasBufferContext.lineTo(npcs[i].x + 25 + (npcs[i].ammo/2), npcs[i].y - 15);
                   _canvasBufferContext.stroke();       
                   _canvasBufferContext.closePath();
                }
            }   
        }

//draw npc text

        for (var i in npcs){
            if (npcs[i].draw && npcs[i].role == 'quest' && npcs[i].state == 'active' && chars.jim.state == 'active'){
            //entering quest
                if (Math.abs(chars.jim.x - npcs[i].x) < 100) {
                    //snd_hit.play();
                    npcs[i].contact = true;
                    _canvasBufferContext.fillStyle = '#aaa';
                    _canvasBufferContext.fillRect(npcs[i].x - 100, npcs[i].y - 75, 200, 25);
                    _canvasBufferContext.fillStyle    = '#00f';
                    _canvasBufferContext.fillText(npcs[i].text, npcs[i].x - 100, npcs[i].y - 75);

                    //quest hacking
                    if (npcs[i].scene == 'lobby' && story_001.active_quest.state == 'active'){
                        npcs.annie.text = 'Save the Lemur!';
                        story_001.active_quest.objective = 'Save the Lemur!';   
                    } else if (npcs[i].scene == 'lab1' && story_001.active_quest.state == 'turn_in'){
                        story_001.active_quest.objective = 'Quest Complete: Save the Lemur!';
                        story_001.active_quest.state = 'complete';
                        chars.jim.suit = 'flightsuit';
                        chars.jim.hp = 100;
                        chars.jim.xp = chars.jim.xp + 100;
                        chars.jim.ammo = 250; 
                        scenes.launch = launch;
                        scenes.lab2.right_transition = 'launch';
                        story_001.active_quest = quest_002;
                        npcs[i].role = 'inactive';
                        chars.jim.img.src = "./content/images/flightsuit_left.png";
                                                
                    }

                    if (npcs[i].scene == 'lab2' && story_001.active_quest.state == 'active'){
                        npcs.annie.text = 'Thanks for saving the Lemur!';
                        npcs.annie.scene = "lab1";
                        story_001.active_quest.objective = 'Return to Annie!';
                        story_001.active_quest.state = 'turn_in';
                        npcs[i].role = 'inactive';  
                    }
                    if (npcs[i].scene == 'ninja_palace2'){
                        npcs[i].role = 'inactive';
                        for (var j in npcs){    
                            if (npcs[j].scene == 'monster_closet'){
                                npcs[j].scene = 'ninja_palace2';
                                npcs[j].draw = true;
                            }
                        }
                    }  
                                        

                }
            }
        }

//draw HUD
        _canvasBufferContext.fillStyle = '#0a0';
        _canvasBufferContext.fillRect(0, 0 , 800, 25);
        if (chars.jim.draw){
        //draw health bar
        _canvasBufferContext.strokeStyle = '#0F0';
        _canvasBufferContext.lineWidth   = 4;
        _canvasBufferContext.beginPath();
        _canvasBufferContext.moveTo(chars.jim.x + 25, chars.jim.y - 25);                                              _canvasBufferContext.lineTo(chars.jim.x + 25 + (chars.jim.hp/2), chars.jim.y - 25);
        _canvasBufferContext.stroke();       
        _canvasBufferContext.closePath();

        //draw shield bar
        _canvasBufferContext.strokeStyle = '#00a';
        _canvasBufferContext.lineWidth   = 5;
        _canvasBufferContext.beginPath();
        _canvasBufferContext.moveTo(chars.jim.x+25+(chars.jim.hp/2)+3,chars.jim.y-25);
        _canvasBufferContext.lineTo(chars.jim.x+25+(chars.jim.hp/2)+3+(chars.jim.shield/2),chars.jim.y-25);
        _canvasBufferContext.stroke();       
        _canvasBufferContext.closePath();
        }
        _canvasBufferContext.fillStyle    = '#fff';
        _canvasBufferContext.fillText('xp = ', 10, 5);
        _canvasBufferContext.fillText(chars.jim.xp, 50, 5);
        _canvasBufferContext.fillText('ammo = ', 200, 5);
        _canvasBufferContext.fillText(chars.jim.ammo, 270, 5);
        _canvasBufferContext.fillText('objective = ', 400, 5);
        _canvasBufferContext.fillText(story_001.active_quest.objective, 500, 5);

        
//draw the science beam 
        if (chars.jim.beam && chars.jim.ammo > 0 && chars.jim.state == 'active' && pressed_space == true){
            for (var i in npcs) {
                if (npcs[i].draw && npcs[i].role == 'enemy' && npcs[i].state != 'defeated' && npcs[i].beam != true){
                    npcs[i].hp = npcs[i].hp - 1;
                    chars.jim.ammo = chars.jim.ammo - .5;
                    if (npcs[i].hp % 2) {                   
                    _canvasBufferContext.strokeStyle = '#0f0';
                    _canvasBufferContext.lineWidth   = 4;
                    } else {
                    _canvasBufferContext.strokeStyle = '#ff0';
                    _canvasBufferContext.lineWidth   = 3;
                    }
                    

                    _canvasBufferContext.beginPath();
                    // Start from the top-left point.
                    _canvasBufferContext.moveTo(chars.jim.x + chars.jim.width -15, chars.jim.y + 50);                    _canvasBufferContext.lineTo(npcs[i].x + 50, npcs[i].y + 50);                    
                    _canvasBufferContext.stroke();
                    _canvasBufferContext.closePath();

                } else if(npcs[i].draw && npcs[i].role == 'enemy' && npcs[i].state != 'defeated' && npcs[i].beam === true){
                    chars.jim.ammo = chars.jim.ammo - .5;
                    _canvasBufferContext.strokeStyle = '#0f0';
                    _canvasBufferContext.lineWidth   = 4;
                    _canvasBufferContext.beginPath();
                    // Start from the top-left point.
                    _canvasBufferContext.moveTo(chars.jim.x + chars.jim.width -15 , chars.jim.y + 50);                                 
                   if (chars,jim.x < npcs[i].x  && npcs[i].ammo > 0){
                        _canvasBufferContext.lineTo(chars.jim.x +(npcs[i].x - chars.jim.x)/2 , npcs[i].y + 50);
                   } else if (chars,jim.x > npcs[i].x  && npcs[i].ammo > 0){
                       _canvasBufferContext.lineTo(chars.jim.x +(- npcs[i].x + chars.jim.x)/2 , npcs[i].y + 50);
                   } else {
                       _canvasBufferContext.lineTo(npcs[i].x + 50, npcs[i].y + 50);
                       npcs[i].hp = npcs[i].hp - 1;   
                   }
                 
                    _canvasBufferContext.stroke();
                    _canvasBufferContext.closePath();
                }
                       
            }

        }
//draw the razer beam
        for (var i in npcs) {
            if (npcs[i].draw == true && npcs[i].beam == true && npcs[i].role == 'enemy' && npcs[i].state != 'defeated' && npcs[i].ammo > 0 && chars.jim.state == 'active'){
                if (chars.jim.shield > 0){
                    chars.jim.shield = chars.jim.shield - npcs[i].beam_damage;
                }else if (chars.jim.hp > 0){
                    chars.jim.hp = chars.jim.hp - npcs[i].beam_damage;
                }
                npcs[i].ammo = npcs[i].ammo -.5;
                if (npcs[i].ammo % 2) {                   
                    _canvasBufferContext.strokeStyle = '#F00';
                    _canvasBufferContext.lineWidth   = 5;
                } else {
                    _canvasBufferContext.strokeStyle = '#c00';
                    _canvasBufferContext.lineWidth   = 4;
                }
                 _canvasBufferContext.beginPath();
                 _canvasBufferContext.moveTo(npcs[i].x + 10, npcs[i].y + 50);
                 //beam collison code goes here
                 if (pressed_space == true && chars.jim.x > npcs[i].x){
                    _canvasBufferContext.lineTo(npcs[i].x +(- chars.jim.x + npcs[i].x)/2 , chars.jim.y + 50);
                 } else if (pressed_space == true && chars.jim.x < npcs[i].x){
                     _canvasBufferContext.lineTo(npcs[i].x +( chars.jim.x  - npcs[i].x)/2 , chars.jim.y + 50);
                 } else {                                                
                     _canvasBufferContext.lineTo(chars.jim.x + 50, chars.jim.y + 50);
                 }                    
                 _canvasBufferContext.stroke();
                 _canvasBufferContext.closePath();

                                    
            }
        }
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}



function down (event) {


    if (event && chars.jim.state != 'defeated' && chars.jim.draw){
        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
            pressed_up = true;
        break;

        case 38: // W
            pressed_up = true;
        break;
        
         

case 65: // A

            if (chars.jim.suit == 'labcoat') {
                chars.jim.img.src = "./content/images/jim_left.png";
            } else if (chars.jim.suit == 'flightsuit') {
                chars.jim.img.src = "./content/images/flightsuit_left.png";
            }
            pressed_left = true;
        break;

         

case 37: // A

            if (chars.jim.suit == 'labcoat') {
                chars.jim.img.src = "./content/images/jim_left.png";
            } else if (chars.jim.suit == 'flightsuit') {
                chars.jim.img.src = "./content/images/flightsuit_left.png";
            }
            pressed_left = true;
        break;





        case 68: // D
            if (chars.jim.suit == 'labcoat') {
                chars.jim.img.src = "./content/images/jim_right.png";
            } else if (chars.jim.suit == 'flightsuit') {
                chars.jim.img.src = "./content/images/flightsuit_right.png";
            }
            pressed_right= true;
    
    break;

        case 39: // D
            if (chars.jim.suit == 'labcoat') {
                chars.jim.img.src = "./content/images/jim_right.png";
            } else if (chars.jim.suit == 'flightsuit') {
                chars.jim.img.src = "./content/images/flightsuit_right.png";
            }
            pressed_right= true;
    
    break;






        case 83: // S
            pressed_down = true;
        
break;

        case 40: // S
            pressed_down = true;
        
break;

        case 32: // Space bar : SCIENCE BEAM
        pressed_space = true;

        for (var i in npcs) {
            if (npcs[i].draw && npcs[i].role == 'enemy' & chars.jim.ammo > 0){
                chars.jim.beam = true;
                //snd_hit.play();
            } 
        }
        break;
    }
}
}

function up (event) {


    if (event && chars.jim.state != 'defeated' && chars.jim.draw){
        var key = event.keyCode;

        switch (key) {
    
    case 87: // W
            pressed_up = false;
    
    break;

        

case 65: // A

            pressed_left = false;
        break;


        case 68: // D
        pressed_right= false;
    
    break;



        case 83: // S
        pressed_down = false;       
        
break;

        case 32: // Space bar : SCIENCE BEAM
        pressed_space = false;
        break;
    }
}


}
game_base._intervalID = setInterval(game_base.run, 1000 / game_base.fps);
