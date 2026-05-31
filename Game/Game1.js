let boxes = document.querySelectorAll(".box");
let button = document.querySelector("#btn");
let msgContainer = document.querySelector(".msgContainer");

let msg = document.querySelector("#msg");
let turnO = true;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("btn was click");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {

      box.innerText = "X";
      turnO = true;
    }
    checkwiner();
  });
});
const disabledbox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}
const showwin = (winner) => {
  msg.innerText = `congratulations,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
}

const checkwiner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winer", pos1Val);
        showwin(pos1Val);
        disabledbox();
      }

    }
  }
};


