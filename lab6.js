function treeHeight(n, parent) {
    // Создаем массив для хранения списка детей каждой вершины
    let children = Array.from({ length: n }, () => []);

    // Определяем корень дерева и строим структуру дерева
    let root = -1;
    for (let i = 0; i < n; i++) {
        if (parent[i] === -1) {
            root = i; // Найден корень дерева
        } else {
            children[parent[i]].push(i); // Добавляем узел как ребенка его родителя
        }
    }

    // Рекурсивная функция для вычисления высоты дерева
    function calculateHeight(node) {
        if (children[node].length === 0) {
            return 1; // Листовая вершина, высота = 1
        }
        let maxHeight = 0;
        // Рекурсивно вычисляем высоту для всех детей текущей вершины
        for (let child of children[node]) {
            maxHeight = Math.max(maxHeight, calculateHeight(child));
        }
        return maxHeight + 1; // Высота текущей вершины = высота поддерева + 1
    }

    // Функция для построения визуализации дерева
    function buildTreeVisualization(node, level) {
        let result = `${' '.repeat(level * 4)}${node} (Level ${level})\n`; // Отображаем текущую вершину и её уровень
        for (let child of children[node]) {
            result += buildTreeVisualization(child, level + 1); // Рекурсивно добавляем детей с увеличением уровня
        }
        return result;
    }

    // Запускаем вычисление высоты дерева от корня
    const height = calculateHeight(root);
    console.log("Высота дерева: " + height);

    // Печатаем визуализацию дерева с уровнями
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
