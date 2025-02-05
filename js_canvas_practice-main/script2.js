let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let res = 100;
let cRes = 3;
let start = {
  x: 50,
  y: 500,
};
let ctrlP = {
  x: 275,
  y: 50,
};
let end = {
  x: 500,
  y: 500,
};
let subWidth = 20;
let subHeight = subWidth;
function cubeBezier(p1, p2, p3) {
  let bezierPoints = [];
  drawLines(p1, p2, p3, bezierPoints);
  equalize(bezierPoints);
  bezierPoints = sortPoints(bezierPoints);
  draw(bezierPoints);
}
function drawLines(p1, p2, p3, bezierPoints) {
  ctx.fillStyle = "blue";
  ctx.fillRect(p1.x - 7, p1.y - 7, 14, 14);
  ctx.fillRect(p2.x - 7, p2.y - 7, 14, 14);
  ctx.fillRect(p3.x - 7, p3.y - 7, 14, 14);
  let p1Points = subDiv(p1, p2, res);
  let p2Points = subDiv(p2, p3, res);
  inter(p1Points, p2Points, res, bezierPoints);
}
function subDiv(p1, p2, n, t1, t2, sorting) {
  let points = [];
  for (let i = 1; i < n; i++) {
    let xCoord = Math.round(p1.x + ((p2.x - p1.x) / n) * i);
    let yCoord = Math.round(p1.y + ((p2.y - p1.y) / n) * i);
    if (!sorting) {
      points.push({
        x: xCoord,
        y: yCoord,
      });
    } else {
      let tDiff = ((t2 - t1) / n) * i;
      points.push({
        x: xCoord,
        y: yCoord,
        t: tDiff,
      });
    }
  }
  return points;
}
function inter(points1, points2, n, bezierPoints) {
  for (let i = 0; i < n - 1; i++) {
    let iPoints = subDiv(points1[i], points2[i], n);
    bezierPoints.push({ x: iPoints[i].x, y: iPoints[i].y, t: i });
  }
}
function equalize(bezierPoints) {
  for (let i = 0; i < bezierPoints.length; i++) {
    if (i < res - 2) {
      let d = Math.round(
        Math.sqrt(
          Math.pow(bezierPoints[i + 1].x - bezierPoints[i].x, 2) +
            Math.pow(bezierPoints[i + 1].y - bezierPoints[i].y, 2)
        ) / 3
      );
      let interPoints = subDiv(
        bezierPoints[i],
        bezierPoints[i + 1],
        d,
        bezierPoints[i].t,
        bezierPoints[i + 1].t,
        true
      );
      for (let j = 0; j < interPoints.length; j++) {
        bezierPoints.push(interPoints[j]);
      }
    }
  }
}
function draw(bezierPoints) {
  for (let i = 0; i < bezierPoints.length; i++) {
    setTimeout(
      () => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
          bezierPoints[i].x,
          bezierPoints[i].y,
          subWidth / 2,
          0,
          2 * Math.PI
        );
        ctx.fill();
        ctx.stroke();
      },
      i * 10,
      bezierPoints,
      i
    );
  }
}
function sortPoints(bezierPoints) {
  bezierPoints.sort((a, b) => {
    return a.t - b.t;
  });
  return bezierPoints;
}
cubeBezier(start, ctrlP, end);
