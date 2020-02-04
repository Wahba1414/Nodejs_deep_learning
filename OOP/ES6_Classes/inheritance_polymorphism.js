class Shape {
  constructor(color) {
    // This property will be instance member.
    this.color = color;
  }

  // proto member, because not attached to 'this'
  getArea() {
    console.log(`Shape area`);
  }
}

// Inherit by 'extends'
class Square extends Shape {
  constructor(l, color) {
    // must call super to construct the parent class.
    super(color);
    this.l = l;
  }

  move() {
    // 
  }

  // function overriding (polymorphism)
  getArea() {
    // to access Shape's one.
    // super.getArea();
    console.log(`Square area`);
  }
}

var square = new Square(2, 'red');
square.getArea();

