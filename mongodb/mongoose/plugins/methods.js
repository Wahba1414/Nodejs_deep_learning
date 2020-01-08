module.exports = function (schema, options) {
  // you can add methods can be accessed through the instance from this schema.
  schema.methods.speak = function () {
    console.log(`Hi, i am ${this.name}`);
  }

  // Add query functions.
  schema.query.findByName = function (name) {
    return this.where({ name: name });
  }
}