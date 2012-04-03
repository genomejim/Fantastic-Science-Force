mobile_object = function(draw,x,y,vx,vy,src){
this.draw = draw;
this.x = x;
this.y = y;
this.vx = vx;
this.vy = vy;
this.img = new Image();
this.img.src = src;
}

background = function(screen_name,src) {
this.screen_name = screen_name;
this.img = new Image();
this.img.src = src;
}

//instantiate mobs
var title = new mobile_object(true,800,200,-6,0,"./content/images/title.png");
var car = new mobile_object(true,0,400,5,0,"./content/images/car.png");
var jim = new mobile_object(false,300,500,-2,0,"./content/images/jim.png");
var max = new mobile_object(false,600,400,-.5,-.5,"./content/images/max.png");
var truck = new mobile_object(true,800,400,-9,0,"./content/images/truck.png");

//instantiate background
var back = new background('road',"./content/images/back_road.png")

//init filthy global variables
intro.pause = 'false';
intro.pause_time = 0;
intro.play_intro = 'true';
intro.fps = 50;

//init canvas and buffer
var _canvas = document.getElementById('intro');
var _canvasContext = null;

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

}

//init sounds
var snd = new Audio("./content/sounds/intro.mp3");
var snd_bye = new Audio("./content/sounds/bye.wav");
var snd_traffic = new Audio("./content/sounds/traffic.wav");
var snd_thunder = new Audio("./content/sounds/thunder.wav");


intro.run = function () {
    
    intro.update();
    intro.draw();

}

intro.update = function() {
    //all this nonsense plays an intro cutscene thing
    if (title.x > 200) {
	title.x = title.x + title.vx;
    }
    if (back.screen_name == 'road_3'){
    truck.x = truck.x + truck.vx;
    }
    car.x = car.x + car.vx;
    if (intro.play_intro == 'true') {
	snd.play();
	intro.play_intro = 'false';
    }
    if (car.x > 850 && back.screen_name == 'road') { 
        car.x = 0;
        back.img.src = "./content/images/back_school.png";
	title.img.src = "./content/images/title_2.png";
	title.x = 800;
        back.screen_name = 'school';
        intro.pause_time = 0;
    }
    if (car.x == 600 && back.screen_name == 'school') {         
        car.vx = 0;
        intro.pause = 'true';
	max.draw = true;        
     }
    
    if (intro.pause == 'true') {
	if (intro.pause_time == 0 && back.screen_name == 'school') {
	snd_bye.play();
	
	}
        intro.pause_time = intro.pause_time + 1;
        if (back.screen_name == 'school') {car.x = 601;}
	if (back.screen_name == 'base' && car.x == 300) {
	car.x = 301; 
	snd_thunder.play();
	}
    }
    if (intro.pause_time > 150 && back.screen_name == 'school') {
        car.vx = 5;
        intro.pause = 'false';
    }

     if (car.x > 850 && back.screen_name == 'school') { 
        car.x = 0;
        car.y = 450;
        back.img.src = "./content/images/back_road_2.png";
        back.screen_name = 'road_2';
	title.img.src = "./content/images/title_3.png";
	title.x = 800;
	max.draw = false;
    }    

    if (car.x > 850 && back.screen_name == 'road_2') { 
        car.x = 0;
        car.y = 500;
        back.img.src = "./content/images/back_road_3.png";
        back.screen_name = 'road_3';
	title.img.src = "./content/images/title_4.png";
	title.x = 800;
        intro.pause_time = 0;
	snd_traffic.play();
     }    

    if (car.x > 850 && back.screen_name == 'road_3') { 
        car.x = 0;
        car.y = 500;
        back.img.src = "./content/images/back_fsf_base.png";
        back.screen_name = 'base';
	title.img.src = "./content/images/title_main.png";
	title.x = 800;
        intro.pause_time = 0;
     }    
        if (car.x == 300 && back.screen_name == 'base') {
	jim.draw = true;         
        car.vx = 0;
        intro.pause = 'true'; 
	snd_traffic.play();
	truckx = 800;	       
     }
     if (jim.draw == true) {
	jim.x = jim.x + jim.vx;
     }
	if (max.draw == true) {
	max.x = max.x + max.vx;
	max.y = max.y + max.vy;
     }

}   

intro.draw = function() {

	_canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.drawImage(back.img, 0, 0);
        if (jim.draw == true) {
        _canvasBufferContext.drawImage(jim.img, jim.x, jim.y);	
	}
	if (max.draw == true) {
        _canvasBufferContext.drawImage(max.img, max.x, max.y);	
	}
	_canvasBufferContext.drawImage(truck.img, truck.x, truck.y);
        _canvasBufferContext.drawImage(car.img, car.x, car.y);
	_canvasBufferContext.drawImage(title.img, title.x, title.y);
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);	
}

intro._intervalID = setInterval(intro.run, 1000 / intro.fps);