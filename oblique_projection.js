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
 for(const frame of screen) {
  console.log(frame.join(""));
 }
}

function projectile(screen, initialPosition, angle) {
  const g = 9.81;

  const horizontalVel = initialPosition * Math.cos(degreesToRadians(angle));
  const verticalVel = initialPosition * Math.sin(degreesToRadians(angle));

  const timeOfFlight = (2 * verticalVel) / g;
  let frames = ""

  for (let t = 0; t <= timeOfFlight; t += 0.1) {
    const x = horizontalVel * t;
    const y = verticalVel * t - 0.5 * g * t * t;
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
  const screen = createScreen(WIDTH, HEIGHT);
  const frames = projectile(screen, 30, 30);
  
  displayAnimFormat(WIDTH, HEIGHT, frames);
  // displayScreen(screen)
}

main();
