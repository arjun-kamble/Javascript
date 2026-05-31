/*let num = prompt("Enter the number");
let sum = 0;
for (let i = 1; i <= num; i++) {
  sum += i;
  console.log("sum is", sum);



for (let i = 1; i <= 5; i++) {
  console.log("ApnaCollege");
}

let num = prompt("Enter the num");
for (let i = 0; i <= num; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

//even no sum
let num = prompt("Enter the number");
let sum = 0;
for (let i = 0; i <= num; i++) {
  if (i % 2 === 0) {
    sum = sum + i

  }
}
console.log(sum);*/
let gamenum = 20;
let num = prompt("Enter the num");
while (gamenum != num) {
  num = prompt("try again");
}
console.log("win");