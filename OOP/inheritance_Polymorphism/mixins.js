// Mixins to combine all objects which need
// to inherit in one object (only one level)
var canSwim = {
  swim : function(){}
}
var canRun = {
  run : function(){}
}
function Athlete (){
} 
Athlete.prototype = Object.assign({},canRun,canSwim);
var athlete1 = new Athlete();
console.log(athlete1);