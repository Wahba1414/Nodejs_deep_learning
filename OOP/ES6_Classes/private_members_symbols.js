const _radius = Symbol('Radius');
const _secret_function = Symbol('Secret_Function');

class Circle {
  constructor(radius){
    this[_radius] = radius
  }

  log(){
    console.log(this[_radius]);
  }

  // computed property name.
  [_secret_function](){
    console.log(`Secret function`);
  }

  
}

var circle = new Circle(2);

// These two statements are equilevent.
console.log(circle[Object.getOwnPropertySymbols(circle)[0]]); //hack
circle.log();