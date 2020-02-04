function Shape(color) {
  this.color = color;
}
Shape.prototype.getColor = function () {
  console.log(`Color: ${this.color}`);
}
Shape.prototype.area = function (x, y) {
  return x * y;
}
function Rectangle(x, y, color) {
  // Trick #2
  // trick to populate the new Rectangle
  // instance with Shape's one.
  Shape.call(this, color); //like Super()
  this.x = x;
  this.y = y;
}
function extend(child, parent) {
  // Trick #1
  // can't write just Shape because the protoype should be an object.
  child.prototype = Object.create(parent.prototype);
  // to keep the child's constructor if needed.
  child.prototype.constructor = child;
}
extend(Rectangle, Shape);
var rect = new Rectangle(1, 2, 'blue');
//this will populate the 'rect' object itself not the prototype.
// rect.getColor = null; 
