//accessing the elements
let direction = { X: 0, Y: 0 }
const foodsound = new Audio("food.mp3");
const gameover = new Audio("gameover.mp3");
const moveAudio = new Audio("move.mp3");
const music = new Audio("music.mp3");
let snake = document.getElementById("snake");
let speed = 2;
let score = 0;
let lasttime = 0;
let snakearr = [{ X: 13, Y: 15 }]
food = { X: 6, Y: 7 }
//game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasttime) / 1000 < 1 / speed) {
    return;
  }
  lasttime = ctime;
  gameEngine()
}
function iscollaps(sarr) {
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].X === sarr[0].X && sarr[i].Y === sarr[0].Y) {
      music.pause();
      return true;

    }
  }
  if (sarr[0].X >= 18 || sarr[0].X <= 0 || sarr[0].Y >= 18 || sarr[0].Y <= 0) {
    music.pause();
    return true;
  }

}
function gameEngine() {
  //update snake and food
  if (iscollaps(snakearr)) {
    gameover.play();
    music.pause();
    direction = { X: 0, Y: 0 };
    alert("Game over Play again!");
    snakearr = [{ X: 13, Y: 15 }];
    music.play()
    score = 0;
  }
  //khana khane ke bad
  if (snakearr[0].X === food.X && snakearr[0].Y === food.Y) {
    foodsound.play();
    score += 1;
    scorebox.innerHTML = "score:" + score;
    snakearr.unshift({ X: snakearr[0].X + direction.X, Y: snakearr[0].Y + direction.Y })
    let a = 2;
    let b = 16;
    food = { X: Math.round(a + (b - a) * Math.random()), Y: Math.round(a + (b - a) * Math.random()) }
  }
  //move the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    const element = snakearr[i];
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].X += direction.X;
  snakearr[0].Y += direction.Y;
  //render snake and food
  //snake
  snake.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeEle = document.createElement('div')
    snakeEle.style.gridRowStart = e.Y;
    snakeEle.style.gridColumnStart = e.X;
    if (index === 0) {
      snakeEle.classList.add('head');
    } else {
      snakeEle.classList.add('snakebody')
    }

    snake.appendChild(snakeEle);
  })
  //food
  foodEle = document.createElement('div')
  foodEle.style.gridRowStart = food.Y;
  foodEle.style.gridColumnStart = food.X;
  foodEle.classList.add('food')
  snake.appendChild(foodEle);
}





//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputdir = { X: 0, Y: 0 };
  moveAudio.play();
  music.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrowup");
      direction.X = 0;
      direction.Y = -1;
      break;

    case "ArrowDown":
      console.log("Arrowdown")
      direction.X = 0;
      direction.Y = 1;
      break;

    case "ArrowRight":
      console.log("Arrowright")
      direction.X = 1;
      direction.Y = 0;
      break;

    case "ArrowLeft":
      console.log("Arrowleft")
      direction.X = -1;
      direction.Y = 0;
      break;
  }

})