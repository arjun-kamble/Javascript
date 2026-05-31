let userScore = 0;
let computerScore = 0;
const userScore_para = document.querySelector("#user_score");
const computerScore_para = document.querySelector("#compter_score");
let select_one = document.querySelectorAll(".photo");
let end = document.querySelector(".end");
select_one.forEach((photo) => {

  drawGame = () => {
    console.log("draw");
    end.innerText = "It's a Draw!";
  }

  const playGame = (photoId) => {
    const computerOptions = ["rock", "paper", "scissor"];
    const computerNumber = Math.floor(Math.random() * 3);
    const computerChoice = computerOptions[computerNumber];
    console.log("computer choice", computerChoice);
    console.log("user choice", photoId);

    if (photoId === computerChoice) {
      console.log("match is draw");
      drawGame();
    } else {
      let userWin = true;
      if (photoId === "rock") {
        userWin = computerChoice === "paper" ? false : true;
      } else if (photoId === "paper") {
        userWin = computerChoice === "scissor" ? false : true;
      } else if (photoId === "scissor") {
        userWin = computerChoice === "rock" ? false : true;
      }
      showWin(userWin);
    }

  }

  const showWin = (userWin) => {
    if (userWin) {
      console.log("user win");
      userScore++;
      userScore_para.innerText = userScore;
      end.innerText = "You Win!";
      end.body.Style.backgroundColor = "green";
    } else {
      console.log("computer win");
      computerScore++;
      end.innerText = "Computer Wins!";
      // msg.end.Style.backgroundColor = "red";
      computerScore_para.innerText = computerScore;
    }
  }

  photo.addEventListener("click", (e) => {
    let photoId = e.target.getAttribute("id");
    // console.log("button clicked", photoId);
    playGame(photoId);
  })
});
