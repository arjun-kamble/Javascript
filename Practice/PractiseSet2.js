/*let num = prompt("Enter the number");
if (num % 5 === 0) {
  console.log("multiple");
} else {
  console.log("not multiple");
}*/

let marks = prompt("Enter the marks");
if (marks >= 80 && marks <= 100) {
  console.log("A");
}
else if (marks >= 70 && marks <= 89) {
  console.log("B");
}
else if (marks >= 60 && marks <= 69) {
  console.log("c");
}
else if (marks >= 50 && marks <= 59) {
  console.log("D");
}
else if (marks >= 0 && marks <= 49) {
  console.log("F");
}
else {
  console.log("Not possible marks");
}


