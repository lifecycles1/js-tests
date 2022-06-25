class Shape {
  constructor(left, top, color) {
    this.left = left;
    this.top = top;
    this.color = color;
  }
  render() {
    return "";
  }
}

class Circle extends Shape {
  constructor(left, top, color, radius) {
    super(left, top, color);
    this.radius = radius;
  }
  render() {
    return `<div style="position: absolute; left: ${this.left}px; top: ${
      this.top
    }px; background-color: ${this.color}; width: ${
      this.radius * 2
    }px; border-radius: 50%; height: ${this.radius * 2}px;"></div>`;
  }
}

class Square extends Shape {
  constructor(left, top, color, width) {
    super(left, top, color);
    this.width = width;
  }
  render() {
    return `<div style="position: absolute; left: ${this.left}px; 
    top: ${this.top}px; background-color: ${this.color}; width: ${this.width}px; height: ${this.width}px;"></div>`;
  }
}

class Board {
  constructor(color, width = 500, height = 300) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.shapes = [];
  }
  addShape(shape) {
    this.shapes.push(shape);
  }
  render() {
    let content = this.shapes.map((shape) => shape.render()).join("\n");
    content = `<div style="width: ${this.width}px; 
    height: ${this.height}px; background-color: ${this.color};">${content}</div>`;

    document.body.innerHTML = content;
  }
}

const board = new Board("cyan");
board.addShape(new Circle(100, 100, "blue", 50));
board.addShape(new Square(200, 200, "red", 100));
board.render();
