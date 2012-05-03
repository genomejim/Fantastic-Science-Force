//jim drives
//jim drops off max
//jim drives and drives arrivng at FSF HQ
//repeat at increasing pace
//jim arrives at FSF HQ on story day one
//jim get's tutorial text from npc
//jim gets objective to talk to anniepennie
//jim talks to anniepennie (who prefers annie) and gets save the lemur quest
//jim battles ninjas and aliens as he traverses the lab to find the lemur
//jim finds the lemur and is prompted to return to annie
//jim returns to annie and recieves his first reward, the science beam


//HACK proto quest stuff

story = function(quest){
    this.active_quest = quest;
}

quest = function(objective,state){
    this.objective = objective;
    this.state = state;
}

//quest states inactive,active,turn_in,complete
var quest_001 = new quest('Talk with miss AnniePennie','active');
var quest_002 = new quest('Board the Fantastic Science Plane','active');
var story_001 = new story(quest_001);

level_transition = function(){
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
}

portal_001 = function(){
//HACK - portal transition
    if (npcs.portal.contact == true){
        //npcs.pogo.y = npcs.pogo.y + npcs.pogo.speed;
        //npcs.pogo.speed = npcs.pogo.speed - .1;
        //npcs.pogo.speed = npcs.pogo.speed + (npcs.pogo.speed/50);
        chars.jim.draw = false;
        story_001.active_quest.objective = 'Take the fight to their alien masters!';
        //init ninja palace
        
            scenes.ninja_palace3.draw = false;
            scenes.moonbase.draw = true;
            chars.jim.draw = true;
            chars.jim.x = 100;
            npcs.portal.contact = false;
            npcs.portal.draw = false;
            npcs.portal.role = 'inactive';
            npcs.alien1.draw = true;
            //story_001.active_quest.objective = 'Defeat the Grey Ninjas!';           
            pressed_right = false;
        
    }
}


draw_npc_text = function() {
//draw npc text - need to change this function name...
//since i don't really draw the text long enough for anyone to read

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
                        chars.jim.ammo = 200; 
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


}