//
// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Luhn {
  constructor(digits) {
    this.digits = digits;
  }

  get valid() {
    let s1=0, s2=0;
    this.digits = this.digits.replace(/\s/g, '');
    if (this.digits.length == 1) return false;
    
    let numbers = /^[0-9]+$/;
    if (!this.digits.match(numbers)) return false;
    
    this.digits = this.reverseText(this.digits);

    for (let i = 0; i < this.digits.length; i+=2) {
      s1 += parseInt(this.digits.substring(i, i + 1), 10);
    }
    
    for (let i = 1; i < this.digits.length; i+=2) {
      s2 += this.sumOfDigits(parseInt(this.digits.substring(i, i + 1), 10));
    }
    return (s1 + s2) % 10 == 0;
  }

  sumOfDigits(value) {
    let valueDouble = value * 2;
    if (valueDouble > 9) valueDouble -= 9;
    return valueDouble;
  }

  reverseText(s){
    return s.split("").reverse().join("");
  }

}
