const { createCanvas } = require('canvas');
const fs = require('fs');

// function gen(frameIndex) {
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
    'rgba(16, 25, 66, 0.72)',
    'rgba(128, 4, 58, 0.72)',
    'rgba(246, 12, 73, 0.72)',
    'rgba(240, 149, 128, 0.72)',
    'rgba(255, 255, 255, 0.72)'
  ];

  // Pick a random index between 0 and 4, because there are
  // 5 items in the 'colors' array
  const randomIndex = Math.round(Math.random() * (colors.length - 1));

  // Get the value in the 'colors' array at this index
  return colors[randomIndex];
}

async function gen(frameIndex) {
  const width = 640;
  const height = 360;

  const canv = createCanvas(width, height);
  const ctx = canv.getContext('2d');

  ctx.fillStyle = '#888892';
  ctx.fillRect(0, 0, width, height);
  const numCircles = 24;

  for(let i = 0; i < numCircles; i++) {
    const r = 24;
    const x = Math.round(Math.random() * width);
    const y = Math.round(Math.random() * height);
    const co = randomColor();
  
    drawCircle(ctx, x, y, r, co);
  }

  const buf = canv.toBuffer('image/png');
  await fs.promises.writeFile(`./frames/frame-${frameIndex}.png`, buf);
}

// const index = Math.round(Math.random() * 10000);
// for(let i = index; i < index + 3; i++) {
//   gen(i);
// }

function onComplete() {
  console.log('we did it!');
}

gen()
  .then(onComplete);
