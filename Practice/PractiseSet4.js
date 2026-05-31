/*let items = [10, 20, 30, 40, 50, 60, 70, 80, 100];
for (let i = 0; i < items.length; i++) {
  let offer = items[i] / 10;
  let s = items[i] - offer;
  console.log(s);
}*/


let compnies = ["Bloomberg", "Microsoft", "Uber", "Google", "IBM", "Netflix"];
console.log(compnies.shift());
console.log(compnies.splice(1, 1, "ola"));
console.log(compnies.push("Amazon"));