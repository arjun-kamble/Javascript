/*let arr = [12, 13, 14, 15, 16, 45, 46, 97, 98, 95];
let x = arr.filter((val) => {
  return val > 90;
});
console.log(x);*/

//2nd

let n = prompt("Enter the number");
arr = [];
for (let i = 1; i <= n; i++) {
  arr[i - 1] = i
  let sum = arr.reduce((pre, curr) => {
    return pre + curr;
  })
  console.log("sum is", sum);
}
let pro = arr.reduce((pre, curr) => {
  return pre * curr;
});
console.log("product is", pro);