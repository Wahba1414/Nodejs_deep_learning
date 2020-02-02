function Person (){
  this.name = 'Zizo';
}

Person.prototype.log = function(){
  console.log(`My name is ${this.name}`);
}

var person1= new Person();
person1.log();

Object.keys(person1); //log only own properties.
for(let key in person1) console.log(key); // log all members (instance & proto)