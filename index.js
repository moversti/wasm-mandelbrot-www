import { Pixel, Mand } from "wasm-mandelbrot";
import { memory } from "wasm-mandelbrot/wasm_mandelbrot_bg";

const mand = Mand.new(-2.0, 1.0, -1.5, 1.5);
const width = mand.width();
const height = mand.height();

const canvas = document.getElementById("mandelbrot-canvas");

const CELL_SIZE = 1; // px
canvas.height = (CELL_SIZE ) * height ;
canvas.width = (CELL_SIZE) * width ;

const ctx = canvas.getContext("2d");


const renderLoop = () => {
  drawPixels();
  requestAnimationFrame(renderLoop);
};

const getIndex = (row, column) => {
  return row * width + column;
};
const drawPixels = () => {
  const pixelsPtr = mand.pixels();
  const pixels = new Uint8Array(memory.buffer, pixelsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = pixels[idx] === Pixel.In ? "black" : "lightgrey";

      ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }

  ctx.stroke();
};
drawPixels()
// requestAnimationFrame(renderLoop);