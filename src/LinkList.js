/*
Memory Management Benefits
** Data doesn't have to be store together

add/delete O(1)

search o(n)

*/
class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;

    this.addToHead = (value) => {
      const newNode = new Node(value, this.head, null);
      if (this.head) {
        this.head.prev = newNode;
      } else {
        this.tail = newNode;
      }
      this.head = newNode;
    };

    this.addToTail = (value) => {
      const newNode = new Node(value, null, this.tail);
      if (this.tail) {
        this.tail.next = newNode;
      } else {
        this.head = newNode;
      }
      this.tail = newNode;
    };

    this.removeHead = () => {
      if (!this.head) {
        return null;
      }
      const value = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }

      return value;
    };

    this.removeTail = () => {
      if (!this.tail) {
        return null;
      }
      const value = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      return value;
    };

    this.search = (value) => {
      let currentNode = this.head;

      while (currentNode) {
        if (currentNode.value === value) {
          return currentNode.value;
        }
        currentNode = currentNode.next;
      }
      return null;
    };

    this.indexOf = (value) => {
      const indexArray = [];
      let currentNode = this.head;
      let index = 0;
      while (currentNode) {
        if (currentNode.value === value) {
          indexArray.push(index);
        }
        currentNode = currentNode.next;
        index += 1;
      }
      return indexArray;
    };
  }
}

// LinkedList.prototype.addToHead = (vaule) => {
//   var newNode = new Node(value, this.head, null)
// }


// const node1 = new Node(100, 'node2', null);
// console.log(node1);
// const node2 = new Node(101, null, node1);
// console.log(node2);
const useList = new LinkedList();

useList.addToTail(3);
useList.addToTail(3);
useList.addToTail(5);
useList.addToTail(3);
useList.addToTail(8);
console.log(useList);

// const removedHead = useList.removeHead()
// console.log(removedHead);

// const removedTail = useList.removeTail()
// console.log(removedTail);

// const searchValue = useList.search(9);
// console.log('get searched value', searchValue);

const indexOf = useList.indexOf(3);
console.log('get searched value', indexOf);

// console.log(useList);

