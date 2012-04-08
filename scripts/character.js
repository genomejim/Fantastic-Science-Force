character = function(draw,speed,x,y,src,height,scene,type,hp,state){
this.draw = draw;
this.speed = speed;
this.x = x;
this.y = y;
this.src = src;
this.img = new Image();
this.img.src = src;
this.height = height;
this.scene = scene;
this.type = type;
this.hp = hp;
this.state = state;
}