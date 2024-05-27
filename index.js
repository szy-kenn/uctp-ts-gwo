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
let N = 5;
let N2;
let D2;
let X2;

const computeA = () => parseFloat(((2 * a * r1) - a).toFixed(5));

const computeC = () => parseFloat((2 * r2).toFixed(5));

const computeD = (C) => Math.abs((C * px) - sx);

const computeX = (A, D) => Math.abs(px - (A * D));

const computeD2 = (C, N, N2) => Math.abs((C * N) - N2);

const computeX2 = (A, D2) => Math.abs(N - (A * D2)) - N2;

const computeN2 = () => {
  const ts1 = document.getElementById("ts1");
  const ts2 = document.getElementById("ts2");

  let ts1string = "";
  let ts2string = "";

  ts1.childNodes.forEach((child) => {
    if (child.nodeName === "SPAN") {
      ts1string += child.textContent;
    }
  })

  ts2.childNodes.forEach((child) => {
    if (child.nodeName === "SPAN") {
      ts2string += child.textContent;
    }
  })

  let _n2 = 0;

  for (let i = 0; i < ts1string.length; i++) {
    if (ts1string[i] === ts2string[i]) {
      _n2++;
    }
  }

  return _n2;
}

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
  N2 = computeN2();
  D2 = computeD2(C, N, N2);
  X2 = computeX2(A, D2);

  AValueText.textContent = A;
  CValueText.textContent = C;
  DValueText.textContent = D;
  XValueText.textContent = X;
  D2ValueText.textContent = D2;
  X2ValueText.textContent = X2;
  N2ValueText.textContent = N2;
}

const redraw = () => {
  updateValues();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(canvas.width, 50);
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

const D2ValueText = document.getElementById("D2ValueText");
const X2ValueText = document.getElementById("X2ValueText");

const N2ValueText = document.getElementById("N2ValueText");

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

setInterval(() => {
  r1ValueSlider.value = Math.random();
  r2ValueSlider.value = Math.random();
  // aValueSlider.value -= 0.001; 
  redraw();
}, 1) 


