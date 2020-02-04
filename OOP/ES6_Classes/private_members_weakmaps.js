const _radius = new WeakMap();
const _secret_function = new WeakMap();

class Circle {
  constructor(radius){
    _radius.set(this,radius);
    _secret_function.set(this,function(){
      console.log(`secret function`);
    })
  }

  log(){
    console.log(_radius.get(this));
    _secret_function.get(this)();
  }
}

var circle = new Circle(2);

// exports circle only

circle.log();