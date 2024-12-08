function createScreen(width, height) {
  const screen = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(' ');
    }
    screen.push(row);
  }
  return screen;
}

function putPixel(screen, char, x, y) {
  if (x < 0 || x >= screen[0].length || y < 0 || y >= screen.length) {
    return;
  }

  screen[Math.floor(y)][Math.floor(x)] = char;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function putImage(screen, image, x, y) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      putPixel(screen, image[i][j], x + j, y + i);
    }
  }
}

function screenToString(screen) {
  let frame = ""
  for (let i = screen.length - 1; i >= 0; i--) {
    frame += screen[i].join("");
  }
  return frame;
}

function clearScreen(screen) {
  let frame = "";
  for (let i = 0; i <= screen.length; i++) {
    frame += screen.join("")
  }
  return frame;
}

function displayScreen(screen) {
  for (const frame of screen) {
    console.log(frame.join(""));
  }
}

function drawHorizontalLine(screen, char, x1, x2, y) {
  for (let i = x1; i <= x2; i++) {
    putPixel(screen, char, i, y);
  }
}

function citySetup(screen, images) {
  putImage(screen, images[2], 78, 1);
  putImage(screen, images[0], 60, 1);
  putImage(screen, images[1], 70, 1);
  putImage(screen, images[1], 56, 1);
  putImage(screen, images[0], 54, 1);
  putImage(screen, images[0], 49, 1);
  putImage(screen, images[1], 40, 1);
  putImage(screen, images[0], 36, 1);
  putImage(screen, images[1], 32, 1);
  putImage(screen, images[2], 28, 1);
  putImage(screen, images[0], 24, 1);
  putImage(screen, images[0], 20, 1);
  putImage(screen, images[1], 14, 1);
  putImage(screen, images[2], 10, 1);
  drawHorizontalLine(screen, "_", 0, 80, 0);
}


function projectile(screen, initialPosition, angle, images) {
  const g = 9.81;

  const horizontalVel = initialPosition * Math.cos(degreesToRadians(angle));
  const verticalVel = initialPosition * Math.sin(degreesToRadians(angle));

  const timeOfFlight = (2 * verticalVel) / g;
  let frames = ""

  for (let t = 0; t <= timeOfFlight; t += 0.1) {
    const x = horizontalVel * t;
    const y = verticalVel * t - 0.5 * g * t * t;
    citySetup(screen, images)
    putPixel(screen, "*", x, y);
    frames += screenToString(screen);
  }

  return frames;
}

function displayAnimFormat(width, height, frames) {
  console.log(width, height);
  console.log(frames);
}

function main() {
  const WIDTH = 90;
  const HEIGHT = 40;
  const image = [
    '| |',
    '| |',
    ' _ ',

  ]

  const image2 = [
    '| |',
    '| |',
   ' _ ',
    '| |',
    '| |',
    ' _ ',
  ]

  const image3 = [
    '| |',
    '| |',
   ' _ ',
    '| |',
    '| |',
    ' _ ',
    '| |',
    '| |',
    ' _ ',
  ]

  const images = [image, image2, image3];
  const screen = createScreen(WIDTH, HEIGHT);
  const frames = projectile(screen, 30, 30, images);

  displayAnimFormat(WIDTH, HEIGHT, frames);
}

main();
