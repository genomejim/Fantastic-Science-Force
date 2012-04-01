game.fps = 50;
var carx = 0;
var cary = 400;
var carv = 5;
var screen_name = 'road';
var pause = 'false';
var pause_time = 0;
var play_intro = 'true';
var jimx = 300;
var jimy = 500;
var jimv = - 2;
var draw_jim = 'false';
var truckx = 800;
var trucky = 400;
var truckv = -7;

var _canvas = document.getElementById('game');
var _canvasContext = null;

var img = new Image();
img.src = "./content/images/car.png";
var back = new Image();
back.src = "./content/images/back_road.png";
var jim = new Image();
jim.src = "./content/images/jim.png";
var truck = new Image();
truck.src = "./content/images/truck.png";

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


game.run = function () {
    
    game.update();
    game.draw();

}

game.update = function() {
    if (screen_name == 'road_3'){
    truckx = truckx + truckv;
    }
    carx = carx + carv;
    if (play_intro == 'true') {
	snd.play();
	//snd_traffic.play();
	play_intro = 'false';
    }
    if (carx > 850 && screen_name == 'road') { 
        carx = 0;
        back.src = "./content/images/back_school.png";
        screen_name = 'school';
        pause_time = 0;
	//snd_traffic.play();
     }
    if (carx == 600 && screen_name == 'school') {         
        carv = 0;
        pause = 'true';        
     }
    
    if (pause == 'true') {
	if (pause_time == 0 && screen_name == 'school') {snd_bye.play();}
        pause_time = pause_time + 1;
        if (screen_name == 'school') {carx = 601;}
    }
    if (pause_time > 150) {
        carv = 5;
        pause = 'false';
    }

     if (carx > 850 && screen_name == 'school') { 
        carx = 0;
        cary = 450;
        back.src = "./content/images/back_road_2.png";
        screen_name = 'road_2';
	//snd_traffic.play();
    }    

    if (carx > 850 && screen_name == 'road_2') { 
        carx = 0;
        cary = 500;
        back.src = "./content/images/back_road_3.png";
        screen_name = 'road_3';
        pause_time = 0;
	snd_traffic.play();
     }    

    if (carx > 850 && screen_name == 'road_3') { 
        carx = 0;
        cary = 500;
        back.src = "./content/images/back_fsf_base.png";
        screen_name = 'base';
        pause_time = 0;
	//snd_traffic.play();
     }    
        if (carx == 300 && screen_name == 'base') {
	draw_jim = 'true';         
        carv = 0;
        pause = 'true'; 
	snd.stop();
	snd_traffic.play();
	truckx = 800;	       
     }
     if (draw_jim == 'true') {
	jimx = jimx + jimv;
     }

}   

game.draw = function() {

        _canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.drawImage(back, 0, 0);
        if (draw_jim == 'true') {
        _canvasBufferContext.drawImage(jim, jimx, jimy);	
	}
	_canvasBufferContext.drawImage(truck, truckx, trucky);
        _canvasBufferContext.drawImage(img, carx, cary);
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);
	
}



game._intervalID = setInterval(game.run, 1000 / game.fps);