const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const r = 20;
const y = 50;

let px;
let sx;
let a;
let r1;
let r2;
let A;
let C;
let D;
let X;

const computeA = () => parseFloat(((2 * a * r1) - a).toFixed(5));

const computeC = () => parseFloat((2 * r2).toFixed(5));

const computeD = (C) => Math.abs(C * px - sx);

const computeX = (A, D) => Math.abs(px - A * D);

const updateValues = () => {
  px = preyPosSlider.value;
  sx = wolfPosSlider.value;
  a = aValueSlider.value;
  r1 = r1ValueSlider.value;
  r2 = r2ValueSlider.value;
  
  wolfPosText.textContent = wolfPosSlider.value;
  preyPosText.textContent = preyPosSlider.value;
  aValueText.textContent = aValueSlider.value;
  r1ValueText.textContent = r1ValueSlider.value;
  r2ValueText.textContent = r2ValueSlider.value;
  
  A = computeA();
  C = computeC();
  D = computeD(C);
  X = computeX(A, D);

  AValueText.textContent = A;
  CValueText.textContent = C;
  DValueText.textContent = D;
  XValueText.textContent = X;
}

const redraw = () => {
  updateValues();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(1000, 50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = .25;
  ctx.stroke();

  drawWolf(sx);
  drawPrey(px);
  drawNextWolfPos(X);

  ctx.moveTo(sx, 50);
  ctx.lineTo(X, 50);
  ctx.strokeStyle = "black";
  ctx.stroke();
}

const drawWolf = (sx) => {
  ctx.beginPath();
  ctx.arc(sx, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();

}

const drawPrey = (px) => {
  ctx.beginPath();
  ctx.arc(px, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

const drawNextWolfPos = (X) => {
  ctx.beginPath();
  ctx.arc(X, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

// Wolf
const wolfPosSlider = document.getElementById("wolfPos");
const wolfPosText = document.getElementById("wolfPosText");

wolfPosSlider.addEventListener("input", () => redraw());

// Prey
const preyPosSlider = document.getElementById("preyPos");
const preyPosText = document.getElementById("preyPosText");

preyPosSlider.addEventListener("input", () => redraw());

// Variables

const AValueText = document.getElementById("AValueText");
const CValueText = document.getElementById("CValueText");

const DValueText = document.getElementById("DValueText");
const XValueText = document.getElementById("XValueText");

const aValueSlider = document.getElementById("aValue");
const aValueText = document.getElementById("aValueText");

aValueSlider.addEventListener("input", () => redraw());

const r1ValueSlider = document.getElementById("r1Value");
const r1ValueText = document.getElementById("r1ValueText");

r1ValueSlider.addEventListener("input", () => {
  redraw();
});

const r2ValueSlider = document.getElementById("r2Value");
const r2ValueText = document.getElementById("r2ValueText");

r2ValueSlider.addEventListener("input", () => redraw());


redraw();



