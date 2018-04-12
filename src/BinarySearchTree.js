/*
left smaller
right bigger


Recursion
Factorial
4! = 4 * 3 * 2 * 1;
*/

const factorial = (num) => {
  if (num === 1) {
    return num;
  }

  return num * factorial(num - 1);
};
/*
num = 1
return 1

num = 2
return 2 * factorial(1)

num = 3
return 3 * factorial(2)

num = 4
return 4 * factorial(3)
*/

// console.log('Factorial', factorial(4));

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value <= this.value) {
      if (!this.left) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else if (!this.right) {
      this.right = new BST(value);
    } else {
      this.right.insert(value);
    }
  }
}

// function BST(value) {
//   this.value = value;
//   this.left = null;
//   this.right = null;
// }


// BST.prototype.insert = function (value) {
//   if (value <= this.value) {
//     if (!this.left) {
//       this.left = new BST(value);
//     } else {
//       this.left.insert(value);
//     }
//   } else if (!this.right) {
//     this.right = new BST(value);
//   } else {
//     this.right.insert(value);
//   }
// };

/*
BST.prototype.insert = (value) => {
  console.log(this.value);
  // this is undefined; cause write in this way it is actually a nested function
  // inset returns a function instead itself is a function
}
*/
const bst = new BST(50);
bst.insert(30);
bst.insert(40);
bst.insert(60);
console.log('bst', bst);

