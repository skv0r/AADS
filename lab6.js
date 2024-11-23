function treeHeight(n, parent) {
  
    let children = Array.from({ length: n }, () => []);

    // Определяем корень дерева и строим структуру дерева
    let root = -1;
    for (let i = 0; i < n; i++) {
        if (parent[i] === -1) {
            root = i; 
        } else {
            children[parent[i]].push(i); 
        }
    }

    // Рекурсивная функция для вычисления высоты дерева
    function calculateHeight(node) {
        if (children[node].length === 0) {
            return 1;
        }
        let maxHeight = 0;
        // Рекурсивно вычисляем высоту для всех детей текущей вершины
        for (let child of children[node]) {
            maxHeight = Math.max(maxHeight, calculateHeight(child));
        }
        return maxHeight + 1; 
    }

    // Функция для построения визуализации дерева
    function buildTreeVisualization(node, level) {
        let result = `${' '.repeat(level * 4)}${node} (Level ${level})\n`; 
        for (let child of children[node]) {
            result += buildTreeVisualization(child, level + 1); 
        }
        return result;
    }

    
    const height = calculateHeight(root);
    console.log("Высота дерева: " + height);

    
    const treeVisualization = buildTreeVisualization(root, 1);
    console.log("Визуализация дерева:\n" + treeVisualization);

    return height;
}

// Пример использования:

let n = 6;
let parent = [-1, 0, 0, 1, 1, 2];
console.log("n =", n);
console.log("parent =", parent);
treeHeight(n, parent);
