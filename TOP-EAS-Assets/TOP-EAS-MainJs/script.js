const gridsContainer = document.querySelector(".secdiv-grids");
const userInput = document.getElementById("quantity");
const resetBtn = document.querySelector(".reset-btn");
const randomColorBtn = document.querySelector(".random-color");

const createDivs = () => {
  for (let i = 0; i < 256; i++) {
    const gridDivs = document.createElement("div");
    gridDivs.classList.add("grid-divs");
    gridsContainer.appendChild(gridDivs);
  }
};

const moreGrid = (e) => {
  if (parseInt(e.target.value) > parseInt(userInput.max)) {
    e.target.value = userInput.max;
  }
  gridsContainer.innerHTML = "";
  gridsContainer.style.setProperty(
    "grid-template-columns",
    `repeat(${userInput.value}, 2fr)`
  );
  gridsContainer.style.setProperty(
    "grid-template-rows",
    `repeat(${userInput.value}, 2fr)`
  );

  for (let i = 0; i < userInput.value * userInput.value; i++) {
    const gridDivs = document.createElement("div");
    gridDivs.classList.add("grid-divs");
    // If not more than threshold, add animation effect, otherwise do not for performance reasons
    if (parseInt(userInput.value) < 31) {
      gridDivs.classList.add('animated');
    }
    gridsContainer.appendChild(gridDivs);
  }
};

let currentColor = '#000000';
const black = document.querySelector("div");
black.addEventListener("mouseover", function(event) {
  if (!event.target.classList.contains('grid-divs')) {
    return;
  }

  const isShadowDisabled = parseInt(userInput.value) > 50;

  if (currentColor) {
    event.target.style.boxShadow = `inset 5px 5px 20px ${ isShadowDisabled ? '#FFFFFF00' : '#323335'}`;
    event.target.style.background = currentColor;
  }
});

function generateRandomColor() {
  const randomColor = '#'+(Math.floor(Math.random()*16777215).toString(16)).padStart(6, '0');
  return randomColor;
}

randomColorBtn.addEventListener("click", function() {
  currentColor = generateRandomColor();
});

userInput.addEventListener("change", moreGrid);

resetBtn.addEventListener("click", function() {
  currentColor = '#000000';
  gridsContainer.innerHTML = "";
  userInput.value = "";
  gridsContainer.style.setProperty("grid-template-columns", `repeat(16, 2fr)`);
  gridsContainer.style.setProperty("grid-template-rows", `repeat(16, 2fr)`);
  createDivs();
});

createDivs();