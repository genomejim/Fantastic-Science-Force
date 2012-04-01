game.fps = 50;


mobile_object = function(draw,x,y,v,src){
this.draw = draw;
this.x = x;
this.y = y;
this.v = v;
this.img = new Image();
this.img.src = src;
}

var title = new mobile_object(true,800,200,-6);
var car = new mobile_object(true,0,400,5,"./content/images/car.png");
var jim = new mobile_object(false,300,500,-2);
//var draw_jim = 'false';
var max = new mobile_object(false,600,400,-.5);
///var draw_max = 'false';
var truck = new mobile_object(true,800,400,-7);

var screen_name = 'road';
var pause = 'false';
var pause_time = 0;
var play_intro = 'true';


var _canvas = document.getElementById('game');
var _canvasContext = null;

//var car_img = new Image();
//car_img.src = "./content/images/car.png";

var back_img = new Image();
back_img.src = "./content/images/back_road.png";
var jim_img = new Image();
jim_img.src = "./content/images/jim.png";
var truck_img = new Image();
truck_img.src = "./content/images/truck.png";
var title_img = new Image();
title_img.src = "./content/images/title.png";
var max_img = new Image();
max_img.src = "./content/images/max.png";

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

}

var snd = new Audio("./content/sounds/intro.mp3");
var snd_bye = new Audio("./content/sounds/bye.wav");
var snd_traffic = new Audio("./content/sounds/traffic.wav");
var snd_thunder = new Audio("./content/sounds/thunder.wav");


game.run = function () {
    
    game.update();
    game.draw();

}

game.update = function() {
    if (title.x > 200) {
	title.x = title.x + title.v;
    }
    if (screen_name == 'road_3'){
    truck.x = truck.x + truck.v;
    }
    car.x = car.x + car.v;
    if (play_intro == 'true') {
	snd.play();
	//snd_traffic.play();
	play_intro = 'false';
    }
    if (car.x > 850 && screen_name == 'road') { 
        car.x = 0;
        back_img.src = "./content/images/back_school.png";
	title_img.src = "./content/images/title_2.png";
	title.x = 800;
        screen_name = 'school';
        pause_time = 0;
	//snd_traffic.play();
     }
    if (car.x == 600 && screen_name == 'school') {         
        car.v = 0;
        pause = 'true';
	max.draw = true;        
     }
    
    if (pause == 'true') {
	if (pause_time == 0 && screen_name == 'school') {
	snd_bye.play();
	
	}
        pause_time = pause_time + 1;
        if (screen_name == 'school') {car.x = 601;}
	if (screen_name == 'base' && car.x == 300) {
	car.x = 301; 
	snd_thunder.play();
	}
    }
    if (pause_time > 150 && screen_name == 'school') {
        car.v = 5;
        pause = 'false';
    }

     if (car.x > 850 && screen_name == 'school') { 
        car.x = 0;
        car.y = 450;
        back_img.src = "./content/images/back_road_2.png";
        screen_name = 'road_2';
	title_img.src = "./content/images/title_3.png";
	title.x = 800;
	max.draw = false;
	//snd_traffic.play();
    }    

    if (car.x > 850 && screen_name == 'road_2') { 
        car.x = 0;
        car.y = 500;
        back_img.src = "./content/images/back_road_3.png";
        screen_name = 'road_3';
	title_img.src = "./content/images/title_4.png";
	title.x = 800;
        pause_time = 0;
	snd_traffic.play();
     }    

    if (car.x > 850 && screen_name == 'road_3') { 
        car.x = 0;
        car.y = 500;
        back_img.src = "./content/images/back_fsf_base.png";
        screen_name = 'base';
	title_img.src = "./content/images/title_main.png";
	title.x = 800;
        pause_time = 0;
	//snd_traffic.play();
     }    
        if (car.x == 300 && screen_name == 'base') {
	jim.draw = true;         
        car.v = 0;
        pause = 'true'; 
	snd.stop();
	snd_traffic.play();
	truckx = 800;	       
     }
     if (jim.draw == true) {
	jim.x = jim.x + jim.v;
     }
	if (max.draw == true) {
	max.x = max.x + max.v;
	max.y = max.y - .5;
     }

}   

game.draw = function() {

        //_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.drawImage(back_img, 0, 0);
        if (jim.draw == true) {
        _canvasBufferContext.drawImage(jim_img, jim.x, jim.y);	
	}
	        if (max.draw == true) {
        _canvasBufferContext.drawImage(max_img, max.x, max.y);	
	}

	_canvasBufferContext.drawImage(truck_img, truck.x, truck.y);
        _canvasBufferContext.drawImage(car.img, car.x, car.y);
	_canvasBufferContext.drawImage(title_img, title.x, title.y);
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);
	
}



game._intervalID = setInterval(game.run, 1000 / game.fps);