character = function(character_location,appearance,base_stats,combat_stats){
    this.draw = character_location.draw;
    //location
    this.x = character_location.x;
    this.y = character_location.y;
    this.scene = character_location.scene;

    this.speed = base_stats.speed;
    
    //collison
    this.height = appearance.height;
    this.width = appearance.width;
    //display
    this.img = new Image();
    this.img_defeated = new Image();
    this.img.src = appearance.src;
    this.img_defeated.src = appearance.defeated_src;
    this.suit = appearance.suit;

    //roles (enemy,quest,inactive,tutorial)
    this.role = base_stats.role;
    //conversation
    this.text = base_stats.text;
    //leveling
    this.xp = base_stats.xp;
    //quest tracking
    this.contact = base_stats.contact;

    //defensive combat stats
    this.state = combat_stats.state;
    this.hp = combat_stats.hp;
    this.max_hp = combat_stats.max_hp;
    this.hp_regen_rate = combat_stats.hp_regen_rate;
    this.hp_regen_baseline = combat_stats.hp_regen_baseline;
    this.shield = combat_stats.shield;
    this.max_shield = combat_stats.shield;
    this.shield_regen_rate = combat_stats.shield_regen_rate;

    //offensive combat stats
    this.ammo = combat_stats.ammo;
    this.beam = combat_stats.beam;
    this.beam_damage = combat_stats.beam_damage;
    this.melee_damage = combat_stats.melee_damage;
}


base_stats = function(speed,role,text,contact,xp){

    this.speed = speed;

    //roles (enemy,quest,inactive,tutorial)
    this.role = role;
    //conversation
    this.text = text;
    //leveling
    this.xp = xp;
    //quest tracking
    this.contact = contact;
}

combat_stats = function(state,hp,max_hp,hp_regen_rate,hp_regen_baseline,shield,max_shield,shield_regen_rate,
                     ammo,beam,beam_damage,melee_damage){
    //defensive combat stats
    this.state = state;
    this.hp = hp;
    this.max_hp = max_hp;
    this.hp_regen_rate = hp_regen_rate;
    this.hp_regen_baseline = hp_regen_baseline;
    this.shield = shield;
    this.max_shield = shield;
    this.shield_regen_rate = shield_regen_rate;

    //offensive combat stats
    this.ammo = ammo;
    this.beam = beam;
    this.beam_damage = beam_damage;
    this.melee_damage = melee_damage;
}

character_location = function(draw,x,y,scene) {
    this.draw = draw;
    this.x = x;
    this.y = y;
    this.scene = scene;
}

appearance = function(height,width,src,defeated_src,suit){
//collison
    this.height = height;
    this.width = width;
    //display
    //this.img = new Image();
    //this.img_defeated = new Image();
    this.src = src;
    this.defeated_src = defeated_src;
    this.suit = suit;
}

projectile = function(x,y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "./content/images/ninja_star.png";
}