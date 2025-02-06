let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let res = 1000;
let cRes = 3;
let placed = 0;
let pointDimension = 5;
canvas.addEventListener("click", function (event) {
  alert(`${event.clientX}, ${event.clientY}`);
});
let subWidth = 3;
let subHeight = subWidth;
function quadraticBezier(p1, p2, p3) {
  let bezierPoints = [];
  drawLines(p1, p2, p3, bezierPoints);
  equalize(bezierPoints);
  bezierPoints = sortPoints(bezierPoints);
  // draw(bezierPoints);
  return bezierPoints;
}
function drawLines(p1, p2, p3, bezierPoints) {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    p1.x - pointDimension / 2,
    p1.y - pointDimension / 2,
    pointDimension,
    pointDimension
  );
  ctx.fillRect(
    p2.x - pointDimension / 2,
    p2.y - pointDimension / 2,
    pointDimension,
    pointDimension
  );
  ctx.fillRect(
    p3.x - pointDimension / 2,
    p3.y - pointDimension / 2,
    pointDimension,
    pointDimension
  );
  let p1Points = subDiv(p1, p2, res);
  let p2Points = subDiv(p2, p3, res);
  inter(p1Points, p2Points, res, bezierPoints);
}
function subDiv(p1, p2, n, t1, t2, sorting) {
  let points = [];
  for (let i = 0; i < n; i++) {
    let xCoord = Math.round(p1.x + ((p2.x - p1.x) / n) * i);
    let yCoord = Math.round(p1.y + ((p2.y - p1.y) / n) * i);
    if (!sorting) {
      points.push({
        x: xCoord,
        y: yCoord,
      });
    } else {
      let tDiff = t1 + ((t2 - t1) / n) * i;
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
      i * 2,
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
function signature() {
  let total = [];
  let start;
  let ctrlP;
  let end;
  let sub;
  //1st segment
  {
    start = {
      x: 10,
      y: 90,
    };
    ctrlP = {
      x: 20,
      y: 145,
    };
    end = {
      x: 221,
      y: 55,
    };
    //draw
    sub = quadraticBezier(start, ctrlP, end);
    for (let i = 0; i < sub.length; i++) {
      total.push(sub[i]);
    }
  }
  //2nd segment
  {
    start = {
      x: 221,
      y: 55,
    };
    ctrlP = {
      x: 215,
      y: 80,
    };
    end = {
      x: 190,
      y: 100,
    };
    sub = quadraticBezier(start, ctrlP, end);
    for (let i = 0; i < sub.length; i++) {
      total.push(sub[i]);
    }
  }
  //3rd segment
  {
    start = {
      x: 190,
      y: 100,
    };
    ctrlP = {
      x: 127,
      y: 0,
    };
    end = {
      x: 20,
      y: 145,
    };
    sub = quadraticBezier(start, ctrlP, end);
    for (let i = 0; i < sub.length; i++) {
      total.push(sub[i]);
    }
  }
  //4th segment
  {
    start = {
      x: 20,
      y: 145,
    };
    ctrlP = {
      x: 15,
      y: 170,
    };
    end = {
      x: 65,
      y: 140,
    };
    sub = quadraticBezier(start, ctrlP, end);
    for (let i = 0; i < sub.length; i++) {
      total.push(sub[i]);
    }
  }
  //5th segment
  start = {
    x: 20,
    y: 145,
  };
  ctrlP = {
    x: 15,
    y: 170,
  };
  end = {
    x: 65,
    y: 140,
  };
  sub = quadraticBezier(start, ctrlP, end);
  for (let i = 0; i < sub.length; i++) {
    total.push(sub[i]);
  }
  draw(total);
}
signature();
