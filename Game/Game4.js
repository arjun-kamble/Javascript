let hour = document.getElementById("hour");
let minute = document.getElementById("min");
let second = document.getElementById("sec");

function DisplayTime() {
  let date = new Date();

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  let hrotation = 30 * hr + min / 2;
  let mrotation = 6 * min;
  let srotation = 6 * sec;

  hour.style.transform = `rotate(${hrotation}deg)`
  minute.style.transform = `rotate(${mrotation}deg)`
  second.styele.transform = `rotate(${srotation}deg)`
}
getIntervel(DisplayTime, 1000)