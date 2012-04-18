character = function(draw,speed,x,y,scene,height,width,src,defeated_src,suit,
                     role,text,contact,xp,
                     state,hp,max_hp,hp_regen_rate,hp_regen_baseline,shield,max_shield,shield_regen_rate,
                     ammo,beam,beam_damage,melee_damage){
this.draw = draw;

//base stats
//location
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.scene = scene;

//collison
    this.height = height;
    this.width = width;

//display
    this.img = new Image();
    this.img_defeated = new Image();
    //this.src = src;
    this.img.src = src;
    this.img_defeated.src = defeated_src;
    this.suit = suit;

//roles (enemy,quest,inactive,tutorial)
    this.role = role;
//conversation
    this.text = text;
//leveling
    this.xp = xp;
//quest tracking
    this.contact = contact;

//combat stats
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