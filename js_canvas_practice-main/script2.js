let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let res = 200;

start = {
  x: 50,
  y: 500,
};
ctrlP = {
  x: 275,
  y: 50,
};
end = {
  x: 500,
  y: 500,
};
function cubeBezier(p1, p2, p3, i1, i2) {
  drawLines(p1, p2, p3);
}
function drawLines(p1, p2, p3, i1, i2) {
  ctx.fillStyle = "blue";
  ctx.fillRect(p1.x - 7, p1.y - 7, 14, 14);
  ctx.fillRect(p2.x - 7, p2.y - 7, 14, 14);
  ctx.fillRect(p3.x - 7, p3.y - 7, 14, 14);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  let p1Points = subDiv(p1, p2, res);
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.stroke();
  let p2Points = subDiv(p2, p3, res);
  console.log(p1Points, p2Points);
  inter(p1Points, p2Points, res);
}
function subDiv(p1, p2, n) {
  let points = [];
  for (let i = 1; i < n; i++) {
    let xCoord = Math.round(p1.x + ((p2.x - p1.x) / n) * i);
    let yCoord = Math.round(p1.y + ((p2.y - p1.y) / n) * i);
    ctx.fillStyle = "red";
    ctx.fillRect(xCoord - 5, yCoord - 5, 10, 10);
    points.push({
      x: xCoord,
      y: yCoord,
    });
  }
  return points;
}
function inter(points1, points2, n) {
  //j is max number - 1, because of arrays
  for (let i = 0, j = 0; i < n - 1; i++, j++) {
    ctx.beginPath();
    ctx.moveTo(points1[i].x, points1[i].y);
    ctx.lineTo(points2[j].x, points2[j].y);
    console.log(j);
    ctx.stroke();
  }
}
cubeBezier(start, ctrlP, end);
//https://stackoverflow.com/questions/11798053/canvas-animate-bezier-curve-drawing

// function getBezierCurvePoints(start, cp1, cp2, end, numPoints) {
//   let points = [];
//   for (let t = 0; t <= 1; t += 1 / numPoints) {
//     let x =
//       (1 - t) ** 3 * start.x +
//       3 * (1 - t) ** 2 * t * cp1.x +
//       3 * (1 - t) * t ** 2 * cp2.x +
//       t ** 3 * end.x;
//     let y =
//       (1 - t) ** 3 * start.y +
//       3 * (1 - t) ** 2 * t * cp1.y +
//       3 * (1 - t) * t ** 2 * cp2.y +
//       t ** 3 * end.y;
//     points.push({ x: x, y: y });
//   }
//   return points;
// }

// Example usage:
// let start = { x: 20, y: 20 };
// let cp1 = { x: 20, y: 100 };
// let cp2 = { x: 200, y: 100 };
// let end = { x: 200, y: 500 };
// let points = getBezierCurvePoints(start, cp1, cp2, end, 10000);
// console.log(points);
// for (let i = 0; i < points.length; i++) {
//   setTimeout(
//     () => {
//       ctx.fillStyle = "red";
//       ctx.fillRect(points[i].x, points[i].y, 5, 5);
//       ctx.stroke();
//     },
//     i / 3,
//     points,
//     i
//   );
// }
// Now you can use the 'points' array to draw the curve on the canvas.
