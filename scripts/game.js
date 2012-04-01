game.fps = 50;
var carx = 0;
var cary = 400;
var carv = 3;
var screen_name = 'road';
var pause = 'false';
var pause_time = 0;

var _canvas = document.getElementById('game');
var _canvasContext = null;

var img = new Image();
img.src = "./content/images/car.png";
var back = new Image();
back.src = "./content/images/back_road.png";

if (_canvas && _canvas.getContext) {
    _canvasContext = _canvas.getContext('2d');
    _canvasBuffer = document.createElement('canvas');

    _canvasBuffer.width = _canvas.width;
    
_canvasBuffer.height = _canvas.height;
    _canvasBufferContext = _canvasBuffer.getContext('2d');

}

var snd = new Audio("./content/sounds/intro.mp3");
var snd_bye = new Audio("./content/sounds/bye.wav");


game.run = function () {
    game.update();
    game.draw();

}

game.update = function() {

    carx = carx + carv;
    snd.play();
    if (carx > 850 && screen_name == 'road') { 
        carx = 0;
        back.src = "./content/images/back_school.png";
        screen_name = 'school';
        pause_time = 0;
     }
    if (carx == 600 && screen_name == 'school') {         
        carv = 0;
        pause = 'true';        
     }
    
    if (pause == 'true') {
	if (pause_time == 0) {snd_bye.play();}
        pause_time = pause_time + 1;
        carx = 601;
    }
    if (pause_time > 300) {
        carv = 3;
        pause = 'false';
    }

     if (carx > 850 && screen_name == 'school') { 
        carx = 0;
        cary = 450;
        back.src = "./content/images/back_road_2.png";
        screen_name = 'road_2';
    }    

    if (carx > 850 && screen_name == 'road_2') { 
        carx = 0;
        cary = 500;
        back.src = "./content/images/back_road_3.png";
        screen_name = 'road_3';
        pause_time = 0;
     }    

    if (carx > 850 && screen_name == 'road_3') { 
        carx = 0;
        cary = 500;
        back.src = "./content/images/back_fsf_base.png";
        screen_name = 'base';
        pause_time = 0;
     }    
        if (carx == 600 && screen_name == 'base') {         
        carv = 0;
        pause = 'true';        
     }

}   

game.draw = function() {

        _canvasContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.clearRect(0,0,_canvas.width,_canvas.height);
        _canvasBufferContext.drawImage(back, 0, 0);
        _canvasBufferContext.drawImage(img, carx, cary);
        _canvasContext.drawImage(_canvasBuffer, 0 , 0);
}



game._intervalID = setInterval(game.run, 1000 / game.fps);