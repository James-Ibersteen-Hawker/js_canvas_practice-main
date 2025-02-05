let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let res = 100;

let start = {
  x: 50,
  y: 500,
};
let ctrlP = {
  x: 10,
  y: 256,
};
let end = {
  x: 500,
  y: 100,
};
let bezierPoints = [];
let subWidth = 20;
let subHeight = subWidth;
function cubeBezier(p1, p2, p3) {
  drawLines(p1, p2, p3);
}
function drawLines(p1, p2, p3) {
  ctx.fillStyle = "blue";
  ctx.fillRect(p1.x - 7, p1.y - 7, 14, 14);
  ctx.fillRect(p2.x - 7, p2.y - 7, 14, 14);
  ctx.fillRect(p3.x - 7, p3.y - 7, 14, 14);
  let p1Points = subDiv(p1, p2, res);
  let p2Points = subDiv(p2, p3, res);
  inter(p1Points, p2Points, res);
}
function subDiv(p1, p2, n) {
  let points = [];
  for (let i = 1; i < n; i++) {
    let xCoord = Math.round(p1.x + ((p2.x - p1.x) / n) * i);
    let yCoord = Math.round(p1.y + ((p2.y - p1.y) / n) * i);
    points.push({
      x: xCoord,
      y: yCoord,
    });
  }
  return points;
}
function inter(points1, points2, n) {
  for (let i = 0; i < n - 1; i++) {
    let iPoints = subDiv(points1[i], points2[i], n);
    bezierPoints.push([iPoints[i].x, iPoints[i].y]);
  }
}
function equalize() {}
cubeBezier(start, ctrlP, end);
start = {
  x: 500,
  y: 100,
};
ctrlP = {
  x: 520,
  y: 500,
};
end = {
  x: 100,
  y: 100,
};
cubeBezier(start, ctrlP, end);
for (let i = 0; i < bezierPoints.length; i++) {
  console.log("here!");
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(bezierPoints[i][0], bezierPoints[i][1], subWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
