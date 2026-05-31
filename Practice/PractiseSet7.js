let heading = document.createElement("p");
heading.innerText = "OG";
heading.style.color = "black";
console.log(heading);

document.querySelector("div").prepend(heading);
heading.remove()
/*let newbtn = document.createElement("button");
newbtn.innerText = "Click me";
newbtn.style.color = "red";
newbtn.style.backgroundColor = "green";
newbtn.style.border = "2px solid black";
console.log(newbtn);

document.querySelector("div").prepend(newbtn);*/
let para = document.querySelector("p");
console.log(para);