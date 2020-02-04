function Shape(color) {
  this.color = color;
}
Shape.prototype.getColor = function () {
  console.log(`Color: ${this.color}`);
}
Shape.prototype.area = function (x, y) {
  //
}
function Rectangle(x, y, color) {
  // Trick #2
  // trick to populate the new Rectangle
  // instance with Shape's one.
  Shape.call(this, color); //like Super()
  this.x = x;
  this.y = y;
}
function Square(l, color) {
  // Trick #2
  Shape.call(this, color); //like Super()
  this.l = l;
}
function extend(child, parent) {
  // Trick #1
  // can't write just Shape because the protoype should be an object.
  child.prototype = Object.create(parent.prototype);
  // to keep the child's constructor if needed.
  child.prototype.constructor = child;
}

extend(Rectangle, Shape);
// function overriding (polymorphism)
Rectangle.prototype.area = function () {
  return this.x * this.y;
}
extend(Square, Shape);
Square.prototype.area = function () {
  return this.l * this.l;
}

var rect = new Rectangle(1, 2, 'red');
var square = new Square(3, 'red');

var shapes = [rect, square];
shapes.forEach((shape) => console.log(shape.area()));