let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let res = 500;
let resMultiplier = 3;
let cRes = 3;
let placed = 0;
let pointDimension = 5;
let color = "black";
canvas.addEventListener("click", function (event) {
  alert(`${event.clientX}, ${event.clientY}`);
});
let subWidth = 1;
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
  // ctx.fillStyle = "blue";
  // ctx.fillRect(
  //   p1.x - pointDimension / 2,
  //   p1.y - pointDimension / 2,
  //   pointDimension,
  //   pointDimension
  // );
  // ctx.fillRect(
  //   p2.x - pointDimension / 2,
  //   p2.y - pointDimension / 2,
  //   pointDimension,
  //   pointDimension
  // );
  // ctx.fillRect(
  //   p3.x - pointDimension / 2,
  //   p3.y - pointDimension / 2,
  //   pointDimension,
  //   pointDimension
  // );
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
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(
          bezierPoints[i].x,
          bezierPoints[i].y,
          subWidth / 2,
          0,
          2 * Math.PI
        );
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
      },
      i / 1.5 / resMultiplier,
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
  //1st name
  {
    //1st segment
    {
      res = 500 * resMultiplier;
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
      res = 200 * resMultiplier;
      start = {
        x: 222,
        y: 56,
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
      res = 500 * resMultiplier;
      start = {
        x: 191,
        y: 101,
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
      res = 150 * resMultiplier;
      start = {
        x: 21,
        y: 146,
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
    {
      res = 30 * resMultiplier;
      start = {
        x: 66,
        y: 141,
      };
      ctrlP = {
        x: 60,
        y: 150,
      };
      end = {
        x: 74,
        y: 147,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //6th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 75,
        y: 148,
      };
      ctrlP = {
        x: 95,
        y: 152,
      };
      end = {
        x: 128,
        y: 118,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //7th segment
    {
      res = 400 * resMultiplier;
      start = {
        x: 129,
        y: 119,
      };
      ctrlP = {
        x: 85,
        y: 175,
      };
      end = {
        x: 128,
        y: 142,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //8th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 129,
        y: 143,
      };
      ctrlP = {
        x: 105,
        y: 172,
      };
      end = {
        x: 140,
        y: 142,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //9th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 141,
        y: 143,
      };
      ctrlP = {
        x: 150,
        y: 165,
      };
      end = {
        x: 165,
        y: 142,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //10th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 141,
        y: 143,
      };
      ctrlP = {
        x: 150,
        y: 165,
      };
      end = {
        x: 165,
        y: 142,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //11th segment
    {
      res = 150 * resMultiplier;
      start = {
        x: 166,
        y: 143,
      };
      ctrlP = {
        x: 158,
        y: 165,
      };
      end = {
        x: 178,
        y: 145,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //12th segment
    {
      res = 150 * resMultiplier;
      start = {
        x: 179,
        y: 146,
      };
      ctrlP = {
        x: 178,
        y: 165,
      };
      end = {
        x: 195,
        y: 145,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //13th segment
    {
      res = 150 * resMultiplier;
      start = {
        x: 179,
        y: 146,
      };
      ctrlP = {
        x: 178,
        y: 165,
      };
      end = {
        x: 195,
        y: 145,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //14th segment
    {
      res = 150 * resMultiplier;
      start = {
        x: 196,
        y: 146,
      };
      ctrlP = {
        x: 202,
        y: 155,
      };
      end = {
        x: 208,
        y: 165,
      };
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
  }
  //last name
  {
    //1st segment
    {
      res = 500 * resMultiplier;
      start = {
        x: 320,
        y: 86,
      };
      ctrlP = {
        x: 323,
        y: 140,
      };
      end = {
        x: 526,
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
      res = 200 * resMultiplier;
      start = {
        x: 527,
        y: 56,
      };
      ctrlP = {
        x: 485,
        y: 89,
      };
      end = {
        x: 460,
        y: 115,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //3rd segment
    {
      res = 500 * resMultiplier;
      start = {
        x: 461,
        y: 116,
      };
      ctrlP = {
        x: 469,
        y: -10,
      };
      end = {
        x: 308,
        y: 149,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //4th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 309,
        y: 150,
      };
      ctrlP = {
        x: 340,
        y: 140,
      };
      end = {
        x: 332,
        y: 158,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //5th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 333,
        y: 159,
      };
      ctrlP = {
        x: 340,
        y: 140,
      };
      end = {
        x: 361,
        y: 146,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //6th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 362,
        y: 147,
      };
      ctrlP = {
        x: 391,
        y: 147,
      };
      end = {
        x: 366,
        y: 155,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //7th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 367,
        y: 156,
      };
      ctrlP = {
        x: 451,
        y: 127,
      };
      end = {
        x: 455,
        y: 120,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //8th segment
    {
      res = 300 * resMultiplier;
      start = {
        x: 456,
        y: 121,
      };
      ctrlP = {
        x: 425,
        y: 127,
      };
      end = {
        x: 410,
        y: 160,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //9th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 411,
        y: 161,
      };
      ctrlP = {
        x: 435,
        y: 145,
      };
      end = {
        x: 440,
        y: 138,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //10th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 441,
        y: 139,
      };
      ctrlP = {
        x: 415,
        y: 180,
      };
      end = {
        x: 470,
        y: 140,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //11th segment
    {
      res = 200 * resMultiplier;
      start = {
        x: 471,
        y: 141,
      };
      ctrlP = {
        x: 445,
        y: 180,
      };
      end = {
        x: 495,
        y: 130,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //12th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 495,
        y: 130,
      };
      ctrlP = {
        x: 492,
        y: 140,
      };
      end = {
        x: 500,
        y: 140,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //13th segment
    {
      res = 500 * resMultiplier;
      start = {
        x: 499,
        y: 139,
      };
      ctrlP = {
        x: 470,
        y: 200,
      };
      end = {
        x: 435,
        y: 252,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //14th segment
    {
      res = 500 * resMultiplier;
      start = {
        x: 436,
        y: 253,
      };
      ctrlP = {
        x: 380,
        y: 220,
      };
      end = {
        x: 534,
        y: 145,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
    //15th segment
    {
      res = 100 * resMultiplier;
      start = {
        x: 533,
        y: 144,
      };
      ctrlP = {
        x: 484,
        y: 183,
      };
      end = {
        x: 510,
        y: 190,
      };
      //draw
      sub = quadraticBezier(start, ctrlP, end);
      for (let i = 0; i < sub.length; i++) {
        total.push(sub[i]);
      }
    }
  }
  draw(total);
}
signature();
function save() {
  let url = canvas.toDataURL("image/png");
  document.getElementById("saveTo").textContent = url;
}
