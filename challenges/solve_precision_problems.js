/**
* @param (Number) amount
* @return (Number)
*
*/
function addLeadingZeros(amount) {
  console.log(`amount: ${amount}`);
  amount = Number(amount.toFixed(2));
  // console.log(`amount1: ${amount}`);

  // Old code.
  // amount *= 100;


  // new hack.
  amount = amount.toString();
  var index = amount.indexOf('.');

  if (index > -1) {
    if (index == (amount.length - 2)) {
      amount += '0';
    }
  } else {
    amount += '00';
  }

  amount = Number(amount.replace('.', ''));

  // console.log(`amount2: ${amount}`);
  amount = Math.floor(amount);
  // console.log(`amount3: ${amount}`);
  amount = amount.toString();
  // console.log(`amount4: ${amount}`);
  var leadingZeros = '';
  var finalAmount = '';
  if (amount.length < 11) {
    for (var i = 11 - amount.length; i > 0; i--) {
      leadingZeros += '0';
    }
    finalAmount = leadingZeros + amount;
    // console.log(`finalamount: ${finalAmount}`);
    return finalAmount;
  } else {
    // console.log(`amount_final: ${amount}`);
    return amount;
  }
}

var amount = 291.09;
console.log(`result: ${addLeadingZeros(amount)}\n`);

var amount = 155.8;
console.log(`result: ${addLeadingZeros(amount)}\n`);

var amount = 123;
console.log(`result: ${addLeadingZeros(amount)}\n`);