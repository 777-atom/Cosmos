// Описание параметров из других элементов(html, css)
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// Описание переменных, массивов ...
let bot = [];
let fire = [];
let player = [];
//let expl = [];
let box = 32;
let timer = 0;
let score = 0;

// Описание картинок
let botimg = new Image();
botimg.src = './img/favicon.jpg';

let playerimg = new Image();
playerimg.src = './img/player.png';

let fireimg = new Image();
fireimg.src = './img/fire.png';

let foneimg = new Image();
foneimg.src = './img/ground.jpg';



//let explimg = new Image();
//explimg.src = 'exploit.png'

// Описание клавиатуры. мышы и т.п. 
canvas.addEventListener("mousemove", function(event) {

	player.x = event.offsetX - 25,
	player.y = event.offsetY - 13

});

// Незагруженный запуск
//explimg.onload = function() {
foneimg.onload = function() {

    game();

}

// функция игры
function game(){

	update();
	render();
	requestAnimationFrame(game);

}

// функция обновления
function update(){

timer++;

if(timer%10 == 0){

    bot.push({x: Math.random()*550, y: -50, dx: Math.random()*2-1, dy: Math.random()*2+2, del: 0});

}

if (timer%30 == 0) {

	fire.push({x: player.x + 10, y: player.y, dx: 0,dy: -5});

}

for (let i in fire) {

	fire[i].x = fire[i].x + fire[i].dx;
	fire[i].y = fire[i].y + fire[i].dy;

	if (fire[i].y < -24) fire.splice(i,1);

}

//физика
//for(i in expl) {
//	expl[i].animx = expl[i].animx + 1;
//	if (expl[i].animx > 7) {expl[i].animy++; expl[i].anymx=0}
//	if (expl[i].animy > 7) 
//	expl.splice(i,1); 
//}

for (let i in bot) {
	
    bot[i].x += bot[i].dx;
    bot[i].y += bot[i].dy;

    if(bot[i].x >= 550 || bot[i].x < 0) bot[i].dx = - bot[i].dx;
    if(bot[i].y >= 500) bot.splice(i,1);

    // Проверяем каждый астероид на столкновение с каждой пулей
    for (let j in fire) {
		if (Math.abs(bot[i].x + 25 - fire[j].x - 15) < 35 && Math.abs(bot[i].y - fire[j].y) < 25) {
		   // произошло столкновение
		   //спавн взыва
		   //expl.push({x:bot[i].x - 25, y:bot[i].y - 25, animx:0, animy: 0});
           score++;	
		   // помечаем астероид на взрыв
		   bot[i].del = 1;
		   fire.splice(j, 1); break;
	    }
	}
    
	

    // удаление астероида
	if(bot[i].del == 1) bot.splice(i,1);
    
}
}

// функция выведения
function render() {

    ctx.drawImage(foneimg, 0, 0, 600, 450);
	ctx.drawImage(playerimg, player.x, player.y);
	for (let i in fire) ctx.drawImage(fireimg, fire[i].x, fire[i].y, 24, 24);
    for (let i in bot) ctx.drawImage(botimg, bot[i].x, bot[i].y, 50, 50);
	//for (i in expl) ctx.drawImage(expimg, 128*Math.floor(expl[i].animx), 128*Math.floor(expl[i].animy)128, 128, expl[i].x, expl[i].y, 100, 100);
    ctx.fillStyle = "black";
	ctx.font = "50px Arial";
    ctx.fillText(score, 32, 64);

}

let requestAnimationFrame = (function(){

	return window.webkitRequestAnimationFrame  ||
	       window.mozRequestAnimationFrame     ||
	       window.oRequestAnimationFrame       ||
	       window.msRequestAnimationFrame      ||
	       function(callback){
	       	   window.setTimeout(callback, 1000 / 20);
	       };
})();