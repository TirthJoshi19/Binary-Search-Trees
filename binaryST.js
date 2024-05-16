class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    const uniqueArray = [...new Set(array)];
    uniqueArray.sort((a, b) => a - b);
    this.root = this.buildTree(uniqueArray, 0, uniqueArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  add(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  removeNode(value) {
    this.root = this.removeNodeHelper(this.root, value);
    console.log(value + 'is rem');
  }

  removeNodeHelper(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      node.left = this.removeNodeHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this.removeNodeHelper(node.right, value);
    } else {
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.left === null) {
        node = node.left;
        return node;
      }
      let minRight = this.findMidNode(node.right);
      node.data = minRight.data;

      node.right = this.removeNodeHelper(node.right, minRight.data);
      return node;
    }
  }
  findMidNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMidNode(node.left);
    }
  }

  find(value, node = this.root) {
    if (node === null) {
      console.error(`${value} is not in BST`);
      return null;
    }

    if (node.data === value) {
      return node;
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else if (value < node.data) {
      return this.find(value, node.left);
    }
  }
  levelOrder(node = this.root) {
    const queue = [node];

    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrder(node = this.root) {
    if (node !== null) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }
  preOrder(node = this.root) {
    if (node !== null) {
      console.log(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  postOrder(node) {
    if (node !== null) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  }

  height(node) {
    if (node === null) {
      return 0; // Height of an empty subtree is 0
    }
    if (node.left === null && node.right === null) {
      return 1; // Height of a leaf node is 1
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(nodeVal, node = this.root, currDepth = 0) {
    if (node === null) {
      return 0;
    }
    if (node.data === nodeVal) {
      return currDepth;
    }

    const leftDepth = this.depth(nodeVal, node.left, currDepth + 1);
    const rightDepth = this.depth(nodeVal, node.right, currDepth + 1);

    return leftDepth || rightDepth;
  }

  isBalanced(node = this.root) {
    const calculateHeight = (node) => {
      if (node === null) {
        return 0;
      }
      return (
        Math.max(calculateHeight(node.left), calculateHeight(node.right)) + 1
      );
    };

    const checkBalance = (node) => {
      if (node === null) {
        return true;
      }

      let leftHeight = calculateHeight(node.left);
      let rightHeight = calculateHeight(node.right);

      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        checkBalance(node.left) &&
        checkBalance(node.right)
      );
    };
    console.log(true);
    return checkBalance(node);
  }
}

const intArr = [1, 10, 15, 17];
const tree = new Tree(intArr);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
