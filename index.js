import { Pixel, Mand } from "wasm-mandelbrot";
import { memory } from "wasm-mandelbrot/wasm_mandelbrot_bg";

function draw() {
  const minx = Number.parseFloat(document.getElementById("minx").value)
  const maxx = Number.parseFloat(document.getElementById("maxx").value);
  const miny = Number.parseFloat(document.getElementById("miny").value);
  const maxy = Number.parseFloat(document.getElementById("maxy").value);
  const canw = Number.parseInt(document.getElementById("canw").value);
  const canh = Number.parseInt(document.getElementById("canh").value);
  const iters = Number.parseInt(document.getElementById("iters").value);



  // const mand = Mand.new(-2.0, 1.0, -1, 1,1800,800);
  const mand = Mand.new(minx,maxx,miny,maxy,canw,canh,iters);
  const width = mand.width();
  const height = mand.height();

  const canvas = document.getElementById("mandelbrot-canvas");

  canvas.height = height;
  canvas.width = width;

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

        ctx.fillRect(col, row, 1, 1);
      }
    }

    ctx.stroke();
  };
  drawPixels();
  // requestAnimationFrame(renderLoop);
}

const btn = document.getElementById("draw-btn");

btn.onclick = draw;
