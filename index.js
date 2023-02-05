// VARIABLES

const DEFAULT_COLOR = "#000000";
const DEFAULT_SIZE = `16 x 16`;

let gridContainer = document.getElementById("gridContainer");
let slider = document.getElementById("gridSize");
let currentColor = document.getElementById("colorPicker");
const sliderValue = document.getElementById('sliderValue');
let colorBtn = document.getElementById("color");
let rainbowBtn = document.getElementById("rainbow");
let eraserBtn = document.getElementById("eraser");
let highlightBtn = document.getElementById("highlight");
let shadeBtn = document.getElementById("shade");
let clearBtn = document.getElementById("clear");

sliderValue.innerText = DEFAULT_SIZE;
currentColor.value = DEFAULT_COLOR;

// MOUSE-FUNCTIONS

slider.onmousemove = (e) => sliderValue.innerText = `${e.target.value} x ${e.target.value}`;
slider.onchange = (e) => gridSetup(e.target.value)
colorBtn.onclick = () => {
    enabledBtn();
    colorBtn.classList.add("active");}
rainbowBtn.onclick = () => {
    enabledBtn();
    rainbowBtn.classList.add("active");}
eraserBtn.onclick = () => {
    enabledBtn();
    eraserBtn.classList.add("active");}
highlightBtn.onclick = () => {
    enabledBtn();
    highlightBtn.classList.add("active");}
shadeBtn.onclick = () => {
    enabledBtn();
    shadeBtn.classList.add("active");}
clearBtn.onclick = () => {
    sliderInput = slider.value;
    gridSetup(sliderInput);}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// GRID

function gridSetup(sliderInput) {
    gridContainer.style.gridTemplateColumns = `repeat(${sliderInput}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${sliderInput}, 1fr)`
    gridContainer.innerHTML = "";

    for (i = 0; i < sliderInput * sliderInput; i++) {
        const gridDiv = document.createElement("div");
        gridDiv.classList.add("gridDiv")
        gridDiv.addEventListener("mouseover", color);
        gridDiv.addEventListener("mousedown", color);
        gridContainer.appendChild(gridDiv);
    };
    
}

// COLOR FUNCTIONS

function enabledBtn () {
    if (colorBtn.classList.contains("active")) {
        colorBtn.classList.remove("active");
    }
    if (rainbowBtn.classList.contains("active")) {
        rainbowBtn.classList.remove("active");
    }
    if (eraserBtn.classList.contains("active")) {
        eraserBtn.classList.remove("active")
    }
    if (highlightBtn.classList.contains("active")) {
        highlightBtn.classList.remove("active");
    }
    if (shadeBtn.classList.contains("active")) {
        shadeBtn.classList.remove("active");
    }
}

function color(gridDiv) {
    if (gridDiv.type === "mouseover" && !mouseDown) {return};
    if (colorBtn.classList.contains("active")) {
        gridDiv.target.style.backgroundColor = `${currentColor.value}`;
    } else if (rainbowBtn.classList.contains("active")) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        gridDiv.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (eraserBtn.classList.contains("active")) {
        gridDiv.target.style.backgroundColor = "#ffffff";
    } else if (highlightBtn.classList.contains("active")) {
        let rgbColor = gridDiv.target.style.backgroundColor;
        //console.log(rgbColor);
        let rgbArray = rgbColor.substring(4, rgbColor.length-1)
        .replace(/ /g, '')
        .split(',');;
        //console.log(rgbArray);
        let HSL = RGBToHSL(rgbArray[0], rgbArray[1], rgbArray[2]);
        //console.log(HSL);
        let newL = HSL[2] + 5;
        HSL[2] = newL;
        //console.log(HSL);
        gridDiv.target.style.backgroundColor = `hsl(${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%)`;
    } else if (shadeBtn.classList.contains("active")) {
        let rgbColor = gridDiv.target.style.backgroundColor;
        console.log(rgbColor);
        let rgbArray = rgbColor.substring(4, rgbColor.length-1)
        .replace(/ /g, '')
        .split(',');;
        //console.log(rgbArray);
        let HSL = rgbToHsl(rgbArray[0], rgbArray[1], rgbArray[2]);
        //console.log(HSL);
        let newL = HSL[2] - 5;
        HSL[2] = newL;
        //console.log(HSL);
        gridDiv.target.style.backgroundColor = `hsl(${HSL[0]}, ${HSL[1]}%, ${HSL[2]}%)`;
    }

    }

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
    
    }
    return [ h * 100, s * 100, l * 100];
}
      
gridSetup(slider.value);
