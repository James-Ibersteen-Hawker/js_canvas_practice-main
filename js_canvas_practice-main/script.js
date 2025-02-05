let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let incr = 10;
let step = 1;
let x;
let y;
let D;
let blockDistance = 10;
let equation;
let width = 40;
let height = width;
let interWidth = 40;
let interHeight = 40;
let mousePositions = [];
let time = 0;
canvas.addEventListener("mousemove", function (event) {
  requestAnimationFrame(function () {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    ctx.fillStyle = `rgb(${incr}, ${incr}, ${incr})`;
    ctx.fillRect(mouseX - width / 2, mouseY - height / 2, width, height);
    ctx.stroke();
    incr = incr + step;
    if (incr >= 230 || incr <= 10) step = -step;
    interpolate(x, y, mouseX, mouseY, width, height);
    equation = mxb(x, y, mouseX, mouseY);
    x = mouseX;
    y = mouseY;
    mousePositions.push([x, y]);
    // erase();
  });
});
function interpolate(oldX, oldY, newX, newY) {
  // interDraw(oldX, oldY, newX, newY);
  distance(oldX, oldY, newX, newY);
  interpolateBlocks(oldX, oldY, newX, newY);
}
function interpolateBlocks(x1, y1, x2, y2) {
  ctx.fillStyle = `rgb(${incr}, ${incr}, ${incr})`;
  let n = Math.round(D / blockDistance);
  if (n > 2) {
    for (let i = 1; i < n; i++) {
      let xCoord = x1 + ((x2 - x1) / n) * i;
      let yCoord = y1 + ((y2 - y1) / n) * i;
      mousePositions.push([xCoord, yCoord]);
      ctx.fillRect(
        xCoord - interWidth / 2,
        yCoord - interHeight / 2,
        interWidth,
        interHeight
      );
      ctx.stroke();
      incr = incr + step;
      if (incr >= 230 || incr <= 10) step = -step;
    }
  }
}
function distance(x1, y1, x2, y2) {
  D = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function interDraw(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function mxb(x1, y1, x2, y2) {
  let m = (y2 - y1) / (x2 - x1);
  let eFunc = (y, x) => {
    if (!y) {
      y = m * x + b;
    } else if (!x) {
      x = (y - b) / m;
    }
  };
  return eFunc;
}
function erase() {
  ctx.clearRect(
    mousePositions[time][0] - width / 2,
    mousePositions[time][1] - height / 2,
    width,
    height
  );
  time++;
}
function save() {
  let url = canvas.toDataURL("image/png");
  console.log(url);
}
