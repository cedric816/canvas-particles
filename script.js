const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// accès à l'ensemble des propriétés et méthodes de l'objet ctx via la console
//console.log(ctx, typeof ctx);

canvas.Width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let numberOfParticles = 300;
let colorsArray = ['yellow','red','green'];

//mesure title1 element
let titleEl = document.getElementById('title1');
let titleMesures = titleEl.getBoundingClientRect();
let title = {
    x: titleMesures.left,
    y: titleMesures.top,
    width: titleMesures.width,
    height: titleMesures.height
}

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random()*5;
        this.weight = Math.floor(Math.random()*5);
        this.directionX = 1;
        this.color = colorsArray[Math.round(Math.random()*3)];
    }
    update(){
        if (this.y > canvas.height){
            this.y = 0;
            this.weight = 0.5;
            this.x = Math.random() * canvas.Width;
        }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        //check collision between each particle and title box
        if (this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y) {
                this.y -= 10;
                this.weight *= -0.5;
                this.directionX = 1.5;
            }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}

function init(){
    particlesArray = [];
    for (let n=0; n<numberOfParticles; n++){
        let particle = new Particle(Math.random()*canvas.Width, 0);
        particlesArray.push(particle);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
init();

//afficher FPS
//let lastLoop = new Date();
function animate(){
    //let thisLoop = new Date();
    //let fps = Math.round(1000/(thisLoop-lastLoop));
    //lastLoop=thisLoop;
    //console.log('FPS:'+fps);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.Width, canvas.height);
    for (let n=0; n<particlesArray.length; n++){
        particlesArray[n].update();
        particlesArray[n].draw();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let titleMesures = titleEl.getBoundingClientRect();
    title = {
        x: titleMesures.left,
        y: titleMesures.top,
        width: titleMesures.width,
        height: titleMesures.height 
    }
    ctx.fillStyle = 'rgba(255,255,255)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    init();
})