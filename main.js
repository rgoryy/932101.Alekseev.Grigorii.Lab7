const shapesContainer = document.querySelector(".shapes-container");
const squareBtn = document.getElementById('createSquareBtn');
const triangleBtn = document.getElementById('createTriangleBtn');
const circleBtn = document.getElementById('createCircleBtn');

squareBtn.addEventListener("click", function() {
  const inputValue = document.getElementById("valuebox").value;
  if (!checkInputValue(inputValue)) return;
  for (let i = 0; i < parseInt(inputValue); i++) {
    new Square();
  }
});

triangleBtn.addEventListener("click", function() {
  const inputValue = document.getElementById("valuebox").value;
  if (!checkInputValue(inputValue)) return;
  for (let i = 0; i < parseInt(inputValue); i++) {
    new Triangle();
  }
});

circleBtn.addEventListener("click", function() {
  const inputValue = document.getElementById("valuebox").value;
  if (!checkInputValue(inputValue)) return;
  for (let i = 0; i < parseInt(inputValue); i++) {
    new Circle();
  }
});

function checkInputValue(inputValue) {
  if (inputValue <= 0 || inputValue > 10) {
    alert("Количество фигур может быть только в диапазоне от 1 до 10");
    return false;
  }
  return true;
}

class Shape {
  constructor(shapeType) {
    this.shapeType = shapeType;
    this.figureSize = this.getRandomSize();
    this.createShape();
    this.addEventListeners();
  }

  setSize() {
    this.shape.style.width = this.figureSize + "px";
    this.shape.style.height = this.figureSize + "px";
  }

  createShape() {
    this.shape = document.createElement("div");
    this.shape.classList.add(this.shapeType);
    this.shape.setAttribute("tabindex", "0");
    this.setSize();
    const windowWidth = window.innerWidth - this.figureSize;
    this.shape.style.left = this.getRandomPosition(windowWidth);
    const windowHeight = window.innerHeight - this.figureSize;
    this.shape.style.top = this.getRandomPosition(windowHeight);
    shapesContainer.appendChild(this.shape);
  }

  addEventListeners() {
    this.shape.addEventListener("dblclick", () => {
      this.removeShape();
    });

    this.shape.addEventListener("focus", () => {
      this.changeColor();
    });

    this.shape.addEventListener("blur", () => {
      this.resetColor();
    });
  }

  removeShape() {
    shapesContainer.removeChild(this.shape);
  }

  changeColor() {
    this.shape.style.backgroundColor = "yellow";
    this.setSelectedShapeFlag();
  }

  setSelectedShapeFlag() {
    if (Shape.selectedShape && Shape.selectedShape !== this) {
      Shape.selectedShape.resetColor();
    }

    Shape.selectedShape = this;
  }

  getRandomSize() {
    const maxSize = 300;
    const minSize = 30;
    return Math.floor(Math.random() * maxSize) + minSize;
  }

  getRandomPosition(windowSideSize) {
    return Math.floor(Math.random() * windowSideSize) + "px";
  }
}

class Square extends Shape {
  constructor() {
    super("square");
  }

  resetColor() {
    this.shape.style.backgroundColor = 
      this.shape.style.backgroundColor.replace("yellow", "red");
  }
}

class Triangle extends Shape {
  constructor() {
    super("triangle");
  }

  setSize() {
    console.log(this.figureSize)
    const randomSize = this.figureSize;
    this.shape.style.border = randomSize / 2 + "px solid transparent";
    this.shape.style.borderBottom = randomSize/ 2 + "px  solid blue";
  }

  changeColor() {
    this.shape.style.borderBottom = this.shape.style.borderBottom.replace("blue", "yellow");
    this.setSelectedShapeFlag();
  }

  resetColor() {
    this.shape.style.borderBottom = 
      this.shape.style.borderBottom.replace("yellow", "blue");
  }
}

class Circle extends Shape {
  constructor() {
    super("circle");
  }

  resetColor() {
    this.shape.style.backgroundColor = 
      this.shape.style.backgroundColor.replace("yellow", "green");
  }
}

