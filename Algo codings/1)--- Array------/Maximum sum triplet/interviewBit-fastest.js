class TreeNode {
    constructor(val) {
      this.left = null;
      this.right = null;
      this.val = val;
      this.height = 0;
    }
  }
  /// We are only storing number values
  // We will only store unique values
  class AVLTree {
    // Only property of tree is it's root
    constructor() {
      this.root = null;
    }
    // Returns true if successfully inserted otherwise false
    insertVal(val) {
      // As we will only store unique values
      const isValPresent = this._contains(this.root, val);
      if (!isValPresent) {
        this.root = this._insertNode(this.root, val);
        return true;
      }
      return false;
    }
  
    _contains(root, val) {
      if (root === null) return false;
      if (val > root.val) {
        return this._contains(root.right, val);
      } else if (val < root.val) {
        return this._contains(root.left, val);
      } else {
        return true;
      }
    }
  
    _insertNode(root, val) {
      if (root === null) return new TreeNode(val);
      if (val > root.val) {
        root.right = this._insertNode(root.right, val);
      } else {
        root.left = this._insertNode(root.left, val);
      }
  
      this._update(root);
      return this._balance(root);
    }
  
    _update(node) {
      node.height =
        1 + Math.max(this._getHeight(node.right), this._getHeight(node.left));
    }
  
    _getHeight(node) {
      // Height is the number of edges of a node to it's farthest node.
      // We are considering null node of height -1
      if (node === null) return -1;
      return node.height;
    }
  
    _getBalanceFactor(node) {
      return this._getHeight(node.right) - this._getHeight(node.left);
    }
  
    _balance(node) {
      // left heavy
      const balanceFactor = this._getBalanceFactor(node);
      if (balanceFactor === -2) {
        const leftBalanceFactor = this._getBalanceFactor(node.left);
        if (leftBalanceFactor <= 0) {
          return this._leftLeftCase(node);
        } else {
          return this._leftRightCase(node);
        }
      } else if (balanceFactor === 2) {
        const rightBalanceFactor = this._getBalanceFactor(node.right);
        if (rightBalanceFactor >= 0) {
          return this._rightRightCase(node);
        } else {
          return this._rightLeftCase(node);
        }
      }
  
      return node;
    }
  
    // Cases -----------------------
  
    _leftLeftCase(node) {
      return this._rightRotation(node);
    }
  
    _leftRightCase(node) {
      node.left = this._leftRotation(node.left);
      return this._leftLeftCase(node);
    }
  
    _rightRightCase(node) {
      return this._leftRotation(node);
    }
  
    _rightLeftCase(node) {
      node.right = this._rightRotation(node.right);
      return this._rightRightCase(node);
    }
  
    //Tree Rotations ----------------------
  
    _rightRotation(node) {
      const newParent = node.left;
      node.left = newParent.right;
      newParent.right = node;
  
      this._update(node);
      this._update(newParent);
  
      return newParent;
    }
  
    _leftRotation(node) {
      const newParent = node.right;
      node.right = newParent.left;
      newParent.left = node;
  
      this._update(node);
      this._update(newParent);
  
      return newParent;
    }
    // Gives the closest value present in the tree
    // which is greater or equal to the given value
    getClosestLowerElement(val) {
      let curr = this.root, ans = null, minPositiveDist = Number.MAX_SAFE_INTEGER;
      while(curr !== null) {
        // This must be positive
        const currDist = val - curr.val;
        // distance positive means we need to search for more closer values to the right
        if(currDist > 0) {
          if(currDist < minPositiveDist) {
            minPositiveDist = currDist;
            ans = curr.val;
          }
          curr = curr.right;
        } else {
          curr = curr.left;
        }
      }
  
      return ans;
    }
  }
  
  function maxSum(arr) {
    let maxElementToLeft = Array(arr.length).fill(0);
    maxElementToLeft[arr.length - 1] = arr[arr.length - 1];
    for(let i = arr.length - 2; i >= 0; i--) {
      maxElementToLeft[i] = Math.max(maxElementToLeft[i + 1], arr[i]);
    }
  
    let tree = new AVLTree();
    tree.insertVal(arr[0]);
  
    let maxSum = 0, currSum = 0;
    for(let i = 1; i < arr.length - 1; i++) {
      const leftLowerElement = tree.getClosestLowerElement(arr[i]);
      const maxRightElement = maxElementToLeft[i + 1];
      if(leftLowerElement !== null && arr[i] < maxRightElement) {
        currSum = tree.getClosestLowerElement(arr[i]) + arr[i] + maxRightElement;
        maxSum = Math.max(currSum, maxSum);
      } 
      tree.insertVal(arr[i]);
    }
  
    return maxSum;
  }
  module.exports = { 
   //param A : array of integers
   //return an integer
      solve : function(A){
          return maxSum(A);
      }
  };
  
  