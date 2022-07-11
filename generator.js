const { createCanvas } = require('canvas');
const fs = require('fs');

// function generateFrame(frameIndex) {
//   const width = 640;
//   const height = 360;

//   const canv = createCanvas(width, height);
//   const ctx = canv.getContext('2d');

//   ctx.fillStyle = '#000';
//   ctx.fillRect(0, 0, width, height);

//   const text = 'wassup world';

//   ctx.font = 'bold 48pt sans-serif';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillStyle = '#fff';
//   ctx.fillText(text, width / 2, height / 2);

//   const buf = canv.toBuffer('image/png');
//   fs.writeFileSync(`./frames/frame-${frameIndex}.png`, buf);
// }

function drawCircle(context, x, y, radius, color) {
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, false);
  context.fillStyle = color;
  context.fill();
}

function randomColor() {
  const colors = [
    'rgba(84, 0, 69, 0.72)',
    'rgba(198, 0, 82, 0.72)',
    'rgba(255, 113, 75, 0.72)',
    'rgba(234, 255, 135, 0.72)',
    'rgba(172, 255, 233, 0.72)',
  ];

  // Pick a random index between 0 and 4, because there are
  // 5 items in the 'colors' array
  const randomIndex = Math.round(Math.random() * (colors.length - 1));

  // Get the value in the 'colors' array at this index
  return colors[randomIndex];
}

function randomValueBetween(minValue, maxValue) {
  return minValue + Math.random() * (maxValue - minValue);
}

// async function generateFrame(frameIndex) {
//   const width = 640;
//   const height = 360;

//   const canv = createCanvas(width, height);
//   const ctx = canv.getContext('2d');

//   ctx.fillStyle = '#888892';
//   ctx.fillRect(0, 0, width, height);
//   const numCircles = 24;

//   for(let i = 0; i < numCircles; i++) {
//     const r = 24;
//     const x = Math.round(Math.random() * width);
//     const y = Math.round(Math.random() * height);
//     const co = randomColor();

//     drawCircle(ctx, x, y, r, co);
//   }

//   const buf = canv.toBuffer('image/png');
//   await fs.promises.writeFile(`./frames/frame-${frameIndex}.png`, buf);
// }

// // const index = Math.round(Math.random() * 10000);
// // for(let i = index; i < index + 3; i++) {
// //   generateFrame(i);
// // }

// function onComplete() {
//   console.log('we did it!');
// }

// generateFrame()
//   .then(onComplete);

const width = 640;
const height = 360;
const numCircles = 24;
const circles = [];
const duration = 4;
const fps = 25;
const numFrames = fps * duration;

function initCircles() {
  for (let i = 0; i < numCircles; i++) {
    // const radius = 24;
    const radius = randomValueBetween(8, 48);
    const xPos = Math.round(Math.random() * width);
    const yPos = Math.round(Math.random() * height);
    const co = randomColor();
    const spd = 4 + Math.round(Math.random() * 24);

    circles.push({
      radius, xPos, yPos, co, spd
    });
  }
}

function updateCircles() {
  circles.forEach(function (circ) {
    circ.yPos -= circ.spd;

    if (circ.yPos < -1 * circ.radius) {
      circ.yPos = height + circ.radius;
    }
  });
}

function generateFrame(frameIndex, folderName) {
  const canv = createCanvas(width, height);
  const ctx = canv.getContext('2d');

  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  circles.forEach(function (c) {
    drawCircle(ctx, c.xPos, c.yPos, c.radius, c.co);
  });

  const buf = canv.toBuffer('image/png');
  const filename = `frame-${frameIndex}.png`;
  
  fs.writeFileSync(`./${folderName}/${filename}`, buf);
}

function fakeId() {
  const chars = '0123456789ABCDEF';
  const temp = [];
  for(let i = 0; i < 8; i++) {
    const index = Math.floor(Math.random() * chars.length);
    temp.push(chars[index]);
  }

  return temp.join('');  
}

function main() {
  const id = fakeId();
  const folder = `transcode/frames/frameset-${id}`;
  fs.mkdirSync(folder);

  initCircles();

  for (let i = 0; i < numFrames; i++) {
    generateFrame(i, folder);
    updateCircles();
  }
}

main();




