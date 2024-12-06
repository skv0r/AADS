class Node {
    constructor(key, left = null, right = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Добавление узла
    addNode(key, leftIndex, rightIndex, nodes) {
        let node = nodes[key];
        if (!node) {
            node = new Node(key);
            nodes[key] = node;
        }
        if (leftIndex !== -1) {
            if (!nodes[leftIndex]) {
                nodes[leftIndex] = new Node(leftIndex);
            }
            node.left = nodes[leftIndex];
        }
        if (rightIndex !== -1) {
            if (!nodes[rightIndex]) {
                nodes[rightIndex] = new Node(rightIndex);
            }
            node.right = nodes[rightIndex];
        }
        return node;
    }
    

    // Установка корня дерева
    setRoot(node) {
        this.root = node;
    }

    // In-order обход
    inOrder(node, result = []) {
        if (node) {
            this.inOrder(node.left, result);
            result.push(node.key);
            this.inOrder(node.right, result);
        }
        return result;
    }

    // Pre-order обход
    preOrder(node, result = []) {
        if (node) {
            result.push(node.key);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
        return result;
    }

    // Post-order обход
    postOrder(node, result = []) {
        if (node) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.key);
        }
        return result;
    }
}

// Чтение входных данных
function parseInput(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0], 10);
    const nodes = new Array(n).fill(null).map(() => null);
    const tree = new BinaryTree();

    for (let i = 1; i <= n; i++) {
        const [key, left, right] = lines[i].split(' ').map(Number);
        console.log(`Добавление узла: key=${key}, left=${left}, right=${right}`);
        tree.addNode(key, left, right, nodes);
    }

    tree.setRoot(nodes[0]);
    console.log('Дерево успешно построено!');
    return tree;
}

// Вывод обходов дерева
function printTraversals(tree) {
    console.log('In-order:', tree.inOrder(tree.root).join(' '));
    console.log('Pre-order:', tree.preOrder(tree.root).join(' '));
    console.log('Post-order:', tree.postOrder(tree.root).join(' '));
}

// Пример входных данных
const input = `
7
5 1 2
1 3 4
2 6 -1
3 -1 -1
4 -1 -1
6 -1 -1
0 5 -1
`;

const tree = parseInput(input);
printTraversals(tree);
