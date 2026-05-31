/*let tag = document.querySelector("h2");
console.dir(tag.innerText);
tag.innerText = tag.innerText + "Arjun";
console.dir(tag.innerText);*/
let divs = document.querySelectorAll(".a");
let idx = [1];
for (let div of divs) {
  div.innerText = "box";
  console.dir(div.innerText);
  idx++;
}

