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
