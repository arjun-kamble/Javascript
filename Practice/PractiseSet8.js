/*let btn1 = document.querySelector("#btn1");
btn1.addEventListener("click", (evn) => {
  console.log("button was clicked 1");
});
const btn2 = () => {
  console.log("button was clicked 2");
};

btn1.addEventListener("click", (evn) => {
  console.log("button was clicked 3");
});
btn1.removeEventListener = () => {
  console.log("button was clicked 2", (btn2));
};*/
let btn1 = document.querySelector("#btn1");
let mode = "dark";
btn1.addEventListener("click", () => {
  if (mode == "dark") {
    mode = "light";
    //document.querySelector("body").style.backgroundColor = "black";
  } else {
    mode = "dark";
    // document.querySelector("body").style.backgroundColor = "white";
  }
  console.log(mode);
});