// const canvas=document.getElementById("canvas");
// const pen=canvas.getContext('2d');  //contains method help us to create different shapes
// pen.fillStyle="yellow";
// const H=735;
// const W=1200;
// const cs=67;
// const food=null;
// const snake={
//     init_len: 5,
//     direction:'right',
//     cells:[],
//     createSnake: function(){
//         for(let i=0;i<this.init_len;i++){
//             this.cells.push({x:i,y:0});
//         }
//     },
//     drawSnake: function(){
//         for(let cell of this.cells){
//             pen.fillRect(cell.x*cs,cell.y,cs-1,cs-1);
//         }
//     },
//     updateSnake: function(){
//         const headX=this.cells[this.cells.length-1].x;
//         const headY=this.cells[this.cells.length-1].y;
//         let nextX=headX+1;
//         let nextY=headY;

//         if(this.direction === 'left'){
//             nextX=headX-1;
//             nextY=headY;
//         }
//         else if(this.direction === 'up'){
//             nextX=headX;
//             nextY=headY-1;
//         }
//         else if(this.direction === 'down'){
//             nextX=headX;
//             nextY=headY+1;
//         }
//         else{
//             nextX=headX+1;
//             nextY=headY;
//         }
//         //add the cell at the end i.e after 

//         this.cells.push({
//             x:nextX,
//             y:nextY
//         });
//         this.cells.shift();
//     }
// }

// function getRandomFood(){
//     const foodX=Math.floor(Math.random()*(W-cs)/cs);
//     const foodY=Math.floor(Math.random()*(H-cs)/cs);

//     food={
//         x: foodX,
//         y:foodY,
//     }
//     return food;
// }

// function init(){  //Intialises the game
//     snake.createSnake();
//     snake.drawSnake();
//     //food.getRandomFood();
//     function keypressed(e){
//         console.log(e);
//         if(e.key === 'ArrowLeft'){
//             snake.direction= 'left';
//         }
//         else if(e.key === 'ArrowDown'){
//             snake.direction='down';
//         }
//         else if(e.key=== 'ArrowRight'){
//             snake.direction='right';
//         }
//         else{
//             snake.direction='up';
//         }
//     }
//     document.addEventListener('keydown',keypressed);
// }

// function draw(){  //draw function
//     pen.clearRect(0,0,W,H);
//     //pen.fillRect
//     snake.drawSnake();
// }

// function update(){
//     snake.updateSnake();

// }

// function gameLoop(){
//     update();
//     draw();
// }

// init();

// const id = setInterval(gameLoop, 200);


const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');

pen.fillStyle = 'yellow';


// Height and width of the canvas element
const H = 670;
const W = 1205;
const cs = 67;
let food = null;
let score = 0;
let gameOver = false;

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.stroke();
    }
    if (fill) {
      ctx.fill();
    }        
  }

const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],
    
    createSnake: function () {
        for (let i = 0; i < this.init_len; i++){
            this.cells.push(
                {
                    x: i,
                    y: 0
                }
            );
        }
    },
    drawSnake: function () {
        for (let cell of this.cells) {
            //pen.fillRect(cell.x*cs, cell.y*cs, cs-1, cs-1);   //cell width = cs-1  and cell left top coordinates.
            roundRect(pen, cell.x*cs, cell.y*cs, cs-1, cs-1, (cs+8.5)/2, true, true);
            pen.strokeStyle = "rgb(255, 217, 0)";
        }
    },
    updateSnake:function () {
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;


        if (food.x === headX && food.y === headY) {
            food = getRandomFood();
            score++;
        } else {
            // remove the first cell
            this.cells.shift();
        }

        let nextX;
        let nextY;

        if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = headY;

            if (nextX * cs < 0) {
                gameOver = true;
            }

        }
        else if (this.direction === 'up') {
            nextX = headX;
            nextY = headY - 1;
            
            if (nextY * cs < 0) {
                gameOver = true;
            }

        } else if (this.direction === 'down') {
            nextX = headX;
            nextY = headY + 1;

            if (nextY * cs >= H ) {
                gameOver = true;
            }

        } else {
            nextX = headX + 1;
            nextY = headY;

            if (nextX * cs >= W ) {
                gameOver = true;
            }
        }
        // add the cell at the and i.e after the head of the snake
        
        this.cells.push({
            x: nextX,
            y: nextY
        });

      
    }
}


// init
function init() {
    snake.createSnake();
    snake.drawSnake();
    food = getRandomFood();

    function keypressed(e) {
     
        if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        }
        else {
            snake.direction = 'up';
        }

        console.log(snake.direction);

    }
    document.addEventListener('keydown', keypressed);
}


// draw

function draw() {

    if (gameOver == true) {
        pen.font = '40px sans-serif';
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50, 100);
       // console.log("GAME OVER");
        clearInterval(id);
        return;
    }
    

    pen.clearRect(0, 0, W, H);
    pen.font = '40px sans-serif';
    pen.fillStyle = 'lightgreen';
    pen.fillText(`Score : ${score}`, 50, 50);
    pen.fillStyle = 'rgb(4, 7, 173)';
    //pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    roundRect(pen, food.x*cs, food.y*cs, cs-1, cs-1, (cs-1)/2, true, true);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}

// update

function update() {
    snake.updateSnake();
}

// Game Loop
function gameLoop() {
    update();
    draw();
}

function getRandomFood() {
    
    const foodX = Math.floor(Math.random() * (W - cs) / cs);
    const foodY = Math.floor(Math.random() * (H - cs) / cs);
    
    food = {
        x: foodX,
        y:foodY
    }

    return food;
}


// start the game - initilise




init();

const id = setInterval(gameLoop, 300);