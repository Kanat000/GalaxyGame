const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const usscr = document.getElementById("scoreNum");
const btn = document.getElementById("button");
const btnBlock = document.getElementById("restartBlock");
const finalScore = document.getElementById("finalScore");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const CenterX = canvas.width/2;
const CenterY = canvas.height/2;


class Player{
	constructor(x,y,radius,color){
       this.x = x;
       this.y = y;
       this.radius = radius;
       this.color = color;
	}
	draw(){
       ctx.beginPath()
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       ctx.fillStyle = this.color;
       ctx.fill();
	}
}

const player = new Player(CenterX,CenterY,30,"white");
 
class Bullet{
	constructor(x,y,radius,color,velocity){
       this.x = x;
       this.y = y;
       this.radius = radius;
       this.color = color;
       this.velocity = velocity;
	}
	draw(){
       ctx.beginPath()
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       ctx.fillStyle = this.color;
       ctx.fill();
	}

    
    update(){
       	this.x = this.x + this.velocity.x;
    	this.y = this.y + this.velocity.y;

    }

}
let bullets = [];

 addEventListener('click', (event) => {
	var a = event.clientX - CenterX;
	var b = event.clientY - CenterY;
	const angle = Math.atan2(b, a);
	bullets.push(new Bullet(
 	CenterX,
 	CenterY,
 	7,
 	"white",
    {
    	x: 20*Math.cos(angle),
    	y: 20*Math.sin(angle)
    }
 	));
});

 
  let scr = 0;
var enemyTime = 1000;
 var power = 1;

   class Enemy{
   	constructor(x,y,radius,color,velocity){
       this.x = x;
       this.y = y;
       this.radius = radius;
       this.color = color;
       this.velocity = velocity;
	}
	draw(){
       ctx.beginPath()
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
       ctx.fillStyle = this.color;
       ctx.fill();
	}

    
    update(){
       	this.x = this.x + this.velocity.x;
    	this.y = this.y + this.velocity.y;
    }
   }

   let enemies = [];
   
   function Initialize(){
   
	 scr = 0;
	 bullets = [];
	 enemies.splice(0,enemies.length)
	 enemies = [];
     enemyTime = 1000;
     power = 1;
     finalScore.innerHTML = scr;
     	usscr.innerHTML = scr;
}

   function newEnemy (time,power) {
   	
   	setInterval(()=>{
   		   		const radius = Math.random()*(40-10)+10;
   		   		
   		   		var k = Math.random()*10;
   		   		if (k < 5) {
   		   			
   		   			x = (Math.random()*10) < 5 ? 0 - radius : canvas.width + radius;
   		   			y = Math.random()*canvas.height;
   		   		}
   		   		else {
   		   			x = Math.random()*canvas.width;
   		   			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
   		   			
   		   		}
   		   		
   		const color = `hsl(${Math.random() * 360},50%,50%)`;
   		var a = CenterX - x;
    	var b = CenterY - y;
	    const angle = Math.atan2(b, a);
   		const velocity = {
   			x:Math.cos(angle)*power,
   			y:Math.sin(angle)*power
   		};
   		enemies.push(new Enemy(x,y,radius,color,velocity));
   			console.log(enemyTime);
   	} , time)
   }



 let animationId;
 function animate() {
 	animationId = requestAnimationFrame(animate);
 	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  	ctx.fillRect(0,0,canvas.width,canvas.height)
  	bullets.forEach((bullet) => {
  		bullet.draw();
  		bullet.update();
  		
  	})
  	player.draw();
  	enemies.forEach((enemy, index) => {
         enemy.draw();
  		enemy.update()
     bullets.forEach((bullet, bulletIndex) => {
  	   const distance = Math.hypot(bullet.x-enemy.x , bullet.y-enemy.y);
       
  	   if((distance-bullet.radius-enemy.radius) < 1 && enemy.radius<22){
  	   		console.log(enemies)
	console.log(enemyTime)

  	    setTimeout(() => {
  	   		enemies.splice(index, 1);
  	   		bullets.splice(bulletIndex, 1);
  	   	},0)
  	   	scr += 100;
  	   	if (scr >= 1000 && scr < 2500) {
  	   		this.enemyTime = 900;
  	   	}
  	   	else if (scr >= 2500 && scr < 4000) {
  	   		this.enemyTime = 800;
  	   		this.power = 1.5;
  	   	}
  	   	else if(scr >= 4000 && scr <5000){
  	   		this.enemyTime = 700;
  	   		this.power = 2
  	   	}
  	   	else if(scr >= 5000 && scr <6000){
  	   		this.enemyTime = 600;
  	   		this.power = 2
  	   	}
  	   		else if(scr >= 6000 && scr <6500){
  	   		this.enemyTime = 500;
  	   		this.power = 3
  	   	}
  	   	else if(scr >= 6500 && scr <7500){
  	   		this.enemyTime = 400;
  	   		this.power =3
  	   	}
  	   		else if(scr >= 7500 && scr <8000){
  	   		this.enemyTime = 300;
  	   		this.power = 4
  	   	}
  	   	else if(scr >= 8000 && scr < 9000){
  	   		this.enemyTime = 200;
  	   		this.power = 4
  	   	}
  	   	else if(scr >= 9000 && scr < 10000){
  	   		this.enemyTime = 100;
  	   		this.power = 5
  	   	}
  	   	else if(scr>=10000){
  	   		this.enemyTime = 50;
  	   		this.power = 5;
  	   	}
        
  	   	usscr.innerHTML = scr;
  	   }
  	   else if((distance-bullet.radius-enemy.radius) < 1 && enemy.radius>=22){
  	   		console.log(enemies)
	console.log(enemyTime)

  	   
  	   	bullets.splice(bulletIndex, 1);

  	   	gsap.to(enemy,{
  	   		radius: enemy.radius - 7,

  	   	})

  	   	scr += 50;
  	    	   	if (scr >= 1000 && scr < 2500) {
  	   		this.enemyTime = 900;
  	   	}
  	   	else if (scr >= 2500 && scr < 4000) {
  	   		this.enemyTime = 800;
  	   		this.power = 1.5;
  	   	}
  	   	else if(scr >= 4000 && scr <5000){
  	   		this.enemyTime = 700;
  	   		this.power = 2
  	   	}
  	   	else if(scr >= 5000 && scr <6000){
  	   		this.enemyTime = 600;
  	   		this.power = 2
  	   	}
  	   		else if(scr >= 6000 && scr <6500){
  	   		this.enemyTime = 500;
  	   		this.power = 3
  	   	}
  	   	else if(scr >= 6500 && scr <7500){
  	   		this.enemyTime = 400;
  	   		this.power =3
  	   	}
  	   		else if(scr >= 7500 && scr <8000){
  	   		this.enemyTime = 300;
  	   		this.power = 4
  	   	}
  	   	else if(scr >= 8000 && scr < 9000){
  	   		this.enemyTime = 200;
  	   		this.power = 4
  	   	}
  	   	else if(scr >= 9000 && scr < 10000){
  	   		this.enemyTime = 100;
  	   		this.power = 5
  	   	}
  	   	else if(scr>=10000){
  	   		this.enemyTime = 50;
  	   		this.power = 10;
  	   	}
        
  	     	   	usscr.innerHTML = scr;
  	   }
  	    

  	})
     const playerDist = Math.hypot(player.x-enemy.x , player.y-enemy.y);

     if((playerDist-player.radius-enemy.radius) < 1){
         
          btnBlock.style.display = "flex";
          finalScore.innerHTML = scr;
  	    cancelAnimationFrame(animationId);
  	   
  	   
  	  
  	   }
  	})
  	
  }

btn.addEventListener("click",() =>{
	Initialize();
	btnBlock.style.display = "none";
	newEnemy(enemyTime,power);
    animate();

    
})
  