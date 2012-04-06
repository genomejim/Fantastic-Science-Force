scene = function(draw,scene_name,src,left_transition,right_transition,play_intro) {
this.draw = draw;
this.scene_name = scene_name;
this.img = new Image();
this.img.src = src;
this.left_transition = left_transition;
this.right_transition = right_transition;
this.play_intro = play_intro;
}
