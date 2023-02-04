// VARIABLES

const DEFAULT_COLOR = "#000000";
const DEFAULT_SIZE = `16 x 16`

let gridContainer = document.getElementById("gridContainer");
let slider = document.getElementById("gridSize");
let currentColor = document.getElementById("colorPicker");
const sliderValue = document.getElementById('sliderValue');

sliderValue.innerText = DEFAULT_SIZE;
currentColor.value = DEFAULT_COLOR;

// VALUE UPDATES

slider.onmousemove = (e) => sliderValue.innerText = `${e.target.value} x ${e.target.value}`;
slider.onchange = (e) => gridSetup(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

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

function buttonCheck () {

}

function color(gridDiv) {
    if (gridDiv.type === "mouseover" && !mouseDown) return;
    gridDiv.target.style.backgroundColor = `${currentColor.value}`;
    }

function painterOn(gridDiv) {
    gridDiv.addEventListener("mouseover", color);
}

gridSetup(slider.value);
