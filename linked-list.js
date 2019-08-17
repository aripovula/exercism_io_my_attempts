//
// This is only a SKELETON file for the 'Linked List' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class LinkedList {

  constructor(){
    this.uid = 0;
    this.prevId = '';
    this.arr = [];
    this.deleteValue;
    this.isValueFound = this.isValueFound.bind(this);
    // this.extremes = [];  do we need to keep track of two extremes as stated in requirement
  }
  
  push(value) {
    // return this.arr.push(value);    COULD JUST DO THIS OR
    this.uid++;
    const newArr = {prev: this.prevId, id: this.uid, value, next: this.uid + 1};
    this.arr = [...this.arr, newArr];
    this.prevId = this.uid;
    // console.log('push - ', this.arr);
  }

  pop() {
    // return this.arr.pop();   COULD JUST DO THIS or
    if (this.arr.length == 0) return;  // or had better throw an error
    const index = this.arr.length - 1;
    let last = this.arr[index].value;
    this.prevId = this.arr.length > 1 ? this.arr[index - 1].id : '';
    this.arr.splice(index,1);
    // console.log('pop2 - ', this.arr);
    return last;
  }

  shift() {
    if (this.arr.length == 0) return;  // or had better throw an error
    let first = this.arr[0].value;
    this.arr[0].prev = '';
    this.arr = this.arr.filter((item) => item.id != this.arr[0].id);
    // const {first, ...rest} = this.arr;
    // console.log('shift - ', this.arr);
    return first;
  }

  unshift(value) {
    this.uid++;
    if (this.arr[0] != null) this.arr[0].prev = this.uid;
    const newArr = [{prev: '', id: this.uid, value, next: this.arr[0] ? this.arr[0].id : this.uid + 1}];
    // this.arr = newArr.concat(this.arr);
    this.arr = [...newArr, ...this.arr];
    this.prevId = this.uid;
    // console.log('push - ', this.arr);
  }

  delete(value) {
    this.deleteValue = value;
    let index = this.arr.findIndex(this.isValueFound);
    if (index > -1) this.arr.splice(index,1);
  }

  count() {
    return this.arr.length;
  }

  isValueFound(element) {
    return element.value == this.deleteValue;
  }
}
